/**
 * ============================================================================
 * AMO VOCÊS DOIS PRA SEMPRE — MASTER APPLICATION ENGINE
 * Single-Screen Generative Experience (100vw × 100svh Zero-Scroll Architecture)
 * Pure White Square Frames (1:1 Ratio) & Background Photo Mosaic in Act V
 * ============================================================================
 * 
 * Rules & Guarantees:
 * 1. Strict zero-scroll viewport containment (100vw x 100svh, touch-action: none).
 * 2. ONLY allowed visible text: 'AMO VOCÊS DOIS PRA SEMPRE' straight in one line.
 * 3. Zero liquid glass / pure floating typography.
 * 4. Lateral square photos (left & right wings) protecting the central channel.
 * 5. Act V Finale: ONLY background photo mosaic, NO foreground overlay frames.
 * 6. ONLY SVG motif: The Parametric Heart-to-Infinity Bezier morph path.
 * 7. 13 Curated archival family photographs with protected focal coordinates.
 * 8. Smooth 60fps GPU-accelerated GSAP camera drift & clip reveals.
 * 9. Interactive in-canvas photo focus without modals or navigation away.
 */

import gsap from 'gsap';
import {
  PHOTOS_CATALOG,
  SCENES_CATALOG,
  getAllPhotos,
  getPhotoById,
  getObjectPositionStyle,
  getFocalCoordinates,
  getSafeCropBox,
  resolvePhotoSrc
} from './data/photos.js';

import {
  getMorphSegments,
  segmentsToSvgPath,
  getMorphSvgPath,
  createLuxurySvgDefs,
  SpringDisplacementField,
  EasingFunctions
} from './graphics/index.js';

import {
  PALETTE,
  EASINGS,
  TIMELINE_ACTS,
  RESPONSIVE_LAYOUT_MATRIX,
  getCurrentAct,
  getActProgress,
  getCameraDrift,
  getLayoutProfile
} from './motion/motionDirector.js';

// ============================================================================
// 1. PURE WEB AUDIO AMBIENT SOUNDSCAPE
// ============================================================================

class AmbientSoundscape {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.isMuted = true;
    this.oscillators = [];
    this.intervalId = null;
    this.chordIndex = 0;

    // Harmonic Chord Progression: Cmaj9 -> Gmaj7 -> Fmaj7#11 -> Am9
    this.chords = [
      [130.81, 196.00, 246.94, 293.66, 392.00], // Cmaj9
      [98.00, 146.83, 196.00, 246.94, 293.66],  // Gmaj7
      [87.31, 130.81, 174.61, 246.94, 329.63],  // Fmaj7#11
      [110.00, 164.81, 220.00, 261.63, 329.63]  // Am9
    ];
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

        this.filter = this.ctx.createBiquadFilter();
        this.filter.type = 'lowpass';
        this.filter.frequency.setValueAtTime(750, this.ctx.currentTime);
        this.filter.Q.setValueAtTime(1.1, this.ctx.currentTime);

        this.delay = this.ctx.createDelay();
        this.delay.delayTime.setValueAtTime(0.32, this.ctx.currentTime);
        this.delayGain = this.ctx.createGain();
        this.delayGain.gain.setValueAtTime(0.25, this.ctx.currentTime);

        this.masterGain.connect(this.filter);
        this.filter.connect(this.ctx.destination);
        this.filter.connect(this.delay);
        this.delay.connect(this.delayGain);
        this.delayGain.connect(this.filter);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playChord(freqs, duration = 8.0) {
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 0.7, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.04 / freqs.length, now + 2.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch (e) {}
      };

      osc.start(now);
      osc.stop(now + duration + 0.1);
    });
  }

  start() {
    this.initContext();
    this.isPlaying = true;
    if (this.isMuted) return;

    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.8, this.ctx.currentTime + 2.0);
    }

    this.playChord(this.chords[0]);
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.intervalId = setInterval(() => {
      this.chordIndex = (this.chordIndex + 1) % this.chords.length;
      this.playChord(this.chords[this.chordIndex], 8.0);
    }, 7000);
  }

  toggleMute() {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      }
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    } else {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.linearRampToValueAtTime(0.8, this.ctx.currentTime + 1.2);
      }
      this.chordIndex = 0;
      this.playChord(this.chords[0]);
      if (!this.intervalId) {
        this.intervalId = setInterval(() => {
          this.chordIndex = (this.chordIndex + 1) % this.chords.length;
          this.playChord(this.chords[this.chordIndex], 8.0);
        }, 7000);
      }
    }
    return !this.isMuted;
  }

  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (e) {}
      this.ctx = null;
    }
  }
}

