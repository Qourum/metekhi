"""Read the game's state inside the app through Chrome's DevTools socket (forwarded to localhost:9222)."""
import json, urllib.request
import websocket

EXPR = """JSON.stringify({url: location.href, ref: document.referrer, app: sessionStorage.getItem('td.app'),
  w: innerWidth, h: innerHeight, dpr: devicePixelRatio,
  loaded: !!document.querySelector('#loadbar') && document.querySelector('#loadbar').hidden,
  dgs: 'getDigitalGoodsService' in window, title: document.title,
  fullscreen: matchMedia('(display-mode: fullscreen)').matches,
  sw: !!(navigator.serviceWorker && navigator.serviceWorker.controller)})"""

tabs = json.load(urllib.request.urlopen('http://localhost:9222/json'))
state = []
for t in tabs:
    if 'qourum.github.io' not in t.get('url', '') or 'webSocketDebuggerUrl' not in t:
        continue
    ws = websocket.create_connection(t['webSocketDebuggerUrl'], timeout=20)
    ws.send(json.dumps({'id': 1, 'method': 'Runtime.evaluate', 'params': {'expression': EXPR, 'returnByValue': True}}))
    while True:
        r = json.loads(ws.recv())
        if r.get('id') == 1:
            break
    v = r.get('result', {}).get('result', {}).get('value')
    state.append(json.loads(v) if isinstance(v, str) else r)
    ws.close()
print(json.dumps({'tabs': [(t.get('type'), t.get('url')) for t in tabs], 'state': state}, indent=1, ensure_ascii=False))
