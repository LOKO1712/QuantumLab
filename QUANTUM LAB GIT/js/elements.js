// ══ ELEMENTS.JS — Tabla periódica completa ══
const ELEMENTS = [
  {z:1,sym:'H',name:'Hidrógeno',mass:1.008,group:1},
  {z:2,sym:'He',name:'Helio',mass:4.003,group:18},
  {z:3,sym:'Li',name:'Litio',mass:6.941,group:1},
  {z:4,sym:'Be',name:'Berilio',mass:9.012,group:2},
  {z:5,sym:'B',name:'Boro',mass:10.811,group:13},
  {z:6,sym:'C',name:'Carbono',mass:12.011,group:14},
  {z:7,sym:'N',name:'Nitrógeno',mass:14.007,group:15},
  {z:8,sym:'O',name:'Oxígeno',mass:15.999,group:16},
  {z:9,sym:'F',name:'Flúor',mass:18.998,group:17},
  {z:10,sym:'Ne',name:'Neón',mass:20.180,group:18},
  {z:11,sym:'Na',name:'Sodio',mass:22.990,group:1},
  {z:12,sym:'Mg',name:'Magnesio',mass:24.305,group:2},
  {z:13,sym:'Al',name:'Aluminio',mass:26.982,group:13},
  {z:14,sym:'Si',name:'Silicio',mass:28.086,group:14},
  {z:15,sym:'P',name:'Fósforo',mass:30.974,group:15},
  {z:16,sym:'S',name:'Azufre',mass:32.065,group:16},
  {z:17,sym:'Cl',name:'Cloro',mass:35.453,group:17},
  {z:18,sym:'Ar',name:'Argón',mass:39.948,group:18},
  {z:19,sym:'K',name:'Potasio',mass:39.098,group:1},
  {z:20,sym:'Ca',name:'Calcio',mass:40.078,group:2},
  {z:21,sym:'Sc',name:'Escandio',mass:44.956,group:3},
  {z:22,sym:'Ti',name:'Titanio',mass:47.867,group:4},
  {z:23,sym:'V',name:'Vanadio',mass:50.942,group:5},
  {z:24,sym:'Cr',name:'Cromo',mass:51.996,group:6},
  {z:25,sym:'Mn',name:'Manganeso',mass:54.938,group:7},
  {z:26,sym:'Fe',name:'Hierro',mass:55.845,group:8},
  {z:27,sym:'Co',name:'Cobalto',mass:58.933,group:9},
  {z:28,sym:'Ni',name:'Níquel',mass:58.693,group:10},
  {z:29,sym:'Cu',name:'Cobre',mass:63.546,group:11},
  {z:30,sym:'Zn',name:'Zinc',mass:65.38,group:12},
  {z:31,sym:'Ga',name:'Galio',mass:69.723,group:13},
  {z:32,sym:'Ge',name:'Germanio',mass:72.630,group:14},
  {z:33,sym:'As',name:'Arsénico',mass:74.922,group:15},
  {z:34,sym:'Se',name:'Selenio',mass:78.971,group:16},
  {z:35,sym:'Br',name:'Bromo',mass:79.904,group:17},
  {z:36,sym:'Kr',name:'Kriptón',mass:83.798,group:18},
  {z:37,sym:'Rb',name:'Rubidio',mass:85.468,group:1},
  {z:38,sym:'Sr',name:'Estroncio',mass:87.62,group:2},
  {z:39,sym:'Y',name:'Itrio',mass:88.906,group:3},
  {z:40,sym:'Zr',name:'Circonio',mass:91.224,group:4},
  {z:41,sym:'Nb',name:'Niobio',mass:92.906,group:5},
  {z:42,sym:'Mo',name:'Molibdeno',mass:95.96,group:6},
  {z:43,sym:'Tc',name:'Tecnecio',mass:98,group:7},
  {z:44,sym:'Ru',name:'Rutenio',mass:101.07,group:8},
  {z:45,sym:'Rh',name:'Rodio',mass:102.906,group:9},
  {z:46,sym:'Pd',name:'Paladio',mass:106.42,group:10},
  {z:47,sym:'Ag',name:'Plata',mass:107.868,group:11},
  {z:48,sym:'Cd',name:'Cadmio',mass:112.411,group:12},
  {z:49,sym:'In',name:'Indio',mass:114.818,group:13},
  {z:50,sym:'Sn',name:'Estaño',mass:118.710,group:14},
  {z:51,sym:'Sb',name:'Antimonio',mass:121.760,group:15},
  {z:52,sym:'Te',name:'Telurio',mass:127.60,group:16},
  {z:53,sym:'I',name:'Yodo',mass:126.904,group:17},
  {z:54,sym:'Xe',name:'Xenón',mass:131.293,group:18},
  {z:55,sym:'Cs',name:'Cesio',mass:132.905,group:1},
  {z:56,sym:'Ba',name:'Bario',mass:137.327,group:2},
  {z:57,sym:'La',name:'Lantano',mass:138.905,group:3},
  {z:58,sym:'Ce',name:'Cerio',mass:140.116,group:3},
  {z:59,sym:'Pr',name:'Praseodimio',mass:140.908,group:3},
  {z:60,sym:'Nd',name:'Neodimio',mass:144.242,group:3},
  {z:61,sym:'Pm',name:'Prometio',mass:145,group:3},
  {z:62,sym:'Sm',name:'Samario',mass:150.36,group:3},
  {z:63,sym:'Eu',name:'Europio',mass:151.964,group:3},
  {z:64,sym:'Gd',name:'Gadolinio',mass:157.25,group:3},
  {z:65,sym:'Tb',name:'Terbio',mass:158.925,group:3},
  {z:66,sym:'Dy',name:'Disprosio',mass:162.500,group:3},
  {z:67,sym:'Ho',name:'Holmio',mass:164.930,group:3},
  {z:68,sym:'Er',name:'Erbio',mass:167.259,group:3},
  {z:69,sym:'Tm',name:'Tulio',mass:168.934,group:3},
  {z:70,sym:'Yb',name:'Iterbio',mass:173.054,group:3},
  {z:71,sym:'Lu',name:'Lutecio',mass:174.967,group:3},
  {z:72,sym:'Hf',name:'Hafnio',mass:178.49,group:4},
  {z:73,sym:'Ta',name:'Tantalio',mass:180.948,group:5},
  {z:74,sym:'W',name:'Wolframio',mass:183.84,group:6},
  {z:75,sym:'Re',name:'Renio',mass:186.207,group:7},
  {z:76,sym:'Os',name:'Osmio',mass:190.23,group:8},
  {z:77,sym:'Ir',name:'Iridio',mass:192.217,group:9},
  {z:78,sym:'Pt',name:'Platino',mass:195.084,group:10},
  {z:79,sym:'Au',name:'Oro',mass:196.967,group:11},
  {z:80,sym:'Hg',name:'Mercurio',mass:200.592,group:12},
  {z:81,sym:'Tl',name:'Talio',mass:204.383,group:13},
  {z:82,sym:'Pb',name:'Plomo',mass:207.2,group:14},
  {z:83,sym:'Bi',name:'Bismuto',mass:208.980,group:15},
  {z:84,sym:'Po',name:'Polonio',mass:209,group:16},
  {z:85,sym:'At',name:'Astato',mass:210,group:17},
  {z:86,sym:'Rn',name:'Radón',mass:222,group:18},
  {z:87,sym:'Fr',name:'Francio',mass:223,group:1},
  {z:88,sym:'Ra',name:'Radio',mass:226,group:2},
  {z:89,sym:'Ac',name:'Actinio',mass:227,group:3},
  {z:90,sym:'Th',name:'Torio',mass:232.038,group:3},
  {z:91,sym:'Pa',name:'Protactinio',mass:231.036,group:3},
  {z:92,sym:'U',name:'Uranio',mass:238.029,group:3},
  {z:93,sym:'Np',name:'Neptunio',mass:237,group:3},
  {z:94,sym:'Pu',name:'Plutonio',mass:244,group:3},
  {z:95,sym:'Am',name:'Americio',mass:243,group:3},
  {z:96,sym:'Cm',name:'Curio',mass:247,group:3},
  {z:97,sym:'Bk',name:'Berkelio',mass:247,group:3},
  {z:98,sym:'Cf',name:'Californio',mass:251,group:3},
  {z:99,sym:'Es',name:'Einstenio',mass:252,group:3},
  {z:100,sym:'Fm',name:'Fermio',mass:257,group:3},
  {z:101,sym:'Md',name:'Mendelevio',mass:258,group:3},
  {z:102,sym:'No',name:'Nobelio',mass:259,group:3},
  {z:103,sym:'Lr',name:'Lawrencio',mass:262,group:3},
  {z:104,sym:'Rf',name:'Rutherfordio',mass:267,group:4},
  {z:105,sym:'Db',name:'Dubnio',mass:268,group:5},
  {z:106,sym:'Sg',name:'Seaborgio',mass:271,group:6},
  {z:107,sym:'Bh',name:'Bohrio',mass:270,group:7},
  {z:108,sym:'Hs',name:'Hasio',mass:277,group:8},
  {z:109,sym:'Mt',name:'Meitnerio',mass:276,group:9},
  {z:110,sym:'Ds',name:'Darmstadtio',mass:281,group:10},
  {z:111,sym:'Rg',name:'Roentgenio',mass:280,group:11},
  {z:112,sym:'Cn',name:'Copernicio',mass:285,group:12},
  {z:113,sym:'Nh',name:'Nihonio',mass:286,group:13},
  {z:114,sym:'Fl',name:'Flerovio',mass:289,group:14},
  {z:115,sym:'Mc',name:'Moscovio',mass:290,group:15},
  {z:116,sym:'Lv',name:'Livermorio',mass:293,group:16},
  {z:117,sym:'Ts',name:'Teneso',mass:294,group:17},
  {z:118,sym:'Og',name:'Oganeson',mass:294,group:18},
];

