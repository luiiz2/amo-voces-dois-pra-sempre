/**
 * ============================================================================
 * AMO VOCÊS DOIS PRA SEMPRE — HIGH-PERFORMANCE APPLICATION ENGINE
 * Ultra-Smooth 60fps GPU Compositing | Pure White Square Frames (1:1 Ratio)
 * Pure Royal Purple & Violet Typography & SVG Motif | Zero UI Clutter
 * ============================================================================
 * 
 * Guarantees:
 * 1. ZERO UI buttons or floating controls (100% immersive, pure aesthetic).
 * 2. ONLY allowed visible text: 'AMO VOCÊS DOIS PRA SEMPRE' straight in one line.
 * 3. 100vw x 100svh Zero-Scroll Containment (GPU Compositor 60fps).
 * 4. Act V: Background Photo Mosaic ONLY (Zero Foreground Overlay Frames).
 * 5. Hardware-accelerated SVG Heart-to-Infinity Bezier Morphing.
 * 6. Smooth interactive in-canvas photo focus on tap/click.
 */

import gsap from 'gsap';
import losHermanosMp3 from '../Los Hermanos - Sentimental (Karaokê) [Ga2Ja4O6k7c].mp3';
import {
  getAllPhotos,
  getPhotoById,
  getObjectPositionStyle
} from './data/photos.js';

import {
  getMorphSegments,
  segmentsToSvgPath,
  createLuxurySvgDefs
} from './graphics/index.js';

import {
  EASINGS,
  getLayoutProfile
} from './motion/motionDirector.js';

// ============================================================================
// 1. LOS HERMANOS BACKGROUND AUDIO ENGINE (LOW VOLUME ACOUSTIC AMBIENCE)
// ============================================================================

class BackgroundMusic {
  constructor(src) {
    this.src = src;
    this.audio = new Audio(src);
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.volume = 0.0001; // Start soft
    this.targetVolume = 0.16; // "bem baixo tocando" (16% volume)
    this.isPlaying = false;
    this.isFading = false;
  }

  play() {
    if (this.isPlaying) return;
    const p = this.audio.play();
    if (p !== undefined) {
      p.then(() => {
        this.isPlaying = true;
        this.fadeIn(3.0);
      }).catch(() => {
        // Will auto-resume on first user pointer/touch/key interaction
      });
    }
  }

  fadeIn(durationSec = 3.0) {
    if (this.isFading) return;
    this.isFading = true;
    const startTime = performance.now();
    const startVol = this.audio.volume;
    const target = this.targetVolume;

    const step = (now) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1.0, elapsed / durationSec);
      this.audio.volume = Math.min(target, startVol + (target - startVol) * progress);
      if (progress < 1.0) {
        requestAnimationFrame(step);
      } else {
        this.isFading = false;
      }
    };
    requestAnimationFrame(step);
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  resume() {
    if (!this.isPlaying) {
      this.play();
    }
  }

  destroy() {
    this.audio.pause();
    this.audio.src = '';
  }
}

// ============================================================================
// 2. MAIN HIGH-PERFORMANCE APPLICATION
// ============================================================================

export class App {
  constructor(rootContainer) {
    this.root = rootContainer || document.getElementById('app');
    this.bgMusic = new BackgroundMusic(losHermanosMp3);

    this.isPlaying = true;
    this.masterTimeline = null;
    this.rafId = null;
    this.morphProgress = 0.0;
    this.isApotheosisSettled = false;

    // Interactive Photo Focus state
    this.isFocused = false;
    this.focusedPhotoId = null;
    this.activeSourceCard = null;

    // Smooth Desktop Parallax
    this.targetTiltX = 0;
    this.targetTiltY = 0;
    this.currentTiltX = 0;
    this.currentTiltY = 0;

    this.lastWidth = window.innerWidth;
    this.lastHeight = window.innerHeight;
    this.svgWidth = 1920;
    this.svgHeight = 1080;

    this.init();
  }

