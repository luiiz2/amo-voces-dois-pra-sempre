/**
 * @file heartInfinityMorph.js
 * @description Parametric mathematical formulation of an elegant continuous-line Heart
 * that morphs seamlessly into an Infinity (∞) Lemniscate symbol using cubic Bezier curves.
 * 
 * Part of 'AMO VOCÊS DOIS PRA SEMPRE' Luxury Generative Graphics System.
 * Pure code-generated vector geometry — no stock icons or external assets.
 */

// ============================================================================
// 1. CANONICAL NORMALIZED BEZIER TOPOLOGIES
// ============================================================================

/**
 * 8-Segment Cubic Bezier Heart
 * Centered at (0, 0), normalized within bounding box ~ [-1.1, 1.1]
 * Segment Topology:
 *   Seg 0: Top notch (0, -0.35) -> Right shoulder climb
 *   Seg 1: Right shoulder -> Right outer apex
 *   Seg 2: Right outer apex -> Right lower sweep
 *   Seg 3: Right lower sweep -> Bottom tip (0, 1.00)
 *   Seg 4: Bottom tip (0, 1.00) -> Left lower sweep
 *   Seg 5: Left lower sweep -> Left outer apex
 *   Seg 6: Left outer apex -> Left shoulder
 *   Seg 7: Left shoulder -> Top notch (0, -0.35)
 */
export const HEART_CANONICAL_BEZIERS = Object.freeze([
  {
    p0: [0.000, -0.350],
    cp1: [0.105, -0.720],
    cp2: [0.380, -0.960],
    p3: [0.660, -0.860]
  },
  {
    p0: [0.660, -0.860],
    cp1: [0.890, -0.780],
    cp2: [1.040, -0.420],
    p3: [0.990, -0.060]
  },
  {
    p0: [0.990, -0.060],
    cp1: [0.950, 0.350],
    cp2: [0.720, 0.690],
    p3: [0.380, 0.880]
  },
  {
    p0: [0.380, 0.880],
    cp1: [0.180, 0.980],
    cp2: [0.050, 1.000],
    p3: [0.000, 1.000]
  },
  {
    p0: [0.000, 1.000],
    cp1: [-0.050, 1.000],
    cp2: [-0.180, 0.980],
    p3: [-0.380, 0.880]
  },
  {
    p0: [-0.380, 0.880],
    cp1: [-0.720, 0.690],
    cp2: [-0.950, 0.350],
    p3: [-0.990, -0.060]
  },
  {
    p0: [-0.990, -0.060],
    cp1: [-1.040, -0.420],
    cp2: [-0.890, -0.780],
    p3: [-0.660, -0.860]
  },
  {
    p0: [-0.660, -0.860],
    cp1: [-0.380, -0.960],
    cp2: [-0.105, -0.720],
    p3: [0.000, -0.350]
  }
]);

/**
 * 8-Segment Cubic Bezier Infinity (Lemniscate)
 * Centered at (0, 0), normalized within bounding box ~ [-1.15, 1.15]
 * Exact 1-to-1 topology match with HEART_CANONICAL_BEZIERS for smooth C^1 morphing.
 * Segment Topology:
 *   Seg 0: Center (0, 0) -> Right upper loop
 *   Seg 1: Right upper loop -> Right outer apex
 *   Seg 2: Right outer apex -> Right lower loop
 *   Seg 3: Right lower loop -> Center (0, 0)
 *   Seg 4: Center (0, 0) -> Left upper loop
 *   Seg 5: Left upper loop -> Left outer apex
 *   Seg 6: Left outer apex -> Left lower loop
 *   Seg 7: Left lower loop -> Center (0, 0)
 */
