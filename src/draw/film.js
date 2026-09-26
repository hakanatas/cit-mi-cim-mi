/* ─────────────────────────────────────────────────────────────
   The film's continuous state as pure functions of time.
   Problem 1 (0–46 s): an 8 m × 5 m garden. Fence around it (perimeter),
   grass inside it (area). Problem 2 (46–68 s): a room floor of 24 m²
   with one side 6 m, tiled 6 per row; the skirting board goes around.
   ───────────────────────────────────────────────────────────── */
(function (LI) {
  'use strict';
  const { seg, clamp, lerp, outBack, outCubic, hump } = LI.E;
  const A = LI.Ang, KD = LI.KD, Ink = LI.Ink;

  function rect(O, u, w, h) { return [O, [O[0] + w * u, O[1]], [O[0] + w * u, O[1] - h * u], [O[0], O[1] - h * u]]; }
  const outline = (ctx, P, o = {}) => Ink.path(ctx, P.concat([P[0]]), { w: o.w ?? 10, p: o.p ?? 1, seed: o.seed ?? 7, taper: [0.02, 0.02], wob: 0.1, dry: 0.3, bleed: 0.5, alpha: o.alpha ?? 1 });
  /** amber rope around the border, starting at the bottom-left corner */
  const rope = (ctx, P, a, p = 1) => { if (a > 0 && p > 0) Ink.path(ctx, P.concat([P[0]]), { w: 6, p, color: LI.AMBER_RGB, alpha: 0.95 * a, seed: 8, taper: [0, 0], wob: 0.1 }); };

  /** one unit square: top-left (x, y), side u; k = pop-in 0..1 */
  function unit(ctx, x, y, u, k, o = {}) {
    if (k <= 0) return;
    const s = outBack(clamp(k)) * (u - 6), cx = x + u / 2, cy = y + u / 2;
    ctx.fillStyle = `rgba(${LI.AMBER_RGB},${(o.fill ?? 0.3) * clamp(k * 2)})`;
    ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
    ctx.strokeStyle = `rgba(${LI.INK_RGB},${0.5 * clamp(k * 2) * (o.alpha ?? 1)})`;
    ctx.lineWidth = 2; ctx.strokeRect(cx - s / 2, cy - s / 2, s, s);
  }
  /** fill a w×h rectangle at O with unit squares; vis(i, j) → k (i: column, j: row from the bottom) */
  function tiles(ctx, O, u, w, h, vis, o = {}) {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
      const k = vis(i, j); if (k <= 0) continue;
      unit(ctx, O[0] + i * u, O[1] - (j + 1) * u, u, k, o);
    }
  }
  /** fence posts at every metre along the border (k: 0..1 grows them in order) */
  function posts(ctx, O, u, w, h, k, a = 1) {
    if (k <= 0 || a <= 0) return;
    const pts = [];
    for (let i = 0; i < w; i++) pts.push([O[0] + i * u, O[1]]);
    for (let j = 0; j < h; j++) pts.push([O[0] + w * u, O[1] - j * u]);
    for (let i = w; i > 0; i--) pts.push([O[0] + i * u, O[1] - h * u]);
    for (let j = h; j > 0; j--) pts.push([O[0], O[1] - j * u]);
    pts.forEach((q, n) => {
      const g = outBack(seg(k, n / pts.length * 0.8, n / pts.length * 0.8 + 0.2));
      if (g <= 0) return;
      Ink.path(ctx, [[q[0], q[1] + 4], [q[0], q[1] - 24 * g]], { w: 7, alpha: a, seed: 200 + n, taper: [0, 0.3], bleed: 0.2 });
    });
  }
  /** a small grass tuft in every cell (k: 0..1 sprouts them in order) */
  function tufts(ctx, O, u, w, h, k, a = 1) {
    if (k <= 0 || a <= 0) return;
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
      const n = j * w + i, g = outCubic(seg(k, n / (w * h) * 0.8, n / (w * h) * 0.8 + 0.2)); if (g <= 0) continue;
      const cx = O[0] + (i + 0.5) * u, cy = O[1] - (j + 0.25) * u, s = u * 0.32 * g;
      [[-0.5, -0.35], [0, -0.05], [0.5, 0.35]].forEach(([dx, lean], m) =>
        Ink.path(ctx, [[cx + dx * s * 0.8, cy], [cx + dx * s * 0.8 + lean * s, cy - s * (m === 1 ? 1.3 : 1)]], { w: 3.4, alpha: 0.75 * a, seed: 300 + n * 3 + m, taper: [0, 0.8], bleed: 0.1 }));
    }
  }
  /** side-length labels: bottom (w) and right (h) */
  function sides(ctx, O, u, w, h, lw, lh, a, ah = a) {
    if (a > 0 && lw) T(ctx, lw, O[0] + w * u / 2, O[1] + 52, { size: 50, alpha: a });
    if (ah > 0 && lh) T(ctx, lh, O[0] + w * u + 30, O[1] - h * u / 2, { size: 50, alpha: ah, align: 'left' });
  }
  /** a line in the work area (row k) */
  function line(ctx, env, k, s, o = {}) {
    const Q = KD.L(env).Q;
    T(ctx, s, Q.x, Q.y + Q.dy * k, Object.assign({ size: Q.size, halo: true }, o));
  }
  /** a hand-drawn check mark right after row k's text */
  function tick(ctx, env, k, s, p, a = 1) {
    if (p <= 0 || a <= 0) return;
    const Q = KD.L(env).Q;
    ctx.save(); ctx.font = `${Q.size}px "LI Brush", "Comic Sans MS", cursive`;
    const x = Q.x + ctx.measureText(s).width / 2 + 26, y = Q.y + Q.dy * k;
    ctx.restore();
    Ink.path(ctx, [[x, y], [x + 12, y + 14], [x + 38, y - 20]], { w: 7, p, alpha: a, color: LI.AMBER_RGB, seed: 400 + k, taper: [0.05, 0.3] });
  }
  const T = (ctx, s, x, y, o = {}) => A.text(ctx, s, x, y, Object.assign({ size: 48 }, o));
  const AMB = { color: A.amber };

  /** Nokta, as a function of time */
  function nokta(t, env) {
    const L = KD.L(env);
    const p = { x: L.nx, y: L.gy, s: L.s, mouth: 0.4, brow: 0.1 };
    const g = outCubic(seg(t, 1.3, 2.3));
    p.born = { body: lerp(0.3, 1, g), legs: outCubic(seg(t, 2.0, 2.6)), arms: outCubic(seg(t, 2.3, 2.8)), tuft: outBack(seg(t, 2.5, 2.9)) };
    if (t < 3.0) { p.sq = lerp(0.4, 1, clamp(LI.E.spring(seg(t, 1.3, 3.0) * 2, 8, 3.4), 0, 1.3)); p.drop = 1 - g; p.wobble = 1 - seg(t, 1.3, 2.8); }
    p.eyeOpen = outCubic(seg(t, 2.8, 3.1));
    KD.look(p, [L.O[0] + 200, L.O[1] - 120]);
    if ((t > 10.4 && t < 25.6) || (t > 46.4 && t < 49)) KD.look(p, [L.Q.x, L.Q.y + 60]);
    if (t > 68 && t < 84) KD.look(p, [L.C.x[0] + 200, L.C.y + 100]);
    if (t > 2.9 && t < 5.6) { p.hold = 'brush'; p.brushAng = -0.8 + 0.3 * Math.sin(t * 9); p.hands = { R: [1.35, -0.2 + 0.15 * Math.sin(t * 9)] }; }
    const pointing = (a, b) => { if (t > a && t < b) { p.point = 'R'; p.hands = { L: [-1.2, 0.55], R: [1.5, -0.35] }; } };
    pointing(12.2, 16.4); pointing(28.0, 32.4); pointing(34.8, 38.6); pointing(49.0, 53.2); pointing(57.0, 59.4); pointing(69.0, 73.0);
    const think = seg(t, 26.4, 26.8) * (1 - seg(t, 27.7, 28.0));
    if (think > 0) { p.hands = { L: [-1.2, 0.55], R: [0.75, -1.05 + 0.08 * Math.sin(t * 14)] }; p.brow = -0.5 * think; p.mouth = 0; p.lookY -= 0.3; }
    const puz = seg(t, 47.6, 48.0) * (1 - seg(t, 48.7, 49.0));
    if (puz > 0) { p.hands = { L: [-1.2, 0.55], R: [0.75, -1.05 + 0.08 * Math.sin(t * 14)] }; p.brow = -0.6 * puz; p.mouth = -0.1; }
    if (t > 54.2 && t < 55.6) { p.mouthOpen = 0.55; p.eyeScale = 1.1; }
    const joy = (a, b) => { if (t > a && t < b) { p.squint = 1; p.mouth = 1; p.sq = 1 + 0.1 * hump(t, a, a + 0.6); p.y -= 26 * hump(t, a, a + 0.6); p.hands = { L: [-1.3, -0.35], R: [1.3, -0.35] }; } };
    joy(32.6, 34.2); joy(41.4, 43.0); joy(62.0, 63.6); joy(77.6, 79.2);
    if (t > 84.0) {
      const j = (t - 84.0) % 1.4;
      p.squint = 1; p.mouth = 1; p.turn = 0.15; p.lookX = 0.3; p.lookY = 0;
      p.sq = 1 + 0.1 * Math.sin(Math.PI * clamp(j / 0.6)); p.y -= 40 * Math.sin(Math.PI * clamp(j / 0.6));
      p.hands = { L: [-1.35, -0.6 - 0.2 * Math.sin(t * 6)], R: [1.35, -0.6 + 0.2 * Math.sin(t * 6)] };
      if (t > 89.2) { p.squint = 0; p.lookX = 0; p.lookY = 0.2; p.turn = 0; p.y = L.gy; p.sq = 1; p.hands = { L: [-1.2, 0.55], R: [1.2, -1.0 + 0.25 * Math.sin(t * 10)] }; }
    }
    p.blink = Math.max(hump(t, 5.8, 5.95), hump(t, 19.0, 19.15), hump(t, 30.6, 30.75), hump(t, 45.0, 45.15), hump(t, 60.2, 60.35), hump(t, 75.0, 75.15));
    return p;
  }

  function base(ctx, env, t, cam, drawBefore) {
    const L = KD.L(env);
    LI.Ambient.specks(ctx, env, cam, t, { alpha: 0.22, n: 18, depth: 0.4, seed: 21 });
    LI.Camera.apply(ctx, env, cam);
    KD.ground(ctx, env, L.nx, L.gy);
    if (drawBefore) drawBefore();
    LI.Nokta.draw(ctx, LI.Nokta.follow((tt) => nokta(tt, env), t), t);
    if (t < 1.35 && t > 0.3) { const f = seg(t, 0.3, 1.3); Ink.dot(ctx, L.nx, lerp(-700, L.gy - 14, f * f), 15, { seed: 2, bleed: 0 }); }
    if (t > 1.3) Ink.drops(ctx, L.nx, L.gy - 4, t - 1.3, { n: 9, seed: 5, ground: L.gy + 4, scale: 0.8, alpha: 1 - seg(t, 4, 8) * 0.6 });
    return L;
  }

  LI.Film = { rect, outline, rope, unit, tiles, posts, tufts, sides, line, tick, T, AMB, nokta, base };
})(window.LI = window.LI || {});
