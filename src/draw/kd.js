/* Shared layout + Nokta helpers for "Çit mi, Çim mi?". */
(function (LI) {
  'use strict';
  const { clamp } = LI.E;
  LI.KD = {
    /** positions for 16:9 and 9:16 */
    L(env) {
      return env.V
        ? { O: [-260, -230], u: 56, Q: { x: 0, y: 20, dy: 68, size: 48 }, C: { x: [-250, 250], y: -540, dy: 84, size: 52, is: 50, iu: 36 }, S: { y: [-130, -50], size: 52 }, nx: -300, gy: 560, s: 1.15 }
        : { O: [-440, 190], u: 64, Q: { x: 500, y: -250, dy: 80, size: 54 }, C: { x: [-240, 420], y: -290, dy: 88, size: 56, is: 50, iu: 40 }, S: { y: [110], size: 58 }, nx: -780, gy: 262, s: 1.15 };
    },
    cam(env, o = {}) { return Object.assign({ x: env.V ? 0 : -60, y: env.V ? 60 : 0, zoom: 1, rot: 0, tilt: 1 }, o); },
    /** pupils + face toward a world point */
    look(p, target) {
      const e = LI.Nokta.eyes(p)[0];
      const dx = target[0] - e[0], dy = target[1] - e[1], d = Math.hypot(dx, dy) || 1;
      p.lookX = clamp(dx / d * 1.1, -1, 1); p.lookY = clamp(dy / d * 1.1, -1, 1);
      p.turn = clamp(dx / 900, -0.5, 0.5);
      return p;
    },
    /** a short ground stroke under Nokta */
    ground(ctx, env, x, gy) { LI.Ambient.ground(ctx, x - 360, x + 360, gy + 6, { alpha: 0.32 }); },
  };
})(window.LI = window.LI || {});
