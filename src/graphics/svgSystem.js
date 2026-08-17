/**
 * @file svgSystem.js
 * @description Generative Continuous-Line Vector System, Photo Framing Loops,
 * Luxury SVG Filters, Pointer-Reactive Spring Deformation Math, and Stroke Animation.
 * 
 * Part of 'AMO VOCÊS DOIS PRA SEMPRE' Luxury Generative Graphics System.
 * Pure code-generated vector geometry — 100% bespoke, no stock icons or emojis.
 */

import {
  HEART_CANONICAL_BEZIERS,
  INFINITY_CANONICAL_BEZIERS,
  getMorphSegments,
  segmentsToSvgPath,
  computeSegmentLength,
  evaluateCubicBezier,
  evaluateCubicBezierDerivative
} from './heartInfinityMorph.js';

// ============================================================================
// 1. SPLINE & CONTINUOUS RIBBON MATHEMATICS
// ============================================================================

/**
 * Converts a sequence of 2D waypoints into a continuous Centripetal Catmull-Rom
 * spline, parameterized into exact cubic Bezier segments (M ... C ... C ...).
 * 
 * Centripetal parameterization (alpha = 0.5) guarantees no self-intersecting loops,
 * no cusps, and no overshoot around sharp turns.
 * 
 * @param {Array<Array<number>>} points Array of [x, y] coordinates.
 * @param {Object} [options={}] Spline options.
 * @param {number} [options.tension=0.5] Curve tension [0 = loose, 1 = tight linear].
 * @param {number} [options.alpha=0.5] Parameterization [0 = uniform, 0.5 = centripetal, 1 = chordal].
 * @param {boolean} [options.closed=false] Whether spline forms a closed loop.
 * @returns {Array<Object>} Array of Bezier segment objects { p0, cp1, cp2, p3 }.
 */
export function pointsToCatmullRomBeziers(points, options = {}) {
  if (!points || points.length < 2) return [];
  const { tension = 0.5, alpha = 0.5, closed = false } = options;

  const pts = points.map(p => [p[0], p[1]]);

  if (closed) {
    pts.unshift(points[points.length - 1]);
    pts.push(points[0]);
    pts.push(points[1]);
  } else {
    // Virtual ghost endpoints for boundary continuity
    const pFirst = points[0];
    const pSecond = points[1];
    const pLast = points[points.length - 1];
    const pPenult = points[points.length - 2];

    const ghostStart = [
      pFirst[0] - (pSecond[0] - pFirst[0]) * 0.5,
      pFirst[1] - (pSecond[1] - pFirst[1]) * 0.5
    ];
    const ghostEnd = [
      pLast[0] + (pLast[0] - pPenult[0]) * 0.5,
      pLast[1] + (pLast[1] - pPenult[1]) * 0.5
    ];

    pts.unshift(ghostStart);
    pts.push(ghostEnd);
  }

  const beziers = [];

  for (let i = 1; i < pts.length - 2; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2];

    const d1 = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
    const d2 = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
    const d3 = Math.hypot(p3[0] - p2[0], p3[1] - p2[1]);

    let cp1x, cp1y, cp2x, cp2y;

    if (alpha === 0 || d1 < 1e-4 || d2 < 1e-4 || d3 < 1e-4) {
      // Uniform Catmull-Rom formulation
      const k = (1 - tension) / 3;
      cp1x = p1[0] + (p2[0] - p0[0]) * k;
      cp1y = p1[1] + (p2[1] - p0[1]) * k;
      cp2x = p2[0] - (p3[0] - p1[0]) * k;
      cp2y = p2[1] - (p3[1] - p1[1]) * k;
    } else {
      // Centripetal / Chordal formulation
      const t0 = 0;
      const t1 = t0 + Math.pow(d1, alpha);
      const t2 = t1 + Math.pow(d2, alpha);
      const t3 = t2 + Math.pow(d3, alpha);

      const dt1 = t1 - t0;
      const dt2 = t2 - t1;
      const dt3 = t3 - t2;
      const dt12 = t2 - t0;
      const dt23 = t3 - t1;

      // Tangent vector 1 at p1
      const m1x = (1 - tension) * dt2 * ((p1[0] - p0[0]) / dt1 - (p2[0] - p0[0]) / dt12 + (p2[0] - p1[0]) / dt2);
      const m1y = (1 - tension) * dt2 * ((p1[1] - p0[1]) / dt1 - (p2[1] - p0[1]) / dt12 + (p2[1] - p1[1]) / dt2);

      // Tangent vector 2 at p2
      const m2x = (1 - tension) * dt2 * ((p2[0] - p1[0]) / dt2 - (p3[0] - p1[0]) / dt23 + (p3[0] - p2[0]) / dt3);
      const m2y = (1 - tension) * dt2 * ((p2[1] - p1[1]) / dt2 - (p3[1] - p1[1]) / dt23 + (p3[1] - p2[1]) / dt3);

      cp1x = p1[0] + m1x / 3;
      cp1y = p1[1] + m1y / 3;
      cp2x = p2[0] - m2x / 3;
      cp2y = p2[1] - m2y / 3;
    }

    beziers.push({
      p0: [p1[0], p1[1]],
      cp1: [cp1x, cp1y],
      cp2: [cp2x, cp2y],
      p3: [p2[0], p2[1]]
    });
  }

  return beziers;
}

