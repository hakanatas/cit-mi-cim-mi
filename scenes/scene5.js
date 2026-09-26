/* SAHNE 5 — GENELLE (68–80 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 5, start: 68, end: 80, name: 'Generalise', nameTr: 'Genelle', concept: 'Around: perimeter · inside: area', conceptTr: 'Etrafı: çevre · içi: alan', render });
})(window.LI = window.LI || {});
