/**
 * ============================================================================
 * AMO VOCÊS DOIS PRA SEMPRE — MOTION DIRECTOR & TIMELINE SPECIFICATION
 * Master Choreography, Layout Coordinate Matrix & Cinematic Camera Engine
 * ============================================================================
 * 
 * Rules:
 * 1. ONLY permitted visible text: 'AMO VOCÊS DOIS PRA SEMPRE' (and fragments 'AMO', 'VOCÊS DOIS', 'PRA SEMPRE')
 * 2. 60-second continuous fluid timeline (Act I: 0-12s, Act II: 12-24s, Act III: 24-36s, Act IV: 36-48s, Act V: 48-65s+)
 * 3. 100vw x 100svh strict containment (Zero scrolling across Desktop, Tablet, Mobile)
 * 4. 13 Curated archival photographs mapped with organic camera drift, clip reveals and SVG lines.
 */

export const PALETTE = {
  bgAlabaster: '#FAF7F2',
  bgWarmIvory: '#F5EFE6',
  bgParchment: '#EFE8DC',
  bgTranslucentVeil: 'rgba(250, 247, 242, 0.88)',
  charcoalObsidian: '#141312',
  charcoalSlate: '#1C1A18',
  charcoalSoft: '#2B2826',
  charcoalMuted: '#524E4A',
  goldChampagne: '#C59B27',
  goldBurnished: '#B3861B',
  goldShimmer: '#E5C158',
  terracottaWarm: '#C48B5E',
  terracottaRich: '#A66338',
  roseDust: '#C9A99A',
};