export const INFINITY_CANONICAL_BEZIERS = Object.freeze([
  {
    p0: [0.000, 0.000],
    cp1: [0.280, -0.360],
    cp2: [0.560, -0.580],
    p3: [0.820, -0.480]
  },
  {
    p0: [0.820, -0.480],
    cp1: [1.040, -0.380],
    cp2: [1.120, -0.160],
    p3: [1.120, 0.000]
  },
  {
    p0: [1.120, 0.000],
    cp1: [1.120, 0.160],
    cp2: [1.040, 0.380],
    p3: [0.820, 0.480]
  },
  {
    p0: [0.820, 0.480],
    cp1: [0.560, 0.580],
    cp2: [0.280, 0.360],
    p3: [0.000, 0.000]
  },
  {
    p0: [0.000, 0.000],
    cp1: [-0.280, -0.360],
    cp2: [-0.560, -0.580],
    p3: [-0.820, -0.480]
  },
  {
    p0: [-0.820, -0.480],
    cp1: [-1.040, -0.380],
    cp2: [-1.120, -0.160],
    p3: [-1.120, 0.000]
  },
  {
    p0: [-1.120, 0.000],
    cp1: [-1.120, 0.160],
    cp2: [-1.040, 0.380],
    p3: [-0.820, 0.480]
  },
  {
    p0: [-0.820, 0.480],
    cp1: [-0.560, 0.580],
    cp2: [-0.280, 0.360],
    p3: [0.000, 0.000]
  }
]);

// ============================================================================
// 2. EASING & INTERPOLATION MATHEMATICS
// ============================================================================

export const EasingFunctions = {
  linear: (t) => t,
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeInOutQuint: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
  smoothstep: (t) => t * t * (3 - 2 * t),
  smootherstep: (t) => t * t * t * (t * (t * 6 - 15) + 10),
  // Eased harmonic pulse for perpetual breathing cycles
  harmonicBreathing: (t) => 0.5 * (1 - Math.cos(2 * Math.PI * t)),
  // Subtle organic elastic swell
  elasticMorph: (t) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }
};

/**
 * Linear interpolation between two scalar numbers
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * 2D Point linear interpolation
 */
export function lerpPoint(pA, pB, t) {
  return [
    pA[0] + (pB[0] - pA[0]) * t,
    pA[1] + (pB[1] - pA[1]) * t
  ];
}

/**
 * 2D Affine Transformation for point [x, y]
 */
export function transformPoint(pt, cx, cy, scaleX, scaleY, angleRad = 0) {
  let x = pt[0] * scaleX;
  let y = pt[1] * scaleY;
  if (angleRad !== 0) {
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const rx = x * cos - y * sin;
    const ry = x * sin + y * cos;
    x = rx;
    y = ry;
  }
  return [x + cx, y + cy];
}

// ============================================================================
// 3. MORPH INTERPOLATION ENGINE
// ============================================================================

/**
 * Computes interpolated Bezier segments between Heart and Infinity at progress t.
 * 
 * @param {number} t Progress parameter [0 = Heart, 1 = Infinity].
 * @param {Object} [options={}] Configuration options.
 * @param {number} [options.cx=0] Center X translation.
 * @param {number} [options.cy=0] Center Y translation.
 * @param {number} [options.scale=100] Uniform scale factor.
 * @param {number} [options.scaleX=100] Non-uniform scale X.
 * @param {number} [options.scaleY=100] Non-uniform scale Y.
 * @param {number} [options.rotation=0] Rotation angle in radians.
 * @param {Function|string} [options.easing='easeInOutCubic'] Easing function.
 * @param {number} [options.lobeTension=1.0] Multiplier for lobe fullness.
 * @param {Array<Object>} [options.customHeart=null] Override canonical heart.
 * @param {Array<Object>} [options.customInfinity=null] Override canonical infinity.
 * @returns {Array<Object>} Array of 8 Bezier segment objects { p0, cp1, cp2, p3 }.
 */