/**
 * Builds the complete continuous timeline ribbon connecting key story chapters,
 * photos, and memory milestones into a unified editorial vector path.
 * 
 * @param {Array<Object>} nodes Story chapter nodes { x, y, type, bounds, haloStyle }.
 * @param {Object} [options={}] Configuration options.
 * @returns {{ segments: Array<Object>, svgPath: string, totalLength: number }}
 */
export function generateContinuousTimelineRibbon(nodes, options = {}) {
  if (!nodes || nodes.length === 0) {
    return { segments: [], svgPath: '', totalLength: 0 };
  }

  const ribbonPoints = [];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    
    if (node.type === 'photo' && node.bounds) {
      // Insert organic orbit waypoints around the photo box
      const haloPts = calculatePhotoOrbitPoints(node.bounds, node.haloStyle || 'single-wrap');
      ribbonPoints.push(...haloPts);
    } else if (node.type === 'morph' && node.cx !== undefined) {
      // Morph anchor waypoint with subtle entry/exit offsets
      ribbonPoints.push([node.cx - 80, node.cy + 30]);
      ribbonPoints.push([node.cx, node.cy]);
      ribbonPoints.push([node.cx + 80, node.cy - 30]);
    } else {
      // Standard milestone waypoint
      ribbonPoints.push([node.x, node.y]);
    }
  }

  const segments = pointsToCatmullRomBeziers(ribbonPoints, {
    tension: options.tension !== undefined ? options.tension : 0.45,
    alpha: options.alpha !== undefined ? options.alpha : 0.5,
    closed: !!options.closed
  });

  const svgPath = segmentsToSvgPath(segments, !!options.closed, options.precision || 2);
  const totalLength = segments.reduce((acc, seg) => acc + computeSegmentLength(seg.p0, seg.cp1, seg.cp2, seg.p3), 0);

  return { segments, svgPath, totalLength };
}

// ============================================================================
// 2. PHOTO FRAMING & BESPOKE HALO LOOPS
// ============================================================================

/**
 * Computes organic halo orbit waypoints around a photo bounding box.
 * 
 * @param {Object} box Bounding box { x, y, width, height }.
 * @param {string} style 'single-wrap' | 'double-lasso' | 'diagonal-knot' | 'infinity-orbit'.
 * @param {number} [padding=24] Distance from photo edge.
 * @returns {Array<Array<number>>} Waypoint coordinates.
 */
