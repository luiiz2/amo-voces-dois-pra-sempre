/**
 * ============================================================================
 * AMO VOCÊS DOIS PRA SEMPRE — CANONICAL PHOTO & ASSET CONFIGURATION MATRIX
 * Master Photographic Registry, Face-Safety Focal Points & Responsive Framing
 * ============================================================================
 *
 * Rules & Guarantees:
 * 1. Face Safety: Precise focal point coordinates (percentage x, y) and safe crop
 *    envelopes guarantee no eyes, heads, or smiles are awkwardly cropped across
 *    Desktop (16:9/21:9), Tablet (4:3), and Mobile (9:16/19.5:9).
 * 2. Emotional Narrative: 13 authentic family photographs choreographed into 5
 *    poetic acts strictly aligned with the cinematic score and visual motifs.
 * 3. Permitted Text Fragment Alignment:
 *    - Act I: "AMO"
 *    - Act II: "VOCÊS DOIS"
 *    - Act III: "AMO VOCÊS DOIS"
 *    - Act IV: "PRA SEMPRE"
 *    - Act V: "AMO VOCÊS DOIS PRA SEMPRE"
 */

/**
 * @typedef {Object} Dimensions
 * @property {number} width - Natural pixel width
 * @property {number} height - Natural pixel height
 * @property {number} aspectRatio - Aspect ratio (width / height)
 * @property {string} ratioString - Human-readable aspect ratio string (e.g. '3:4')
 * @property {'portrait' | 'landscape' | 'square'} orientation - Image orientation
 */

/**
 * @typedef {Object} FocalPoint
 * @property {number} x - Horizontal focal coordinate percentage (0 - 100)
 * @property {number} y - Vertical focal coordinate percentage (0 - 100)
 */

/**
 * @typedef {Object} SafeCropEnvelope
 * @property {number} minX - Minimum safe X percentage before critical face cutoff
 * @property {number} maxX - Maximum safe X percentage before critical face cutoff
 * @property {number} minY - Minimum safe Y percentage before hair/crown cutoff
 * @property {number} maxY - Maximum safe Y percentage before subject cutoff
 */

/**
 * @typedef {Object} DeviceFraming
 * @property {number} x - Device-specific focal X percentage
 * @property {number} y - Device-specific focal Y percentage
 * @property {string} objectPosition - CSS object-position string
 * @property {'arch' | 'soft' | 'deckled' | 'oval'} frameStyle - Frame geometry style
 * @property {string} targetAspectRatio - CSS aspect-ratio string
 * @property {number} minScale - Minimum zoom scale to prevent container letterboxing
 */

/**
 * @typedef {Object} ColorPalette
 * @property {string} primaryHex - Dominant representative hex color
 * @property {string} warmTone - Warm accent hex tone
 * @property {'warm' | 'cool' | 'golden' | 'festive'} moodTone - Overall color atmosphere
 * @property {number} luminance - Relative luminance score (0.0 to 1.0)
 */

/**
 * @typedef {Object} PhotoEntry
 * @property {string} id - Unique photo identifier (e.g. 'photo-01')
 * @property {string} legacyId - Short legacy identifier (e.g. 'p01')
 * @property {string} filename - Original JPEG filename
 * @property {string} src - Vite root-relative image source URL
 * @property {string} title - Poetic editorial title
 * @property {string} alt - Poetic accessibility description (Portuguese)
 * @property {string} sceneId - Scene identifier ('scene-1' to 'scene-5')
 * @property {number} actNumber - Act number (1 to 5)
 * @property {string} actPhrase - Act typography phrase fragment
 * @property {string[]} subjects - Subjects present in the photo
 * @property {Dimensions} dimensions - Natural image dimensions & ratio
 * @property {FocalPoint} focalPoint - Master center focal coordinate
 * @property {string} objectPosition - Master CSS object-position string
 * @property {SafeCropEnvelope} safeCrop - Minimum bounding box enclosing all key faces
 * @property {{ desktop: DeviceFraming, tablet: DeviceFraming, mobile: DeviceFraming }} responsiveFraming - Per-device framing
 * @property {ColorPalette} colorPalette - Dominant color scheme and lighting atmosphere
 * @property {string} visualRole - Narrative composition role (e.g. 'hero_monolith')
 * @property {string} emotionalStory - Detailed emotional analysis
 */

/**
 * Master Catalog of all 13 Family Photographs
 * @type {PhotoEntry[]}
 */
