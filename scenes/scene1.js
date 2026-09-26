/* SAHNE 1 — BAHÇE (0–10 s)  Nokta draws an 8 m × 5 m garden.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film, Ink = LI.Ink;

  /** problem 1: the garden (0–46 s) */
  function garden(ctx, env, t) {
    const L = KD.L(env), u = L.u, O = L.O, w = 8, h = 5, f = F();
    const a = seg(t, 3.0, 3.6) * (1 - seg(t, 45.6, 46.2)); if (a <= 0) return;
    const P = f.rect(O, u, w, h);
    // grass tufts, then unit squares row by row
    f.tufts(ctx, O, u, w, h, seg(t, 14.6, 16.4), a * (1 - seg(t, 34.6, 35.6)));
    f.tiles(ctx, O, u, w, h, (i, j) => seg(t, 34.8 + j * 0.8 + i * 0.04, 35.2 + j * 0.8 + i * 0.04) * a, { alpha: a });
    f.outline(ctx, P, { p: seg(t, 3.3, 5.4), alpha: a });
    f.posts(ctx, O, u, w, h, seg(t, 12.4, 14.4), a);
    // the fence rail, then the measuring rope
    f.rope(ctx, P, a * seg(t, 13.8, 14.4) * (1 - seg(t, 26.6, 27.2)), seg(t, 13.8, 14.8));
    const pr = seg(t, 28.0, 32.0);
    f.rope(ctx, P, a, pr);
    f.sides(ctx, O, u, w, h, '8 m', '5 m', seg(t, 6.0, 6.6) * a);
    // top and left lengths appear as the rope passes them
    const k3 = seg(pr, 13 / 26, 15 / 26) * a, k4 = seg(pr, 21 / 26, 23 / 26) * a;
    if (k3 > 0) f.T(ctx, '8 m', O[0] + w * u / 2, O[1] - h * u - 50, Object.assign({ size: 50, alpha: k3, halo: true }, f.AMB));
    if (k4 > 0) f.T(ctx, '5 m', O[0] - 30, O[1] - h * u / 2, Object.assign({ size: 50, alpha: k4, align: 'right' }, f.AMB));
  }

  /** problem 2: the room floor (46–68 s) */
  function room(ctx, env, t) {
    const L = KD.L(env), u = L.u, O = L.O, w = 6, h = 4, f = F();
    const a = seg(t, 46.2, 46.6) * (1 - seg(t, 67.6, 68.2)); if (a <= 0) return;
    const P = f.rect(O, u, w, h), R = (j) => 49.0 + j * 1.1;
    f.tiles(ctx, O, u, w, h, (i, j) => seg(t, R(j) + i * 0.05, R(j) + 0.4 + i * 0.05) * a, { alpha: a });
    for (let j = 0; j < h; j++) {
      const k = seg(t, R(j) + 0.3, R(j) + 0.7) * a;
      if (k > 0) f.T(ctx, String(6 * (j + 1)), O[0] - 26, O[1] - (j + 0.5) * u, Object.assign({ size: 46, alpha: k, align: 'right' }, f.AMB));
    }
    Ink.path(ctx, [P[0], P[1]], { w: 10, p: seg(t, 46.6, 47.4), alpha: a, seed: 7, taper: [0.02, 0.02], wob: 0.1, bleed: 0.5 });
    f.outline(ctx, P, { p: seg(t, 53.0, 54.0), alpha: a });
    f.rope(ctx, P, a, seg(t, 57.0, 59.0));
    f.sides(ctx, O, u, w, h, '6 m', '4 m', seg(t, 47.0, 47.6) * a, seg(t, 54.2, 54.8) * a);
    const q = seg(t, 48.2, 48.6) * (1 - seg(t, 52.6, 53.0)) * a;
    if (q > 0) f.T(ctx, '?', O[0] + w * u + 40, O[1] - h * u / 2, Object.assign({ size: 72, alpha: q, align: 'left' }, f.AMB));
  }

  /** the work area: what we know, what we look for, and the solution */
  function work(ctx, env, t) {
    const f = F(), a1 = 1 - seg(t, 25.6, 26.2), a2 = 1 - seg(t, 45.6, 46.2), a3 = 1 - seg(t, 67.6, 68.2);
    const A = f.AMB, W = (k, s, t0, t1, o = {}, alpha = 1) => { if (t > t0 && alpha > 0) f.line(ctx, env, k, s, Object.assign({ p: seg(t, t0, t1), alpha }, o)); };
    if (t < 26.2) {
      W(0, 'çit: kaç metre?', 10.8, 11.4, {}, a1);
      W(1, 'çim: kaç metrekare?', 11.8, 12.5, {}, a1);
      W(2, 'çit etrafı sarar: çevre', 17.4, 18.4, A, a1);
      W(3, 'çim içini kaplar: alan', 20.2, 21.2, A, a1);
    } else if (t < 46.2) {
      W(0, 'tahmin: 25 m kadar', 26.6, 27.4, {}, 0.7 * a2);
      W(1, '8 + 5 + 8 + 5 = 26 m', 28.0, 32.0, A, a2);
      W(2, '8 × 5 = 40 m²', 38.6, 39.4, A, a2);
      const s = 'kontrol: 2 × (8 + 5) = 26';
      W(3, s, 40.6, 41.4, {}, a2); f.tick(ctx, env, 3, s, seg(t, 41.4, 41.9), a2);
    } else {
      W(0, '24 m², bir kenarı 6 m', 46.8, 47.6, {}, a3);
      W(1, 'süpürgelik: kaç m?', 47.8, 48.4, {}, a3);
      W(2, '24 ÷ 6 = 4 m', 54.6, 55.4, A, a3);
      W(3, '6 + 4 + 6 + 4 = 20 m', 57.0, 59.0, A, a3);
      const s = 'kontrol: 6 × 4 = 24';
      W(4, s, 61.0, 61.8, {}, a3); f.tick(ctx, env, 4, s, seg(t, 61.8, 62.3), a3);
    }
  }

  /** the rule to remember (68–92 s) */
  const COLS = [
    { head: 'etrafı: çevre (m)', items: ['çit', 'süpürgelik', 'çerçeve'], t0: 68.6, icon: 'rope' },
    { head: 'içi: alan (m²)', items: ['çim', 'fayans', 'halı'], t0: 71.6, icon: 'tiles' },
  ];
  function rules(ctx, env, t) {
    const L = KD.L(env), C = L.C, f = F();
    if (t < 68.2) return;
    COLS.forEach((c, ci) => {
      const x = C.x[ci], a = seg(t, c.t0, c.t0 + 0.6); if (a <= 0) return;
      const u = C.iu, O = [x - 1.5 * u, C.y - 44], P = f.rect(O, u, 3, 2);
      if (c.icon === 'tiles') f.tiles(ctx, O, u, 3, 2, () => a);
      f.outline(ctx, P, { w: 5, alpha: a, seed: 90 + ci });
      if (c.icon === 'rope') f.rope(ctx, P, a, a);
      f.T(ctx, c.head, x, C.y, Object.assign({ size: C.size, alpha: a, halo: true }, f.AMB));
      c.items.forEach((s, k) => { const b = seg(t, c.t0 + 0.8 + k * 0.6, c.t0 + 1.3 + k * 0.6); if (b > 0) f.T(ctx, s, x, C.y + C.dy * (k + 1), { size: C.is, alpha: b }); });
    });
    const steps = env.V ? ['anla · çiz · tahmin et', 'çöz · kontrol et'] : ['anla · çiz · tahmin et · çöz · kontrol et'];
    const cx = env.V ? 0 : (C.x[0] + C.x[1]) / 2;
    steps.forEach((s, k) => f.T(ctx, s, cx, L.S.y[k], { size: L.S.size, p: seg(t, 74.4 + k * 1.2, 76.2 + k * 1.2), halo: true }));
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4), A = LI.Ang;
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { garden(ctx, env, t); room(ctx, env, t); work(ctx, env, t); rules(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'The garden', nameTr: 'Bahçe', concept: 'An 8 m × 5 m garden', conceptTr: '8 m × 5 m bir bahçe', render });
})(window.LI = window.LI || {});
