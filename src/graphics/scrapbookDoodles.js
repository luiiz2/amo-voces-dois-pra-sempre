/**
 * ============================================================================
 * SCRAPBOOK DOODLES & VECTOR ELEMENTS — EXACT 1:1 REPLICA OF REFERENCE
 * Pure vector SVG geometry for binder clip, stamps, coffee rings, dried flower,
 * polaroid heart stickers, looping ink flourishes, infinity loop, and doodles.
 * ============================================================================
 */

/**
 * Realistic Golden / Bronze Foldback Binder Clip
 */
export function getBinderClipSvg() {
  return `
    <svg viewBox="0 0 50 64" width="46" height="58" class="binder-clip-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="clipBodyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#8C6D37" />
          <stop offset="35%" stop-color="#D4AF37" />
          <stop offset="70%" stop-color="#AA8232" />
          <stop offset="100%" stop-color="#5C451D" />
        </linearGradient>
        <linearGradient id="wireGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#6E5528" />
          <stop offset="50%" stop-color="#E8C96C" />
          <stop offset="100%" stop-color="#7A5E2A" />
        </linearGradient>
        <filter id="clipShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="3" stdDeviation="2" flood-color="rgba(0,0,0,0.35)" />
        </filter>
      </defs>

      <!-- Upper wire arms loop (silver/brass wire) -->
      <path d="M 18,30 L 18,16 C 18,8 21,4 25,4 C 29,4 32,8 32,16 L 32,30" 
            stroke="url(#wireGrad)" stroke-width="2.6" stroke-linecap="round" fill="none" />
      
      <!-- Inner wire loop connection -->
      <path d="M 21,30 L 21,18 C 21,12 23,9 25,9 C 27,9 29,12 29,18 L 29,30" 
            stroke="url(#wireGrad)" stroke-width="1.8" stroke-linecap="round" fill="none" />

      <!-- Main triangular foldback base clamp -->
      <polygon points="6,30 44,30 40,48 10,48" fill="url(#clipBodyGrad)" filter="url(#clipShadow)" />
      
      <!-- Clamp metallic bevel ridge -->
      <rect x="9" y="30" width="32" height="3" fill="#FFE599" opacity="0.6" />
      <line x1="8" y1="48" x2="42" y2="48" stroke="#4A3716" stroke-width="1.5" />
    </svg>
  `;
}

/**
 * Stamp label: ♥ PARA SEMPRE ♥
 */
export function getParaSempreStampSvg() {
  return `
    <div class="stamp-para-sempre">
      <div class="stamp-para-sempre-inner">
        <span class="stamp-heart">♥</span>
        <span class="stamp-text">PARA SEMPRE</span>
        <span class="stamp-heart">♥</span>
      </div>
    </div>
  `;
}

/**
 * Realistic Dual-Ring Coffee Stain
 */
export function getCoffeeRingSvg(size = 110) {
  return `
    <svg viewBox="0 0 100 100" width="${size}" height="${size}" class="coffee-ring-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Main outer ring -->
      <circle cx="50" cy="50" r="40" stroke="#C5A47E" stroke-width="5" stroke-dasharray="14 3 20 4 8 2" opacity="0.45" filter="blur(0.8px)" />
      <circle cx="50" cy="50" r="40" stroke="#A98256" stroke-width="2.2" stroke-dasharray="25 6 15 4" opacity="0.55" />
      
      <!-- Soft inner bleed ring -->
      <circle cx="50" cy="50" r="37" stroke="#D8BD9E" stroke-width="3" opacity="0.25" />
      
      <!-- Subtle splatter marks -->
      <circle cx="92" cy="42" r="1.5" fill="#A98256" opacity="0.4" />
      <circle cx="8" cy="62" r="1.2" fill="#A98256" opacity="0.35" />
    </svg>
  `;
}

/**
 * Delicate Pressed Botanical Dried Flower (Gypsophila / Baby's Breath)
 */