export function getMorphSegments(t, options = {}) {
  const {
    cx = 0,
    cy = 0,
    scale = 100,
    scaleX = scale,
    scaleY = scale,
    rotation = 0,
    easing = 'easeInOutCubic',
    lobeTension = 1.0,
    customHeart = HEART_CANONICAL_BEZIERS,
    customInfinity = INFINITY_CANONICAL_BEZIERS
  } = options;

  const clampedT = Math.max(0, Math.min(1, t));
  const easeFn = typeof easing === 'function' 
    ? easing 
    : (EasingFunctions[easing] || EasingFunctions.easeInOutCubic);
  
  const morphedT = easeFn(clampedT);

  const segments = [];
  const count = customHeart.length;

  for (let i = 0; i < count; i++) {
    const hSeg = customHeart[i];
    const infSeg = customInfinity[i];

    // Raw interpolated control points in normalized space
    const rawP0 = lerpPoint(hSeg.p0, infSeg.p0, morphedT);
    let rawCp1 = lerpPoint(hSeg.cp1, infSeg.cp1, morphedT);
    let rawCp2 = lerpPoint(hSeg.cp2, infSeg.cp2, morphedT);
    const rawP3 = lerpPoint(hSeg.p3, infSeg.p3, morphedT);

    // Apply lobe tension modifier to handles if customized
    if (lobeTension !== 1.0) {
      rawCp1 = [
        rawP0[0] + (rawCp1[0] - rawP0[0]) * lobeTension,
        rawP0[1] + (rawCp1[1] - rawP0[1]) * lobeTension
      ];
      rawCp2 = [
        rawP3[0] + (rawCp2[0] - rawP3[0]) * lobeTension,
        rawP3[1] + (rawCp2[1] - rawP3[1]) * lobeTension
      ];
    }

    // Apply affine transform (scale, rotate, translate)
    segments.push({
      p0: transformPoint(rawP0, cx, cy, scaleX, scaleY, rotation),
      cp1: transformPoint(rawCp1, cx, cy, scaleX, scaleY, rotation),
      cp2: transformPoint(rawCp2, cx, cy, scaleX, scaleY, rotation),
      p3: transformPoint(rawP3, cx, cy, scaleX, scaleY, rotation)
    });
  }

  return segments;
}

/**
 * Converts Bezier segments into a valid SVG path data string (`d` attribute).
 * 
 * @param {Array<Object>} segments Array of Bezier segment objects.
 * @param {boolean} [closePath=true] Whether to append 'Z' closepath command.
 * @param {number} [precision=2] Decimal precision for coordinate strings.
 * @returns {string} SVG path data string `M ... C ... Z`.
 */
export function segmentsToSvgPath(segments, closePath = true, precision = 2) {
  if (!segments || segments.length === 0) return '';
  
  const f = (num) => num.toFixed(precision);
  
  let d = `M ${f(segments[0].p0[0])},${f(segments[0].p0[1])}`;
  for (let i = 0; i < segments.length; i++) {
    const s = segments[i];
    d += ` C ${f(s.cp1[0])},${f(s.cp1[1])} ${f(s.cp2[0])},${f(s.cp2[1])} ${f(s.p3[0])},${f(s.p3[1])}`;
  }
  
  if (closePath) {
    d += ' Z';
  }
  return d;
}

/**
 * Generates the SVG path string (`d` attribute) for the morphed shape directly.
 * 
 * @param {number} t Morph parameter [0 = Heart, 1 = Infinity].
 * @param {Object} [options={}] Configuration options.
 * @returns {string} Morph SVG path string.
 */
export function getMorphSvgPath(t, options = {}) {
  const segments = getMorphSegments(t, options);
  const closePath = options.closePath !== undefined ? options.closePath : true;
  const precision = options.precision !== undefined ? options.precision : 2;
  return segmentsToSvgPath(segments, closePath, precision);
}

// ============================================================================
// 4. PARAMETRIC CURVE EVALUATION & ARC LENGTH
// ============================================================================

/**
 * Evaluates a single cubic Bezier segment at local parameter u in [0, 1].
 * Formula: B(u) = (1-u)^3 P0 + 3(1-u)^2 u CP1 + 3(1-u) u^2 CP2 + u^3 P3
 */
export function evaluateCubicBezier(p0, cp1, cp2, p3, u) {
  const invU = 1 - u;
  const invU2 = invU * invU;
  const invU3 = invU2 * invU;
  const u2 = u * u;
  const u3 = u2 * u;

  const c0 = invU3;
  const c1 = 3 * invU2 * u;
  const c2 = 3 * invU * u2;
  const c3 = u3;

  return [
    c0 * p0[0] + c1 * cp1[0] + c2 * cp2[0] + c3 * p3[0],
    c0 * p0[1] + c1 * cp1[1] + c2 * cp2[1] + c3 * p3[1]
  ];
}

/**
 * Evaluates the first derivative (tangent vector) of a cubic Bezier segment at u.
 * Formula: B'(u) = 3(1-u)^2 (CP1 - P0) + 6(1-u) u (CP2 - CP1) + 3 u^2 (P3 - CP2)
 */
