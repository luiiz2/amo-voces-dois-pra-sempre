/**
 * ============================================================================
 * EU AMO VOCÊS DOIS — SINGLE-SCREEN ROMANTIC SCRAPBOOK GIFT
 * A single-screen digital love note / handmade art journal for my girlfriend & son.
 * Features continuous organic cycling of all 13 family memories.
 * ============================================================================
 */

import gsap from 'gsap';
import losHermanosMp3 from '../Los Hermanos - Sentimental (Karaokê) [Ga2Ja4O6k7c].mp3';
import { getAllPhotos } from './data/photos.js';
import {
  getArrowSvg,
  getHeartSvg,
  getStarSvg,
  getUnderlineSvg,
  getCoffeeStainSvg
} from './graphics/scrapbookDoodles.js';

import './styles/romanticScrapbook.css';

class BackgroundMusic {
  constructor(src) {
    this.audio = new Audio(src);
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.volume = 0.0001;
    this.targetVolume = 0.16;
    this.isPlaying = false;
  }

  play() {
    if (this.isPlaying) return;
    const p = this.audio.play();
    if (p !== undefined) {
      p.then(() => {
        this.isPlaying = true;
        this.fadeIn(3.0);
      }).catch(() => {});
    }
  }

  fadeIn(durationSec = 3.0) {
    const startTime = performance.now();
    const startVol = this.audio.volume;
    const target = this.targetVolume;

    const step = (now) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1.0, elapsed / durationSec);
      this.audio.volume = Math.min(target, startVol + (target - startVol) * progress);
      if (progress < 1.0) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  destroy() {
    this.audio.pause();
    this.audio.src = '';
  }
}

export class RomanticScrapbookApp {
  constructor(rootContainer) {
    this.root = rootContainer || document.getElementById('app');
    this.bgMusic = new BackgroundMusic(losHermanosMp3);
    this.photos = getAllPhotos();
    this.slotIndices = [0, 4, 8, 11]; // 4 distinct starter photos
    this.nextPhotoPointer = 1;
    this.currentCycleSlot = 0;
    this.cycleInterval = null;
    this.init();
  }

  init() {
    this.render();
    this.initInteractions();
    this.initEntranceAnimation();
    this.startPhotoCycling();
    this.bgMusic.play();
  }