  init() {
    this.renderDOM();
    this.updateSvgDimensions();
    this.initEventListeners();
    this.buildPhotosDOM();
    this.buildMasterTimeline();
    this.startAnimationLoop();
    this.bgMusic.play();
  }

  updateSvgDimensions() {
    const w = window.innerWidth || 1920;
    const h = window.innerHeight || 1080;
    this.svgWidth = 1920;
    this.svgHeight = Math.max(600, Math.round((1920 * h) / Math.max(1, w)));
    if (this.masterSvgEl) {
      this.masterSvgEl.setAttribute('viewBox', `0 0 ${this.svgWidth} ${this.svgHeight}`);
    }
  }

  // --------------------------------------------------------------------------
  // DOM RENDERING (ZERO BUTTONS / ZERO CLUTTER)
  // --------------------------------------------------------------------------
  renderDOM() {
    const luxuryDefs = createLuxurySvgDefs({ prefix: 'amo-' });

    this.root.innerHTML = `
      <div class="editorial-viewport" id="viewport">
        <!-- Celestial Soft Light Halo radiating from Heart/Infinity -->
        <div class="heart-celestial-halo" id="celestialHalo"></div>

        <!-- Master SVG Vector Engine Layer (SOLE HEART & INFINITY MOTIF) -->
        <svg class="continuous-svg-layer" id="masterSvg" viewBox="0 0 1920 1080" preserveAspectRatio="none">
          <defs>${luxuryDefs}</defs>
          <path id="morphPath" d="" fill="none" stroke="url(#amo-grad-purple-pure)" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Dynamic Photo Stage Layer (Lateral Left & Right Wings) -->
        <div class="photo-stage-layer" id="photoStage"></div>

        <!-- Pure Straight Horizontal Phrase in Center (Pure Royal Purple & Violet) -->
        <div class="editorial-typography-stage" id="typographyStage">
          <div class="straight-phrase-container" id="straightPhraseContainer" style="opacity: 0; transform: translate(-50%, -50%) scale(0.96);">
            <h1 class="phrase-straight-line" id="phraseStraightLine">
              <span class="straight-word word--amo is-active" id="wordAmo">AMO</span>
              <span class="straight-word word--voces is-passive" id="wordVoces">VOCÊS</span>
              <span class="straight-word word--dois is-passive" id="wordDois">DOIS</span>
              <span class="straight-word word--pra is-passive" id="wordPra">PRA</span>
              <span class="straight-word word--sempre is-passive" id="wordSempre">SEMPRE</span>
            </h1>
            <div class="straight-flourish-line" id="phraseFlourish"></div>
          </div>
        </div>

        <!-- In-Canvas Interactive Photo Focus Layer -->
        <div class="photo-focus-layer" id="photoFocusLayer" style="display: none; opacity: 0;">
          <div class="focus-ambient-spotlight" id="focusSpotlight"></div>
          <div class="focused-card-holder" id="focusedCardHolder"></div>
        </div>
      </div>
    `;

    this.masterSvgEl = document.getElementById('masterSvg');
    this.photoStageEl = document.getElementById('photoStage');
    this.straightPhraseContainerEl = document.getElementById('straightPhraseContainer');
    this.phraseStraightLineEl = document.getElementById('phraseStraightLine');
    this.wordAmoEl = document.getElementById('wordAmo');
    this.wordVocesEl = document.getElementById('wordVoces');
    this.wordDoisEl = document.getElementById('wordDois');
    this.wordPraEl = document.getElementById('wordPra');
    this.wordSempreEl = document.getElementById('wordSempre');
    this.phraseFlourishEl = document.getElementById('phraseFlourish');
    this.morphPathEl = document.getElementById('morphPath');
    this.photoFocusLayerEl = document.getElementById('photoFocusLayer');
    this.focusSpotlightEl = document.getElementById('focusSpotlight');
    this.focusedCardHolderEl = document.getElementById('focusedCardHolder');
  }

