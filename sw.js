// The game's offline helper (only the website registers it; the build fills in the version and the picture list).
// The page comes from the network when it can, so an update arrives at once, and from the cache when it cannot.
// Pictures come from the cache and are refreshed in the background. Once the game has loaded, the page asks the helper
// to keep every picture, so the whole game works without a connection.
const VERSION = "7efa0d2b7a";
const ARTS = ["a_aragvian.webp","a_brother.webp","a_elder.webp","a_gurarch.webp","a_gurian.webp","a_khevsur.webp","a_kmother.webp","a_mkhar.webp","a_mtiuli.webp","a_partisan.webp","a_svan.webp","a_svan2.webp","an_a_aragvian_attack.webp","an_a_aragvian_walk.webp","an_a_brother_attack.webp","an_a_brother_walk.webp","an_a_gurarch_attack.webp","an_a_gurarch_walk.webp","an_a_gurian_attack.webp","an_a_gurian_walk.webp","an_a_khevsur_attack.webp","an_a_khevsur_walk.webp","an_a_kmother_attack.webp","an_a_kmother_walk.webp","an_a_mkhar_attack.webp","an_a_mkhar_walk.webp","an_a_mtiuli_attack.webp","an_a_mtiuli_walk.webp","an_a_partisan_attack.webp","an_a_partisan_walk.webp","an_a_svan2_attack.webp","an_a_svan2_walk.webp","an_a_svan_attack.webp","an_a_svan_walk.webp","an_c_demetre_attack.webp","an_c_demetre_walk.webp","an_c_frank_attack.webp","an_c_frank_walk.webp","an_c_kipchak_attack.webp","an_c_kipchak_walk.webp","an_c_monaspa_attack.webp","an_c_monaspa_walk.webp","an_e_bnel_arch_attack.webp","an_e_bnel_arch_walk.webp","an_e_bnel_boss_attack.webp","an_e_bnel_boss_walk.webp","an_e_bnel_cav_attack.webp","an_e_bnel_cav_walk.webp","an_e_bnel_heavy_attack.webp","an_e_bnel_heavy_walk.webp","an_e_bnel_inf_attack.webp","an_e_bnel_inf_walk.webp","an_e_kaji_arch_attack.webp","an_e_kaji_arch_walk.webp","an_e_kaji_boss_attack.webp","an_e_kaji_boss_walk.webp","an_e_kaji_cav_attack.webp","an_e_kaji_cav_walk.webp","an_e_kaji_heavy_attack.webp","an_e_kaji_heavy_walk.webp","an_e_kaji_inf_attack.webp","an_e_kaji_inf_walk.webp","an_e_qajar_arch_attack.webp","an_e_qajar_arch_walk.webp","an_e_qajar_boss_attack.webp","an_e_qajar_boss_walk.webp","an_e_qajar_cav_attack.webp","an_e_qajar_cav_walk.webp","an_e_qajar_heavy_attack.webp","an_e_qajar_heavy_walk.webp","an_e_qajar_inf_attack.webp","an_e_qajar_inf_walk.webp","an_e_qizilbash_arch_attack.webp","an_e_qizilbash_arch_walk.webp","an_e_qizilbash_boss_attack.webp","an_e_qizilbash_boss_walk.webp","an_e_qizilbash_cav_attack.webp","an_e_qizilbash_cav_walk.webp","an_e_qizilbash_heavy_attack.webp","an_e_qizilbash_heavy_walk.webp","an_e_qizilbash_inf_attack.webp","an_e_qizilbash_inf_walk.webp","an_e_rum_arch_attack.webp","an_e_rum_arch_walk.webp","an_e_rum_boss_attack.webp","an_e_rum_boss_walk.webp","an_e_rum_cav_attack.webp","an_e_rum_cav_walk.webp","an_e_rum_heavy_attack.webp","an_e_rum_heavy_walk.webp","an_e_rum_inf_attack.webp","an_e_rum_inf_walk.webp","an_e_sasanian_arch_attack.webp","an_e_sasanian_arch_walk.webp","an_e_sasanian_boss_attack.webp","an_e_sasanian_boss_walk.webp","an_e_sasanian_cav_attack.webp","an_e_sasanian_cav_walk.webp","an_e_sasanian_heavy_attack.webp","an_e_sasanian_heavy_walk.webp","an_e_sasanian_inf_attack.webp","an_e_sasanian_inf_walk.webp","an_e_seljuk_arch_attack.webp","an_e_seljuk_arch_walk.webp","an_e_seljuk_boss_attack.webp","an_e_seljuk_boss_walk.webp","an_e_seljuk_cav_attack.webp","an_e_seljuk_cav_walk.webp","an_e_seljuk_heavy_attack.webp","an_e_seljuk_heavy_walk.webp","an_e_seljuk_inf_attack.webp","an_e_seljuk_inf_walk.webp","an_h_abrag_attack.webp","an_h_abrag_walk.webp","an_h_amirani_attack.webp","an_h_amirani_walk.webp","an_h_avtandil_attack.webp","an_h_avtandil_walk.webp","an_h_david_attack.webp","an_h_david_walk.webp","an_h_davidhorse_idle.webp","an_h_davidhorse_rear.webp","an_h_davidhorse_walk.webp","an_h_davidride_walk.webp","an_h_erekle_attack.webp","an_h_erekle_walk.webp","an_h_gorgasali_attack.webp","an_h_gorgasali_duel.webp","an_h_gorgasali_leap.webp","an_h_gorgasali_lift.webp","an_h_gorgasali_walk.webp","an_h_gurdjieff_attack.webp","an_h_gurdjieff_walk.webp","an_h_kakutsa_attack.webp","an_h_kakutsa_walk.webp","an_h_mikha_attack.webp","an_h_mikha_walk.webp","an_h_prometheus_attack.webp","an_h_prometheus_walk.webp","an_h_tamar_attack.webp","an_h_tamar_walk.webp","an_h_tariel_attack.webp","an_h_tariel_walk.webp","an_p_amirani.webp","an_p_dali_shoot.webp","an_p_eagle.webp","an_p_kursha.webp","an_p_smith_hammer.webp","an_pask_act.webp","an_pask_fly.webp","an_tarch1_down.webp","an_tarch1_fwd.webp","an_tarch2_down.webp","an_tarch2_fwd.webp","c_demetre.webp","c_frank.webp","c_kipchak.webp","c_monaspa.webp","cm_c1a.webp","cm_c1b.webp","cm_c2a.webp","cm_c2b.webp","cm_c3a.webp","cm_c3b.webp","cm_c4a.webp","cm_c4b.webp","cm_c5a.webp","cm_c5b.webp","cm_c6a.webp","cm_c6b.webp","cm_c7a.webp","cm_c7b.webp","cm_epi.webp","cm_pro1.webp","cm_pro2.webp","cm_pro3.webp","e_bnel_arch.webp","e_bnel_boss.webp","e_bnel_cav.webp","e_bnel_heavy.webp","e_bnel_inf.webp","e_evil1.webp","e_evil2.webp","e_evil3.webp","e_kaji_arch.webp","e_kaji_boss.webp","e_kaji_cav.webp","e_kaji_heavy.webp","e_kaji_inf.webp","e_qajar_arch.webp","e_qajar_boss.webp","e_qajar_cav.webp","e_qajar_heavy.webp","e_qajar_inf.webp","e_qizilbash_arch.webp","e_qizilbash_boss.webp","e_qizilbash_cav.webp","e_qizilbash_heavy.webp","e_qizilbash_inf.webp","e_rum_arch.webp","e_rum_boss.webp","e_rum_cav.webp","e_rum_heavy.webp","e_rum_inf.webp","e_sasanian_arch.webp","e_sasanian_boss.webp","e_sasanian_cav.webp","e_sasanian_heavy.webp","e_sasanian_inf.webp","e_seljuk_arch.webp","e_seljuk_boss.webp","e_seljuk_cav.webp","e_seljuk_heavy.webp","e_seljuk_inf.webp","fx_avimusaipi.webp","g_bneleti.webp","g_didgori.webp","g_elbrus.webp","g_kajeti.webp","g_pass.webp","g_stone.webp","g_svan.webp","g_tbilisi.webp","h_abrag.webp","h_amirani.webp","h_avtandil.webp","h_david.webp","h_davidhorse.webp","h_davidride.webp","h_erekle.webp","h_gorgasali.webp","h_gurdjieff.webp","h_kakutsa.webp","h_mikha.webp","h_prometheus.webp","h_tamar.webp","h_tariel.webp","n_autumn.webp","n_boulder.webp","n_bush.webp","n_pebbles.webp","n_pine.webp","n_poplar.webp","n_rock.webp","n_shrub.webp","n_snowpine.webp","n_snowrock.webp","n_stump.webp","n_walnut.webp","p_logs.webp","p_pandora.webp","p_pandora_open.webp","por_h_abrag.webp","por_h_amirani.webp","por_h_avtandil.webp","por_h_david.webp","por_h_erekle.webp","por_h_gorgasali.webp","por_h_gurdjieff.webp","por_h_kakutsa.webp","por_h_mikha.webp","por_h_prometheus.webp","por_h_tamar.webp","por_h_tariel.webp","s_camp.webp","s_fort.webp","s_ruin.webp","st_monk.webp","st_queen.webp","t_archer_1.webp","t_archer_2.webp","t_archer_3.webp","t_archerp_1.webp","t_archerp_2.webp","t_archerp_3.webp","t_ballista_1.webp","t_ballista_2.webp","t_ballista_3.webp","t_bell_1.webp","t_bell_2.webp","t_bell_3.webp","t_catapult_1.webp","t_catapult_2.webp","t_catapult_3.webp","t_oil_1.webp","t_oil_2.webp","t_oil_3.webp","t_palisade.webp","ui_bazaar.webp","ui_book.webp","ui_chest_gold.webp","ui_chest_gold_o.webp","ui_chest_silver.webp","ui_chest_silver_o.webp","ui_chest_wood.webp","ui_chest_wood_o.webp","ui_coin.webp","ui_coinbag.webp","ui_dia.webp","ui_dp1.webp","ui_dp2.webp","ui_dp3.webp","ui_dp4.webp","ui_dp5.webp","ui_dp6.webp","ui_feather.webp","ui_gift.webp","ui_page.webp","ui_shard.webp","wp_axe.webp","wp_bomb.webp","wp_dagger.webp","wp_dsword.webp","wp_feather.webp","wp_glove.webp","wp_goldarrow.webp","wp_horn.webp","wp_mauser.webp","wp_orb.webp","wp_panther.webp","wp_ring.webp","wp_sabre.webp","wp_scepter.webp","wp_shield.webp","wp_wolfhelm.webp"];
const PAGE = 'metekhi-page-' + VERSION, ART = 'metekhi-art';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'icon-512-maskable.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(PAGE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith('metekhi-page-') && k !== PAGE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'keep-all') e.waitUntil(keepAll()); });
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin) return;
  if (u.pathname.includes('/art/')) e.respondWith(picture(r));
  else if (r.mode === 'navigate' || SHELL.some(s => u.pathname.endsWith('/' + s.replace('./', '')))) e.respondWith(page(r));
});

async function page(r) {
  const c = await caches.open(PAGE);
  try {
    const res = await fetch(r);
    if (res.ok) c.put(r, res.clone());
    return res;
  } catch (err) {
    return (await c.match(r, { ignoreSearch: true })) || (await c.match('index.html')) || (await c.match('./')) || Response.error();
  }
}
async function picture(r) {
  const c = await caches.open(ART), key = r.url.split('?')[0];
  const hit = await c.match(key);
  const fresh = fetch(r).then(res => { if (res.ok) c.put(key, res.clone()); return res; }).catch(() => null);
  if (hit) { fresh.catch(() => {}); return hit; }
  return (await fresh) || Response.error();
}
// every picture not kept yet, a few at a time (a failed one is simply tried again next time)
async function keepAll() {
  const c = await caches.open(ART), base = new URL('art/', self.registration.scope).href;
  const have = new Set((await c.keys()).map(q => q.url.split('?')[0]));
  const todo = ARTS.map(n => base + n).filter(u => !have.has(u));
  const next = async () => {
    for (let u = todo.shift(); u; u = todo.shift()) {
      try { const res = await fetch(u); if (res.ok) await c.put(u, res); } catch (err) { }
    }
  };
  await Promise.all([next(), next(), next(), next()]);
}