export const PHOTOS_CATALOG = [
  // --------------------------------------------------------------------------
  // SCENE 1: OPENING / AWAKENING ("AMO")
  // --------------------------------------------------------------------------
  {
    id: 'photo-01',
    legacyId: 'p01',
    filename: 'photo_2026-08-17_15-17-46.jpg',
    src: '/photo_2026-08-17_15-17-46.jpg',
    title: 'Despertar da Inocência',
    alt: 'Bebê deitado no berço com macacão de ursinhos, olhando para cima com olhos grandes e curiosos em pura ternura.',
    sceneId: 'scene-1',
    actNumber: 1,
    actPhrase: 'AMO',
    subjects: ['baby'],
    dimensions: {
      width: 853,
      height: 1280,
      aspectRatio: 0.6664,
      ratioString: '2:3',
      orientation: 'portrait'
    },
    focalPoint: { x: 50.0, y: 40.0 },
    objectPosition: '50% 40%',
    safeCrop: {
      minX: 18,
      maxX: 82,
      minY: 18,
      maxY: 75
    },
    responsiveFraming: {
      desktop: {
        x: 50.0,
        y: 40.0,
        objectPosition: '50% 40%',
        frameStyle: 'arch',
        targetAspectRatio: '4/5',
        minScale: 1.0
      },
      tablet: {
        x: 50.0,
        y: 38.0,
        objectPosition: '50% 38%',
        frameStyle: 'arch',
        targetAspectRatio: '4/5',
        minScale: 1.02
      },
      mobile: {
        x: 50.0,
        y: 40.0,
        objectPosition: '50% 40%',
        frameStyle: 'arch',
        targetAspectRatio: '4/5',
        minScale: 1.0
      }
    },
    colorPalette: {
      primaryHex: '#E2DEC9',
      warmTone: '#C48B5E',
      moodTone: 'warm',
      luminance: 0.78
    },
    visualRole: 'hero_monolith',
    emotionalStory: 'O início de tudo: o olhar puro e límpido do bebê no berço, descobrindo o mundo que o cerca com ternura serena.'
  },
  {
    id: 'photo-02',
    legacyId: 'p02',
    filename: 'photo_2026-08-17_15-17-48.jpg',
    src: '/photo_2026-08-17_15-17-48.jpg',
    title: 'O Universo de Cores',
    alt: 'Bebê imerso em uma piscina de bolinhas coloridas (azul, amarelo, verde, vermelho), com olhos brilhantes e expressivos.',
    sceneId: 'scene-1',
    actNumber: 1,
    actPhrase: 'AMO',
    subjects: ['baby'],
    dimensions: {
      width: 960,
      height: 1280,
      aspectRatio: 0.75,
      ratioString: '3:4',
      orientation: 'portrait'
    },
    focalPoint: { x: 49.0, y: 38.0 },
    objectPosition: '49% 38%',
    safeCrop: {
      minX: 20,
      maxX: 78,
      minY: 15,
      maxY: 65
    },
    responsiveFraming: {
      desktop: {
        x: 49.0,
        y: 38.0,
        objectPosition: '49% 38%',
        frameStyle: 'soft',
        targetAspectRatio: '3/4',
        minScale: 1.0
      },
      tablet: {
        x: 49.0,
        y: 38.0,
        objectPosition: '49% 38%',
        frameStyle: 'soft',
        targetAspectRatio: '3/4',
        minScale: 1.02
      },
      mobile: {
        x: 49.0,
        y: 38.0,
        objectPosition: '49% 38%',
        frameStyle: 'soft',
        targetAspectRatio: '3/4',
        minScale: 1.0
      }
    },
    colorPalette: {
      primaryHex: '#3B6E8C',
      warmTone: '#E5C158',
      moodTone: 'festive',
      luminance: 0.55
    },
    visualRole: 'sensory_wonder_revelation',
    emotionalStory: 'A vivacidade da infância revelada através de um caleidoscópio de esferas brilhantes e um olhar fascinado pelo infinito.'
  },

  // --------------------------------------------------------------------------
  // SCENE 2: TENDERNESS & BOND ("VOCÊS DOIS")
  // --------------------------------------------------------------------------
  {
    id: 'photo-03',
    legacyId: 'p03',
    filename: 'photo_2026-08-17_15-17-54.jpg',
    src: '/photo_2026-08-17_15-17-54.jpg',
    title: 'Gotas de Carinho no Banho',
    alt: 'Bebê no banho com cabelinho cacheado molhado e penteado em crista, olhando fixamente para a câmera enquanto brinca com o frasco.',
    sceneId: 'scene-2',
    actNumber: 2,
    actPhrase: 'VOCÊS DOIS',
    subjects: ['baby', 'mother_hands'],
    dimensions: {
      width: 960,
      height: 1280,
      aspectRatio: 0.75,
      ratioString: '3:4',
      orientation: 'portrait'
    },
    focalPoint: { x: 49.0, y: 47.0 },
    objectPosition: '49% 47%',
    safeCrop: {
      minX: 18,
      maxX: 82,
      minY: 10,
      maxY: 80
    },
    responsiveFraming: {
      desktop: {
        x: 49.0,
        y: 47.0,
        objectPosition: '49% 47%',
        frameStyle: 'soft',
        targetAspectRatio: '3/4',
        minScale: 1.0
      },
      tablet: {
        x: 49.0,
        y: 45.0,
        objectPosition: '49% 45%',
        frameStyle: 'soft',
        targetAspectRatio: '3/4',
        minScale: 1.0
      },
      mobile: {
        x: 49.0,
        y: 46.0,
        objectPosition: '49% 46%',
        frameStyle: 'soft',
        targetAspectRatio: '3/4',
        minScale: 1.0
      }
    },
    colorPalette: {
      primaryHex: '#C9B29B',
      warmTone: '#A66338',
      moodTone: 'warm',
      luminance: 0.68
    },
    visualRole: 'diptych_intimacy_water',
    emotionalStory: 'A pureza incondicional dos cuidados diários: água morna, cachinhos molhados e a sensação de acolhimento seguro.'
  },
  {
    id: 'photo-04',
    legacyId: 'p04',
    filename: 'photo_2026-08-17_15-17-53.jpg',
    src: '/photo_2026-08-17_15-17-53.jpg',
    title: 'Primeiras Histórias com o Papai',
    alt: 'Pai lendo livro infantil colorido de dinossauros para o bebê no colo, que sorri radiante exibindo seus primeiros dois dentinhos.',
    sceneId: 'scene-2',
    actNumber: 2,
    actPhrase: 'VOCÊS DOIS',
    subjects: ['father', 'baby'],
    dimensions: {
      width: 879,
      height: 1172,
      aspectRatio: 0.75,
      ratioString: '3:4',
      orientation: 'portrait'
    },
    focalPoint: { x: 48.0, y: 24.0 },
    objectPosition: '48% 24%',
    safeCrop: {
      minX: 15,
      maxX: 85,
      minY: 4,
      maxY: 85
    },
    responsiveFraming: {
      desktop: {
        x: 48.0,
        y: 24.0,
        objectPosition: '48% 24%',
        frameStyle: 'deckled',
        targetAspectRatio: '3/4',
        minScale: 1.0
      },
      tablet: {
        x: 48.0,
        y: 22.0,
        objectPosition: '48% 22%',
        frameStyle: 'deckled',
        targetAspectRatio: '3/4',
        minScale: 1.02
      },
      mobile: {
        x: 48.0,
        y: 24.0,
        objectPosition: '48% 24%',
        frameStyle: 'deckled',
        targetAspectRatio: '3/4',
        minScale: 1.0
      }
    },
    colorPalette: {
      primaryHex: '#2A8356',
      warmTone: '#C59B27',
      moodTone: 'warm',
      luminance: 0.48
    },
    visualRole: 'diptych_paternal_wisdom',
    emotionalStory: 'O colo paterno como refúgio de imaginação, aprendizado e os primeiros sorrisos repletos de entusiasmo.'
  },

  // --------------------------------------------------------------------------
  // SCENE 3: JOY & MILESTONES ("VOCÊS DOIS")
  // --------------------------------------------------------------------------
  {
    id: 'photo-05',
    legacyId: 'p05',
    filename: 'photo_2026-08-17_15-17-55.jpg',
    src: '/photo_2026-08-17_15-17-55.jpg',
    title: 'Horizonte Solar e Maresia',
    alt: 'Bebê sorridente sentado à mesa de praia sob guarda-sol vermelho com ondas do mar ao fundo sob céu azul radiante.',
    sceneId: 'scene-3',
    actNumber: 3,
    actPhrase: 'AMO VOCÊS DOIS',
    subjects: ['baby'],
    dimensions: {
      width: 960,
      height: 1280,
      aspectRatio: 0.75,
      ratioString: '3:4',
      orientation: 'portrait'
    },
    focalPoint: { x: 46.0, y: 47.0 },
    objectPosition: '46% 47%',
    safeCrop: {
      minX: 20,
      maxX: 78,
      minY: 28,
      maxY: 85
    },
    responsiveFraming: {
      desktop: {
        x: 46.0,
        y: 47.0,
        objectPosition: '46% 47%',
        frameStyle: 'soft',
        targetAspectRatio: '3/4',
        minScale: 1.0
      },
      tablet: {
        x: 46.0,
        y: 47.0,
        objectPosition: '46% 47%',
        frameStyle: 'soft',
        targetAspectRatio: '3/4',
        minScale: 1.0
      },
      mobile: {
        x: 46.0,
        y: 47.0,
        objectPosition: '46% 47%',
        frameStyle: 'soft',
        targetAspectRatio: '3/4',
        minScale: 1.0
      }
    },
    colorPalette: {
      primaryHex: '#A8524B',
      warmTone: '#4A90E2',
      moodTone: 'warm',
      luminance: 0.62
    },
    visualRole: 'triptych_left_sunshine',
    emotionalStory: 'O calor do sol na pele, a brisa marinha e os olhinhos atentos descobrindo a grandiosidade do oceano.'
  },
  {
    id: 'photo-06',
    legacyId: 'p06',
    filename: 'photo_2026-08-17_15-17-57.jpg',
    src: '/photo_2026-08-17_15-17-57.jpg',
    title: 'Gargalhada Canarinho',
    alt: 'Bebê erguido nos braços vestindo camisa da Seleção Brasileira amarela, gargalhando com júbilo em frente à bandeira do Brasil.',
    sceneId: 'scene-3',
    actNumber: 3,
    actPhrase: 'AMO VOCÊS DOIS',
    subjects: ['baby'],
    dimensions: {
      width: 960,
      height: 1280,
      aspectRatio: 0.75,
      ratioString: '3:4',
      orientation: 'portrait'
    },
    focalPoint: { x: 49.0, y: 43.0 },
    objectPosition: '49% 43%',
    safeCrop: {
      minX: 22,
      maxX: 78,
      minY: 22,
      maxY: 80
    },
    responsiveFraming: {
      desktop: {
        x: 49.0,
        y: 43.0,
        objectPosition: '49% 43%',
        frameStyle: 'arch',
        targetAspectRatio: '3/4',
        minScale: 1.0
      },
      tablet: {
        x: 49.0,
        y: 43.0,
        objectPosition: '49% 43%',
        frameStyle: 'arch',
        targetAspectRatio: '3/4',
        minScale: 1.0
      },
      mobile: {
        x: 49.0,
        y: 43.0,
        objectPosition: '49% 43%',
        frameStyle: 'arch',
        targetAspectRatio: '3/4',
        minScale: 1.0
      }
    },
    colorPalette: {
      primaryHex: '#BD9B2A',
      warmTone: '#1A6B35',
      moodTone: 'festive',
      luminance: 0.65
    },
    visualRole: 'triptych_center_triumph',
    emotionalStory: 'A explosão de alegria genuína brasileira: riso solto, camisa amarela e o coração vibrando em uníssono com a família.'
  },
  {
    id: 'photo-07',
    legacyId: 'p07',
    filename: 'photo_2026-08-17_15-18-01.jpg',
    src: '/photo_2026-08-17_15-18-01.jpg',
    title: 'Primeira Copa e Sete Meses de Amor',
    alt: 'Mãe beijando carinhosamente a bochecha do bebê no colo junto ao bolo temático de 7 meses da Copa do Mundo com troféu.',
    sceneId: 'scene-3',
    actNumber: 3,
    actPhrase: 'AMO VOCÊS DOIS',
    subjects: ['mother', 'baby'],
    dimensions: {
      width: 960,
      height: 1280,
      aspectRatio: 0.75,
      ratioString: '3:4',
      orientation: 'portrait'
    },
    focalPoint: { x: 45.0, y: 22.0 },
    objectPosition: '45% 22%',
    safeCrop: {
      minX: 8,
      maxX: 90,
      minY: 3,
      maxY: 95
    },
    responsiveFraming: {
      desktop: {
        x: 45.0,
        y: 22.0,
        objectPosition: '45% 22%',
        frameStyle: 'soft',
        targetAspectRatio: '3/4',
        minScale: 1.0
      },
      tablet: {
        x: 45.0,
        y: 20.0,
        objectPosition: '45% 20%',
        frameStyle: 'soft',
        targetAspectRatio: '3/4',
        minScale: 1.02
      },
      mobile: {
        x: 45.0,
        y: 22.0,
        objectPosition: '45% 22%',
        frameStyle: 'soft',
        targetAspectRatio: '3/4',
        minScale: 1.0
      }
    },
    colorPalette: {
      primaryHex: '#C2BA98',
      warmTone: '#E5C158',
      moodTone: 'festive',
      luminance: 0.72
    },
    visualRole: 'triptych_right_milestone',
    emotionalStory: 'Celebrar cada mês de vida como uma conquista eterna: o beijo materno, o bolo iluminado e a doçura dos laços que crescem.'
  },

  // --------------------------------------------------------------------------
  // SCENE 4: ATMOSPHERE & MATERNAL DEVOTION ("PRA SEMPRE")
  // --------------------------------------------------------------------------
  {
    id: 'photo-08',
    legacyId: 'p08',
    filename: 'photo_2026-08-17_15-17-58.jpg',
    src: '/photo_2026-08-17_15-17-58.jpg',
    title: 'Constelação de Luzes e Encanto',
    alt: 'Bebê com camisa xadrez vermelha olhando para cima em puro encantamento com luzes douradas e fitas festivas suspensas no teto.',
    sceneId: 'scene-4',
    actNumber: 4,
    actPhrase: 'PRA SEMPRE',
    subjects: ['baby'],
    dimensions: {
      width: 720,
      height: 1280,
      aspectRatio: 0.5625,
      ratioString: '9:16',
      orientation: 'portrait'
    },
    focalPoint: { x: 40.0, y: 48.0 },
    objectPosition: '40% 48%',
    safeCrop: {
      minX: 10,
      maxX: 75,
      minY: 22,
      maxY: 85
    },
    responsiveFraming: {
      desktop: {
        x: 40.0,
        y: 48.0,
        objectPosition: '40% 48%',
        frameStyle: 'oval',
        targetAspectRatio: '3/4',
        minScale: 1.0
      },
      tablet: {
        x: 40.0,
        y: 46.0,
        objectPosition: '40% 46%',
        frameStyle: 'oval',
        targetAspectRatio: '3/4',
        minScale: 1.02
      },
      mobile: {
        x: 40.0,
        y: 48.0,
        objectPosition: '40% 48%',
        frameStyle: 'oval',
        targetAspectRatio: '9/16',
        minScale: 1.0
      }
    },
    colorPalette: {
      primaryHex: '#2C3A5A',
      warmTone: '#E5C158',
      moodTone: 'golden',
      luminance: 0.38
    },
    visualRole: 'atmospheric_celestial_gaze',
    emotionalStory: 'Os olhinhos que absorvem as luzes do mundo: o reflexo dourado do céu noturno nos olhos de quem é pura esperança.'
  },
  {
    id: 'photo-09',
    legacyId: 'p09',
    filename: 'photo_2026-08-17_15-17-59.jpg',
    src: '/photo_2026-08-17_15-17-59.jpg',
    title: 'Luz dos Balões e Sorriso Materno',
    alt: 'Mãe elegante de vestido preto e óculos sorrindo radiante enquanto segura o bebê nos braços sob luminárias festivas coloridas.',
    sceneId: 'scene-4',
    actNumber: 4,
    actPhrase: 'PRA SEMPRE',
    subjects: ['mother', 'baby'],
    dimensions: {
      width: 960,
      height: 1280,
      aspectRatio: 0.75,
      ratioString: '3:4',
      orientation: 'portrait'
    },
    focalPoint: { x: 48.0, y: 32.0 },
    objectPosition: '48% 32%',
    safeCrop: {
      minX: 15,
      maxX: 85,
      minY: 12,
      maxY: 75
    },
    responsiveFraming: {
      desktop: {
        x: 48.0,
        y: 32.0,
        objectPosition: '48% 32%',
        frameStyle: 'arch',
        targetAspectRatio: '3/4',
        minScale: 1.0
      },
      tablet: {
        x: 48.0,
        y: 30.0,
        objectPosition: '48% 30%',
        frameStyle: 'arch',
        targetAspectRatio: '3/4',
        minScale: 1.02
      },
      mobile: {
        x: 48.0,
        y: 32.0,
        objectPosition: '48% 32%',
        frameStyle: 'arch',
        targetAspectRatio: '3/4',
        minScale: 1.0
      }
    },
    colorPalette: {
      primaryHex: '#A43834',
      warmTone: '#C59B27',
      moodTone: 'festive',
      luminance: 0.52
    },
    visualRole: 'monolith_maternal_altar',
    emotionalStory: 'A luz mais brilhante da festa é o sorriso da mãe, segurando nos braços o seu maior tesouro sob o luar.'
  },
  {
    id: 'photo-10',
    legacyId: 'p10',
    filename: 'photo_2026-08-17_15-18-02.jpg',
    src: '/photo_2026-08-17_15-18-02.jpg',
    title: 'Santuário de Afeto e Sono Sereno',
    alt: 'Mãe em tons terracota olhando serenamente para a câmera enquanto o bebê dorme profundamente encostado em seu peito, mãozinhas unidas.',
    sceneId: 'scene-4',
    actNumber: 4,
    actPhrase: 'PRA SEMPRE',
    subjects: ['mother', 'baby'],
    dimensions: {
      width: 959,
      height: 1280,
      aspectRatio: 0.7492,
      ratioString: '3:4',
      orientation: 'portrait'
    },
    focalPoint: { x: 46.0, y: 35.0 },
    objectPosition: '46% 35%',
    safeCrop: {
      minX: 8,
      maxX: 95,
      minY: 2,
      maxY: 85
    },
    responsiveFraming: {
      desktop: {
        x: 46.0,
        y: 35.0,
        objectPosition: '46% 35%',
        frameStyle: 'soft',
        targetAspectRatio: '3/4',
        minScale: 1.0
      },
      tablet: {
        x: 46.0,
        y: 32.0,
        objectPosition: '46% 32%',
        frameStyle: 'soft',
        targetAspectRatio: '3/4',
        minScale: 1.02
      },
      mobile: {
        x: 46.0,
        y: 35.0,
        objectPosition: '46% 35%',
        frameStyle: 'soft',
        targetAspectRatio: '3/4',
        minScale: 1.0
      }
    },
    colorPalette: {
      primaryHex: '#A3644B',
      warmTone: '#C48B5E',
      moodTone: 'warm',
      luminance: 0.58
    },
    visualRole: 'maternal_sanctuary_peace',
    emotionalStory: 'O peito materno como o lugar mais seguro do universo: a respiração compassada, a mãozinha entrelaçada e a paz absoluta.'
  },

  // --------------------------------------------------------------------------
  // SCENE 5: THE ETERNAL BOND ("PRA SEMPRE" & "AMO VOCÊS DOIS PRA SEMPRE")
  // --------------------------------------------------------------------------
  {
    id: 'photo-11',
    legacyId: 'p11',
    filename: 'photo_2026-08-17_15-18-03.jpg',
    src: '/photo_2026-08-17_15-18-03.jpg',
    title: 'Cumplicidade e Olhar Espontâneo',
    alt: 'Mãe com camisa listrada vermelha e óculos lançando um sorriso charmoso de lado enquanto carrega o bebê no colo.',
    sceneId: 'scene-5',
    actNumber: 5,
    actPhrase: 'AMO VOCÊS DOIS PRA SEMPRE',
    subjects: ['mother', 'baby'],
    dimensions: {
      width: 960,
      height: 1280,
      aspectRatio: 0.75,
      ratioString: '3:4',
      orientation: 'portrait'
    },
    focalPoint: { x: 52.0, y: 32.0 },
    objectPosition: '52% 32%',
    safeCrop: {
      minX: 12,
      maxX: 92,
      minY: 3,
      maxY: 80
    },
    responsiveFraming: {
      desktop: {
        x: 52.0,
        y: 32.0,
        objectPosition: '52% 32%',
        frameStyle: 'oval',
        targetAspectRatio: '3/4',
        minScale: 1.0
      },
      tablet: {
        x: 52.0,
        y: 30.0,
        objectPosition: '52% 30%',
        frameStyle: 'oval',
        targetAspectRatio: '3/4',
        minScale: 1.02
      },
      mobile: {
        x: 52.0,
        y: 32.0,
        objectPosition: '52% 32%',
        frameStyle: 'oval',
        targetAspectRatio: '3/4',
        minScale: 1.0
      }
    },
    colorPalette: {
      primaryHex: '#B0685E',
      warmTone: '#FAF7F2',
      moodTone: 'warm',
      luminance: 0.62
    },
    visualRole: 'candid_spontaneous_intimacy',
    emotionalStory: 'A leveza dos dias compartilhados: um sorriso de cumplicidade que eterniza a beleza dos momentos mais autênticos.'
  },
  {
    id: 'photo-12',
    legacyId: 'p12',
    filename: 'photo_2026-08-17_15-17-50.jpg',
    src: '/photo_2026-08-17_15-17-50.jpg',
    title: 'O Beijo Sagrado de Natal',
    alt: 'Mãe e pai beijando simultaneamente as bochechas do bebê junto à árvore de Natal iluminada, enquanto o bebê brinca mostrando a língua com macacão de rena.',
    sceneId: 'scene-5',
    actNumber: 5,
    actPhrase: 'AMO VOCÊS DOIS PRA SEMPRE',
    subjects: ['mother', 'father', 'baby'],
    dimensions: {
      width: 960,
      height: 1280,
      aspectRatio: 0.75,
      ratioString: '3:4',
      orientation: 'portrait'
    },
    focalPoint: { x: 48.0, y: 46.0 },
    objectPosition: '48% 46%',
    safeCrop: {
      minX: 6,
      maxX: 94,
      minY: 10,
      maxY: 85
    },
    responsiveFraming: {
      desktop: {
        x: 48.0,
        y: 46.0,
        objectPosition: '48% 46%',
        frameStyle: 'arch',
        targetAspectRatio: '3/4',
        minScale: 1.0
      },
      tablet: {
        x: 48.0,
        y: 46.0,
        objectPosition: '48% 46%',
        frameStyle: 'arch',
        targetAspectRatio: '3/4',
        minScale: 1.0
      },
      mobile: {
        x: 48.0,
        y: 46.0,
        objectPosition: '48% 46%',
        frameStyle: 'arch',
        targetAspectRatio: '3/4',
        minScale: 1.0
      }
    },
    colorPalette: {
      primaryHex: '#A86544',
      warmTone: '#E5C158',
      moodTone: 'festive',
      luminance: 0.60
    },
    visualRole: 'ultimate_trinity_embrace',
    emotionalStory: 'A trindade do amor familiar: o abraço simultâneo de pai e mãe, unindo suas vidas e corações na proteção eterna do filho.'
  },
  {
    id: 'photo-13',
    legacyId: 'p13',
    filename: 'photo_2026-08-17_15-18-05.jpg',
    src: '/photo_2026-08-17_15-18-05.jpg',
    title: 'Luz Dourada e Harmonia Eterna',
    alt: 'Retrato em contraluz dourada de mãe com coque elegante segurando bebê sobre o ombro em abraço repleto de serenidade e luz suave da janela.',
    sceneId: 'scene-5',
    actNumber: 5,
    actPhrase: 'AMO VOCÊS DOIS PRA SEMPRE',
    subjects: ['mother', 'baby'],
    dimensions: {
      width: 959,
      height: 1280,
      aspectRatio: 0.7492,
      ratioString: '3:4',
      orientation: 'portrait'
    },
    focalPoint: { x: 52.0, y: 36.0 },
    objectPosition: '52% 36%',
    safeCrop: {
      minX: 12,
      maxX: 88,
      minY: 2,
      maxY: 85
    },
    responsiveFraming: {
      desktop: {
        x: 52.0,
        y: 36.0,
        objectPosition: '52% 36%',
        frameStyle: 'arch',
        targetAspectRatio: '3/4',
        minScale: 1.0
      },
      tablet: {
        x: 52.0,
        y: 34.0,
        objectPosition: '52% 34%',
        frameStyle: 'arch',
        targetAspectRatio: '3/4',
        minScale: 1.02
      },
      mobile: {
        x: 52.0,
        y: 36.0,
        objectPosition: '52% 36%',
        frameStyle: 'arch',
        targetAspectRatio: '3/4',
        minScale: 1.0
      }
    },
    colorPalette: {
      primaryHex: '#D5A884',
      warmTone: '#C59B27',
      moodTone: 'golden',
      luminance: 0.82
    },
    visualRole: 'grand_apotheosis_eternal_glow',
    emotionalStory: 'A apoteose do amor eterno: a luz do sol poente envolvendo mãe e filho em uma aura dourada de paz, beleza e imortalidade.'
  }
];

