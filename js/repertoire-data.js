/**
 * Reau Website - Repertoire Data Store
 * Unified dataset containing original songs and reimagined acoustic covers with media metadata.
 */

export const repertoireList = [
  // Originals (3 selected tracks)
  {
    id: 'your-morning-smile',
    type: 'original',
    title: "Your Morning Smile",
    tag: "Origineel",
    subtitle: "Jazzy Singer-Songwriter",
    duration: "3:20",
    style: "Speelse jazzy timing, warm akoestisch gitaarspel en een opgewekte melodie.",
    audioSrc: "assets/audio/your-morning-smile.mp3"
  },
  {
    id: 'rise-up-and-start-singing',
    type: 'original',
    title: "Rise Up and Start Singing",
    tag: "Origineel",
    subtitle: "Acoustic Pop / Soul",
    duration: "2:36",
    style: "Aanstekelijke melodie en optimistische energie vol hoop, verbinding en ritme.",
    audioSrc: "assets/audio/rise-up-and-start-singing.mp3"
  },
  {
    id: 'think-that-i-must-be-in-love',
    type: 'original',
    title: "Think That I Must Be In Love",
    tag: "Origineel",
    subtitle: "Acoustic Storytelling",
    duration: "2:27",
    style: "Puur liedjesmakerschap geïnspireerd door klassieke soul en jazzy akkoorden.",
    audioSrc: "assets/audio/think-that-i-must-be-in-love.mp3"
  },
  {
    id: 'maybe',
    type: 'original',
    title: "Maybe",
    tag: "Origineel",
    subtitle: "Live in Toulouse",
    duration: "1:28",
    style: "Café optreden in Toulouse, Frankrijk; puur eigen werk met gitaar en zang.",
    audioSrc: null,
    videoSrc: "assets/video/reau-maybe.mp4",
    videoPreviewSrc: "assets/video/reau-maybe-preview.mp4",
    videoPoster: "assets/images/video-poster-maybe.jpg"
  },

  // Reimagined Covers
  {
    id: 'aint-no-sunshine',
    type: 'cover',
    title: "Ain't No Sunshine / Lean On Me",
    tag: "Cover • Bill Withers",
    subtitle: "Soul & Pop",
    duration: "Live fragment",
    style: "Akoestische groove, soulvolle dynamiek en vocale bezieling.",
    audioSrc: null
  },
  {
    id: 'my-baby-just-cares',
    type: 'cover',
    title: "My Baby Just Cares for Me",
    tag: "Cover • Nina Simone",
    subtitle: "Tuin optreden • Swing",
    duration: "0:57",
    style: "Sfeervol tuin optreden met een jazzy meezing classic.",
    audioSrc: null,
    videoSrc: "assets/video/reau-nina-simone.mp4",
    videoPreviewSrc: "assets/video/reau-nina-simone-preview.mp4",
    videoPoster: "assets/images/video-poster-nina-simone.jpg"
  },
  {
    id: 'sweet-dreams',
    type: 'cover',
    title: "Sweet Dreams",
    tag: "Cover • Eurythmics",
    subtitle: "Café Live • Met Percussie",
    duration: "0:20",
    style: "Intiem café optreden in dynamische duo-bezetting met percussionist en een stuwende akoestische pop-groove.",
    audioSrc: null,
    videoSrc: "assets/video/reau-sweet-dreams.mp4",
    videoPreviewSrc: "assets/video/reau-sweet-dreams-preview.mp4",
    videoPoster: "assets/images/video-poster-sweet-dreams.jpg"
  },
  {
    id: 'my-girl',
    type: 'cover',
    title: "My Girl",
    tag: "Cover • Smokey Robinson",
    subtitle: "Motown Soul",
    duration: "Live fragment",
    style: "Tijdloze Motown klassieker in een gestript, warm akoestisch jasje.",
    audioSrc: null
  },
  {
    id: 'redemption-song',
    type: 'cover',
    title: "Redemption Song / One Love",
    tag: "Cover • Bob Marley",
    subtitle: "Reggae & Roots",
    duration: "Live fragment",
    style: "Akoestische reggae met veel soul en lekker meezingen.",
    audioSrc: null
  },
  {
    id: 'easy',
    type: 'cover',
    title: "Easy",
    tag: "Cover • Lionel Richie",
    subtitle: "Smooth Soul",
    duration: "Live fragment",
    style: "Zijdezachte vocalen met een natuurlijke warme klankkleur en pure feelgood.",
    audioSrc: null
  }
];