export function getDriedFlowerSvg() {
  return `
    <svg viewBox="0 0 120 140" width="110" height="130" class="dried-flower-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Main Woody Branch / Stems -->
      <path d="M 60,135 Q 56,95 48,65 Q 42,42 35,20" stroke="#8C6E4A" stroke-width="2.2" stroke-linecap="round" />
      <path d="M 52,80 Q 65,58 75,35 Q 82,18 88,8" stroke="#9A7B54" stroke-width="1.8" stroke-linecap="round" />
      <path d="M 45,55 Q 30,40 22,25" stroke="#9A7B54" stroke-width="1.4" stroke-linecap="round" />
      <path d="M 62,52 Q 78,38 95,28" stroke="#9A7B54" stroke-width="1.4" stroke-linecap="round" />
      <path d="M 72,40 Q 64,26 58,15" stroke="#9A7B54" stroke-width="1.2" stroke-linecap="round" />
      <path d="M 38,32 Q 46,20 50,10" stroke="#9A7B54" stroke-width="1.2" stroke-linecap="round" />

      <!-- Dried White Fluffy Flower Buds -->
      <circle cx="34" cy="18" r="4.5" fill="#FAF5E8" stroke="#8C6E4A" stroke-width="0.8" />
      <circle cx="21" cy="24" r="3.8" fill="#F7F1DE" stroke="#8C6E4A" stroke-width="0.8" />
      <circle cx="89" cy="8" r="4.2" fill="#FAF5E8" stroke="#8C6E4A" stroke-width="0.8" />
      <circle cx="96" cy="27" r="3.5" fill="#FAF5E8" stroke="#8C6E4A" stroke-width="0.8" />
      <circle cx="58" cy="14" r="4.0" fill="#F7F1DE" stroke="#8C6E4A" stroke-width="0.8" />
      <circle cx="50" cy="9" r="3.6" fill="#FAF5E8" stroke="#8C6E4A" stroke-width="0.8" />
      <circle cx="75" cy="34" r="4.2" fill="#FAF5E8" stroke="#8C6E4A" stroke-width="0.8" />
      <circle cx="48" cy="62" r="3.2" fill="#F7F1DE" stroke="#8C6E4A" stroke-width="0.8" />
      <circle cx="65" cy="48" r="3.6" fill="#FAF5E8" stroke="#8C6E4A" stroke-width="0.8" />
    </svg>
  `;
}

/**
 * Small Golden-Kraft Paper Heart Sticker for Polaroid Corner
 */
export function getGoldHeartStickerSvg(size = 22) {
  return `
    <svg viewBox="0 0 30 28" width="${size}" height="${size}" class="polaroid-gold-heart" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldHeartGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#D9BE8E" />
          <stop offset="50%" stop-color="#C2A16E" />
          <stop offset="100%" stop-color="#9C7847" />
        </linearGradient>
      </defs>
      <path d="M 15,10 C 13,4 6,3 3,9 C -1,17 10,23 15,27 C 20,23 31,17 27,9 C 24,3 17,4 15,10 Z" 
            fill="url(#goldHeartGrad)" stroke="#8C6D37" stroke-width="0.8" />
    </svg>
  `;
}

/**
 * Looping Blue Ribbon Flourish Swirl (Left & Right of Torn Paper)
 */
export function getBlueSwirlSvg(side = 'left') {
  const isLeft = side === 'left';
  const path = isLeft 
    ? 'M 40,15 C 30,5 15,10 15,25 C 15,40 38,35 32,20 C 26,5 5,18 2,32'
    : 'M 2,15 C 12,5 27,10 27,25 C 27,40 4,35 10,20 C 16,5 37,18 40,32';

  return `
    <svg viewBox="0 0 45 45" width="38" height="38" class="blue-swirl-svg blue-swirl--${side}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="${path}" stroke="#16325B" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
}

/**
 * Corner Tick Marks / Radiating Lines: \ | /
 */
export function getTickMarksSvg(side = 'left') {
  const transform = side === 'right' ? 'transform="scale(-1, 1) translate(-30, 0)"' : '';
  return `
    <svg viewBox="0 0 30 25" width="26" height="22" class="tick-marks-svg tick-marks--${side}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g ${transform}>
        <line x1="6" y1="18" x2="16" y2="12" stroke="#16325B" stroke-width="2.2" stroke-linecap="round" />
        <line x1="12" y1="8" x2="22" y2="6" stroke="#16325B" stroke-width="2.2" stroke-linecap="round" />
        <line x1="8" y1="22" x2="14" y2="24" stroke="#16325B" stroke-width="2.2" stroke-linecap="round" />
      </g>
    </svg>
  `;
}

/**
 * Hand-drawn Coral / Pink Heart Doodle
 */
export function getCoralHeartSvg(size = 32, rotate = 0) {
  return `
    <svg viewBox="0 0 40 38" width="${size}" height="${size}" style="transform: rotate(${rotate}deg);" class="coral-heart-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 20,13 C 18,6 9,5 5,13 C 1,22 13,30 20,35 C 27,30 39,22 35,13 C 31,5 22,6 20,13 Z" 
            stroke="#E57373" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
}

/**
 * Golden 4-Point Sparkle Star: ✦
 */
export function getSparkleStarSvg(size = 24) {
  return `
    <svg viewBox="0 0 32 32" width="${size}" height="${size}" class="sparkle-star-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 16,3 Q 16,16 29,16 Q 16,16 16,29 Q 16,16 3,16 Q 16,16 16,3 Z" 
            fill="#E6A817" stroke="#C88E0E" stroke-width="1.2" stroke-linejoin="round" />
    </svg>
  `;
}