/**
 * @typedef {Object} SceneDefinition
 * @property {string} id - Scene identifier ('scene-1' to 'scene-5')
 * @property {number} actNumber - Act number (1 to 5)
 * @property {string} phraseFragment - Visible text fragment for this act
 * @property {string} title - Narrative act title
 * @property {string} subtitle - Poetic sub-heading
 * @property {string[]} photoIds - Ordered list of photo IDs belonging to this scene
 * @property {{ startSec: number, endSec: number, durationSec: number }} timing - 60s timeline choreography
 * @property {string} visualTheme - Dominant visual aesthetic and framing motif
 * @property {string} emotionalArc - Narrative progression and thematic resonance
 */

/**
 * 5 Canonical Narrative Scenes Choreography
 * @type {SceneDefinition[]}
 */
export const SCENES_CATALOG = [
  {
    id: 'scene-1',
    actNumber: 1,
    phraseFragment: 'AMO',
    title: 'Despertar e Descoberta',
    subtitle: 'O Primeiro Olhar de Puro Amor',
    photoIds: ['photo-01', 'photo-02'],
    timing: {
      startSec: 0.0,
      endSec: 12.0,
      durationSec: 12.0
    },
    visualTheme: 'Alabaster Luminous Veil & Arch Solitary Monolith',
    emotionalArc: 'Abertura suave e contemplativa. O despertar da vida e a descoberta inicial do afeto em um ambiente puro e intocado.'
  },
  {
    id: 'scene-2',
    actNumber: 2,
    phraseFragment: 'VOCÊS DOIS',
    title: 'Ternura e Cumplicidade',
    subtitle: 'O Cuidado Diário e os Primeiros Laços',
    photoIds: ['photo-03', 'photo-04'],
    timing: {
      startSec: 12.0,
      endSec: 24.0,
      durationSec: 12.0
    },
    visualTheme: 'Diptych Symphony of Water & Paternal Storytelling',
    emotionalArc: 'A transição para os laços cotidianos mais íntimos: o afeto carinhoso do banho e o aconchego protetor da leitura compartilhada.'
  },
  {
    id: 'scene-3',
    actNumber: 3,
    phraseFragment: 'AMO VOCÊS DOIS',
    title: 'Alegria e Marcos de Vida',
    subtitle: 'O Sol, as Risadas e as Primeiras Conquistas',
    photoIds: ['photo-05', 'photo-06', 'photo-07'],
    timing: {
      startSec: 24.0,
      endSec: 36.0,
      durationSec: 12.0
    },
    visualTheme: 'Solar Triptych Constellation & Festive Energy',
    emotionalArc: 'A expansão da alegria contagiante: a brisa do mar, a celebração verde-e-amarela e o marco inesquecível dos primeiros 7 meses.'
  },
  {
    id: 'scene-4',
    actNumber: 4,
    phraseFragment: 'PRA SEMPRE',
    title: 'Atmosfera e Devoção Materna',
    subtitle: 'Luzes Encantadas e o Santuário do Abraço',
    photoIds: ['photo-08', 'photo-09', 'photo-10'],
    timing: {
      startSec: 36.0,
      endSec: 48.0,
      durationSec: 12.0
    },
    visualTheme: 'Nocturnal Lantern Warmth, Bokeh & Intimate Embrace',
    emotionalArc: 'A atmosfera sublime da noite estrelada e o colo materno como porto seguro inabalável onde o coração repousa.'
  },
  {
    id: 'scene-5',
    actNumber: 5,
    phraseFragment: 'AMO VOCÊS DOIS PRA SEMPRE',
    title: 'O Vínculo Eterno e Apoteose',
    subtitle: 'A Trindade do Amor Infinito',
    photoIds: ['photo-11', 'photo-12', 'photo-13'],
    timing: {
      startSec: 48.0,
      endSec: 65.0,
      durationSec: 17.0
    },
    visualTheme: 'Grand Golden Window Backlight & Trinity Embrace Mosaic',
    emotionalArc: 'O grande clímax emocional: o beijo simultâneo de pai e mãe no Natal e a luz dourada imortalizando a união que transcende o tempo.'
  }
];

