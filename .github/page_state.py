"""Read the game's state inside the app through Chrome's DevTools socket (forwarded to localhost:9222),
then open the bazaar's diamond tab and count the items sold for money (the app without billing must show none)."""
import json, urllib.request
import websocket

STATE = """JSON.stringify({url: location.href, ref: document.referrer, app: sessionStorage.getItem('td.app'),
  w: innerWidth, h: innerHeight, dpr: devicePixelRatio,
  loaded: !!document.querySelector('#loadbar') && document.querySelector('#loadbar').hidden,
  dgs: 'getDigitalGoodsService' in window, title: document.title,
  fullscreen: matchMedia('(display-mode: fullscreen)').matches,
  sw: !!(navigator.serviceWorker && navigator.serviceWorker.controller)})"""

SHOP = """(async () => {
  const b = document.querySelector('.wallet [data-shop="packs"]');
  if (!b) return JSON.stringify({wallet: false});
  b.click();
  await new Promise(r => setTimeout(r, 2500));
  return JSON.stringify({wallet: true, shopOpen: !!document.querySelector('#shopBody'),
    moneyItems: document.querySelectorAll('#shopBody [data-iap]').length,
    note: ((document.querySelector('#shopBody .note') || {}).textContent || '').slice(0, 120)});
})()"""


def evaluate(ws, n, expr, wait=False):
    ws.send(json.dumps({'id': n, 'method': 'Runtime.evaluate',
                        'params': {'expression': expr, 'returnByValue': True, 'awaitPromise': wait}}))
    while True:
        r = json.loads(ws.recv())
        if r.get('id') == n:
            v = r.get('result', {}).get('result', {}).get('value')
            return json.loads(v) if isinstance(v, str) else r


tabs = json.load(urllib.request.urlopen('http://localhost:9222/json'))
out = []
for t in tabs:
    if 'qourum.github.io' not in t.get('url', '') or 'webSocketDebuggerUrl' not in t:
        continue
    ws = websocket.create_connection(t['webSocketDebuggerUrl'], timeout=30, suppress_origin=True)
    out.append({'state': evaluate(ws, 1, STATE), 'shop': evaluate(ws, 2, SHOP, True)})
    ws.close()
print(json.dumps({'tabs': [(t.get('type'), t.get('url')) for t in tabs], 'pages': out}, indent=1, ensure_ascii=False))