// ============================================================================
// 2. MAIN APPLICATION CLASS
// ============================================================================

export class App {
  constructor(rootContainer) {
    this.root = rootContainer || document.getElementById('app');
    this.soundscape = new AmbientSoundscape();
    this.springField = new SpringDisplacementField({
      stiffness: 0.08,
      damping: 0.88,
      influenceRadius: 220,
      maxForce: 48
    });

    this.isPlaying = true;
    this.totalDuration = 65.0;
    this.masterTimeline = null;
    this.rafId = null;
    this.currentT = 0;
    this.isApotheosisSettled = false;
    this.morphProgress = 0.0;

    // Interactive Photo Focus state
    this.isFocused = false;
    this.focusedPhotoId = null;
    this.activeSourceCard = null;
    this.wasPlayingBeforeFocus = false;

    // Desktop Pointer Parallax & 3D Tilt State
    this.targetTiltX = 0;
    this.targetTiltY = 0;
    this.currentTiltX = 0;
    this.currentTiltY = 0;

    this.lastWidth = window.innerWidth;
    this.lastHeight = window.innerHeight;
    this.svgWidth = 1920;
    this.svgHeight = 1080;

    this.preloadedImages = new Map();

    this.init();
  }

  init() {
    this.preloadArchivalBitmaps();
    this.renderDOM();
    this.updateSvgDimensions();
    this.initEventListeners();
    this.buildPhotosDOM();
    this.buildMasterTimeline();
    this.startAnimationLoop();
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
  // ASSET PRELOADING & GPU DECODING
  // --------------------------------------------------------------------------
  async preloadArchivalBitmaps() {
    const photos = getAllPhotos();
    const promises = photos.map(async (photo) => {
      try {
        const img = new Image();
        img.src = photo.src;
        if (typeof img.decode === 'function') {
          await img.decode();
        } else {
          await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        }
        this.preloadedImages.set(photo.id, img);
        return { id: photo.id, status: 'decoded' };
      } catch (err) {
        this.preloadedImages.set(photo.id, { src: photo.src });
        return { id: photo.id, status: 'fallback' };
      }
    });

    try {
      await Promise.all(promises);
    } catch (e) {
      // Non-blocking fallback
    }
  }

  // --------------------------------------------------------------------------
  // DOM RENDERING (STRICT ZERO TEXT OTHER THAN CANONICAL PHRASE)
  // --------------------------------------------------------------------------
  renderDOM() {
    const luxuryDefs = createLuxurySvgDefs({ prefix: 'amo-' });

    this.root.innerHTML = `
      <div class="editorial-viewport" id="viewport">
        <!-- Film Grain & Ambient Atmosphere -->
        <div class="film-grain-layer"></div>
        <div class="editorial-vignette"></div>

        <!-- Outer Ornamental Editorial Borders in Gold -->
        <div class="editorial-frame-border"></div>
        <div class="frame-corner frame-corner--tl"></div>
        <div class="frame-corner frame-corner--tr"></div>
        <div class="frame-corner frame-corner--bl"></div>
        <div class="frame-corner frame-corner--br"></div>

        <!-- Master SVG Vector Engine Layer (SOLE HEART & INFINITY MOTIF) -->
        <svg class="continuous-svg-layer" id="masterSvg" viewBox="0 0 1920 1080" preserveAspectRatio="none">
          <defs>${luxuryDefs}</defs>

          <!-- Central Heart-to-Infinity Morphing Path (Sole SVG Element) -->
          <path id="morphPath" d="" fill="none" stroke="url(#amo-grad-purple-pure)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" filter="url(#amo-romantic-glow)"></path>
        </svg>

        <!-- Dynamic Photo Stage Layer (Lateral Left & Right Wings) -->
        <div class="photo-stage-layer" id="photoStage"></div>

        <!-- Pure Straight Horizontal Phrase in Center (No Liquid Glass, Clean Uppercase) -->
        <div class="editorial-typography-stage" id="typographyStage">
          <div class="straight-phrase-container" id="straightPhraseContainer" style="opacity: 0; transform: translate(-50%, -50%) scale(0.96); filter: blur(8px);">
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
          <div class="focus-ambient-backdrop" id="focusBackdrop"></div>
          <div class="focus-ambient-spotlight" id="focusSpotlight"></div>
          <div class="focused-card-holder" id="focusedCardHolder"></div>
        </div>

        <!-- Apotheosis Replay Trigger (Icon-Only, Strictly No Text) -->
        <div class="apotheosis-replay-container" id="apotheosisReplayContainer" style="opacity: 0; pointer-events: none;">
          <button class="apotheosis-replay-btn" id="btnApotheosisReplay" aria-label="AMO VOCÊS DOIS PRA SEMPRE" title="">
            <svg viewBox="0 0 48 48" class="replay-svg-icon" aria-hidden="true">
              <circle cx="24" cy="24" r="21" class="replay-ring" />
              <circle cx="24" cy="24" r="17" class="replay-inner-ring" />
              <path class="replay-arrow" d="M24 14v-4l-6 6 6 6v-4c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8h-3c0 6.08 4.92 11 11 11s11-4.92 11-11-4.92-11-11-11z" />
            </svg>
          </button>
        </div>

        <!-- Minimal Non-Text Control Bar (SVGs only, NO text) -->
        <div class="ambient-controller-bar" aria-hidden="true">
          <button class="glyph-btn" id="btnSound" aria-label="AMO VOCÊS DOIS PRA SEMPRE" title="">
            <svg viewBox="0 0 24 24" id="soundIcon" aria-hidden="true">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          </button>
          <button class="glyph-btn" id="btnPlayPause" aria-label="AMO VOCÊS DOIS PRA SEMPRE" title="">
            <svg viewBox="0 0 24 24" id="playPauseIcon" aria-hidden="true">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </button>
          <button class="glyph-btn" id="btnRestart" aria-label="AMO VOCÊS DOIS PRA SEMPRE" title="">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
            </svg>
          </button>
        </div>

        <!-- Continuous Bottom Progress Rail -->
        <div class="timeline-progress-rail" id="progressRail">
          <div class="timeline-progress-bar" id="progressBar"></div>
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
    this.progressBarEl = document.getElementById('progressBar');
    this.playPauseIconEl = document.getElementById('playPauseIcon');
    this.soundIconEl = document.getElementById('soundIcon');
    this.photoFocusLayerEl = document.getElementById('photoFocusLayer');
    this.focusBackdropEl = document.getElementById('focusBackdrop');
    this.focusSpotlightEl = document.getElementById('focusSpotlight');
    this.focusedCardHolderEl = document.getElementById('focusedCardHolder');
    this.apotheosisReplayContainerEl = document.getElementById('apotheosisReplayContainer');
  }

  // --------------------------------------------------------------------------
  // EVENT LISTENERS & POINTER INTERACTIVITY
  // --------------------------------------------------------------------------
  initEventListeners() {
    const handlePointerMove = (e) => {
      const rect = this.root.getBoundingClientRect();
      const sw = this.svgWidth || 1920;
      const sh = this.svgHeight || 1080;
      const x = (e.clientX - rect.left) * (sw / Math.max(1, rect.width));
      const y = (e.clientY - rect.top) * (sh / Math.max(1, rect.height));
      this.springField.updatePointer(x, y, true);

      if (!this.isFocused) {
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        this.targetTiltX = Math.max(-1, Math.min(1, normX));
        this.targetTiltY = Math.max(-1, Math.min(1, normY));
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = this.root.getBoundingClientRect();
        const sw = this.svgWidth || 1920;
        const sh = this.svgHeight || 1080;
        const x = (touch.clientX - rect.left) * (sw / Math.max(1, rect.width));
        const y = (touch.clientY - rect.top) * (sh / Math.max(1, rect.height));
        this.springField.updatePointer(x, y, true);
      }
    };

    const handleTouchEnd = () => {
      this.springField.updatePointer(-9999, -9999, false);
      this.targetTiltX = 0;
      this.targetTiltY = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('pointerleave', () => {
      this.springField.updatePointer(-9999, -9999, false);
      this.targetTiltX = 0;
      this.targetTiltY = 0;
    }, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Sound toggle
    const btnSound = document.getElementById('btnSound');
    if (btnSound) {
      btnSound.addEventListener('click', (e) => {
        e.stopPropagation();
        const unmuted = this.soundscape.toggleMute();
        if (this.soundIconEl) {
          this.soundIconEl.innerHTML = unmuted
            ? '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>'
            : '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
        }
      });
    }

    // Play/Pause toggle
    const btnPlayPause = document.getElementById('btnPlayPause');
    if (btnPlayPause) {
      btnPlayPause.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePlayPause();
      });
    }

    // Restart button
    const btnRestart = document.getElementById('btnRestart');
    if (btnRestart) {
      btnRestart.addEventListener('click', (e) => {
        e.stopPropagation();
        this.restart();
      });
    }

    // Apotheosis replay button
    const btnApotheosisReplay = document.getElementById('btnApotheosisReplay');
    if (btnApotheosisReplay) {
      btnApotheosisReplay.addEventListener('click', (e) => {
        e.stopPropagation();
        this.restart();
      });
    }

    // Photo focus clicks on any photo card
    this.photoStageEl.addEventListener('click', (e) => {
      const card = e.target.closest('.editorial-photo-card');
      if (card) {
        const photoId = card.dataset.photoId;
        const frameStyle = card.dataset.frameStyle || 'soft';
        this.openPhotoFocus(photoId, card, frameStyle);
      }
    });

    // Close photo focus
    this.photoFocusLayerEl.addEventListener('click', () => {
      this.closePhotoFocus();
    });

    // Canvas click to toggle play/pause (if not clicking controls or focus)
    this.root.addEventListener('click', (e) => {
      if (e.target.closest('.ambient-controller-bar') ||
          e.target.closest('.photo-focus-layer') ||
          e.target.closest('.apotheosis-replay-container') ||
          e.target.closest('.editorial-photo-card')) {
        return;
      }
      this.togglePlayPause();
    });

    // Keyboard accessibility
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePlayPause();
      } else if (e.key === 'r' || e.key === 'R') {
        this.restart();
      } else if (e.key === 'Escape') {
        if (this.isFocused) {
          this.closePhotoFocus();
        }
      }
    });

    // Resize recalculation
    window.addEventListener('resize', () => {
      if (Math.abs(window.innerWidth - this.lastWidth) > 40 || Math.abs(window.innerHeight - this.lastHeight) > 40) {
        this.lastWidth = window.innerWidth;
        this.lastHeight = window.innerHeight;
        this.rebuildDynamicLayout();
      }
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE PHOTO FOCUS
  // --------------------------------------------------------------------------
  openPhotoFocus(photoId, sourceCardElement, frameStyle = 'soft') {
    if (this.isFocused || !photoId) return;

    const photo = getPhotoById(photoId);
    if (!photo) return;

    this.isFocused = true;
    this.focusedPhotoId = photoId;
    this.activeSourceCard = sourceCardElement;
    this.targetTiltX = 0;
    this.targetTiltY = 0;

    this.wasPlayingBeforeFocus = this.isPlaying;
    if (this.isPlaying && this.masterTimeline) {
      this.masterTimeline.pause();
      this.isPlaying = false;
      if (this.playPauseIconEl) {
        this.playPauseIconEl.innerHTML = '<path d="M8 5v14l11-7z"/>';
      }
    }

    if (this.activeSourceCard) {
      gsap.to(this.activeSourceCard, { opacity: 0.2, duration: 0.35 });
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
    this.photoFocusLayerEl.classList.add('active');

    const srcRect = sourceCardElement.getBoundingClientRect();
    const focusedCard = document.getElementById('focusedCard');
    const focusedRect = focusedCard.getBoundingClientRect();

    const dx = (srcRect.left + srcRect.width / 2) - (focusedRect.left + focusedRect.width / 2);
    const dy = (srcRect.top + srcRect.height / 2) - (focusedRect.top + focusedRect.height / 2);
    const scale = Math.max(0.2, Math.max(srcRect.width / focusedRect.width, srcRect.height / focusedRect.height));

    gsap.killTweensOf([this.focusBackdropEl, this.focusSpotlightEl, focusedCard, this.photoFocusLayerEl]);

    gsap.fromTo(this.photoFocusLayerEl, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(this.focusBackdropEl, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' });
    gsap.fromTo(this.focusSpotlightEl, { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1.0, duration: 0.55, ease: 'power2.out' });

    gsap.fromTo(focusedCard, {
      x: dx,
      y: dy,
      scale: scale,
      opacity: 0.9
    }, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.52,
      ease: EASINGS.cinematicSlow
    });
  }

  closePhotoFocus() {
    if (!this.isFocused) return;
    this.isFocused = false;

    const focusedCard = document.getElementById('focusedCard');
    if (focusedCard && this.activeSourceCard) {
      const srcRect = this.activeSourceCard.getBoundingClientRect();
      const focusedRect = focusedCard.getBoundingClientRect();
      const dx = (srcRect.left + srcRect.width / 2) - (focusedRect.left + focusedRect.width / 2);
      const dy = (srcRect.top + srcRect.height / 2) - (focusedRect.top + focusedRect.height / 2);
      const scale = Math.max(0.2, Math.max(srcRect.width / focusedRect.width, srcRect.height / focusedRect.height));

      gsap.to(focusedCard, {
        x: dx,
        y: dy,
        scale: scale,
        opacity: 0,
        duration: 0.4,
        ease: EASINGS.silkInOut
      });
    }

    gsap.to([this.focusBackdropEl, this.focusSpotlightEl, this.photoFocusLayerEl], {
      opacity: 0,
      duration: 0.38,
      ease: 'power2.inOut',
      onComplete: () => {
        this.photoFocusLayerEl.style.display = 'none';
        this.photoFocusLayerEl.classList.remove('active');
        this.focusedCardHolderEl.innerHTML = '';
      }
    });

    if (this.activeSourceCard) {
      gsap.to(this.activeSourceCard, { opacity: 1, duration: 0.4 });
      this.activeSourceCard = null;
    }

    this.focusedPhotoId = null;

    if (this.wasPlayingBeforeFocus && this.masterTimeline) {
      this.masterTimeline.play();
      this.isPlaying = true;
      if (this.playPauseIconEl) {
        this.playPauseIconEl.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
      }
    }
  }

  // --------------------------------------------------------------------------
  // MASTER TIMELINE CHOREOGRAPHY (5 ACTS + CONTINUOUS STRAIGHT PHRASE)
  // --------------------------------------------------------------------------
  buildMasterTimeline() {
    if (this.masterTimeline) {
      this.masterTimeline.kill();
    }

    this.masterTimeline = gsap.timeline({
      paused: false,
      onUpdate: () => {
        const time = this.masterTimeline.time();
        const progress = this.masterTimeline.progress();
        this.currentT = time;
        if (this.progressBarEl) {
          this.progressBarEl.style.width = `${(progress * 100).toFixed(2)}%`;
        }
      },
      onComplete: () => {
        this.isApotheosisSettled = true;
        if (this.apotheosisReplayContainerEl) {
          gsap.to(this.apotheosisReplayContainerEl, {
            opacity: 1,
            pointerEvents: 'auto',
            duration: 2.0,
            ease: EASINGS.softOut
          });
        }
      }
    });

    // ------------------------------------------------------------------------
    // ACT I (0.0s - 12.0s): AWAKENING — "AMO" FOCUS
    // ------------------------------------------------------------------------
    this.masterTimeline.addLabel('act1', 0.0);

    // Initial state
    this.masterTimeline.set('.act-layer', { opacity: 0, pointerEvents: 'none' }, 0);
    this.masterTimeline.set('#act1-layer', { opacity: 1, pointerEvents: 'auto' }, 0);
    this.masterTimeline.set('#apotheosisReplayContainer', { opacity: 0, pointerEvents: 'none' }, 0);

    // Reveal Straight Phrase in Center (Permanent, never disappearing)
    this.masterTimeline.to(this.straightPhraseContainerEl, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 2.4,
      ease: EASINGS.cinematicSlow
    }, 0.2);

    // Act 1 Word Emphasis: "AMO" shines brightly
    this.masterTimeline.to(this.wordAmoEl, {
      opacity: 1,
      scale: 1.08,
      duration: 2.2,
      ease: EASINGS.cinematicSlow
    }, 0.4);

    this.masterTimeline.to([this.wordVocesEl, this.wordDoisEl, this.wordPraEl, this.wordSempreEl], {
      opacity: 0.8,
      scale: 1.0,
      duration: 2.2,
      ease: EASINGS.cinematicSlow
    }, 0.6);

    // Act 1 Lateral Photos Reveal (Left Crib + Right Ball Pit)
    this.masterTimeline.to('#p01-card', {
      opacity: 1,
      scale: 1,
      duration: 3.0,
      ease: EASINGS.cinematicSlow
    }, 0.6);

    this.masterTimeline.to('#p02-card-act1', {
      opacity: 0.92,
      scale: 1,
      duration: 3.0,
      ease: EASINGS.softOut
    }, 2.5);

    // Morph: Heart shape breathing
    this.masterTimeline.to(this, {
      morphProgress: 0.1,
      duration: 11.0,
      ease: 'sine.inOut'
    }, 0.0);

    // Act 1 Lateral Photos Fade Out
    this.masterTimeline.to(['#p01-card', '#p02-card-act1'], {
      opacity: 0,
      scale: 1.04,
      filter: 'blur(4px)',
      duration: 2.0,
      ease: 'power2.inOut'
    }, 10.5);

    // ------------------------------------------------------------------------
    // ACT II (12.0s - 24.0s): TENDERNESS — "VOCÊS DOIS" FOCUS
    // ------------------------------------------------------------------------
    this.masterTimeline.addLabel('act2', 12.0);
    this.masterTimeline.set('#act2-layer', { opacity: 1, pointerEvents: 'auto' }, 11.8);

    // Act 2 Word Emphasis: "VOCÊS DOIS" shines brightly
    this.masterTimeline.to([this.wordVocesEl, this.wordDoisEl], {
      opacity: 1,
      scale: 1.08,
      duration: 2.4,
      ease: EASINGS.cinematicSlow
    }, 12.2);

    this.masterTimeline.to([this.wordAmoEl, this.wordPraEl, this.wordSempreEl], {
      opacity: 0.8,
      scale: 1.0,
      duration: 2.0,
      ease: EASINGS.softOut
    }, 12.2);

    // Act 2 Lateral Diptych Photos (p03 Bath on Left + p04 Reading on Right)
    this.masterTimeline.to('#p03-card', {
      opacity: 1,
      scale: 1,
      rotate: -1.5,
      duration: 2.8,
      ease: EASINGS.cinematicSlow
    }, 12.2);

    this.masterTimeline.to('#p04-card', {
      opacity: 1,
      scale: 1,
      rotate: 1.5,
      duration: 3.0,
      ease: EASINGS.cinematicSlow
    }, 12.8);

    // Morph progress
    this.masterTimeline.to(this, {
      morphProgress: 0.35,
      duration: 11.5,
      ease: 'sine.inOut'
    }, 12.0);

    // Act 2 Lateral Photos Fade Out
    this.masterTimeline.to(['#p03-card', '#p04-card'], {
      opacity: 0,
      scale: 0.96,
      filter: 'blur(4px)',
      duration: 2.0,
      ease: 'power2.inOut'
    }, 22.2);

    // ------------------------------------------------------------------------
    // ACT III (24.0s - 36.0s): JOY & MILESTONES — "AMO VOCÊS DOIS" FOCUS
    // ------------------------------------------------------------------------
    this.masterTimeline.addLabel('act3', 24.0);
    this.masterTimeline.set('#act3-layer', { opacity: 1, pointerEvents: 'auto' }, 23.8);

    // Act 3 Word Emphasis: "AMO VOCÊS DOIS" illuminate together
    this.masterTimeline.to([this.wordAmoEl, this.wordVocesEl, this.wordDoisEl], {
      opacity: 1,
      scale: 1.06,
      duration: 2.4,
      ease: EASINGS.cinematicSlow
    }, 24.2);

    this.masterTimeline.to([this.wordPraEl, this.wordSempreEl], {
      opacity: 0.8,
      scale: 1.0,
      duration: 2.0,
      ease: EASINGS.softOut
    }, 24.2);

    // Act 3 Lateral Triptych Photos (p05 Beach on Left, p06 & p07 on Right)
    this.masterTimeline.to('#p05-card', {
      opacity: 1,
      scale: 1,
      rotate: -2.0,
      duration: 2.6,
      ease: EASINGS.cinematicSlow
    }, 24.2);

    this.masterTimeline.to('#p06-card', {
      opacity: 1,
      scale: 1,
      duration: 2.8,
      ease: EASINGS.cinematicSlow
    }, 24.8);

    this.masterTimeline.to('#p07-card', {
      opacity: 1,
      scale: 1,
      rotate: 2.0,
      duration: 3.0,
      ease: EASINGS.cinematicSlow
    }, 25.4);

    // Morph progress
    this.masterTimeline.to(this, {
      morphProgress: 0.65,
      duration: 11.5,
      ease: 'sine.inOut'
    }, 24.0);

    // Act 3 Lateral Photos Fade Out
    this.masterTimeline.to(['#p05-card', '#p06-card', '#p07-card'], {
      opacity: 0,
      scale: 1.04,
      filter: 'blur(4px)',
      duration: 2.0,
      ease: 'power2.inOut'
    }, 34.2);

    // ------------------------------------------------------------------------
    // ACT IV (36.0s - 48.0s): DEVOTION — "PRA SEMPRE" FOCUS
    // ------------------------------------------------------------------------
    this.masterTimeline.addLabel('act4', 36.0);
    this.masterTimeline.set('#act4-layer', { opacity: 1, pointerEvents: 'auto' }, 35.8);

    // Act 4 Word Emphasis: "PRA SEMPRE" shines with deep brilliance
    this.masterTimeline.to([this.wordPraEl, this.wordSempreEl], {
      opacity: 1,
      scale: 1.08,
      duration: 2.6,
      ease: EASINGS.cinematicSlow
    }, 36.2);

    this.masterTimeline.to([this.wordAmoEl, this.wordVocesEl, this.wordDoisEl], {
      opacity: 0.8,
      scale: 1.0,
      duration: 2.0,
      ease: EASINGS.softOut
    }, 36.2);

    // Act 4 Lateral Photos (p08 & p10 on Left, p09 Mother on Right)
    this.masterTimeline.to('#p09-card', {
      opacity: 1,
      scale: 1,
      duration: 3.2,
      ease: EASINGS.cinematicSlow
    }, 36.2);

    this.masterTimeline.to('#p08-card', {
      opacity: 0.88,
      scale: 1,
      duration: 3.0,
      ease: EASINGS.softOut
    }, 36.8);

    this.masterTimeline.to('#p10-card', {
      opacity: 0.92,
      scale: 1,
      duration: 3.0,
      ease: EASINGS.softOut
    }, 37.4);

    // Morph: Lemniscate lobes opening
    this.masterTimeline.to(this, {
      morphProgress: 0.9,
      duration: 11.5,
      ease: 'sine.inOut'
    }, 36.0);

    // Act 4 Photos Fade Out
    this.masterTimeline.to(['#p08-card', '#p09-card', '#p10-card'], {
      opacity: 0,
      scale: 1.04,
      filter: 'blur(4px)',
      duration: 2.0,
      ease: 'power2.inOut'
    }, 46.2);

    // ------------------------------------------------------------------------
    // ACT V (48.0s - 65.0s+): APOTHEOSIS & ETERNAL BOND
    // Background Photo Mosaic ONLY + Full Straight Uppercase Phrase
    // ------------------------------------------------------------------------
    this.masterTimeline.addLabel('act5', 48.0);
    this.masterTimeline.set('#act5-layer', { opacity: 1, pointerEvents: 'auto' }, 47.8);

    // Complete Harmonic Enlightenment across ALL WORDS
    this.masterTimeline.to([this.wordAmoEl, this.wordVocesEl, this.wordDoisEl, this.wordPraEl, this.wordSempreEl], {
      opacity: 1,
      scale: 1.04,
      duration: 3.2,
      ease: EASINGS.cinematicSlow
    }, 48.2);

    this.masterTimeline.to(this.phraseFlourishEl, {
      width: '260px',
      opacity: 1,
      duration: 2.5,
      ease: EASINGS.softOut
    }, 49.0);

    // Ambient Mosaic Grid Elements in background ONLY (Zero foreground cards)
    this.masterTimeline.to('.mosaic-tile', {
      opacity: 0.42,
      scale: 1,
      stagger: 0.08,
      duration: 2.4,
      ease: EASINGS.softOut
    }, 48.2);

    // Apotheosis Replay Button Bloom
    this.masterTimeline.to('#apotheosisReplayContainer', {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 2.4,
      ease: EASINGS.softOut
    }, 53.5);

    // Final full morph into perfect Infinity Lemniscate (t = 1.0)
    this.masterTimeline.to(this, {
      morphProgress: 1.0,
      duration: 5.0,
      ease: 'sine.out'
    }, 48.0);
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
            <div class="editorial-photo-card mosaic-tile" id="mosaic-${idx}" data-photo-id="${p.id}" style="opacity: 0; transform: scale(0.92);">
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
  // REAL-TIME TICKER & ANIMATION LOOP (SOLE HEART-TO-INFINITY MORPH MOTIF)
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

      // 1. Central Heart-to-Infinity Morphing Update
      let currentMorphT = this.morphProgress;
      if (this.isApotheosisSettled) {
        const breath = 0.5 * (1 + Math.sin(now * 0.0012));
        currentMorphT = 0.88 + breath * 0.12;
      }

      const sw = this.svgWidth || 1920;
      const sh = this.svgHeight || 1080;
      const cx = sw * 0.5;
      const cy = sh * 0.5;
      const isMobile = window.innerWidth <= 767;
      const isTablet = window.innerWidth > 767 && window.innerWidth < 1024;
      const morphScale = isMobile 
        ? Math.min(sw * 0.36, sh * 0.16) 
        : (isTablet ? Math.min(sw * 0.24, sh * 0.20) : Math.min(sw * 0.18, sh * 0.26));

      const morphSegments = getMorphSegments(currentMorphT, {
        cx,
        cy,
        scale: morphScale,
        easing: 'easeInOutCubic'
      });

      // 2. Interactive Spring-Damper Physics on the Heart & Infinity Curve
      if (this.morphPathEl && morphSegments.length > 0) {
        const deformedSegments = this.springField.deformSegments(morphSegments, dt);
        this.morphPathEl.setAttribute('d', segmentsToSvgPath(deformedSegments, true));
      }

      // 3. Ken Burns Camera Micro-drift combined with Restrained 3D Tilt
      this.currentTiltX += (this.targetTiltX - this.currentTiltX) * 0.07;
      this.currentTiltY += (this.targetTiltY - this.currentTiltY) * 0.07;

      const tiltDegX = (-this.currentTiltY * 2.0).toFixed(2);
      const tiltDegY = (this.currentTiltX * 2.0).toFixed(2);
      const transX = (this.currentTiltX * 10).toFixed(2);
      const transY = (this.currentTiltY * 8).toFixed(2);

      const drift = getCameraDrift(this.currentT);
      if (this.photoStageEl) {
        this.photoStageEl.style.transform = `${drift.transformString} perspective(1200px) rotateX(${tiltDegX}deg) rotateY(${tiltDegY}deg) translate3d(${transX}px, ${transY}px, 0px)`;
      }

      if (this.straightPhraseContainerEl) {
        const typoX = (this.currentTiltX * 3.5).toFixed(2);
        const typoY = (this.currentTiltY * 2.5).toFixed(2);
        this.straightPhraseContainerEl.style.transform = `translate(calc(-50% + ${typoX}px), calc(-50% + ${typoY}px))`;
      }

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  // --------------------------------------------------------------------------
  // PLAYBACK CONTROL METHODS
  // --------------------------------------------------------------------------
  togglePlayPause() {
    if (!this.masterTimeline) return;
    if (this.isPlaying) {
      this.masterTimeline.pause();
      this.isPlaying = false;
      if (this.playPauseIconEl) {
        this.playPauseIconEl.innerHTML = '<path d="M8 5v14l11-7z"/>';
      }
    } else {
      if (this.isApotheosisSettled) {
        this.restart();
        return;
      }
      this.masterTimeline.play();
      this.isPlaying = true;
      if (this.playPauseIconEl) {
        this.playPauseIconEl.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
      }
      this.soundscape.initContext();
    }
  }

  seekTo(seconds) {
    if (!this.masterTimeline) return;
    const clamped = Math.max(0, Math.min(this.totalDuration, seconds));
    this.masterTimeline.seek(clamped);
    this.currentT = clamped;
    this.isApotheosisSettled = clamped >= 60.0;
    if (this.isApotheosisSettled) {
      if (this.apotheosisReplayContainerEl) {
        gsap.to(this.apotheosisReplayContainerEl, { opacity: 1, pointerEvents: 'auto', duration: 0.4 });
      }
    } else {
      if (this.apotheosisReplayContainerEl) {
        gsap.killTweensOf(this.apotheosisReplayContainerEl);
        gsap.to(this.apotheosisReplayContainerEl, { opacity: 0, pointerEvents: 'none', duration: 0.2 });
      }
    }
  }

  seekRelative(deltaSec) {
    if (!this.masterTimeline) return;
    this.seekTo(this.masterTimeline.time() + deltaSec);
  }

  restart() {
    this.isApotheosisSettled = false;
    this.morphProgress = 0.0;
    if (this.isFocused) {
      this.closePhotoFocus();
    }
    if (this.apotheosisReplayContainerEl) {
      gsap.killTweensOf(this.apotheosisReplayContainerEl);
      gsap.set(this.apotheosisReplayContainerEl, {
        opacity: 0,
        pointerEvents: 'none'
      });
    }
    if (this.masterTimeline) {
      this.masterTimeline.restart();
    }
    this.isPlaying = true;
    if (this.playPauseIconEl) {
      this.playPauseIconEl.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    }
  }

  rebuildDynamicLayout() {
    const currentTime = this.masterTimeline ? this.masterTimeline.time() : 0;
    const wasPlaying = this.isPlaying;
    if (this.isFocused) {
      this.closePhotoFocus();
    }
    this.updateSvgDimensions();
    this.buildPhotosDOM();
    this.buildMasterTimeline();
    this.seekTo(currentTime);
    if (!wasPlaying && this.masterTimeline) {
      this.masterTimeline.pause();
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
    if (this.soundscape) {
      this.soundscape.destroy();
    }
    if (this.springField) {
      this.springField.reset();
    }
    if (this.photoFocusLayerEl) {
      gsap.killTweensOf(this.photoFocusLayerEl);
    }
    if (this.apotheosisReplayContainerEl) {
      gsap.killTweensOf(this.apotheosisReplayContainerEl);
    }
  }
}

export default App;
