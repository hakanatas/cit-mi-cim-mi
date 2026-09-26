/* SAHNE 2 — ANLA (10–26 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 2, start: 10, end: 26, name: 'Understand', nameTr: 'Anla', concept: 'Fence = perimeter, grass = area', conceptTr: 'Çit = çevre, çim = alan', render });
})(window.LI = window.LI || {});
