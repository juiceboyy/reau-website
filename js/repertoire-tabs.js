/**
 * Reau Website - Repertoire Tabs & Setlist Explorer
 * Reimagined Covers (Bill Withers, Nina Simone, Smokey Robinson, Bob Marley) + Originals.
 */

export const repertoireData = {
  covers: [
    {
      title: "Ain't No Sunshine / Lean On Me / Just the Two of Us",
      artist: "Bill Withers",
      mood: "Soul & Pop",
      style: "Akoestische groove, soulvolle dynamiek en vocale bezieling"
    },
    {
      title: "My Baby Just Cares for Me",
      artist: "Nina Simone",
      mood: "Klassiek & Swing",
      style: "Smaakvolle syncopes, speelse jazzy harmonieën en akoestische verfijning"
    },
    {
      title: "My Girl",
      artist: "Smokey Robinson",
      mood: "Motown Soul",
      style: "Tijdloze Motown klassieker in een gestript, warm akoestisch jasje"
    },
    {
      title: "Redemption Song / One Love / No Woman No Cry",
      artist: "Bob Marley",
      mood: "Reggae & Roots",
      style: "Akoestische reggae met veel soul en lekker meezingen"
    },
    {
      title: "Easy",
      artist: "Lionel Richie",
      mood: "Smooth Soul",
      style: "Zijdezachte vocalen met een natuurlijke warme klankkleur, ontspannen akoestische grooves en pure feelgood"
    }
  ],
  originals: [
    {
      title: "It's Been Good",
      album: "Single (2024)",
      mood: "Reflectief & Hoopvol",
      style: "Openhartige storytelling over het vieren van levenslessen en schoonheid"
    },
    {
      title: "Evening Sun",
      album: "Paint The Town",
      mood: "Zomerse Soul",
      style: "Warme gitaartokkels en een ontspannen, meeslepende melodielijn"
    },
    {
      title: "Think That I Must Be In Love",
      album: "Originals",
      mood: "Jazzy & Romantisch",
      style: "Speels gitaarwerk en warme vocale harmonieën vol charme"
    },
    {
      title: "Get Into Your Car And Drive",
      album: "Acoustic Journey",
      mood: "Folk-Soul Ballad",
      style: "Filmische opbouw die luisteraars meeneemt op een muzikale roadtrip"
    },
    {
      title: "Poisoning Of My Heart",
      album: "Louise / ASG Sessions",
      mood: "Intens Singer-Songwriter",
      style: "Kwetsbaar, rauw en recht uit het hart gezongen"
    },
    {
      title: "We Want It",
      album: "Anthem ft. Shanell Alyssa",
      mood: "Krachtig & Verbindend",
      style: "Een ode aan rechtvaardigheid, menselijkheid en gelijke rechten"
    }
  ]
};

export function initRepertoireTabs() {
  const tabCovers = document.getElementById('tab-covers');
  const tabOriginals = document.getElementById('tab-originals');
  const repertoireGrid = document.getElementById('repertoire-grid');
  const filterButtons = document.querySelectorAll('.repertoire-filter-btn');

  let activeTab = 'covers';
  let activeFilter = 'all';

  function renderItems() {
    if (!repertoireGrid) return;
    const items = repertoireData[activeTab];
    repertoireGrid.innerHTML = '';

    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'bg-warm-card rounded-2xl p-5 sm:p-6 border border-espresso/10 hover-lift';
      card.innerHTML = `
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="px-3 py-1 text-xs font-semibold rounded-full ${activeTab === 'covers' ? 'bg-terracotta/10 text-terracotta' : 'bg-amber-600/10 text-amber-700'}">
            ${activeTab === 'covers' ? item.artist : item.album}
          </span>
          <span class="text-xs text-espresso-muted">${item.mood}</span>
        </div>
        <h4 class="font-serif text-xl sm:text-2xl text-espresso mb-2">${item.title}</h4>
        <p class="text-sm text-espresso-muted leading-relaxed">${item.style}</p>
      `;
      repertoireGrid.appendChild(card);
    });
  }

  function setActiveTab(tab) {
    activeTab = tab;
    if (tab === 'covers') {
      tabCovers?.classList.add('bg-terracotta', 'text-white', 'shadow-md');
      tabCovers?.classList.remove('bg-transparent', 'text-espresso');
      tabOriginals?.classList.remove('bg-terracotta', 'text-white', 'shadow-md');
      tabOriginals?.classList.add('bg-transparent', 'text-espresso');
    } else {
      tabOriginals?.classList.add('bg-terracotta', 'text-white', 'shadow-md');
      tabOriginals?.classList.remove('bg-transparent', 'text-espresso');
      tabCovers?.classList.remove('bg-terracotta', 'text-white', 'shadow-md');
      tabCovers?.classList.add('bg-transparent', 'text-espresso');
    }
    renderItems();
  }

  tabCovers?.addEventListener('click', () => setActiveTab('covers'));
  tabOriginals?.addEventListener('click', () => setActiveTab('originals'));

  // Initial render
  renderItems();
}