  render() {
    const p0 = this.photos[this.slotIndices[0]];
    const p1 = this.photos[this.slotIndices[1]];
    const p2 = this.photos[this.slotIndices[2]];
    const p3 = this.photos[this.slotIndices[3]];

    this.root.innerHTML = `
      <div class="scrapbook-viewport" id="scrapbookViewport">
        <main class="scrapbook-sheet" id="scrapbookSheet">
          <!-- Spiral Binding at Left Edge -->
          <div class="scrapbook-spiral" aria-hidden="true">
            ${Array.from({ length: 12 }).map(() => '<div class="spiral-ring"></div>').join('')}
          </div>

          <!-- Top Washi Tape -->
          <div class="washi-tape tape--mustard" style="top: -12px; left: 50%; transform: translateX(-50%) rotate(-1deg); width: 140px;"></div>

          <!-- Postage Stamp with Heart Inscription -->
          <div class="postage-stamp-gift">
            <div class="stamp-inner-text">
              ★ FOR ALWAYS ★
            </div>
          </div>

          <!-- Coffee Cup Stain -->
          <div class="scrapbook-coffee-mark">
            ${getCoffeeStainSvg(110)}
          </div>

          <!-- ==============================================================
               4 REAL AUTHENTIC FAMILY POLAROIDS FRAMING THE SPREAD
               (Continuously rotating through all 13 family memories)
               ============================================================== -->
          
          <!-- Polaroid 1: Top Left -->
          <div class="scrapbook-polaroid polaroid--top-left" data-slot="0" title="Clique para trocar a foto">
            <div class="washi-tape tape--ochre" style="top: -8px; left: -10px; width: 60px; height: 18px; transform: rotate(-16deg);"></div>
            <div class="polaroid-frame-inner">
              <img class="polaroid-img" src="${p0.src}" alt="${p0.alt}" draggable="false" />
            </div>
          </div>

          <!-- Polaroid 2: Top Right -->
          <div class="scrapbook-polaroid polaroid--top-right" data-slot="1" title="Clique para trocar a foto">
            <div class="washi-tape tape--sage" style="top: -8px; right: -10px; width: 60px; height: 18px; transform: rotate(14deg);"></div>
            <div class="polaroid-frame-inner">
              <img class="polaroid-img" src="${p1.src}" alt="${p1.alt}" draggable="false" />
            </div>
          </div>

          <!-- Polaroid 3: Bottom Left -->
          <div class="scrapbook-polaroid polaroid--bottom-left" data-slot="2" title="Clique para trocar a foto">
            <div class="washi-tape tape--sky" style="bottom: -8px; left: -10px; width: 60px; height: 18px; transform: rotate(18deg);"></div>
            <div class="polaroid-frame-inner">
              <img class="polaroid-img" src="${p2.src}" alt="${p2.alt}" draggable="false" />
            </div>
          </div>

          <!-- Polaroid 4: Bottom Right -->
          <div class="scrapbook-polaroid polaroid--bottom-right" data-slot="3" title="Clique para trocar a foto">
            <div class="washi-tape tape--rose" style="bottom: -8px; right: -10px; width: 60px; height: 18px; transform: rotate(-18deg);"></div>
            <div class="polaroid-frame-inner">
              <img class="polaroid-img" src="${p3.src}" alt="${p3.alt}" draggable="false" />
            </div>
          </div>

          <!-- ==============================================================
               HAND-DRAWN DOODLES (ARROWS & STARS)
               ============================================================== -->
          <div class="doodle-element doodle-arrow-left">
            ${getArrowSvg('curve-down-right', '#2A4365', 90, 60)}
          </div>

          <div class="doodle-element doodle-arrow-right">
            ${getArrowSvg('loop-right', '#2A4365', 90, 60)}
          </div>

          <!-- Floating Doodled Hearts & Stars -->
          <div class="doodle-element floating-heart-stamp" style="top: 22%; left: 34%;">
            ${getHeartSvg('#D95D6A', 34)}
          </div>

          <div class="doodle-element floating-heart-stamp" style="bottom: 22%; right: 34%; animation-delay: 1.5s;">
            ${getStarSvg('#E9C46A', 30)}
          </div>

          <div class="doodle-element floating-heart-stamp" style="top: 26%; right: 32%; animation-delay: 0.8s;">
            ${getHeartSvg('#E27D60', 28)}
          </div>

          <!-- ==============================================================
               CENTRAL SCRAPBOOK CARD: "EU AMO VOCÊS DOIS" + INFINITY
               ============================================================== -->
          <div class="central-scrapbook-stage" id="centralStage">
            <div class="central-torn-card" id="centralCard">
              <!-- Washi tape at top of inner note -->
              <div class="washi-tape tape--rose" style="top: -12px; width: 90px; height: 24px; transform: rotate(-2deg);"></div>

              <!-- Main Central Phrase: EU AMO VOCÊS DOIS -->
              <h1 class="romantic-main-title">
                <span class="title-line-top">Eu Amo</span>
                <span class="title-line-bottom">VOCÊS DOIS</span>
              </h1>

              <!-- Doodled Underline -->
              <div style="margin-top: -4px;">
                ${getUnderlineSvg('#D95D6A', 220, 20)}
              </div>

              <!-- Central Hand-Drawn Infinity (∞) Motif -->
              <div class="central-infinity-container" id="infinityHolder">
                <svg viewBox="0 0 160 80" class="infinity-svg-path" width="150" height="75" xmlns="http://www.w3.org/2000/svg">
                  <!-- Hand-Drawn Continuous Infinity Spline -->
                  <path d="M 80,40 C 95,20 125,12 142,26 C 158,40 156,62 138,70 C 120,78 95,58 80,40 C 65,22 40,2 22,10 C 4,18 2,40 20,54 C 38,68 65,60 80,40 Z" 
                        class="doodle-draw-path infinity-stroke" />
                </svg>
              </div>

              <!-- Doodled Star Accents -->
              <div style="display: flex; gap: 14px; margin-top: 4px;">
                ${getStarSvg('#E9C46A', 22)}
                ${getHeartSvg('#D95D6A', 24)}
                ${getStarSvg('#E9C46A', 22)}
              </div>
            </div>
          </div>
        </main>
      </div>
    `;

    this.polaroidEls = [
      document.querySelector('.polaroid--top-left'),
      document.querySelector('.polaroid--top-right'),
      document.querySelector('.polaroid--bottom-left'),
      document.querySelector('.polaroid--bottom-right')
    ];
  }