export function calculatePhotoOrbitPoints(box, style = 'single-wrap', padding = 24) {
  const { x, y, width, height } = box;
  const cx = x + width / 2;
  const cy = y + height / 2;
  const halfW = width / 2 + padding;
  const halfH = height / 2 + padding;

  const points = [];

  switch (style) {
    case 'double-lasso':
      // Two concentric interlacing wraps around the photo
      points.push([cx - halfW * 1.2, cy - halfH * 0.8]);
      points.push([cx, cy - halfH * 1.15]);
      points.push([cx + halfW * 1.15, cy - halfH * 0.7]);
      points.push([cx + halfW * 0.9, cy + halfH * 0.85]);
      points.push([cx - halfW * 0.6, cy + halfH * 1.2]);
      // Second nested lasso
      points.push([cx - halfW * 0.95, cy - halfH * 0.3]);
      points.push([cx + halfW * 0.6, cy - halfH * 0.9]);
      points.push([cx + halfW * 1.2, cy + halfH * 0.5]);
      points.push([cx, cy + halfH * 1.05]);
      points.push([cx - halfW * 1.1, cy + halfH * 0.7]);
      break;

    case 'diagonal-knot':
      // High-fashion ribbon sweeping diagonally with decorative knot at corner
      points.push([x - padding * 1.5, y + height * 0.4]);
      points.push([x + width * 0.2, y - padding]);
      points.push([x + width + padding * 1.2, y + height * 0.1]);
      points.push([x + width * 0.8, y + height + padding * 1.3]);
      points.push([x - padding, y + height * 0.8]);
      break;

    case 'infinity-orbit':
      // Figure-8 infinity orbit framing top and bottom of photo
      points.push([cx - halfW * 0.8, cy - halfH * 0.9]);
      points.push([cx, cy - halfH * 1.2]);
      points.push([cx + halfW * 0.8, cy - halfH * 0.9]);
      points.push([cx, cy]);
      points.push([cx - halfW * 0.8, cy + halfH * 0.9]);
      points.push([cx, cy + halfH * 1.2]);
      points.push([cx + halfW * 0.8, cy + halfH * 0.9]);
      break;

    case 'single-wrap':
    default:
      // Organic rounded perimeter embracing the photo frame
      points.push([cx - halfW, cy - halfH * 0.4]);
      points.push([cx - halfW * 0.8, cy - halfH]);
      points.push([cx + halfW * 0.7, cy - halfH * 0.95]);
      points.push([cx + halfW * 1.05, cy - halfH * 0.2]);
      points.push([cx + halfW * 0.95, cy + halfH * 0.7]);
      points.push([cx + halfW * 0.2, cy + halfH * 1.08]);
      points.push([cx - halfW * 0.85, cy + halfH * 0.95]);
      points.push([cx - halfW * 1.05, cy + halfH * 0.3]);
      break;
  }

  return points;
}

/**
 * Generates a standalone organic photo halo SVG path.
 * 
 * @param {Object} box Bounding box { x, y, width, height }.
 * @param {Object} [options={}] Halo styling options.
 * @returns {string} SVG path string `d`.
 */
export function generatePhotoHaloPath(box, options = {}) {
  const {
    style = 'single-wrap',
    padding = 26,
    tension = 0.45,
    closed = true
  } = options;

  const pts = calculatePhotoOrbitPoints(box, style, padding);
  const beziers = pointsToCatmullRomBeziers(pts, { tension, alpha: 0.5, closed });
  return segmentsToSvgPath(beziers, closed, options.precision || 2);
}

/**
 * Generates an elegant bespoke typography flourish underline for titles.
 * Features an organic tapering entry curve, a gentle baseline arch, and an infinity whisper terminal.
 * 
 * @param {Object} bounds Text bounding box { x, y, width, height }.
 * @param {Object} [options={}] Flourish options.
 * @returns {string} SVG path string `d`.
 */
export function generateTypographyUnderline(bounds, options = {}) {
  const { x, y, width, height } = bounds;
  const baselineY = y + height + (options.offsetY || 14);
  const overshoot = options.overshoot || 32;

  const startX = x - overshoot;
  const endX = x + width + overshoot;
  const midX = (startX + endX) / 2;
  const arch = options.arch || 6;

  // 3-Segment Cubic Flourish
  const segs = [
    // Entry swirl
    {
      p0: [startX, baselineY - 8],
      cp1: [startX + 15, baselineY + 12],
      cp2: [startX + 40, baselineY + arch],
      p3: [startX + 80, baselineY + arch * 0.5]
    },
    // Main baseline sweep
    {
      p0: [startX + 80, baselineY + arch * 0.5],
      cp1: [midX - width * 0.2, baselineY - arch * 0.3],
      cp2: [midX + width * 0.2, baselineY - arch * 0.3],
      p3: [endX - 80, baselineY + arch * 0.5]
    },
    // Terminal whisper loop
    {
      p0: [endX - 80, baselineY + arch * 0.5],
      cp1: [endX - 35, baselineY + arch],
      cp2: [endX - 10, baselineY - 10],
      p3: [endX, baselineY - 2]
    }
  ];

  return segmentsToSvgPath(segs, false, 2);
}