export const EASINGS = {
  cinematicSlow: 'cubic-bezier(0.22, 1, 0.36, 1)',
  drift: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  softOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  silkInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  springSubtle: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

/**
 * 13 Archival Photographs Registry
 */
export const ARCHIVE_PHOTOS = [
  { id: 'p01', src: '/photo_2026-08-17_15-17-46.jpg', aspect: '4/5', mood: 'intimate_start', weight: 1.0 },
  { id: 'p02', src: '/photo_2026-08-17_15-17-48.jpg', aspect: '3/4', mood: 'affection_warmth', weight: 0.95 },
  { id: 'p03', src: '/photo_2026-08-17_15-17-50.jpg', aspect: '4/5', mood: 'candid_joy', weight: 0.95 },
  { id: 'p04', src: '/photo_2026-08-17_15-17-53.jpg', aspect: '1/1', mood: 'architectural_portrait', weight: 0.9 },
  { id: 'p05', src: '/photo_2026-08-17_15-17-54.jpg', aspect: '4/5', mood: 'gentle_smile', weight: 0.9 },
  { id: 'p06', src: '/photo_2026-08-17_15-17-55.jpg', aspect: '3/4', mood: 'shared_gaze', weight: 0.92 },
  { id: 'p07', src: '/photo_2026-08-17_15-17-57.jpg', aspect: '4/5', mood: 'golden_hour', weight: 0.92 },
  { id: 'p08', src: '/photo_2026-08-17_15-17-58.jpg', aspect: '16/11', mood: 'landscape_embrace', weight: 1.0 },
  { id: 'p09', src: '/photo_2026-08-17_15-17-59.jpg', aspect: '3/4', mood: 'radiant_laughter', weight: 1.0 },
  { id: 'p10', src: '/photo_2026-08-17_15-18-01.jpg', aspect: '4/5', mood: 'timeless_poise', weight: 0.96 },
  { id: 'p11', src: '/photo_2026-08-17_15-18-02.jpg', aspect: '4/5', mood: 'deep_connection', weight: 0.96 },
  { id: 'p12', src: '/photo_2026-08-17_15-18-03.jpg', aspect: '3/4', mood: 'monumental_serenity', weight: 1.0 },
  { id: 'p13', src: '/photo_2026-08-17_15-18-05.jpg', aspect: '4/5', mood: 'eternal_harmony', weight: 1.05 }
];

/**
 * 60-Second Master Acts Choreography Specification
 */
export const TIMELINE_ACTS = [
  {
    act: 1,
    titleId: 'ACT_I_DESPERTAR',
    startSec: 0.0,
    endSec: 12.0,
    phrase: {
      text: 'AMO',
      fragmentKey: 'amo',
      cssClass: 'phrase-act-1',
      enterSec: 1.2,
      exitSec: 11.2,
      splitMode: 'chars',
      staggerMs: 140,
    },
    photos: [
      {
        id: 'p01',
        role: 'hero_monolith',
        frameStyle: 'arch',
        enterSec: 0.4,
        exitSec: 11.8,
        drift: {
          scaleStart: 1.0,
          scaleEnd: 1.05,
          panXStart: 0,
          panXEnd: -15,
          panYStart: 10,
          panYEnd: -10,
        },
        clipReveal: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
      }
    ],
    svgPaths: [
      {
        id: 'line-act-1',
        d: 'M 15 85 Q 50 15 85 85',
        drawStart: 0.8,
        drawDuration: 7.0,
        color: PALETTE.goldChampagne,
      }
    ],
    camera: {
      driftScale: [1.0, 1.03],
      panX: [0, 10],
      panY: [0, -8],
    }
  },
  {
    act: 2,
    titleId: 'ACT_II_DANCA_MEMORIAS',
    startSec: 12.0,
    endSec: 24.0,
    phrase: {
      text: 'VOCÊS DOIS',
      fragmentKey: 'voces_dois',
      cssClass: 'phrase-act-2',
      enterSec: 13.0,
      exitSec: 23.2,
      splitMode: 'words',
      staggerMs: 180,
    },
    photos: [
      {
        id: 'p02',
        role: 'diptych_primary',
        frameStyle: 'soft',
        enterSec: 12.2,
        exitSec: 23.8,
        drift: {
          scaleStart: 1.02,
          scaleEnd: 1.07,
          panXStart: 10,
          panXEnd: -10,
          panYStart: 0,
          panYEnd: 12,
        }
      },
      {
        id: 'p03',
        role: 'diptych_secondary',
        frameStyle: 'deckled',
        enterSec: 13.4,
        exitSec: 23.8,
        drift: {
          scaleStart: 1.0,
          scaleEnd: 1.06,
          panXStart: -8,
          panXEnd: 12,
          panYStart: -6,
          panYEnd: 8,
        }
      },
      {
        id: 'p04',
        role: 'ambient_floating_memory',
        frameStyle: 'oval',
        enterSec: 15.0,
        exitSec: 22.5,
        drift: {
          scaleStart: 0.95,
          scaleEnd: 1.02,
          panXStart: 0,
          panXEnd: 0,
          panYStart: 15,
          panYEnd: -15,
        }
      }
    ],
    svgPaths: [
      {
        id: 'line-act-2',
        d: 'M 10 50 C 35 20, 65 80, 90 50',
        drawStart: 12.4,
        drawDuration: 8.5,
        color: PALETTE.terracottaWarm,
      }
    ],
    camera: {
      driftScale: [1.02, 1.05],
      panX: [10, -12],
      panY: [-8, 6],
    }
  },
  {
    act: 3,
    titleId: 'ACT_III_CONSTELACAO_AFETO',
    startSec: 24.0,
    endSec: 36.0,
    phrase: {
      text: 'AMO VOCÊS DOIS',
      fragmentKey: 'amo_voces_dois',
      cssClass: 'phrase-act-3',
      enterSec: 25.0,
      exitSec: 35.2,
      splitMode: 'words',
      staggerMs: 160,
    },
    photos: [
      {
        id: 'p05',
        role: 'triptych_left',
        frameStyle: 'soft',
        enterSec: 24.2,
        exitSec: 35.8,
        drift: { scaleStart: 1.0, scaleEnd: 1.05, panXStart: -5, panXEnd: 5, panYStart: 0, panYEnd: -8 }
      },
      {
        id: 'p06',
        role: 'triptych_center',
        frameStyle: 'arch',
        enterSec: 24.8,
        exitSec: 35.8,
        drift: { scaleStart: 1.02, scaleEnd: 1.06, panXStart: 0, panXEnd: 0, panYStart: 8, panYEnd: -8 }
      },
      {
        id: 'p07',
        role: 'triptych_right',
        frameStyle: 'soft',
        enterSec: 25.4,
        exitSec: 35.8,
        drift: { scaleStart: 1.0, scaleEnd: 1.05, panXStart: 6, panXEnd: -6, panYStart: -6, panYEnd: 6 }
      },
      {
        id: 'p08',
        role: 'constellation_echo',
        frameStyle: 'deckled',
        enterSec: 26.5,
        exitSec: 34.5,
        drift: { scaleStart: 0.98, scaleEnd: 1.04, panXStart: 0, panXEnd: 10, panYStart: 10, panYEnd: 0 }
      }
    ],
    svgPaths: [
      {
        id: 'line-act-3',
        d: 'M 15 20 L 50 80 L 85 20 Z',
        drawStart: 24.5,
        drawDuration: 9.0,
        color: PALETTE.goldChampagne,
      }
    ],
    camera: {
      driftScale: [1.0, 1.04],
      panX: [-8, 8],
      panY: [6, -6],
    }
  },
  {
    act: 4,
    titleId: 'ACT_IV_VOTO_ETERNO',
    startSec: 36.0,
    endSec: 48.0,
    phrase: {
      text: 'PRA SEMPRE',
      fragmentKey: 'pra_sempre',
      cssClass: 'phrase-act-4',
      enterSec: 37.0,
      exitSec: 47.2,
      splitMode: 'chars',
      staggerMs: 110,
    },
    photos: [
      {
        id: 'p09',
        role: 'monolith_altar',
        frameStyle: 'arch',
        enterSec: 36.3,
        exitSec: 47.8,
        drift: { scaleStart: 1.0, scaleEnd: 1.07, panXStart: 0, panXEnd: 0, panYStart: 12, panYEnd: -12 }
      },
      {
        id: 'p10',
        role: 'echo_wing_left',
        frameStyle: 'soft',
        enterSec: 37.2,
        exitSec: 46.8,
        drift: { scaleStart: 0.96, scaleEnd: 1.02, panXStart: -10, panXEnd: 5, panYStart: 0, panYEnd: 0 }
      },
      {
        id: 'p11',
        role: 'echo_wing_right',
        frameStyle: 'soft',
        enterSec: 37.8,
        exitSec: 46.8,
        drift: { scaleStart: 0.96, scaleEnd: 1.02, panXStart: 10, panXEnd: -5, panYStart: 0, panYEnd: 0 }
      },
      {
        id: 'p12',
        role: 'intimate_accent',
        frameStyle: 'oval',
        enterSec: 39.0,
        exitSec: 46.0,
        drift: { scaleStart: 1.0, scaleEnd: 1.04, panXStart: 0, panXEnd: 0, panYStart: -8, panYEnd: 8 }
      }
    ],
    svgPaths: [
      {
        id: 'line-act-4',
        d: 'M 50 10 Q 90 50 50 90 Q 10 50 50 10',
        drawStart: 36.8,
        drawDuration: 8.0,
        color: PALETTE.goldBurnished,
      }
    ],
    camera: {
      driftScale: [1.03, 1.06],
      panX: [0, 0],
      panY: [10, -10],
    }
  },
  {
    act: 5,
    titleId: 'ACT_V_APOTEOSE_ETERNA',
    startSec: 48.0,
    endSec: 65.0,
    phrase: {
      text: 'AMO VOCÊS DOIS PRA SEMPRE',
      fragmentKey: 'full_triumph',
      cssClass: 'phrase-act-5',
      enterSec: 50.0,
      exitSec: 65.0,
      splitMode: 'lines',
      staggerMs: 350,
      lines: [
        { text: 'AMO', class: 'line-1' },
        { text: 'VOCÊS DOIS', class: 'line-2' },
        { text: 'PRA SEMPRE', class: 'line-3' }
      ]
    },
    photos: ARCHIVE_PHOTOS.map((p, idx) => ({
      id: p.id,
      role: `mosaic_cell_${idx + 1}`,
      frameStyle: idx % 3 === 0 ? 'arch' : (idx % 2 === 0 ? 'oval' : 'soft'),
      enterSec: 48.2 + (idx * 0.15),
      exitSec: 65.0,
      drift: {
        scaleStart: 1.0,
        scaleEnd: 1.04 + (idx * 0.003),
        panXStart: (idx % 2 === 0 ? 3 : -3),
        panXEnd: (idx % 2 === 0 ? -3 : 3),
        panYStart: (idx % 3 === 0 ? 4 : -4),
        panYEnd: (idx % 3 === 0 ? -4 : 4),
      }
    })),
    svgPaths: [
      {
        id: 'line-act-5-infinity',
        d: 'M 30 50 C 30 35, 45 35, 50 50 C 55 65, 70 65, 70 50 C 70 35, 55 35, 50 50 C 45 65, 30 65, 30 50 Z',
        drawStart: 49.0,
        drawDuration: 10.0,
        color: PALETTE.goldChampagne,
      }
    ],
    camera: {
      driftScale: [1.02, 1.06],
      panX: [0, 0],
      panY: [0, 0],
    }
  }
];

/**
 * Responsive Coordinate Matrix strictly bounded in 100vw x 100svh
 */
export const RESPONSIVE_LAYOUT_MATRIX = {
  desktop: {
    minWidth: 1024,
    act1: {
      photo: { left: '55%', top: '50%', width: 'min(34vw, 420px)', height: 'min(58vh, 560px)', transform: 'translate(-50%, -50%)' },
      phrase: { left: '12%', top: '50%', transform: 'translateY(-50%)', textAlign: 'left', width: '38vw' }
    },
    act2: {
      photoLeft: { left: '20%', top: '48%', width: 'min(28vw, 360px)', height: 'min(52vh, 500px)', transform: 'translateY(-50%) rotate(-1.5deg)' },
      photoRight: { left: '48%', top: '52%', width: 'min(30vw, 380px)', height: 'min(56vh, 540px)', transform: 'translateY(-50%) rotate(1.8deg)' },
      phrase: { right: '8%', top: '50%', transform: 'translateY(-50%)', textAlign: 'right', width: '32vw' }
    },
    act3: {
      photo1: { left: '10%', top: '42%', width: 'min(22vw, 290px)', height: 'min(44vh, 410px)', transform: 'translateY(-50%) rotate(-2.2deg)' },
      photo2: { left: '37.5%', top: '50%', width: 'min(25vw, 330px)', height: 'min(54vh, 490px)', transform: 'translateY(-50%)' },
      photo3: { left: '68%', top: '56%', width: 'min(21vw, 280px)', height: 'min(42vh, 390px)', transform: 'translateY(-50%) rotate(2.4deg)' },
      phrase: { left: '50%', bottom: '8%', transform: 'translateX(-50%)', textAlign: 'center', width: '80vw' }
    },
    act4: {
      photoCenter: { left: '50%', top: '48%', width: 'min(36vw, 460px)', height: 'min(62vh, 580px)', transform: 'translate(-50%, -50%)' },
      photoEchoLeft: { left: '14%', top: '54%', width: 'min(18vw, 240px)', height: 'min(36vh, 320px)', transform: 'translateY(-50%)' },
      photoEchoRight: { right: '14%', top: '42%', width: 'min(18vw, 240px)', height: 'min(36vh, 320px)', transform: 'translateY(-50%)' },
      phrase: { left: '50%', top: '8%', transform: 'translateX(-50%)', textAlign: 'center', width: '80vw' }
    },
    act5: {
      phrase: { left: '50%', bottom: '5%', transform: 'translateX(-50%)', textAlign: 'center' }
    }
  },
  tablet: {
    minWidth: 768,
    maxWidth: 1023,
    act1: {
      photo: { left: '50%', top: '42%', width: '48vw', height: '52vh', transform: 'translate(-50%, -50%)' },
      phrase: { left: '50%', bottom: '10%', transform: 'translateX(-50%)', textAlign: 'center', width: '85vw' }
    },
    act2: {
      photoLeft: { left: '12%', top: '42%', width: '38vw', height: '44vh', transform: 'translateY(-50%) rotate(-2deg)' },
      photoRight: { left: '48%', top: '46%', width: '40vw', height: '46vh', transform: 'translateY(-50%) rotate(2deg)' },
      phrase: { left: '50%', bottom: '9%', transform: 'translateX(-50%)', textAlign: 'center', width: '85vw' }
    },
    act3: {
      photo1: { left: '10%', top: '40%', width: '32vw', height: '38vh', transform: 'translateY(-50%)' },
      photo2: { left: '50%', top: '44%', width: '36vw', height: '44vh', transform: 'translate(-50%, -50%)' },
      photo3: { right: '8%', top: '48%', width: '30vw', height: '36vh', transform: 'translateY(-50%)' },
      phrase: { left: '50%', bottom: '8%', transform: 'translateX(-50%)', textAlign: 'center', width: '90vw' }
    },
    act4: {
      photoCenter: { left: '50%', top: '46%', width: '52vw', height: '52vh', transform: 'translate(-50%, -50%)' },
      phrase: { left: '50%', top: '9%', transform: 'translateX(-50%)', textAlign: 'center', width: '85vw' }
    },
    act5: {
      phrase: { left: '50%', bottom: '6%', transform: 'translateX(-50%)', textAlign: 'center', width: '88vw' }
    }
  },
  mobile: {
    maxWidth: 767,
    act1: {
      photo: { left: '50%', top: '40%', width: '74vw', height: '48vh', transform: 'translate(-50%, -50%)' },
      phrase: { left: '50%', bottom: '12%', transform: 'translateX(-50%)', textAlign: 'center', width: '90vw' }
    },
    act2: {
      photoLeft: { left: '12%', top: '34%', width: '58vw', height: '38vh', transform: 'translateY(-50%) rotate(-3deg)' },
      photoRight: { left: '28%', top: '46%', width: '62vw', height: '40vh', transform: 'translateY(-50%) rotate(2.5deg)' },
      phrase: { left: '50%', bottom: '10%', transform: 'translateX(-50%)', textAlign: 'center', width: '90vw' }
    },
    act3: {
      photo1: { left: '8%', top: '28%', width: '48vw', height: '30vh', transform: 'translateY(-50%) rotate(-4deg)' },
      photo2: { left: '50%', top: '44%', width: '58vw', height: '36vh', transform: 'translate(-50%, -50%)' },
      photo3: { right: '8%', top: '58%', width: '46vw', height: '28vh', transform: 'translateY(-50%) rotate(3.5deg)' },
      phrase: { left: '50%', bottom: '8%', transform: 'translateX(-50%)', textAlign: 'center', width: '92vw' }
    },
    act4: {
      photoCenter: { left: '50%', top: '48%', width: '78vw', height: '48vh', transform: 'translate(-50%, -50%)' },
      phrase: { left: '50%', top: '10%', transform: 'translateX(-50%)', textAlign: 'center', width: '90vw' }
    },
    act5: {
      phrase: { left: '50%', bottom: '6%', transform: 'translateX(-50%)', textAlign: 'center', width: '90vw' }
    }
  }
};

/**
 * Get current active act configuration based on progress (0.0 to 1.0) or seconds (0 to 65s)
 */
export function getCurrentAct(currentTimeSec) {
  const current = TIMELINE_ACTS.find(
    (a) => currentTimeSec >= a.startSec && currentTimeSec < a.endSec
  );
  return current || TIMELINE_ACTS[TIMELINE_ACTS.length - 1];
}

/**
 * Calculate smooth normalized interpolation progress [0, 1] for current act
 */
export function getActProgress(currentTimeSec) {
  const act = getCurrentAct(currentTimeSec);
  const duration = act.endSec - act.startSec;
  const elapsed = Math.max(0, Math.min(currentTimeSec - act.startSec, duration));
  return elapsed / duration;
}

/**
 * Calculate camera drift coordinates for the continuous timeline
 */
export function getCameraDrift(currentTimeSec) {
  const act = getCurrentAct(currentTimeSec);
  const progress = getActProgress(currentTimeSec);
  
  const scale = act.camera.driftScale[0] + (act.camera.driftScale[1] - act.camera.driftScale[0]) * progress;
  const x = act.camera.panX[0] + (act.camera.panX[1] - act.camera.panX[0]) * progress;
  const y = act.camera.panY[0] + (act.camera.panY[1] - act.camera.panY[0]) * progress;

  return {
    scale: parseFloat(scale.toFixed(4)),
    panX: parseFloat(x.toFixed(2)),
    panY: parseFloat(y.toFixed(2)),
    transformString: `scale(${scale.toFixed(4)}) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0px)`
  };
}

/**
 * Determine device layout profile
 */
export function getLayoutProfile(windowWidth) {
  if (windowWidth >= 1024) return 'desktop';
  if (windowWidth >= 768) return 'tablet';
  return 'mobile';
}