export function evaluateCubicBezierDerivative(p0, cp1, cp2, p3, u) {
  const invU = 1 - u;
  const c0 = 3 * invU * invU;
  const c1 = 6 * invU * u;
  const c2 = 3 * u * u;

  const dx = c0 * (cp1[0] - p0[0]) + c1 * (cp2[0] - cp1[0]) + c2 * (p3[0] - cp2[0]);
  const dy = c0 * (cp1[1] - p0[1]) + c1 * (cp2[1] - cp1[1]) + c2 * (p3[1] - cp2[1]);

  return [dx, dy];
}

/**
 * Computes approximate arc length of a single cubic Bezier segment using Gauss-Legendre quadrature.
 */
export function computeSegmentLength(p0, cp1, cp2, p3, steps = 16) {
  let length = 0;
  let prevPt = p0;
  for (let i = 1; i <= steps; i++) {
    const u = i / steps;
    const pt = evaluateCubicBezier(p0, cp1, cp2, p3, u);
    const dx = pt[0] - prevPt[0];
    const dy = pt[1] - prevPt[1];
    length += Math.sqrt(dx * dx + dy * dy);
    prevPt = pt;
  }
  return length;
}

/**
 * Evaluates point and orientation at global normalized path distance s in [0, 1].
 * Perfect for placing traveling sparkles, light beads, or stardust particles along the curve.
 * 
 * @param {Array<Object>} segments Morphed Bezier segments.
 * @param {number} s Global progress along perimeter [0, 1].
 * @returns {{ point: [number, number], tangent: [number, number], normal: [number, number], angleDeg: number, totalLength: number }}
 */
export function samplePointAlongMorph(segments, s) {
  const clampedS = ((s % 1) + 1) % 1; // Normalize to [0, 1)
  const numSegs = segments.length;
  
  // Calculate segment lengths
  const segLengths = segments.map(seg => computeSegmentLength(seg.p0, seg.cp1, seg.cp2, seg.p3));
  const totalLength = segLengths.reduce((acc, len) => acc + len, 0);
  
  const targetDist = clampedS * totalLength;
  let accumulated = 0;
  let segIndex = 0;
  let localDist = 0;

  for (let i = 0; i < numSegs; i++) {
    if (accumulated + segLengths[i] >= targetDist || i === numSegs - 1) {
      segIndex = i;
      localDist = targetDist - accumulated;
      break;
    }
    accumulated += segLengths[i];
  }

  const seg = segments[segIndex];
  const segLen = segLengths[segIndex];
  const u = segLen > 0 ? Math.max(0, Math.min(1, localDist / segLen)) : 0;

  const point = evaluateCubicBezier(seg.p0, seg.cp1, seg.cp2, seg.p3, u);
  const deriv = evaluateCubicBezierDerivative(seg.p0, seg.cp1, seg.cp2, seg.p3, u);
  
  const mag = Math.sqrt(deriv[0] * deriv[0] + deriv[1] * deriv[1]);
  const tangent = mag > 1e-6 ? [deriv[0] / mag, deriv[1] / mag] : [1, 0];
  const normal = [-tangent[1], tangent[0]];
  const angleDeg = (Math.atan2(tangent[1], tangent[0]) * 180) / Math.PI;

  return { point, tangent, normal, angleDeg, totalLength };
}

// ============================================================================
// 5. OPEN-ENDED RIBBON MORPH VARIATION
// ============================================================================

/**
 * Generates an open-ended continuous ribbon that enters from an external canvas coordinate,
 * weaves through the Heart/Infinity morph motif, and exits toward the next memory milestone.
 * 
 * @param {number} t Morph progress [0, 1].
 * @param {Array<number>} entryPoint [x, y] start coordinate for incoming ribbon.
 * @param {Array<number>} exitPoint [x, y] target coordinate for outgoing ribbon.
 * @param {Object} [options={}] Morph configuration.
 * @returns {string} SVG path string of seamless continuous ribbon.
 */