// Generate electron configurations
const SUBLEVELS = [
  {n:1,l:0,name:'1s',cap:2},
  {n:2,l:0,name:'2s',cap:2},
  {n:2,l:1,name:'2p',cap:6},
  {n:3,l:0,name:'3s',cap:2},
  {n:3,l:1,name:'3p',cap:6},
  {n:4,l:0,name:'4s',cap:2},
  {n:3,l:2,name:'3d',cap:10},
  {n:4,l:1,name:'4p',cap:6},
  {n:5,l:0,name:'5s',cap:2},
  {n:4,l:2,name:'4d',cap:10},
  {n:5,l:1,name:'5p',cap:6},
  {n:6,l:0,name:'6s',cap:2},
  {n:4,l:3,name:'4f',cap:14},
  {n:5,l:2,name:'5d',cap:10},
  {n:6,l:1,name:'6p',cap:6},
  {n:7,l:0,name:'7s',cap:2},
  {n:5,l:3,name:'5f',cap:14},
  {n:6,l:2,name:'6d',cap:10},
  {n:7,l:1,name:'7p',cap:6},
];

// ══ ANOMALÍAS QUÍMICAS IUPAC — Configuraciones y números cuánticos reales ══
const anomaliasQuimicas = {
  // --- Bloque 3d (Periodo 4) — Gas noble base: Argón [Ar] (Z=18) ---
  24:  { config: "[Ar] 4s1 3d5", configFull: "1s2 2s2 2p6 3s2 3p6 4s1 3d5", q: { n: 3, l: 2, ml: 2,  ms: '+1/2' }},
  29:  { config: "[Ar] 4s1 3d10", configFull: "1s2 2s2 2p6 3s2 3p6 4s1 3d10", q: { n: 3, l: 2, ml: 2,  ms: '-1/2' }},

  // --- Bloque 4d (Periodo 5) — Gas noble base: Kriptón [Kr] (Z=36) ---
  41:  { config: "[Kr] 5s1 4d4", configFull: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d4", q: { n: 4, l: 2, ml: 1,  ms: '+1/2' }},
  42:  { config: "[Kr] 5s1 4d5", configFull: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d5", q: { n: 4, l: 2, ml: 2,  ms: '+1/2' }},
  44:  { config: "[Kr] 5s1 4d7", configFull: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d7", q: { n: 4, l: 2, ml: -1, ms: '-1/2' }},
  45:  { config: "[Kr] 5s1 4d8", configFull: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d8", q: { n: 4, l: 2, ml: 0,  ms: '-1/2' }},
  46:  { config: "[Kr] 4d10", configFull: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 4d10", q: { n: 4, l: 2, ml: 2,  ms: '-1/2' }},
  47:  { config: "[Kr] 5s1 4d10", configFull: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d10", q: { n: 4, l: 2, ml: 2,  ms: '-1/2' }},

  // --- Bloque 5d y 4f (Periodo 6) — Gas noble base: Xenón [Xe] (Z=54) ---
  57:  { config: "[Xe] 6s2 5d1", configFull: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 5d1", q: { n: 5, l: 2, ml: -2, ms: '+1/2' }},
  64:  { config: "[Xe] 6s2 4f7 5d1", configFull: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f7 5d1", q: { n: 5, l: 2, ml: -2, ms: '+1/2' }},
  78:  { config: "[Xe] 6s1 4f14 5d9", configFull: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s1 4f14 5d9", q: { n: 5, l: 2, ml: 1,  ms: '-1/2' }},
  79:  { config: "[Xe] 6s1 4f14 5d10", configFull: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s1 4f14 5d10", q: { n: 5, l: 2, ml: 2,  ms: '-1/2' }},

  // --- Bloque 6d y 5f (Periodo 7) — Gas noble base: Radón [Rn] (Z=86) ---
  89:  { config: "[Rn] 7s2 6d1", configFull: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 6d1", q: { n: 6, l: 2, ml: -2, ms: '+1/2' }},
  90:  { config: "[Rn] 7s2 6d2", configFull: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 6d2", q: { n: 6, l: 2, ml: -1, ms: '+1/2' }},
  91:  { config: "[Rn] 7s2 5f2 6d1", configFull: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f2 6d1", q: { n: 6, l: 2, ml: -2, ms: '+1/2' }},
  92:  { config: "[Rn] 7s2 5f3 6d1", configFull: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f3 6d1", q: { n: 6, l: 2, ml: -2, ms: '+1/2' }},
  93:  { config: "[Rn] 7s2 5f4 6d1", configFull: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f4 6d1", q: { n: 6, l: 2, ml: -2, ms: '+1/2' }},
  96:  { config: "[Rn] 7s2 5f7 6d1", configFull: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f7 6d1", q: { n: 6, l: 2, ml: -2, ms: '+1/2' }},
  103: { config: "[Rn] 7s2 5f14 7p1", configFull: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 7p1", q: { n: 7, l: 1, ml: -1, ms: '+1/2' }}
};

function getElectronConfig(atomicNum) {
  // ══ Verificación de anomalía IUPAC ══
  if (anomaliasQuimicas[atomicNum]) {
    return anomaliasQuimicas[atomicNum].configFull;
  }
  
  let remaining = atomicNum;
  let config = [];
  
  for (const sub of SUBLEVELS) {
    if (remaining <= 0) break;
    const take = Math.min(sub.cap, remaining);
    config.push({name: sub.name, electrons: take});
    remaining -= take;
  }
  
  return config.map(c => c.name + c.electrons).join(' ');
}

ELEMENTS.forEach(e => {
  e.cfg = getElectronConfig(e.z);
});

const ATOMIC_MASS = {};
ELEMENTS.forEach(e => ATOMIC_MASS[e.sym] = e.mass);

function getMass(sym) {
  return ATOMIC_MASS[sym] || null;
}

function getElement(sym) {
  return ELEMENTS.find(e => e.sym === sym);
}
