/**
 * ============================================================================
 * EU AMO VOCÊS DOIS — RICH HANDMADE JUNK JOURNAL SCRAPBOOK GIFT
 * Pixel-Perfect Single-Screen Art Journal & Love Note for Girlfriend & Son
 * ============================================================================
 */

import gsap from 'gsap';
import { getAllPhotos } from './data/photos.js';
import {
  getBinderClipSvg,
  getParaSempreStampSvg,
  getWaxSealSvg,
  getVintageTicketSvg,
  getCoffeeRingSvg,
  getDriedFlowerSvg,
  getBotanicalBranchSvg,
  getCircularPostmarkSvg,
  getGoldHeartStickerSvg,
  getBlueSwirlSvg,
  getTickMarksSvg,
  getCoralHeartSvg,
  getSparkleStarSvg
} from './graphics/scrapbookDoodles.js';

import './styles/romanticScrapbook.css';

const losHermanosMp3 = './music.mp3';

class BackgroundMusic {
  constructor(src) {
    this.audio = new Audio(src);
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.volume = 0.0001;
    this.targetVolume = 0.07; // Very soft, gentle background acoustic volume
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

    // Exact 4 canonical starter photos from the reference image:
    const findPhotoIdx = (filename) => {
      const idx = this.photos.findIndex(p => p.filename.includes(filename));
      return idx >= 0 ? idx : 0;
    };

    this.slotIndices = [
      findPhotoIdx('15-17-59'),
      findPhotoIdx('15-17-54'),
      findPhotoIdx('15-17-58'),
      findPhotoIdx('15-17-50')
    ];

    this.nextPhotoPointer = 0;
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
      <div class="scrapbook-master-viewport" id="scrapbookViewport">
        <!-- ==============================================================
             SPIRAL NOTEBOOK SPREAD CANVAS
             ============================================================== -->
        <main class="notebook-spread-canvas" id="notebookCanvas">
          <!-- Outer Stitched Margin Line -->
          <div class="notebook-stitched-line"></div>

          <!-- Spiral Wire Loops at Left Side -->
          <div class="notebook-spiral-strip" aria-hidden="true">
            ${Array.from({ length: 13 }).map(() => '<div class="spiral-wire-loop"></div>').join('')}
          </div>

          <!-- Top-Center Kraft Tape Strip on Notebook -->
          <div class="notebook-top-tape"></div>

          <!-- Top-Left Stamp: ♥ PARA SEMPRE ♥ -->
          ${getParaSempreStampSvg()}

          <!-- Adjacent Pink Heart Doodle -->
          <div class="stamp-adjacent-heart">
            ${getCoralHeartSvg(26, -14)}
          </div>

          <!-- Top-Right Coffee Ring Stain -->
          <div class="notebook-coffee-stain">
            ${getCoffeeRingSvg(100)}
          </div>

          <!-- Vintage Admission / Memory Ticket Scrap -->
          ${getVintageTicketSvg()}

          <!-- Crimson Wax Seal Stamp at Bottom Right -->
          <div class="notebook-wax-seal" title="Nosso Amor Eterno">
            ${getWaxSealSvg(46)}
          </div>

          <!-- Botanical Eucalyptus Branch Sprig on Right Margin -->
          <div class="notebook-botanical-branch">
            ${getBotanicalBranchSvg(85)}
          </div>

          <!-- Circular Postal Postmark Stamp -->
          <div class="notebook-circular-postmark">
            ${getCircularPostmarkSvg(80)}
          </div>

          <!-- Peeking Grid Paper Scrap behind Central Card -->
          <div class="peeking-grid-scrap"></div>

          <!-- Peeking Kraft Scrap near Bottom -->
          <div class="peeking-kraft-scrap">
            sempre nós 3 ♥
          </div>

          <!-- Handwritten Margin Inscriptions -->
          <div class="margin-note-left">
            nosso amor infinito ★
          </div>
          <div class="margin-note-right">
            minha família, meu tudo ♥
          </div>

          <!-- Scattered Doodles (Stars & Hearts) -->
          <div class="scattered-doodle" style="top: 18%; left: 33%;">
            ${getSparkleStarSvg(18)}
          </div>
          <div class="scattered-doodle" style="bottom: 18%; right: 33%;">
            ${getSparkleStarSvg(18)}
          </div>
          <div class="scattered-doodle" style="top: 24%; right: 29%;">
            ${getCoralHeartSvg(20, 15)}
          </div>
          <div class="scattered-doodle" style="bottom: 25%; left: 30%;">
            ${getCoralHeartSvg(18, -12)}
          </div>

          <!-- ==============================================================
               THE 4 POLAROIDS (EXACT MATCHING REFERENCE CORNERS)
               ============================================================== -->
          
          <!-- Polaroid 1: Top-Left (Mother & Son) -->
          <div class="polaroid-card polaroid--top-left" data-slot="0" title="Clique para trocar">
            <div class="tape-top-coral"></div>
            <div class="polaroid-photo-frame">
              <img class="polaroid-img" src="${p0.src}" alt="${p0.alt}" draggable="false" />
            </div>
            ${getGoldHeartStickerSvg(20)}
          </div>

          <!-- Polaroid 2: Top-Right (Baby in Bath) -->
          <div class="polaroid-card polaroid--top-right" data-slot="1" title="Clique para trocar">
            <div class="tape-top-mint"></div>
            <div class="polaroid-photo-frame">
              <img class="polaroid-img" src="${p1.src}" alt="${p1.alt}" draggable="false" />
            </div>
            ${getGoldHeartStickerSvg(20)}
          </div>

          <!-- Polaroid 3: Bottom-Left (Baby in Flannel at Bokeh Lights) -->
          <div class="polaroid-card polaroid--bottom-left" data-slot="2" title="Clique para trocar">
            <div class="tape-corner-blue"></div>
            <div class="polaroid-photo-frame">
              <img class="polaroid-img" src="${p2.src}" alt="${p2.alt}" draggable="false" />
            </div>
            ${getGoldHeartStickerSvg(20)}
          </div>

          <!-- Pressed Dried Baby's Breath Flower near Bottom-Left -->
          <div class="pressed-flower-container">
            ${getDriedFlowerSvg()}
            <div class="flower-stem-tape"></div>
          </div>

          <!-- Polaroid 4: Bottom-Right (Family Kiss at Christmas) -->
          <div class="polaroid-card polaroid--bottom-right" data-slot="3" title="Clique para trocar">
            <div class="tape-bottom-translucent"></div>
            <div class="tape-corner-pink"></div>
            <div class="polaroid-photo-frame">
              <img class="polaroid-img" src="${p3.src}" alt="${p3.alt}" draggable="false" />
            </div>
            ${getGoldHeartStickerSvg(20)}
          </div>

          <!-- ==============================================================
               CENTRAL TORN PAPER SHEET WITH BRONZE BINDER CLIP & EXACT MOTIF
               ============================================================== -->
          <div class="central-torn-sheet-container" id="centralContainer">
            <!-- Bronze Metal Binder Clip Fastener at Top Center -->
            <div class="binder-clip-fastener">
              ${getBinderClipSvg()}
            </div>
            <!-- Coral Tape Strip under Binder Clip -->
            <div class="binder-clip-tape-strip"></div>

            <!-- Left & Right Looping Blue Swirls & Coral Hearts Flanking Central Sheet -->
            <div class="side-flourish-left">
              ${getBlueSwirlSvg('left')}
              ${getCoralHeartSvg(26, -10)}
            </div>

            <div class="side-flourish-right">
              ${getBlueSwirlSvg('right')}
              ${getCoralHeartSvg(26, 12)}
            </div>

            <!-- The Ripped / Torn Paper Sheet Body -->
            <div class="torn-paper-body" id="tornPaperBody">
              <!-- Corner Tick Marks -->
              <div class="torn-paper-tick-left">
                ${getTickMarksSvg('left')}
              </div>
              <div class="torn-paper-tick-right">
                ${getTickMarksSvg('right')}
              </div>

              <!-- Main Central Phrase: Eu Amo VOCÊS DOIS -->
              <div class="central-message-group">
                <span class="msg-line-cursive">Eu Amo</span>
                <span class="msg-line-marker">VOCÊS DOIS</span>
              </div>

              <!-- Soft Wavy Coral Underline -->
              <svg viewBox="0 0 220 16" class="coral-wavy-underline-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 4,8 Q 30,2 60,9 T 120,8 T 170,9 T 216,6" 
                      stroke="#E57373" stroke-width="3.2" stroke-linecap="round" />
              </svg>

              <!-- Central Pastel Coral Infinity (∞) Motif -->
              <div class="infinity-motif-container">
                <svg viewBox="0 0 160 80" class="coral-infinity-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 80,40 C 95,18 126,12 142,26 C 158,40 156,62 138,70 C 120,78 95,58 80,40 C 65,22 40,2 22,10 C 4,18 2,40 20,54 C 38,68 65,60 80,40 Z" 
                        stroke="#E57373" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>

              <!-- Sparkles & Coral Heart under Infinity -->
              <div class="infinity-sub-accents">
                ${getSparkleStarSvg(22)}
                ${getCoralHeartSvg(26, 0)}
                ${getSparkleStarSvg(22)}
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

    // Pick next unshown photo in catalog
    let nextIdx = (this.nextPhotoPointer + 1) % this.photos.length;
    while (this.slotIndices.includes(nextIdx)) {
      nextIdx = (nextIdx + 1) % this.photos.length;
    }
    this.nextPhotoPointer = nextIdx;
    this.slotIndices[slotIndex] = nextIdx;
    const nextPhoto = this.photos[nextIdx];

    const imgEl = polaroidEl.querySelector('.polaroid-img');
    if (!imgEl) return;

    const tl = gsap.timeline();
    tl.to(polaroidEl, {
      scale: 1.06,
      y: -5,
      boxShadow: '0 24px 55px rgba(45, 30, 15, 0.32)',
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
      boxShadow: '0 16px 36px rgba(45, 30, 15, 0.22)',
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3');
  }

  startPhotoCycling() {
    if (this.cycleInterval) {
      clearInterval(this.cycleInterval);
    }
    // Rotate one polaroid every 3.5 seconds sequentially
    this.cycleInterval = setInterval(() => {
      this.transitionSlot(this.currentCycleSlot);
      this.currentCycleSlot = (this.currentCycleSlot + 1) % 4;
    }, 3500);
  }

  initInteractions() {
    // Unlock and play Los Hermanos audio on first interaction
    const unlockAudio = () => {
      this.bgMusic.play();
    };
    window.addEventListener('pointerdown', unlockAudio, { once: true, passive: true });
    window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
    window.addEventListener('keydown', unlockAudio, { once: true, passive: true });

    // Click on any polaroid to immediately swap photo
    this.polaroidEls.forEach((card, idx) => {
      if (card) {
        card.addEventListener('click', () => {
          this.transitionSlot(idx);
        });
      }
    });

    // Subtle 3D tilt on Canvas and Central Sheet
    const canvas = document.getElementById('notebookCanvas');
    const central = document.getElementById('centralContainer');

    window.addEventListener('pointermove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      if (canvas) {
        gsap.to(canvas, {
          rotateX: -y * 2.0,
          rotateY: x * 2.0,
          duration: 0.6,
          ease: 'power2.out'
        });
      }

      if (central) {
        gsap.to(central, {
          x: x * 5,
          y: y * 3,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    }, { passive: true });
  }

  initEntranceAnimation() {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Notebook Canvas settles onto desk
    tl.fromTo('#notebookCanvas', 
      { scale: 0.94, opacity: 0, rotate: -1.5 }, 
      { scale: 1, opacity: 1, rotate: 0, duration: 1.2 }
    );

    // Polaroids drop into place with organic rotation
    tl.fromTo('.polaroid-card', 
      { scale: 0.82, opacity: 0, y: -18 }, 
      { scale: 1, opacity: 1, y: 0, stagger: 0.12, duration: 0.8 }, 
      '-=0.7'
    );

    // Central Card settles into place
    tl.fromTo('#centralContainer', 
      { scale: 0.9, opacity: 0, y: 12 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.9 }, 
      '-=0.5'
    );
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