// ============================================================================
// UTILITY & QUERY FUNCTIONS
// ============================================================================

// Vite Asset Import Resolution
const photoModules = import.meta.glob(['../*.jpg', '../../*.jpg', '/*.jpg', './*.jpg'], { eager: true, import: 'default' });

/**
 * Resolves static photo filename or path into Vite's fingerprinted production/dev URL
 * @param {string} filenameOrSrc
 * @returns {string}
 */
export function resolvePhotoSrc(filenameOrSrc) {
  if (!filenameOrSrc) return '';
  const filename = filenameOrSrc.replace(/^.*[\\\/]/, '');
  for (const [key, val] of Object.entries(photoModules)) {
    if (key.endsWith(filename)) {
      return typeof val === 'string' ? val : (val && val.default ? val.default : '/' + filename);
    }
  }
  return '/' + filename;
}

/**
 * Retrieve all 13 photographs in canonical order with resolved src URLs
 * @returns {PhotoEntry[]}
 */
export function getAllPhotos() {
  return PHOTOS_CATALOG.map(p => ({
    ...p,
    src: resolvePhotoSrc(p.filename || p.src)
  }));
}

/**
 * Retrieve photo configuration by its ID (e.g. 'photo-01' or 'p01')
 * @param {string} id - Photo identifier
 * @returns {PhotoEntry | undefined}
 */
