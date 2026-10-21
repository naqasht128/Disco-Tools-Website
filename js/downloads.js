/**
 * DISCO Tools Website - Downloads Page Dynamic Logic
 * Handles real-time search, status filtering, category tabs, and download/request cards
 */

let activeCategory = 'all';
let searchQuery = '';
let sortBy = 'default';

document.addEventListener('DOMContentLoaded', () => {
  renderCategoryPills();
  renderDownloads();

  // Setup search input listener
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderDownloads();
    });
  }

  // Setup sort dropdown
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      renderDownloads();
    });
  }

  // Check URL query parameters (e.g. ?category=downloadable or ?search=bill)
  const params = new URLSearchParams(window.location.search);
  if (params.has('category')) {
    activeCategory = params.get('category');
    updateActivePill();
  }
  if (params.has('search')) {
    searchQuery = params.get('search').toLowerCase();
    if (searchInput) searchInput.value = searchQuery;
  }
  renderDownloads();
});

// Render Category Filter Pills
function renderCategoryPills() {
  const container = document.getElementById('category-pills-container');
  if (!container) return;

  container.innerHTML = TOOL_CATEGORIES.map(cat => `
    <button 
      class="category-pill px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border border-white/10 bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700/70 transition-all flex items-center gap-2 ${cat.id === activeCategory ? 'active' : ''}"
      data-category="${cat.id}"
      onclick="setCategory('${cat.id}')"
    >
      <span>${cat.name}</span>
      <span class="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-900/60 text-slate-300 border border-white/5">${cat.count}</span>
    </button>
  `).join('');
}

function setCategory(catId) {
  activeCategory = catId;
  updateActivePill();
  renderDownloads();
}

