/**
 * ============================================================================
 * SCRAPBOOK DOODLES & HANDMADE GRAPHICS ENGINE
 * Pure vector SVG geometry for authentic hand-drawn doodles, arrows, stamps,
 * paper clips, pushpins, and organic ink scribbles.
 * ============================================================================
 */

/**
 * Generates an organic hand-drawn curving arrow SVG
 */
export function getArrowSvg(type = 'curve-down-right', color = '#1E2A4A', width = 120, height = 80) {
  let path = '';
  let head = '';

  if (type === 'curve-down-right') {
    path = 'M 10,15 C 35,8 75,18 95,50 C 102,62 104,70 105,74';
    head = 'M 92,60 L 106,75 L 112,58';
  } else if (type === 'curve-up-right') {
    path = 'M 12,65 C 38,70 78,55 95,28 C 100,20 102,14 104,10';
    head = 'M 90,22 L 105,9 L 110,24';
  } else if (type === 'loop-right') {
    path = 'M 10,40 C 45,15 70,10 65,35 C 60,60 30,55 50,30 C 65,12 95,20 110,35';
    head = 'M 98,25 L 112,36 L 102,48';
  } else if (type === 'swirl-down') {
    path = 'M 40,8 C 15,20 10,50 35,62 C 60,72 80,45 65,25 C 50,8 20,25 30,70 L 32,85';
    head = 'M 20,74 L 32,87 L 44,76';
  } else {
    path = 'M 10,40 Q 60,15 105,38';
    head = 'M 92,26 L 108,39 L 94,50';
  }

  return `
    <svg viewBox="0 0 ${width} ${height}" class="doodle-svg doodle-arrow doodle-arrow--${type}" width="${width}" height="${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="${path}" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="doodle-draw-path" />
      <path d="${head}" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="doodle-draw-head" />
    </svg>
  `;
}

/**
 * Generates an organic hand-drawn sketch circle / oval
 */
export function getCircleSvg(color = '#C34A36', width = 160, height = 70) {
  return `
    <svg viewBox="0 0 ${width} ${height}" class="doodle-svg doodle-circle" width="${width}" height="${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 25,35 C 22,12 80,8 125,18 C 152,24 156,48 135,58 C 105,72 40,68 18,52 C 5,40 15,22 45,15 C 85,6 140,12 152,32" 
            stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="doodle-draw-path" />
    </svg>
  `;
}

/**
 * Generates hand-drawn stars / sparkles
 */
export function getStarSvg(color = '#E9C46A', size = 36) {
  return `
    <svg viewBox="0 0 40 40" class="doodle-svg doodle-star" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 20,4 Q 20,20 36,20 Q 20,20 20,36 Q 20,20 4,20 Q 20,20 20,4 Z" 
            fill="${color}" stroke="${color}" stroke-width="1.5" stroke-linejoin="round" />
    </svg>
  `;
}

/**
 * Generates a cute hand-drawn scribble heart
 */
export function getHeartSvg(color = '#E27D60', size = 44) {
  return `
    <svg viewBox="0 0 50 48" class="doodle-svg doodle-heart" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 25,16 C 22,8 10,6 6,16 C 1,28 16,38 25,44 C 34,38 49,28 44,16 C 40,6 28,8 25,16 Z" 
            stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="doodle-draw-path" />
      <path d="M 24,18 C 22,13 15,11 11,17 C 8,24 18,31 24,37" 
            stroke="${color}" stroke-width="1.5" stroke-linecap="round" opacity="0.6" />
    </svg>
  `;
}

/**
 * Generates an organic hand-drawn wavy underline
 */
export function getUnderlineSvg(color = '#E27D60', width = 220, height = 24) {
  return `
    <svg viewBox="0 0 ${width} ${height}" class="doodle-svg doodle-underline" width="${width}" height="${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 6,12 Q 35,4 65,14 T 125,12 T 185,15 T 215,8" 
            stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="doodle-draw-path" />
    </svg>
  `;
}

/**
 * Generates realistic brass pushpin
 */