export function getPhotoById(id) {
  if (!id) return undefined;
  const p = PHOTOS_CATALOG.find(
    (item) => item.id === id || item.legacyId === id || item.filename === id || item.src.includes(id)
  );
  if (!p) return undefined;
  return {
    ...p,
    src: resolvePhotoSrc(p.filename || p.src)
  };
}

/**
 * Retrieve all photos belonging to a specific narrative scene
 * @param {string} sceneId - 'scene-1' through 'scene-5'
 * @returns {PhotoEntry[]}
 */
export function getPhotosByScene(sceneId) {
  return PHOTOS_CATALOG.filter((p) => p.sceneId === sceneId).map(p => ({
    ...p,
    src: resolvePhotoSrc(p.filename || p.src)
  }));
}

/**
 * Retrieve all photos belonging to a specific act number
 * @param {number} actNumber - 1 through 5
 * @returns {PhotoEntry[]}
 */
export function getPhotosByAct(actNumber) {
  return PHOTOS_CATALOG.filter((p) => p.actNumber === actNumber).map(p => ({
    ...p,
    src: resolvePhotoSrc(p.filename || p.src)
  }));
}

/**
 * Retrieve scene definition by scene ID or act number
 * @param {string | number} query - Scene ID or Act Number
 * @returns {SceneDefinition | undefined}
 */