export function generateRibbonMorphPath(t, entryPoint, exitPoint, options = {}) {
  const morphSegs = getMorphSegments(t, options);
  if (!morphSegs || morphSegs.length === 0) return '';

  const f = (n) => n.toFixed(2);
  const firstP0 = morphSegs[0].p0;
  const lastP3 = morphSegs[morphSegs.length - 1].p3;

  // Compute smooth entry Bezier curve
  const entryMidX = (entryPoint[0] + firstP0[0]) * 0.5;
  const entryMidY = (entryPoint[1] + firstP0[1]) * 0.5;
  const entryCp1 = [entryPoint[0] + (entryMidX - entryPoint[0]) * 0.7, entryPoint[1] - 40];
  const entryCp2 = [firstP0[0] - (firstP0[0] - entryMidX) * 0.7, firstP0[1] - 60];

  // Compute smooth exit Bezier curve
  const exitMidX = (lastP3[0] + exitPoint[0]) * 0.5;
  const exitMidY = (lastP3[1] + exitPoint[1]) * 0.5;
  const exitCp1 = [lastP3[0] + (exitMidX - lastP3[0]) * 0.7, lastP3[1] + 60];
  const exitCp2 = [exitPoint[0] - (exitPoint[0] - exitMidX) * 0.7, exitPoint[1] + 40];

  let d = `M ${f(entryPoint[0])},${f(entryPoint[1])}`;
  d += ` C ${f(entryCp1[0])},${f(entryCp1[1])} ${f(entryCp2[0])},${f(entryCp2[1])} ${f(firstP0[0])},${f(firstP0[1])}`;

  for (let i = 0; i < morphSegs.length; i++) {
    const s = morphSegs[i];
    d += ` C ${f(s.cp1[0])},${f(s.cp1[1])} ${f(s.cp2[0])},${f(s.cp2[1])} ${f(s.p3[0])},${f(s.p3[1])}`;
  }

  d += ` C ${f(exitCp1[0])},${f(exitCp1[1])} ${f(exitCp2[0])},${f(exitCp2[1])} ${f(exitPoint[0])},${f(exitPoint[1])}`;

  return d;
}

// ============================================================================
// 6. STATEFUL MORPH CONTROLLER
// ============================================================================

/**
 * Creates an interactive or autonomous stateful animation controller for the morph motif.
 * 
 * @param {Object} config Configuration settings.
 * @param {Function} config.onFrame Callback receiving { t, pathD, segments, pointAtS }.
 * @param {number} [config.durationMs=6000] Duration of one full breathing cycle in ms.
 * @param {string} [config.mode='loop'] 'loop' | 'pingpong' | 'manual'.
 * @param {Object} [config.morphOptions={}] Default morph options.
 */
export function createMorphController(config = {}) {
  const {
    onFrame,
    durationMs = 6000,
    mode = 'pingpong',
    morphOptions = { cx: 200, cy: 200, scale: 120 }
  } = config;

  let currentT = 0;
  let isRunning = false;
  let startTime = null;
  let animId = null;

  function render(t) {
    currentT = Math.max(0, Math.min(1, t));
    const segments = getMorphSegments(currentT, morphOptions);
    const pathD = segmentsToSvgPath(segments, true);
    
    if (typeof onFrame === 'function') {
      onFrame({
        t: currentT,
        pathD,
        segments,
        sample: (s) => samplePointAlongMorph(segments, s)
      });
    }
  }

  function loop(now) {
    if (!isRunning) return;
    if (!startTime) startTime = now;

    const elapsed = now - startTime;
    const rawProgress = (elapsed % durationMs) / durationMs;

    let computedT = rawProgress;
    if (mode === 'pingpong') {
      // Smooth sinusoidal oscillation between 0 and 1
      computedT = 0.5 * (1 - Math.cos(2 * Math.PI * rawProgress));
    }

    render(computedT);

    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      animId = window.requestAnimationFrame(loop);
    }
  }

  return {
    start() {
      if (isRunning) return;
      isRunning = true;
      startTime = null;
      if (typeof window !== 'undefined' && window.requestAnimationFrame) {
        animId = window.requestAnimationFrame(loop);
      }
    },
    pause() {
      isRunning = false;
      if (typeof window !== 'undefined' && window.cancelAnimationFrame && animId) {
        window.cancelAnimationFrame(animId);
        animId = null;
      }
    },
    setT(t) {
      this.pause();
      render(t);
    },
    getT() {
      return currentT;
    },
    updateOptions(newOpts) {
      Object.assign(morphOptions, newOpts);
      render(currentT);
    }
  };
}