function updateActivePill() {
  document.querySelectorAll('.category-pill').forEach(pill => {
    if (pill.getAttribute('data-category') === activeCategory) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
}

// Render Download / Request Cards
function renderDownloads() {
  const container = document.getElementById('downloads-grid');
  const countBadge = document.getElementById('results-count');
  if (!container) return;

  // Filter tools
  let filtered = DISCO_TOOLS.filter(tool => {
    let matchesCat = true;
    if (activeCategory === 'downloadable') {
      matchesCat = tool.isPublicDownload === true;
    } else if (activeCategory === 'on-request') {
      matchesCat = tool.status === 'on-request';
    } else if (activeCategory === 'in-development') {
      matchesCat = tool.status === 'in-development';
    } else if (activeCategory !== 'all') {
      matchesCat = tool.category === activeCategory;
    }

    const matchesSearch = !searchQuery || 
      tool.name.toLowerCase().includes(searchQuery) ||
      tool.title.toLowerCase().includes(searchQuery) ||
      tool.summary.toLowerCase().includes(searchQuery) ||
      tool.filename.toLowerCase().includes(searchQuery) ||
      tool.features.some(f => f.toLowerCase().includes(searchQuery));
    return matchesCat && matchesSearch;
  });

  // Sort tools
  if (sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'size') {
    filtered.sort((a, b) => parseFloat(b.size) - parseFloat(a.size));
  } else if (sortBy === 'status') {
    filtered.sort((a, b) => {
      if (a.isPublicDownload && !b.isPublicDownload) return -1;
      if (!a.isPublicDownload && b.isPublicDownload) return 1;
      if (a.status === 'on-request' && b.status === 'in-development') return -1;
      if (a.status === 'in-development' && b.status === 'on-request') return 1;
      return 0;
    });
  }

  if (countBadge) {
    countBadge.textContent = `${filtered.length} tool${filtered.length === 1 ? '' : 's'} displayed`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center glass-panel rounded-3xl border border-white/5 p-8">
        <div class="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <i data-lucide="search-x" class="w-8 h-8"></i>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">No tools match your criteria</h3>
        <p class="text-slate-400 max-w-md mx-auto mb-6 text-xs sm:text-sm">
          We couldn't find any tool matching "${searchQuery}". Try selecting "All Softwares" or propose a new tool.
        </p>
        <div class="flex items-center justify-center gap-3">
          <button onclick="resetFilters()" class="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs transition-colors inline-flex items-center gap-2">
            <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Reset Filters
          </button>
          <button onclick="openRequestSoftwareModal('${searchQuery}')" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 font-medium text-xs transition-colors inline-flex items-center gap-2 border border-white/10">
            <i data-lucide="sparkles" class="w-4 h-4"></i> Propose This Tool
          </button>
        </div>
      </div>
    `;
    refreshIcons();
    return;
  }

    container.innerHTML = filtered.map(tool => {
    const isPublic = tool.isPublicDownload === true;
    const isDev = tool.status === 'in-development';
    const showSpecs = tool.id === 'pitc-suite' || tool.id === 'bill-scrapper';

    // Status Badge
    let statusPill = '';
    let actionButton = '';

    if (isPublic) {
      statusPill = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-indicator"></span> Direct Download
      </span>`;

      actionButton = `<button 
        onclick="triggerToolDownload('${tool.id}', '${tool.title}')"
        class="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold text-xs transition-all shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 glow-btn"
      >
        <i data-lucide="download" class="w-4 h-4"></i> Download EXE
      </button>`;
    } else if (isDev) {
      statusPill = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span> In Development
      </span>`;

      actionButton = `<button 
        onclick="openContactRequestModal(getToolById('${tool.id}'))"
        class="w-full py-2.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
      >
        <i data-lucide="clock" class="w-4 h-4 text-amber-400"></i> Contact / Pre-Order
      </button>`;
    } else {
      // Available on request / private distribution
      statusPill = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
        <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span> Available on Request
      </span>`;

      actionButton = `<button 
        onclick="openContactRequestModal(getToolById('${tool.id}'))"
        class="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border border-sky-500/30 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
      >
        <i data-lucide="phone-call" class="w-4 h-4 text-sky-400"></i> Contact / Request Tool
      </button>`;
    }

    const cardBorder = tool.isFlagship 
      ? 'border-sky-500/40 bg-gradient-to-b from-sky-950/20 to-slate-900/80 shadow-lg shadow-sky-500/5' 
      : (isPublic ? 'border-emerald-500/30 bg-slate-900/80' : 'border-white/10 bg-slate-900/70');

    // Version badge only for PITCSuite and Bill Scrapper
    const versionBadge = (showSpecs && tool.version) ? `
      <span class="text-xs font-mono text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded border border-white/5 ${tool.id === 'pitc-suite' ? 'pitc-version-badge' : (tool.id === 'bill-scrapper' ? 'bill-version-badge' : '')}">
        ${tool.version}
      </span>` : '';

    // Filename (.exe) only for PITCSuite and Bill Scrapper
    const filenameDisplay = (showSpecs && tool.filename) ? `
      <p class="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-1.5">
        <i data-lucide="file" class="w-3 h-3 text-slate-500"></i> ${tool.filename}
      </p>` : '';

    // Footer specs: size only for PITCSuite and Bill Scrapper
    const footerSpecs = showSpecs ? `
      <div class="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-white/5 font-mono">
        <span class="flex items-center gap-1.5">
          <i data-lucide="hard-drive" class="w-3.5 h-3.5 text-slate-500"></i> <span class="${tool.id === 'pitc-suite' ? 'pitc-size-badge' : 'bill-size-badge'}">${tool.size}</span>
        </span>
        <span class="flex items-center gap-1.5">
          <i data-lucide="calendar" class="w-3.5 h-3.5 text-slate-500"></i> ${tool.updated}
        </span>
      </div>` : `
      <div class="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-white/5">
        <span class="flex items-center gap-1.5 text-slate-400">
          <i data-lucide="shield" class="w-3.5 h-3.5 text-sky-400/70"></i> Commercial Tool
        </span>
        <span class="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
          <i data-lucide="calendar" class="w-3.5 h-3.5 text-slate-500"></i> ${tool.updated}
        </span>
      </div>`;

    return `
      <div 
        onclick="navigateToDetails('${tool.id}', event)"
        class="glass-card rounded-2xl p-6 flex flex-col justify-between relative group ${cardBorder} cursor-pointer hover:shadow-xl transition-all duration-200"
        title="Click to view software details &amp; specifications"
      >
        
        <!-- Header Badges -->
        <div>
          <div class="flex items-center justify-between gap-2 mb-4">
            ${statusPill}
            ${versionBadge}
          </div>

          <!-- Icon & Title -->
          <div class="flex items-start gap-3.5 mb-4">
            <div class="w-12 h-12 rounded-xl ${tool.isFlagship ? 'bg-sky-600/30 text-sky-300 border border-sky-400/30' : (isPublic ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-sky-400 border border-white/5')} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <i data-lucide="${tool.icon}" class="w-6 h-6"></i>
            </div>
            <div>
              <h3 class="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-snug flex items-center gap-1.5">
                ${tool.name}
                <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 text-slate-400 opacity-60 group-hover:opacity-100 group-hover:text-sky-300 transition-all"></i>
              </h3>
              ${filenameDisplay}
            </div>
          </div>

          <!-- Description -->
          <p class="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
            ${tool.summary}
          </p>

          <!-- Key Features Snippet -->
          <div class="space-y-1.5 mb-6 text-xs text-slate-400 border-t border-white/5 pt-4">
            ${tool.features.slice(0, 2).map(f => `
              <div class="flex items-start gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5"></i>
                <span class="line-clamp-1">${f}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Footer Actions -->
        <div>
          ${footerSpecs}

          <div class="grid grid-cols-2 gap-2" onclick="event.stopPropagation()">
            ${actionButton}
            <a 
              href="details.html?tool=${tool.id}"
              class="w-full py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-white/10 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 hover:text-white"
            >
              <i data-lucide="info" class="w-4 h-4 text-sky-400"></i> Details
            </a>
          </div>
        </div>

      </div>
    `;
  }).join('');

  refreshIcons();
}

function resetFilters() {
  activeCategory = 'all';
  searchQuery = '';
  sortBy = 'default';
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) sortSelect.value = 'default';
  updateActivePill();
  renderDownloads();
}