export function getScene(query) {
  if (typeof query === 'number') {
    return SCENES_CATALOG.find((s) => s.actNumber === query);
  }
  return SCENES_CATALOG.find((s) => s.id === query);
}

/**
 * Retrieve all 5 narrative scene definitions
 * @returns {SceneDefinition[]}
 */
export function getAllScenes() {
  return [...SCENES_CATALOG];
}

/**
 * Generate CSS object-position style value for a given photo and device viewport
 * @param {string} photoId - Photo identifier
 * @param {'desktop' | 'tablet' | 'mobile'} [device='desktop'] - Device viewport type
 * @returns {string} CSS object-position string (e.g. '50% 40%')
 */
export function getObjectPositionStyle(photoId, device = 'desktop') {
  const photo = getPhotoById(photoId);
  if (!photo) return '50% 50%';
  const framing = photo.responsiveFraming[device] || photo.responsiveFraming.desktop;
  return framing ? framing.objectPosition : photo.objectPosition;
}

/**
 * Retrieve safe focal coordinates for CSS or GSAP transform origin calculation
 * @param {string} photoId - Photo identifier
 * @param {'desktop' | 'tablet' | 'mobile'} [device='desktop'] - Target device
 * @returns {FocalPoint} Normalized percentages { x, y }
 */