export function getPushpinSvg(color = '#D4AF37') {
  return `
    <svg viewBox="0 0 40 40" class="scrapbook-pin-svg" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="14" rx="9" ry="5" fill="#E6C260" stroke="#8C6D1F" stroke-width="1.2" />
      <circle cx="20" cy="12" r="6" fill="#FDE08B" />
      <path d="M 18,17 L 16,28 L 20,38 L 24,28 L 22,17 Z" fill="#D4AF37" stroke="#8C6D1F" stroke-width="1" />
      <circle cx="18" cy="10" r="1.8" fill="#FFFFFF" opacity="0.8" />
    </svg>
  `;
}

/**
 * Generates realistic metallic paper clip
 */
export function getPaperClipSvg() {
  return `
    <svg viewBox="0 0 30 70" class="scrapbook-paperclip-svg" width="28" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 10,24 L 10,50 C 10,58 22,58 22,50 L 22,14 C 22,6 6,6 6,14 L 6,56 C 6,66 26,66 26,56 L 26,20" 
            stroke="#8E9BAE" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M 10,24 L 10,50 C 10,58 22,58 22,50 L 22,14 C 22,6 6,6 6,14 L 6,56 C 6,66 26,66 26,56 L 26,20" 
            stroke="#B4C0D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.8" />
    </svg>
  `;
}

/**
 * Generates an authentic postal cancellation stamp
 */
export function getPostmarkSvg(text = 'AIR MAIL * 2026', city = 'SPECIAL DELIVERY') {
  return `
    <svg viewBox="0 0 160 80" class="scrapbook-postmark-svg" width="150" height="75" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Circular date stamp -->
      <circle cx="45" cy="40" r="32" stroke="#1E2A4A" stroke-width="1.8" stroke-dasharray="2 1" opacity="0.75" />
      <circle cx="45" cy="40" r="28" stroke="#1E2A4A" stroke-width="1.2" opacity="0.75" />
      <text x="45" y="32" font-family="'Courier Prime', monospace" font-size="7" font-weight="bold" fill="#1E2A4A" text-anchor="middle" letter-spacing="1" opacity="0.8">${city}</text>
      <text x="45" y="44" font-family="'Courier Prime', monospace" font-size="8" font-weight="bold" fill="#C34A36" text-anchor="middle" letter-spacing="1" opacity="0.85">${text}</text>
      <text x="45" y="54" font-family="'Courier Prime', monospace" font-size="6" fill="#1E2A4A" text-anchor="middle" opacity="0.75">★ ★ ★</text>

      <!-- Wavy cancellation lines -->
      <path d="M 85,25 Q 100,18 115,25 T 145,25 T 158,25" stroke="#1E2A4A" stroke-width="1.8" opacity="0.7" />
      <path d="M 85,35 Q 100,28 115,35 T 145,35 T 158,35" stroke="#1E2A4A" stroke-width="1.8" opacity="0.7" />
      <path d="M 85,45 Q 100,38 115,45 T 145,45 T 158,45" stroke="#1E2A4A" stroke-width="1.8" opacity="0.7" />
      <path d="M 85,55 Q 100,48 115,55 T 145,55 T 158,55" stroke="#1E2A4A" stroke-width="1.8" opacity="0.7" />
    </svg>
  `;
}

/**
 * Generates an organic coffee cup ring stain
 */
export function getCoffeeStainSvg(size = 140) {
  return `
    <svg viewBox="0 0 100 100" class="scrapbook-coffee-stain" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50,12 C 72,10 90,28 88,50 C 86,72 68,90 48,88 C 26,86 10,68 12,48 C 14,26 30,14 50,12 Z" 
            stroke="#9C6644" stroke-width="4.5" stroke-linecap="round" opacity="0.22" filter="blur(1px)" />
      <path d="M 52,14 C 70,12 86,26 85,48 C 84,68 70,86 50,85 C 30,84 14,70 15,50 C 16,30 32,16 52,14 Z" 
            stroke="#7F4F24" stroke-width="1.8" stroke-linecap="round" opacity="0.28" />
      <!-- Splatter dots -->
      <circle cx="88" cy="30" r="1.5" fill="#7F4F24" opacity="0.25" />
      <circle cx="94" cy="36" r="1.0" fill="#7F4F24" opacity="0.20" />
      <circle cx="20" cy="78" r="2.0" fill="#7F4F24" opacity="0.22" />
      <circle cx="14" cy="85" r="1.2" fill="#7F4F24" opacity="0.18" />
    </svg>
  `;
}