// ============================================================================
// 3. POINTER-REACTIVE SPRING DISPLACEMENT FIELD
// ============================================================================

/**
 * Mass-Spring-Damper Physics Engine for interactive vector path perturbation.
 * When user moves pointer / touch near the line, control points ripple smoothly
 * with harmonic damping and return to their baseline trajectory without jitter.
 */
export class SpringDisplacementField {
  /**
   * @param {Object} [config={}] Spring configuration parameters.
   * @param {number} [config.stiffness=0.08] Hooke's constant k (return force).
   * @param {number} [config.damping=0.88] Damping coefficient (friction/decay).
   * @param {number} [config.influenceRadius=180] Radius of pointer repulsion in px.
   * @param {number} [config.maxForce=45] Maximum displacement impulse.
   */
  constructor(config = {}) {
    this.stiffness = config.stiffness !== undefined ? config.stiffness : 0.08;
    this.damping = config.damping !== undefined ? config.damping : 0.88;
    this.influenceRadius = config.influenceRadius !== undefined ? config.influenceRadius : 180;
    this.maxForce = config.maxForce !== undefined ? config.maxForce : 45;

    // Pointer state
    this.pointerX = -9999;
    this.pointerY = -9999;
    this.prevPointerX = -9999;
    this.prevPointerY = -9999;
    this.velocityX = 0;
    this.velocityY = 0;
    this.isActive = false;

    // Node perturbation state map: key -> { dx, dy, vx, vy }
    this.offsets = new Map();
  }

  /**
   * Updates pointer position and computes velocity impulse.
   * 
   * @param {number} x Current pointer X.
   * @param {number} y Current pointer Y.
   * @param {boolean} [isActive=true] Whether pointer is active on canvas.
   */
  updatePointer(x, y, isActive = true) {
    this.isActive = isActive;
    if (this.prevPointerX === -9999) {
      this.prevPointerX = x;
      this.prevPointerY = y;
    }

    this.velocityX = (x - this.prevPointerX) * 0.5;
    this.velocityY = (y - this.prevPointerY) * 0.5;
    this.pointerX = x;
    this.pointerY = y;
    this.prevPointerX = x;
    this.prevPointerY = y;
  }

  /**
   * Deforms a single 2D point [x, y] based on pointer distance and spring state.
   * 
   * @param {Array<number>} pt [x, y] coordinate.
   * @param {string|number} key Unique identifier for the point across frames.
   * @param {number} [dt=1] Delta time.
   * @returns {Array<number>} Perturbed [x + dx, y + dy] coordinate.
   */
  displacePoint(pt, key, dt = 1) {
    let state = this.offsets.get(key);
    if (!state) {
      state = { dx: 0, dy: 0, vx: 0, vy: 0 };
      this.offsets.set(key, state);
    }

    // Pointer impulse force
    if (this.isActive) {
      const distSq = Math.pow(pt[0] - this.pointerX, 2) + Math.pow(pt[1] - this.pointerY, 2);
      const radiusSq = this.influenceRadius * this.influenceRadius;

      if (distSq < radiusSq && distSq > 1e-4) {
        const dist = Math.sqrt(distSq);
        // Smooth Gaussian decay
        const falloff = Math.exp(-distSq / (2 * Math.pow(this.influenceRadius * 0.45, 2)));
        
        // Direction vector from pointer to point
        const dirX = (pt[0] - this.pointerX) / dist;
        const dirY = (pt[1] - this.pointerY) / dist;

        // Force composed of static push + pointer velocity drag
        const pushMag = (1 - dist / this.influenceRadius) * this.maxForce;
        const forceX = (dirX * pushMag + this.velocityX * 1.5) * falloff;
        const forceY = (dirY * pushMag + this.velocityY * 1.5) * falloff;

        state.vx += forceX * 0.15;
        state.vy += forceY * 0.15;
      }
    }

    // Spring mechanics: F = -k * x - c * v
    const springForceX = -this.stiffness * state.dx;
    const springForceY = -this.stiffness * state.dy;

    state.vx = (state.vx + springForceX * dt) * this.damping;
    state.vy = (state.vy + springForceY * dt) * this.damping;

    state.dx += state.vx * dt;
    state.dy += state.vy * dt;

    // Numerical clamp to prevent runaway oscillation
    if (Math.abs(state.dx) < 0.001 && Math.abs(state.vx) < 0.001) {
      state.dx = 0;
      state.vx = 0;
    }
    if (Math.abs(state.dy) < 0.001 && Math.abs(state.vy) < 0.001) {
      state.dy = 0;
      state.vy = 0;
    }

    return [pt[0] + state.dx, pt[1] + state.dy];
  }