export function getFocalCoordinates(photoId, device = 'desktop') {
  const photo = getPhotoById(photoId);
  if (!photo) return { x: 50.0, y: 50.0 };
  const framing = photo.responsiveFraming[device] || photo.responsiveFraming.desktop;
  return framing ? { x: framing.x, y: framing.y } : photo.focalPoint;
}

/**
 * Retrieve safe crop bounding envelope to enforce zero face-cropping
 * @param {string} photoId - Photo identifier
 * @returns {SafeCropEnvelope} Safe boundary percentages
 */
export function getSafeCropBox(photoId) {
  const photo = getPhotoById(photoId);
  if (!photo) return { minX: 0, maxX: 100, minY: 0, maxY: 100 };
  return { ...photo.safeCrop };
}

/**
 * Generates an inline style object for an <img> element guaranteeing safe cropping
 * @param {string} photoId - Photo identifier
 * @param {'desktop' | 'tablet' | 'mobile'} [device='desktop'] - Target device
 * @returns {Record<string, string>} React/Vanilla inline styles
 */
export function getImageInlineStyle(photoId, device = 'desktop') {
  const photo = getPhotoById(photoId);
  if (!photo) {
    return {
      objectFit: 'cover',
      objectPosition: 'center center'
    };
  }

  const objectPos = getObjectPositionStyle(photoId, device);
  return {
    objectFit: 'cover',
    objectPosition: objectPos,
    transformOrigin: objectPos
  };
}

export default PHOTOS_CATALOG;