  // --------------------------------------------------------------------------
  // EVENT LISTENERS (POINTER TILT & INTUITIVE TOUCH/CLICK)
  // --------------------------------------------------------------------------
  initEventListeners() {
    let ticking = false;

    // Smooth auto-play Los Hermanos on first user interaction
    const unlockAudio = () => {
      this.bgMusic.play();
    };
    window.addEventListener('pointerdown', unlockAudio, { once: true, passive: true });
    window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
    window.addEventListener('keydown', unlockAudio, { once: true, passive: true });

    const handlePointer = (clientX, clientY) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = this.root.getBoundingClientRect();
        if (!this.isFocused) {
          const normX = ((clientX - rect.left) / rect.width - 0.5) * 2;
          const normY = ((clientY - rect.top) / rect.height - 0.5) * 2;
          this.targetTiltX = Math.max(-1, Math.min(1, normX));
          this.targetTiltY = Math.max(-1, Math.min(1, normY));
        }
        ticking = false;
      });
    };

    window.addEventListener('pointermove', (e) => {
      handlePointer(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 0) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    const handlePointerLeave = () => {
      this.targetTiltX = 0;
      this.targetTiltY = 0;
    };

    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('touchend', handlePointerLeave, { passive: true });

    // Photo focus clicks on any photo card
    this.photoStageEl.addEventListener('click', (e) => {
      const card = e.target.closest('.editorial-photo-card');
      if (card) {
        const photoId = card.dataset.photoId;
        this.openPhotoFocus(photoId, card);
      }
    });

    // Close photo focus
    this.photoFocusLayerEl.addEventListener('click', () => {
      this.closePhotoFocus();
    });

    // Canvas click resumes audio
    this.root.addEventListener('click', (e) => {
      if (e.target.closest('.editorial-photo-card') || e.target.closest('.photo-focus-layer')) return;
      this.bgMusic.resume();
    });

    // Keyboard accessibility
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePlayPause();
      } else if (e.key === 'Escape' && this.isFocused) {
        this.closePhotoFocus();
      }
    });

    // Resize recalculation
    window.addEventListener('resize', () => {
      if (Math.abs(window.innerWidth - this.lastWidth) > 50 || Math.abs(window.innerHeight - this.lastHeight) > 50) {
        this.lastWidth = window.innerWidth;
        this.lastHeight = window.innerHeight;
        this.rebuildDynamicLayout();
      }
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE PHOTO FOCUS
  // --------------------------------------------------------------------------
  openPhotoFocus(photoId, sourceCardElement) {
    if (this.isFocused || !photoId) return;

    const photo = getPhotoById(photoId);
    if (!photo) return;

    this.isFocused = true;
    this.focusedPhotoId = photoId;
    this.activeSourceCard = sourceCardElement;
    this.targetTiltX = 0;
    this.targetTiltY = 0;

    if (this.activeSourceCard) {
      gsap.to(this.activeSourceCard, { opacity: 0.2, duration: 0.3 });
    }

    const device = getLayoutProfile(window.innerWidth);
    const objPos = getObjectPositionStyle(photo.id, device);
    this.focusedCardHolderEl.innerHTML = `
      <div class="editorial-photo-card focused-photo-card" id="focusedCard">
        <div class="editorial-photo-inner">
          <img class="editorial-photo-img" src="${photo.src}" alt="AMO VOCÊS DOIS PRA SEMPRE" draggable="false" style="object-position: ${objPos};" />
        </div>
      </div>
    `;

    this.photoFocusLayerEl.style.display = 'flex';

    gsap.fromTo(this.photoFocusLayerEl, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    const focusedCard = document.getElementById('focusedCard');
    if (focusedCard) {
      gsap.fromTo(focusedCard, {
        scale: 0.85,
        opacity: 0.5
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: EASINGS.cinematicSlow
      });
    }
  }

  closePhotoFocus() {
    if (!this.isFocused) return;
    this.isFocused = false;

    gsap.to(this.photoFocusLayerEl, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        this.photoFocusLayerEl.style.display = 'none';
        this.focusedCardHolderEl.innerHTML = '';
      }
    });

    if (this.activeSourceCard) {
      gsap.to(this.activeSourceCard, { opacity: 1, duration: 0.3 });
      this.activeSourceCard = null;
    }

    this.focusedPhotoId = null;
  }

  // --------------------------------------------------------------------------
  // MASTER TIMELINE CHOREOGRAPHY (5 ACTS + REPEATING HARMONIC VOYAGE)
  // --------------------------------------------------------------------------
  buildMasterTimeline() {
    if (this.masterTimeline) {
      this.masterTimeline.kill();
    }

    this.masterTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 2.0
    });

    // ------------------------------------------------------------------------
    // ACT I (0.0s - 12.0s): AWAKENING — "AMO"
    // ------------------------------------------------------------------------
    this.masterTimeline.set('.act-layer', { opacity: 0, pointerEvents: 'none' }, 0);
    this.masterTimeline.set('#act1-layer', { opacity: 1, pointerEvents: 'auto' }, 0);

    // Reveal Straight Phrase in Center
    this.masterTimeline.to(this.straightPhraseContainerEl, {
      opacity: 1,
      scale: 1,
      duration: 2.2,
      ease: EASINGS.cinematicSlow
    }, 0.2);

    // "AMO" Highlight
    this.masterTimeline.to(this.wordAmoEl, {
      opacity: 1,
      scale: 1.06,
      duration: 2.0,
      ease: EASINGS.cinematicSlow
    }, 0.4);

    this.masterTimeline.to([this.wordVocesEl, this.wordDoisEl, this.wordPraEl, this.wordSempreEl], {
      opacity: 0.82,
      scale: 1.0,
      duration: 2.0,
      ease: EASINGS.cinematicSlow
    }, 0.4);

    // Photos Reveal
    this.masterTimeline.to('#p01-card', {
      opacity: 1,
      scale: 1,
      duration: 2.8,
      ease: EASINGS.cinematicSlow
    }, 0.5);

    this.masterTimeline.to('#p02-card-act1', {
      opacity: 0.92,
      scale: 1,
      duration: 2.8,
      ease: EASINGS.softOut
    }, 2.0);

    // Morph Heart
    this.masterTimeline.to(this, {
      morphProgress: 0.1,
      duration: 11.0,
      ease: 'sine.inOut'
    }, 0.0);

    // Photos Fade
    this.masterTimeline.to(['#p01-card', '#p02-card-act1'], {
      opacity: 0,
      scale: 1.03,
      duration: 1.8,
      ease: 'power2.inOut'
    }, 10.5);

    // ------------------------------------------------------------------------
    // ACT II (12.0s - 24.0s): TENDERNESS — "VOCÊS DOIS"
    // ------------------------------------------------------------------------
    this.masterTimeline.set('#act2-layer', { opacity: 1, pointerEvents: 'auto' }, 11.8);

    this.masterTimeline.to([this.wordVocesEl, this.wordDoisEl], {
      opacity: 1,
      scale: 1.06,
      duration: 2.2,
      ease: EASINGS.cinematicSlow
    }, 12.2);

    this.masterTimeline.to([this.wordAmoEl, this.wordPraEl, this.wordSempreEl], {
      opacity: 0.82,
      scale: 1.0,
      duration: 2.0,
      ease: EASINGS.softOut
    }, 12.2);

    this.masterTimeline.to('#p03-card', {
      opacity: 1,
      scale: 1,
      rotate: -1.5,
      duration: 2.6,
      ease: EASINGS.cinematicSlow
    }, 12.2);

    this.masterTimeline.to('#p04-card', {
      opacity: 1,
      scale: 1,
      rotate: 1.5,
      duration: 2.8,
      ease: EASINGS.cinematicSlow
    }, 12.8);

    this.masterTimeline.to(this, {
      morphProgress: 0.35,
      duration: 11.5,
      ease: 'sine.inOut'
    }, 12.0);

    this.masterTimeline.to(['#p03-card', '#p04-card'], {
      opacity: 0,
      scale: 0.97,
      duration: 1.8,
      ease: 'power2.inOut'
    }, 22.2);

    // ------------------------------------------------------------------------
    // ACT III (24.0s - 36.0s): JOY — "AMO VOCÊS DOIS"
    // ------------------------------------------------------------------------
    this.masterTimeline.set('#act3-layer', { opacity: 1, pointerEvents: 'auto' }, 23.8);

    this.masterTimeline.to([this.wordAmoEl, this.wordVocesEl, this.wordDoisEl], {
      opacity: 1,
      scale: 1.05,
      duration: 2.2,
      ease: EASINGS.cinematicSlow
    }, 24.2);

    this.masterTimeline.to([this.wordPraEl, this.wordSempreEl], {
      opacity: 0.82,
      scale: 1.0,
      duration: 2.0,
      ease: EASINGS.softOut
    }, 24.2);

    this.masterTimeline.to('#p05-card', {
      opacity: 1,
      scale: 1,
      rotate: -2.0,
      duration: 2.4,
      ease: EASINGS.cinematicSlow
    }, 24.2);

    this.masterTimeline.to('#p06-card', {
      opacity: 1,
      scale: 1,
      duration: 2.6,
      ease: EASINGS.cinematicSlow
    }, 24.8);

    this.masterTimeline.to('#p07-card', {
      opacity: 1,
      scale: 1,
      rotate: 2.0,
      duration: 2.8,
      ease: EASINGS.cinematicSlow
    }, 25.4);

    this.masterTimeline.to(this, {
      morphProgress: 0.65,
      duration: 11.5,
      ease: 'sine.inOut'
    }, 24.0);

    this.masterTimeline.to(['#p05-card', '#p06-card', '#p07-card'], {
      opacity: 0,
      scale: 1.03,
      duration: 1.8,
      ease: 'power2.inOut'
    }, 34.2);

    // ------------------------------------------------------------------------
    // ACT IV (36.0s - 48.0s): DEVOTION — "PRA SEMPRE"
    // ------------------------------------------------------------------------
    this.masterTimeline.set('#act4-layer', { opacity: 1, pointerEvents: 'auto' }, 35.8);

    this.masterTimeline.to([this.wordPraEl, this.wordSempreEl], {
      opacity: 1,
      scale: 1.06,
      duration: 2.4,
      ease: EASINGS.cinematicSlow
    }, 36.2);

    this.masterTimeline.to([this.wordAmoEl, this.wordVocesEl, this.wordDoisEl], {
      opacity: 0.82,
      scale: 1.0,
      duration: 2.0,
      ease: EASINGS.softOut
    }, 36.2);

    this.masterTimeline.to('#p09-card', {
      opacity: 1,
      scale: 1,
      duration: 2.8,
      ease: EASINGS.cinematicSlow
    }, 36.2);

    this.masterTimeline.to('#p08-card', {
      opacity: 0.88,
      scale: 1,
      duration: 2.6,
      ease: EASINGS.softOut
    }, 36.8);

    this.masterTimeline.to('#p10-card', {
      opacity: 0.92,
      scale: 1,
      duration: 2.6,
      ease: EASINGS.softOut
    }, 37.4);

    this.masterTimeline.to(this, {
      morphProgress: 0.9,
      duration: 11.5,
      ease: 'sine.inOut'
    }, 36.0);

    this.masterTimeline.to(['#p08-card', '#p09-card', '#p10-card'], {
      opacity: 0,
      scale: 1.03,
      duration: 1.8,
      ease: 'power2.inOut'
    }, 46.2);

    // ------------------------------------------------------------------------
    // ACT V (48.0s - 65.0s): APOTHEOSIS & ETERNAL BOND
    // Background Mosaic ONLY + Full Phrase
    // ------------------------------------------------------------------------
    this.masterTimeline.set('#act5-layer', { opacity: 1, pointerEvents: 'auto' }, 47.8);

    this.masterTimeline.to([this.wordAmoEl, this.wordVocesEl, this.wordDoisEl, this.wordPraEl, this.wordSempreEl], {
      opacity: 1,
      scale: 1.04,
      duration: 2.8,
      ease: EASINGS.cinematicSlow
    }, 48.2);

    this.masterTimeline.to(this.phraseFlourishEl, {
      width: '240px',
      opacity: 1,
      duration: 2.2,
      ease: EASINGS.softOut
    }, 49.0);

    this.masterTimeline.to('.mosaic-tile', {
      opacity: 0.45,
      scale: 1,
      stagger: 0.05,
      duration: 2.0,
      ease: EASINGS.softOut
    }, 48.2);

    this.masterTimeline.to(this, {
      morphProgress: 1.0,
      duration: 4.5,
      ease: 'sine.out'
    }, 48.0);

    // Hold final majestic moment before subtle repeat
    this.masterTimeline.to('#act5-layer', {
      opacity: 0,
      duration: 2.0,
      ease: 'power2.inOut'
    }, 63.0);
  }

  // --------------------------------------------------------------------------
  // PHOTO STAGE DOM BUILDER
  // --------------------------------------------------------------------------
  buildPhotosDOM() {
    const photos = getAllPhotos();
    const device = getLayoutProfile(window.innerWidth);
    const photoMap = new Map();
    photos.forEach(p => photoMap.set(p.id, p));
    photoMap.set('p01', photoMap.get('photo-01'));
    photoMap.set('p02', photoMap.get('photo-02'));
    photoMap.set('p03', photoMap.get('photo-03'));
    photoMap.set('p04', photoMap.get('photo-04'));
    photoMap.set('p05', photoMap.get('photo-05'));
    photoMap.set('p06', photoMap.get('photo-06'));
    photoMap.set('p07', photoMap.get('photo-07'));
    photoMap.set('p08', photoMap.get('photo-08'));
    photoMap.set('p09', photoMap.get('photo-09'));
    photoMap.set('p10', photoMap.get('photo-10'));
    photoMap.set('p11', photoMap.get('photo-11'));
    photoMap.set('p12', photoMap.get('photo-12'));
    photoMap.set('p13', photoMap.get('photo-13'));

    const createCardHtml = (id, cardId, customClass = '') => {
      const p = photoMap.get(id);
      if (!p) return '';
      const objPos = getObjectPositionStyle(p.id, device);
      return `
        <div class="editorial-photo-card ${customClass}" id="${cardId}" data-photo-id="${p.id}" style="opacity: 0; transform: scale(0.96);">
          <div class="editorial-photo-inner">
            <img class="editorial-photo-img" src="${p.src}" alt="AMO VOCÊS DOIS PRA SEMPRE" draggable="false" loading="eager" style="object-position: ${objPos};" />
          </div>
        </div>
      `;
    };

    let stageHtml = `
      <!-- ACT I LAYER -->
      <div class="act-layer layout-act-1" id="act1-layer">
        ${createCardHtml('photo-01', 'p01-card', 'photo-hero-solo')}
        ${createCardHtml('photo-02', 'p02-card-act1', 'photo-hero-secondary')}
      </div>

      <!-- ACT II LAYER -->
      <div class="act-layer layout-act-2" id="act2-layer">
        ${createCardHtml('photo-03', 'p03-card', 'photo-diptych-left')}
        ${createCardHtml('photo-04', 'p04-card', 'photo-diptych-right')}
      </div>

      <!-- ACT III LAYER -->
      <div class="act-layer layout-act-3" id="act3-layer">
        ${createCardHtml('photo-05', 'p05-card', 'photo-triptych-1')}
        ${createCardHtml('photo-06', 'p06-card', 'photo-triptych-2')}
        ${createCardHtml('photo-07', 'p07-card', 'photo-triptych-3')}
      </div>

      <!-- ACT IV LAYER -->
      <div class="act-layer layout-act-4" id="act4-layer">
        ${createCardHtml('photo-08', 'p08-card', 'photo-echo-left')}
        ${createCardHtml('photo-09', 'p09-card', 'photo-monolith-center')}
        ${createCardHtml('photo-10', 'p10-card', 'photo-echo-right')}
      </div>

      <!-- ACT V LAYER (APOTHEOSIS — BACKGROUND MOSAIC ONLY) -->
      <div class="act-layer layout-act-5" id="act5-layer">
        <div class="mosaic-grid-stage">
          ${photos.map((p, idx) => `
            <div class="editorial-photo-card mosaic-tile" id="mosaic-${idx}" data-photo-id="${p.id}" style="opacity: 0; transform: scale(0.94);">
              <div class="editorial-photo-inner">
                <img class="editorial-photo-img" src="${p.src}" alt="AMO VOCÊS DOIS PRA SEMPRE" draggable="false" loading="eager" style="object-position: ${getObjectPositionStyle(p.id, device)};" />
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.photoStageEl.innerHTML = stageHtml;
  }

  // --------------------------------------------------------------------------
  // HIGH-PERFORMANCE 60FPS TICKER (OPTIMIZED WITH ZERO REPAINTS)
  // --------------------------------------------------------------------------
  startAnimationLoop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    let prevTime = performance.now();

    const loop = (now) => {
      const dt = Math.min(2.0, (now - prevTime) / 16.666);
      prevTime = now;

      // 1. Central Morph Update
      const sw = this.svgWidth || 1920;
      const sh = this.svgHeight || 1080;
      const cx = sw * 0.5;
      const cy = sh * 0.5;
      const isMobile = window.innerWidth <= 767;
      const isTablet = window.innerWidth > 767 && window.innerWidth < 1024;
      const morphScale = isMobile 
        ? Math.min(sw * 0.36, sh * 0.16) 
        : (isTablet ? Math.min(sw * 0.24, sh * 0.20) : Math.min(sw * 0.18, sh * 0.26));

      const morphSegments = getMorphSegments(this.morphProgress, {
        cx,
        cy,
        scale: morphScale,
        easing: 'easeInOutCubic'
      });

      if (this.morphPathEl && morphSegments.length > 0) {
        this.morphPathEl.setAttribute('d', segmentsToSvgPath(morphSegments, true));
      }

      // 2. Smooth Subtle Tilt Parallax (Without Overriding GSAP)
      this.currentTiltX += (this.targetTiltX - this.currentTiltX) * 0.06;
      this.currentTiltY += (this.targetTiltY - this.currentTiltY) * 0.06;

      if (this.straightPhraseContainerEl) {
        const typoX = (this.currentTiltX * 4.0).toFixed(1);
        const typoY = (this.currentTiltY * 3.0).toFixed(1);
        this.straightPhraseContainerEl.style.transform = `translate(calc(-50% + ${typoX}px), calc(-50% + ${typoY}px)) translateZ(0)`;
      }

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  togglePlayPause() {
    if (!this.masterTimeline) return;
    if (this.isPlaying) {
      this.masterTimeline.pause();
      this.isPlaying = false;
      this.bgMusic.pause();
    } else {
      this.masterTimeline.play();
      this.isPlaying = true;
      this.bgMusic.resume();
    }
  }

  rebuildDynamicLayout() {
    const currentTime = this.masterTimeline ? this.masterTimeline.time() : 0;
    if (this.isFocused) {
      this.closePhotoFocus();
    }
    this.updateSvgDimensions();
    this.buildPhotosDOM();
    this.buildMasterTimeline();
    if (this.masterTimeline) {
      this.masterTimeline.seek(currentTime);
    }
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.masterTimeline) {
      this.masterTimeline.kill();
      this.masterTimeline = null;
    }
    if (this.bgMusic) {
      this.bgMusic.destroy();
    }
  }
}

export default App;
