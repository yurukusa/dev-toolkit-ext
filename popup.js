// Dev Toolkit Chrome Extension - Popup Logic
const searchEl = document.getElementById('search');
const toolsEl = document.getElementById('tools');
const filtersEl = document.getElementById('filters');
const countEl = document.getElementById('count');
const favCountEl = document.getElementById('favCount');

// State
let currentFilter = 'all';
let currentTab = 'all';
let favorites = new Set();
let recents = [];

// Category labels
const CATS = {
  all: 'All',
  code: 'Code',
  design: 'Design',
  writing: 'Writing',
  data: 'Data',
  ai: 'AI',
  media: 'Media',
  devops: 'DevOps',
  security: 'Security'
};

// Load state from storage
async function loadState() {
  try {
    const data = await chrome.storage.sync.get(['favorites', 'recents']);
    if (data.favorites) favorites = new Set(data.favorites);
    if (data.recents) recents = data.recents;
  } catch {
    // Fallback to localStorage for development
    const f = localStorage.getItem('dt_favs');
    const r = localStorage.getItem('dt_recents');
    if (f) favorites = new Set(JSON.parse(f));
    if (r) recents = JSON.parse(r);
  }
  favCountEl.textContent = favorites.size;
}

async function saveState() {
  try {
    await chrome.storage.sync.set({
      favorites: [...favorites],
      recents: recents.slice(0, 20)
    });
  } catch {
    localStorage.setItem('dt_favs', JSON.stringify([...favorites]));
    localStorage.setItem('dt_recents', JSON.stringify(recents.slice(0, 20)));
  }
  favCountEl.textContent = favorites.size;
}

// Build category filters
function buildFilters() {
  const cats = {};
  TOOLS.forEach(t => { cats[t.cat] = (cats[t.cat] || 0) + 1; });

  let html = `<div class="fbtn active" data-cat="all">All ${TOOLS.length}</div>`;
  for (const [key, label] of Object.entries(CATS)) {
    if (key === 'all') continue;
    if (cats[key]) {
      html += `<div class="fbtn" data-cat="${key}">${label} ${cats[key]}</div>`;
    }
  }
  filtersEl.innerHTML = html;

  filtersEl.querySelectorAll('.fbtn').forEach(btn => {
    btn.addEventListener('click', () => {
      filtersEl.querySelectorAll('.fbtn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.cat;
      render();
    });
  });
}

// Render tools list
function render() {
  const query = searchEl.value.trim().toLowerCase();
  let list;

  if (currentTab === 'favs') {
    list = TOOLS.filter(t => favorites.has(t.url));
  } else if (currentTab === 'recent') {
    list = recents.map(url => TOOLS.find(t => t.url === url)).filter(Boolean);
  } else {
    list = TOOLS;
  }

  if (currentFilter !== 'all') {
    list = list.filter(t => t.cat === currentFilter);
  }

  if (query) {
    list = list.filter(t =>
      t.name.toLowerCase().includes(query) ||
      t.desc.toLowerCase().includes(query) ||
      t.cat.toLowerCase().includes(query)
    );
  }

  countEl.textContent = list.length + ' tools';

  if (list.length === 0) {
    toolsEl.innerHTML = '<div class="empty">No tools found</div>';
    return;
  }

  // Limit visible for performance
  const visible = list.slice(0, 50);

  toolsEl.innerHTML = visible.map(t => `
    <a class="tool" href="${esc(t.url)}" target="_blank" data-url="${esc(t.url)}">
      <div class="icon">${esc(t.icon)}</div>
      <div class="info">
        <h3>${esc(t.name)}</h3>
        <p>${esc(t.desc)}</p>
      </div>
      <div class="fav ${favorites.has(t.url) ? 'on' : ''}" data-fav="${esc(t.url)}">★</div>
    </a>
  `).join('');

  if (list.length > 50) {
    toolsEl.innerHTML += `<div class="empty">${list.length - 50} more — refine your search</div>`;
  }

  // Favorite toggle
  toolsEl.querySelectorAll('.fav').forEach(fav => {
    fav.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const url = fav.dataset.fav;
      if (favorites.has(url)) {
        favorites.delete(url);
        fav.classList.remove('on');
      } else {
        favorites.add(url);
        fav.classList.add('on');
      }
      saveState();
    });
  });

  // Track recent
  toolsEl.querySelectorAll('.tool').forEach(link => {
    link.addEventListener('click', () => {
      const url = link.dataset.url;
      recents = recents.filter(u => u !== url);
      recents.unshift(url);
      if (recents.length > 20) recents = recents.slice(0, 20);
      saveState();
    });
  });
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = String(s || '');
  return d.innerHTML;
}

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentTab = tab.dataset.tab;
    render();
  });
});

// Search
searchEl.addEventListener('input', render);

// Init
loadState().then(() => {
  buildFilters();
  render();
});
