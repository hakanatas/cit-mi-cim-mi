/* SAHNE 3 — TAHMİN ET, ÇÖZ, KONTROL ET (26–46 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 3, start: 26, end: 46, name: 'Guess, solve, check', nameTr: 'Tahmin et, çöz, kontrol et', concept: 'Fence 26 m, grass 40 m²', conceptTr: 'Çit 26 m, çim 40 m²', render });
})(window.LI = window.LI || {});