  /**
   * Deforms an array of Bezier segments in real time.
   * 
   * @param {Array<Object>} segments Array of { p0, cp1, cp2, p3 }.
   * @param {number} [dt=1] Delta time.
   * @returns {Array<Object>} Deformed Bezier segments.
   */
  deformSegments(segments, dt = 1) {
    const perturbed = [];
    for (let i = 0; i < segments.length; i++) {
      const s = segments[i];
      perturbed.push({
        p0: this.displacePoint(s.p0, `seg_${i}_p0`, dt),
        cp1: this.displacePoint(s.cp1, `seg_${i}_cp1`, dt),
        cp2: this.displacePoint(s.cp2, `seg_${i}_cp2`, dt),
        p3: this.displacePoint(s.p3, `seg_${i}_p3`, dt)
      });
    }
    return perturbed;
  }

  /**
   * Resets all spring displacements to rest position.
   */
  reset() {
    this.offsets.clear();
    this.pointerX = -9999;
    this.pointerY = -9999;
    this.prevPointerX = -9999;
    this.prevPointerY = -9999;
  }
}

// ============================================================================
// 4. STROKE DASH & SCROLL-DRIVEN ANIMATIONS
// ============================================================================

/**
 * Calculates exact stroke-dashoffset for scroll-linked path drawing.
 * 
 * @param {number} totalLength Total path arc length.
 * @param {number} progress Global scroll progress [0, 1].
 * @param {Object} [config={}] Animation parameters.
 * @param {number} [config.startProgress=0.0] Scroll point where drawing starts.
 * @param {number} [config.endProgress=1.0] Scroll point where drawing finishes.
 * @param {boolean} [config.reverse=false] Invert drawing direction.
 * @returns {{ dasharray: string, dashoffset: number, visibleRatio: number }}
 */
export function computeStrokeDash(totalLength, progress, config = {}) {
  const { startProgress = 0.0, endProgress = 1.0, reverse = false } = config;

  const span = Math.max(0.0001, endProgress - startProgress);
  const localProg = Math.max(0, Math.min(1, (progress - startProgress) / span));

  const visibleRatio = reverse ? (1 - localProg) : localProg;
  const dashoffset = totalLength * (1 - visibleRatio);

  return {
    dasharray: `${totalLength.toFixed(2)} ${totalLength.toFixed(2)}`,
    dashoffset: parseFloat(dashoffset.toFixed(2)),
    visibleRatio
  };
}

/**
 * Computes traveling stardust / glowing light bead coordinates along the curve.
 * 
 * @param {Array<Object>} segments Bezier segments of the path.
 * @param {number} progress Travel progress [0, 1].
 * @param {number} [stardustCount=5] Number of trailing stardust particles.
 * @returns {Array<{ x: number, y: number, opacity: number, scale: number }>}
 */