  // --------------------------------------------------------------------------
  // CONTINUOUS PHOTO CYCLING TRANSITION
  // --------------------------------------------------------------------------
  transitionSlot(slotIndex) {
    const polaroidEl = this.polaroidEls[slotIndex];
    if (!polaroidEl) return;

    // Pick next photo that is not currently displayed in any slot
    let nextIdx = (this.nextPhotoPointer + 1) % this.photos.length;
    while (this.slotIndices.includes(nextIdx)) {
      nextIdx = (nextIdx + 1) % this.photos.length;
    }
    this.nextPhotoPointer = nextIdx;
    this.slotIndices[slotIndex] = nextIdx;
    const nextPhoto = this.photos[nextIdx];

    const imgEl = polaroidEl.querySelector('.polaroid-img');
    if (!imgEl) return;

    // Gentle physical paper lift & crossfade
    const tl = gsap.timeline();
    tl.to(polaroidEl, {
      scale: 1.06,
      y: -5,
      boxShadow: '0 24px 50px rgba(45, 30, 15, 0.28)',
      duration: 0.4,
      ease: 'power2.out'
    })
    .to(imgEl, {
      opacity: 0.15,
      scale: 0.94,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        imgEl.src = nextPhoto.src;
        imgEl.alt = nextPhoto.alt;
      }
    }, '-=0.15')
    .to(imgEl, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out'
    })
    .to(polaroidEl, {
      scale: 1,
      y: 0,
      boxShadow: '0 18px 45px rgba(45, 30, 15, 0.18)',
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3');
  }

  startPhotoCycling() {
    if (this.cycleInterval) {
      clearInterval(this.cycleInterval);
    }
    // Rotate one polaroid every 3.2 seconds sequentially across the 4 corners
    this.cycleInterval = setInterval(() => {
      this.transitionSlot(this.currentCycleSlot);
      this.currentCycleSlot = (this.currentCycleSlot + 1) % 4;
    }, 3200);
  }

  initInteractions() {
    // Smooth auto-play Los Hermanos audio on first interaction
    const unlockAudio = () => {
      this.bgMusic.play();
    };
    window.addEventListener('pointerdown', unlockAudio, { once: true, passive: true });
    window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
    window.addEventListener('keydown', unlockAudio, { once: true, passive: true });

    // Click on any polaroid to immediately cycle it
    this.polaroidEls.forEach((card, idx) => {
      if (card) {
        card.addEventListener('click', () => {
          this.transitionSlot(idx);
        });
      }
    });

    // Subtle 3D tilt on Central Stage & Sheet
    const sheet = document.getElementById('scrapbookSheet');
    const centralCard = document.getElementById('centralCard');

    window.addEventListener('pointermove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      if (sheet) {
        gsap.to(sheet, {
          rotateX: -y * 2.5,
          rotateY: x * 2.5,
          duration: 0.6,
          ease: 'power2.out'
        });
      }

      if (centralCard) {
        gsap.to(centralCard, {
          x: x * 6,
          y: y * 4,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    }, { passive: true });
  }

  initEntranceAnimation() {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Sheet settles onto desk
    tl.fromTo('#scrapbookSheet', 
      { scale: 0.94, opacity: 0, rotate: -2 }, 
      { scale: 1, opacity: 1, rotate: 0, duration: 1.2 }
    );

    // Polaroids drop into place with organic rotation
    tl.fromTo('.scrapbook-polaroid', 
      { scale: 0.8, opacity: 0, y: -20 }, 
      { scale: 1, opacity: 1, y: 0, stagger: 0.12, duration: 0.8 }, 
      '-=0.7'
    );

    // Central Card reveals
    tl.fromTo('#centralCard', 
      { scale: 0.9, opacity: 0, y: 15 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.9 }, 
      '-=0.5'
    );

    // Animate drawing the infinity stroke and doodles
    const drawPaths = document.querySelectorAll('.doodle-draw-path');
    drawPaths.forEach((path) => {
      const length = path.getTotalLength ? path.getTotalLength() : 400;
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: 'power1.inOut',
        delay: 0.4
      });
    });
  }

  destroy() {
    if (this.cycleInterval) {
      clearInterval(this.cycleInterval);
      this.cycleInterval = null;
    }
    if (this.bgMusic) {
      this.bgMusic.destroy();
    }
  }
}

export default RomanticScrapbookApp;
