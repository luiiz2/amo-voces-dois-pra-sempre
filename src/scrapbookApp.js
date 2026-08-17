/**
 * ============================================================================
 * LUIZ — JUNK JOURNAL / HANDMADE SCRAPBOOK APPLICATION
 * An authentic digital art journal crafted with organic paper textures,
 * physical washi tape, polaroids, hand-drawn doodles, and tactile motion.
 * ============================================================================
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  getArrowSvg,
  getCircleSvg,
  getStarSvg,
  getHeartSvg,
  getUnderlineSvg,
  getPushpinSvg,
  getPaperClipSvg,
  getPostmarkSvg,
  getCoffeeStainSvg
} from './graphics/scrapbookDoodles.js';

import './styles/scrapbook.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export class ScrapbookApp {
  constructor(rootContainer) {
    this.root = rootContainer || document.getElementById('app');
    this.init();
  }

  init() {
    this.render();
    this.initInteractions();
    this.initScrollAnimations();
  }

  render() {
    this.root.innerHTML = `
      <div class="journal-viewport">
        <!-- ================================================================
             1. HERO SPREAD (JOURNAL COVER & OPENING ENTRY)
             ================================================================ -->
        <section class="journal-spread hero-spread" id="heroSpread">
          <!-- Spiral Binding on side -->
          <div class="journal-spiral-binding" aria-hidden="true">
            ${Array.from({ length: 14 }).map(() => '<div class="spiral-ring"></div>').join('')}
          </div>

          <!-- Top Meta Inscription -->
          <div class="hero-top-meta">
            <div class="meta-field-note">
              <strong>VOL. XXIV</strong> — FIELD NOTES & EXPERIMENTS
            </div>
            <div class="meta-field-date">
              EST. 2026 ★ BRAZIL
            </div>
          </div>

          <!-- Washi Tape Fastener -->
          <div class="washi-tape tape--mustard tape--top-center">
            CREATIVE DEV
          </div>

          <!-- Giant Collage Cutout: L U I Z -->
          <div class="hero-title-collage" id="heroCollage">
            <div class="cutout-letter letter--l">L</div>
            <div class="cutout-letter letter--u">U</div>
            <div class="cutout-letter letter--i">I</div>
            <div class="cutout-letter letter--z">Z</div>
            
            <!-- Stamp near title -->
            <div class="postage-stamp" style="margin-left: 12px;">
              <div class="postage-stamp-inner">
                <div class="stamp-price">0.45¢</div>
                <div class="stamp-title">HANDMADE</div>
              </div>
            </div>
          </div>

          <!-- Subtitle Block -->
          <div class="hero-subtitle-block">
            <div class="dymo-label">CREATIVE DEVELOPER</div>
            <div class="hero-handwritten-claim">
              & Digital Craftsman
            </div>
          </div>

          <!-- Handwritten Subtitle Underline -->
          <div style="margin-top: 4px; margin-bottom: 24px;">
            ${getUnderlineSvg('#E27D60', 260, 24)}
          </div>

          <!-- Hero Scrapbook Elements (Polaroid + Postmark) -->
          <div class="hero-scrapbook-elements">
            <div class="hero-polaroid">
              <div class="washi-tape tape--sage tape--top-center" style="top: -10px; width: 70px; height: 22px;">
                NOTE
              </div>
              <div class="polaroid-img-frame">
                <img src="./photo_2026-08-17_15-18-05.jpg" alt="Luiz snapshot" draggable="false" />
              </div>
              <div class="polaroid-caption">workbench view ☕</div>
            </div>

            <!-- Cancellation Postmark -->
            <div style="transform: rotate(-6deg); margin-top: 8px;">
              ${getPostmarkSvg('VERIFIED * 2026', 'SCRAPBOOK LAB')}
            </div>
          </div>

          <!-- Curving Arrow pointing to scroll -->
          <div style="margin-top: 36px; display: flex; align-items: center; gap: 14px;">
            <span style="font-family: var(--font-hand-caveat); font-size: 1.45rem; color: var(--ink-blue-fountain); font-weight: 700; transform: rotate(-3deg);">
              flip through my creative notebook ↓
            </span>
            ${getArrowSvg('curve-down-right', '#1D2A44', 80, 50)}
          </div>

          <!-- Coffee Stain Accent -->
          <div style="position: absolute; bottom: 20px; right: 40px; pointer-events: none;">
            ${getCoffeeStainSvg(120)}
          </div>
        </section>


        <!-- ================================================================
             2. ABOUT SPREAD (CADERNO DE ANOTAÇÕES / SOBRE MIM)
             ================================================================ -->
        <section class="journal-spread" id="aboutSpread">
          <!-- Pushpin at Top -->
          <div class="scrapbook-pin-holder">
            ${getPushpinSvg()}
          </div>

          <!-- Washi Tape on corner -->
          <div class="washi-tape tape--rose tape--top-left">
            PAGE 02
          </div>

          <div class="section-handwritten-title">
            About the Craftsman
          </div>

          <div class="about-grid">
            <!-- Left Side: Lined Paper Journal Entry -->
            <div class="journal-entry-card paper-lined">
              <p class="typewriter-paragraph">
                Hello! I am <strong>Luiz</strong>, a creative technologist and frontend engineer dedicated to building bespoke, tactile, and emotionally resonant digital experiences.
              </p>
              <p class="typewriter-paragraph">
                I believe modern websites don't have to look like identical corporate templates. I craft software with the same care, curiosity, and texture as an artist filling a personal sketchbook.
              </p>
              <div class="handwritten-annotation">
                "Code is just another medium for human craft."
              </div>
              <p class="typewriter-paragraph" style="margin-bottom: 0;">
                Specializing in interactive WebGL, GSAP physics, micro-interactions, responsive architecture, and creative vector geometry.
              </p>
            </div>

            <!-- Right Side: Layered Notes & Trivia Scraps -->
            <div class="about-scraps-column">
              <!-- Sticky Note: Philosophy -->
              <div class="sticky-note-yellow">
                <div class="washi-tape tape--sky tape--top-center" style="top: -10px; width: 60px; height: 20px;">
                  FOCUS
                </div>
                <div style="font-weight: bold; margin-bottom: 6px; font-family: var(--font-marker);">Things I love:</div>
                <ul style="padding-left: 18px; line-height: 1.6;">
                  <li>Cinematic 60fps animations</li>
                  <li>Typography with character</li>
                  <li>Procedural sound & Web Audio</li>
                  <li>Tactile physical metaphors</li>
                </ul>
              </div>

              <!-- Kraft Paper Snippet -->
              <div class="sticky-note-kraft">
                <div class="scrapbook-paperclip-holder">
                  ${getPaperClipSvg()}
                </div>
                <div style="font-family: var(--font-typewriter); font-size: 0.78rem; color: #443322;">
                  <strong>STATUS:</strong> Available for creative collaborations & ambitious web projects worldwide.
                </div>
              </div>
            </div>
          </div>
        </section>


        <!-- ================================================================
             3. SELECTED PROJECTS SPREAD (PROJETOS EM FOTOGRAFIAS)
             ================================================================ -->
        <section class="journal-spread" id="projectsSpread">
          <!-- Washi tape at Top -->
          <div class="washi-tape tape--mustard tape--top-center">
            SELECTED WORKS
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 8px;">
            <div class="section-handwritten-title">
              Crafted Projects & Experiments
            </div>
            <div style="font-family: var(--font-hand-kalam); font-size: 1.1rem; color: var(--ink-red-stamp); transform: rotate(2deg);">
              [ Click to explore notes ]
            </div>
          </div>

          <div class="projects-collage-grid">
            <!-- Project 1: Aura Creative Lab -->
            <article class="project-scrapbook-card">
              <div class="washi-tape tape--ochre tape--top-left">
                WEBGL / 3D
              </div>
              <div class="project-photo-wrapper">
                <img src="./photo_2026-08-17_15-17-48.jpg" alt="Aura Creative Lab preview" draggable="false" />
              </div>
              <div class="project-tag-strip">
                <span class="mini-tag-tape">Three.js</span>
                <span class="mini-tag-tape">GLSL Shaders</span>
                <span class="mini-tag-tape">GSAP</span>
              </div>
              <h3 class="project-handwritten-title">Aura Creative Lab</h3>
              <p class="project-desc">
                An interactive audiovisual playground exploring real-time GPU particle simulation and generative geometry.
              </p>
              <div class="project-links-row">
                <a href="#projectsSpread" class="scrapbook-link">View Project ↗</a>
                <span style="font-family: var(--font-hand-caveat); font-size: 1.05rem; color: var(--ink-pencil);">2026</span>
              </div>
            </article>

            <!-- Project 2: Vesper Editorial -->
            <article class="project-scrapbook-card">
              <div class="washi-tape tape--sage tape--top-right">
                EDITORIAL
              </div>
              <div class="project-photo-wrapper">
                <img src="./photo_2026-08-17_15-17-50.jpg" alt="Vesper Editorial preview" draggable="false" />
              </div>
              <div class="project-tag-strip">
                <span class="mini-tag-tape">Typography</span>
                <span class="mini-tag-tape">Canvas</span>
                <span class="mini-tag-tape">Zero-Scroll</span>
              </div>
              <h3 class="project-handwritten-title">Vesper Editorial</h3>
              <p class="project-desc">
                Digital archival publication celebrating luxury typography, continuous spline morphing, and Ken Burns motion.
              </p>
              <div class="project-links-row">
                <a href="#projectsSpread" class="scrapbook-link">View Project ↗</a>
                <span style="font-family: var(--font-hand-caveat); font-size: 1.05rem; color: var(--ink-pencil);">2026</span>
              </div>
            </article>

            <!-- Project 3: Komorebi Soundscapes -->
            <article class="project-scrapbook-card">
              <div class="washi-tape tape--sky tape--top-left">
                WEB AUDIO
              </div>
              <div class="project-photo-wrapper">
                <img src="./photo_2026-08-17_15-17-55.jpg" alt="Komorebi Soundscapes preview" draggable="false" />
              </div>
              <div class="project-tag-strip">
                <span class="mini-tag-tape">Web Audio API</span>
                <span class="mini-tag-tape">Synthesis</span>
                <span class="mini-tag-tape">Generative</span>
              </div>
              <h3 class="project-handwritten-title">Komorebi Audio</h3>
              <p class="project-desc">
                Procedural ambient synthesizer generating infinite harmonic chord progressions and dynamic binaural filters.
              </p>
              <div class="project-links-row">
                <a href="#projectsSpread" class="scrapbook-link">View Project ↗</a>
                <span style="font-family: var(--font-hand-caveat); font-size: 1.05rem; color: var(--ink-pencil);">2025</span>
              </div>
            </article>

            <!-- Project 4: Botanica Archive -->
            <article class="project-scrapbook-card">
              <div class="washi-tape tape--rose tape--top-right">
                DATA / UI
              </div>
              <div class="project-photo-wrapper">
                <img src="./photo_2026-08-17_15-17-57.jpg" alt="Botanica Archive preview" draggable="false" />
              </div>
              <div class="project-tag-strip">
                <span class="mini-tag-tape">TypeScript</span>
                <span class="mini-tag-tape">Next.js</span>
                <span class="mini-tag-tape">Tailwind</span>
              </div>
              <h3 class="project-handwritten-title">Botanica Archive</h3>
              <p class="project-desc">
                An interactive field herbarium documenting plant taxonomy with botanical sketches and interactive filters.
              </p>
              <div class="project-links-row">
                <a href="#projectsSpread" class="scrapbook-link">View Project ↗</a>
                <span style="font-family: var(--font-hand-caveat); font-size: 1.05rem; color: var(--ink-pencil);">2025</span>
              </div>
            </article>
          </div>
        </section>


        <!-- ================================================================
             4. SKILLS SPREAD (FERRAMENTAS DO OFÍCIO / INDEX CARD)
             ================================================================ -->
        <section class="journal-spread" id="skillsSpread">
          <!-- Tape at corner -->
          <div class="washi-tape tape--kraft tape--top-right">
            TOOLBOX
          </div>

          <div class="section-handwritten-title">
            Toolbag & Craftsmanship
          </div>

          <div class="skills-index-card">
            <!-- Group 1: Core Technologies -->
            <div class="skills-category-group">
              <div class="skills-cat-header">
                <span class="dymo-label">01</span>
                <h4 class="skills-cat-title">Frontend & Interactive Architecture</h4>
              </div>
              <div class="skills-pill-cloud">
                <span class="skill-sticker" style="--rot: -2deg;">⚡ JavaScript (ESNext)</span>
                <span class="skill-sticker" style="--rot: 1.5deg;">🛡️ TypeScript</span>
                <span class="skill-sticker" style="--rot: -1deg;">⚛️ React / Next.js</span>
                <span class="skill-sticker" style="--rot: 2.5deg;">🚀 Vite / Rollup</span>
                <span class="skill-sticker" style="--rot: -3deg;">🎨 Modern CSS / Grid</span>
                <span class="skill-sticker" style="--rot: 1deg;">📐 HTML5 Semantics</span>
              </div>
            </div>

            <!-- Group 2: Creative Graphics & Motion -->
            <div class="skills-category-group">
              <div class="skills-cat-header">
                <span class="dymo-label">02</span>
                <h4 class="skills-cat-title">Creative Motion & Vector Geometry</h4>
              </div>
              <div class="skills-pill-cloud">
                <span class="skill-sticker" style="--rot: 1.8deg;">🎬 GSAP 3 & ScrollTrigger</span>
                <span class="skill-sticker" style="--rot: -2.5deg;">🌐 WebGL & Three.js</span>
                <span class="skill-sticker" style="--rot: 2deg;">✏️ SVG Math & Bézier Splines</span>
                <span class="skill-sticker" style="--rot: -1.5deg;">💎 GPU Compositing (60fps)</span>
                <span class="skill-sticker" style="--rot: 3deg;">🎵 Web Audio API Synthesis</span>
              </div>
            </div>

            <!-- Group 3: Design & Craft -->
            <div class="skills-category-group" style="margin-bottom: 0;">
              <div class="skills-cat-header">
                <span class="dymo-label">03</span>
                <h4 class="skills-cat-title">Design Craft & Creative Direction</h4>
              </div>
              <div class="skills-pill-cloud">
                <span class="skill-sticker" style="--rot: -2deg;">✒️ Editorial Typography</span>
                <span class="skill-sticker" style="--rot: 1deg;">📐 Responsive Collage Layouts</span>
                <span class="skill-sticker" style="--rot: -1.8deg;">🎭 Microinteractions</span>
                <span class="skill-sticker" style="--rot: 2deg;">🧪 UI / UX Prototyping</span>
              </div>
            </div>

            <!-- Verified Stamp -->
            <div style="position: absolute; bottom: 20px; right: 25px; transform: rotate(12deg);">
              <div class="sticker-badge">
                APPROVED<br>100%
              </div>
            </div>
          </div>
        </section>


        <!-- ================================================================
             5. CONTACT SPREAD (AIRMAIL POSTCARD / DEIXE UM RECADO)
             ================================================================ -->
        <section class="journal-spread" id="contactSpread">
          <div class="washi-tape tape--mustard tape--top-center">
            SPECIAL DELIVERY
          </div>

          <div class="section-handwritten-title">
            Send a Postcard / Say Hello
          </div>

          <div class="postcard-wrapper">
            <!-- Airmail Stripe -->
            <div class="airmail-stripe"></div>

            <div class="postcard-grid">
              <!-- Left Side: Message from Luiz -->
              <div class="postcard-message-side">
                <p style="font-family: var(--font-hand-caveat); font-size: 1.7rem; color: var(--ink-blue-fountain); font-weight: 700; margin-bottom: 12px;">
                  Dear Visitor,
                </p>
                <p class="typewriter-paragraph">
                  Thank you for taking a moment to flip through my creative scrapbook. If you have an exciting project, an artistic challenge, or simply want to chat about creative code, my inbox is always open!
                </p>
                <p style="font-family: var(--font-hand-caveat); font-size: 1.5rem; color: var(--ink-red-stamp); font-weight: 700; margin-top: 18px;">
                  Warmly,<br/>
                  <span style="font-family: var(--font-marker); font-size: 1.8rem; color: var(--ink-blue-dark);">Luiz</span>
                </p>
              </div>

              <!-- Right Side: Address & Action Links -->
              <div class="postcard-address-side">
                <!-- Stamp & Postmark -->
                <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px;">
                  <div style="transform: rotate(-4deg);">
                    ${getPostmarkSvg('EXPEDITED', 'WORLDWIDE')}
                  </div>
                  <div class="postage-stamp">
                    <div class="postage-stamp-inner">
                      <div class="stamp-price">AIR MAIL</div>
                      <div class="stamp-title">2026</div>
                    </div>
                  </div>
                </div>

                <!-- Contact Action Buttons -->
                <div class="postcard-lines">
                  <a href="mailto:contact@luiz.dev" class="contact-action-btn">
                    <span>✉️</span>
                    <span>Email: contact@luiz.dev</span>
                  </a>
                  <a href="https://github.com/luiiz2" target="_blank" rel="noopener noreferrer" class="contact-action-btn">
                    <span>🐙</span>
                    <span>GitHub: github.com/luiiz2</span>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="contact-action-btn">
                    <span>💼</span>
                    <span>LinkedIn: in/luiz</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Closing Handwritten Note -->
            <div style="text-align: center; margin-top: 32px; border-top: 1px dashed rgba(60, 45, 30, 0.2); padding-top: 16px;">
              <span style="font-family: var(--font-hand-caveat); font-size: 1.35rem; color: var(--ink-pencil);">
                ★ Handmade with code, paper scraps, and love ★
              </span>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  initInteractions() {
    // Polaroid interactive tilt on hover
    const polaroids = document.querySelectorAll('.hero-polaroid, .project-scrapbook-card');
    polaroids.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateX: -y * 8,
          rotateY: x * 8,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });

    // Sticker wobble on click
    const stickers = document.querySelectorAll('.skill-sticker, .sticker-badge');
    stickers.forEach((sticker) => {
      sticker.addEventListener('click', () => {
        gsap.fromTo(
          sticker,
          { scale: 1.2, rotate: -8 },
          { scale: 1, rotate: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' }
        );
      });
    });
  }

  initScrollAnimations() {
    // Animate journal spreads sliding in smoothly
    const spreads = document.querySelectorAll('.journal-spread');
    spreads.forEach((spread, index) => {
      if (index === 0) return; // Skip hero

      gsap.from(spread, {
        scrollTrigger: {
          trigger: spread,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0.85,
        duration: 0.9,
        ease: 'power2.out'
      });
    });

    // Animate project cards staggered entry
    const projectCards = document.querySelectorAll('.project-scrapbook-card');
    if (projectCards.length > 0) {
      gsap.from(projectCards, {
        scrollTrigger: {
          trigger: '#projectsSpread',
          start: 'top 75%'
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out'
      });
    }

    // Animate SVG doodle paths drawing themselves
    const drawPaths = document.querySelectorAll('.doodle-draw-path');
    drawPaths.forEach((path) => {
      const length = path.getTotalLength ? path.getTotalLength() : 300;
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      gsap.to(path, {
        scrollTrigger: {
          trigger: path,
          start: 'top 90%'
        },
        strokeDashoffset: 0,
        duration: 1.4,
        ease: 'power1.inOut'
      });
    });
  }
}

export default ScrapbookApp;
