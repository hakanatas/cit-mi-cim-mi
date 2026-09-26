/* SAHNE 4 — FAYANS USTASI (46–68 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 4, start: 46, end: 68, name: 'The tiler', nameTr: 'Fayans ustası', concept: '24 m², one side 6 m: skirting 20 m', conceptTr: '24 m², bir kenar 6 m: süpürgelik 20 m', render });
})(window.LI = window.LI || {});