export function computeTravelingStardust(segments, progress, stardustCount = 5) {
  if (!segments || segments.length === 0) return [];

  // Compute lengths
  const lengths = segments.map(s => computeSegmentLength(s.p0, s.cp1, s.cp2, s.p3));
  const totalLen = lengths.reduce((acc, l) => acc + l, 0);

  const particles = [];
  const spacing = 18; // px trailing distance

  for (let i = 0; i < stardustCount; i++) {
    const trailDist = i * spacing;
    const currentDist = (progress * totalLen - trailDist + totalLen * 10) % totalLen;
    const normalizedS = currentDist / totalLen;

    let accum = 0;
    let segIdx = 0;
    let localDist = 0;

    for (let j = 0; j < segments.length; j++) {
      if (accum + lengths[j] >= currentDist || j === segments.length - 1) {
        segIdx = j;
        localDist = currentDist - accum;
        break;
      }
      accum += lengths[j];
    }

    const seg = segments[segIdx];
    const u = lengths[segIdx] > 0 ? Math.max(0, Math.min(1, localDist / lengths[segIdx])) : 0;
    const pt = evaluateCubicBezier(seg.p0, seg.cp1, seg.cp2, seg.p3, u);

    const falloff = Math.pow(1 - i / stardustCount, 1.8);
    particles.push({
      x: parseFloat(pt[0].toFixed(2)),
      y: parseFloat(pt[1].toFixed(2)),
      opacity: parseFloat((falloff * 0.95).toFixed(3)),
      scale: parseFloat((falloff * 1.2 + 0.3).toFixed(3)),
      index: i
    });
  }

  return particles;
}

// ============================================================================
// 5. GENERATIVE LUXURY SVG DEFS & FILTERS
// ============================================================================

/**
 * Generates the master SVG `<defs>` block containing romantic glowing filters,
 * organic turbulence displacement filters, and luxury editorial gradients.
 * 
 * @param {Object} [options={}] Customization options.
 * @param {string} [options.prefix='amo-'] Prefix for XML IDs to avoid collisions.
 * @returns {string} Raw SVG XML string for insertion into `<svg><defs>...</defs></svg>`.
 */
export function createLuxurySvgDefs(options = {}) {
  const prefix = options.prefix || 'amo-';

  return `
  <!-- Luxury Romantic Purple Glow Filter -->
  <filter id="${prefix}romantic-glow" x="-40%" y="-40%" width="180%" height="180%" filterUnits="userSpaceOnUse">
    <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur-sm" />
    <feGaussianBlur in="SourceGraphic" stdDeviation="6.0" result="blur-md" />
    <feGaussianBlur in="SourceGraphic" stdDeviation="12.0" result="blur-lg" />
    <feColorMatrix in="blur-lg" type="matrix" values="
      0.55 0.0 0.0 0.0 0.45
      0.0 0.12 0.0 0.0 0.10
      0.0 0.0 0.95 0.0 0.85
      0.0 0.0 0.0 0.6 0.0" result="colored-aura" />
    <feMerge>
      <feMergeNode in="colored-aura" />
      <feMergeNode in="blur-md" />
      <feMergeNode in="blur-sm" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>

  <!-- Living Organic Breathing Shimmer Filter -->
  <filter id="${prefix}organic-breathing" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" seed="42">
      <animate attributeName="baseFrequency" dur="12s" values="0.012;0.022;0.012" repeatCount="indefinite" />
    </feTurbulence>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="4.5" xChannelSelector="R" yChannelSelector="G" result="displaced" />
  </filter>

  <!-- Luxury Pure Purple Gradients -->
  <!-- 1. Pure Royal Purple Master Gradient -->
  <linearGradient id="${prefix}grad-purple-pure" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#4C1D95" stop-opacity="1.0" />
    <stop offset="35%" stop-color="#6D28D9" stop-opacity="1.0" />
    <stop offset="70%" stop-color="#7C3AED" stop-opacity="1.0" />
    <stop offset="100%" stop-color="#8B5CF6" stop-opacity="1.0" />
  </linearGradient>

  <!-- 2. Royal Purple Deep to Light -->
  <linearGradient id="${prefix}grad-purple-gold" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#581C87" stop-opacity="1.0" />
    <stop offset="35%" stop-color="#6B21A8" stop-opacity="1.0" />
    <stop offset="70%" stop-color="#7E22CE" stop-opacity="1.0" />
    <stop offset="100%" stop-color="#9333EA" stop-opacity="1.0" />
  </linearGradient>
  
  <!-- 3. Royal Purple Tone -->
  <linearGradient id="${prefix}grad-royal-purple" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#3B0764" stop-opacity="1.0" />
    <stop offset="50%" stop-color="#6B21A8" stop-opacity="1.0" />
    <stop offset="100%" stop-color="#9333EA" stop-opacity="1.0" />
  </linearGradient>
  `;
}
