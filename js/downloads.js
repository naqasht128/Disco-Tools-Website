/**
 * DISCO Tools Website - Downloads Page Dynamic Logic
 * Designed for simplicity, high readability, and effortless mobile & desktop use
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

  // Setup mobile category dropdown
  const categorySelect = document.getElementById('category-select');
  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      setCategory(e.target.value);
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

// Render Category Filters (Pills for desktop, Dropdown for mobile)
function renderCategoryPills() {
  const container = document.getElementById('category-pills-container');
  if (container) {
    container.innerHTML = TOOL_CATEGORIES.map(cat => `
      <button 
        class="category-pill px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg text-xs font-semibold border border-white/10 bg-slate-800/80 text-slate-200 hover:text-white hover:bg-slate-700 transition-all flex items-center gap-1.5 shrink-0 ${cat.id === activeCategory ? 'active' : ''}"
        data-category="${cat.id}"
        onclick="setCategory('${cat.id}')"
      >
        <span>${cat.name}</span>
        <span class="px-1.5 py-0.2 rounded-full text-[10px] sm:text-[11px] font-mono bg-slate-900/90 text-sky-300 border border-white/10">${cat.count}</span>
      </button>
    `).join('');
  }

  const categorySelect = document.getElementById('category-select');
  if (categorySelect) {
    categorySelect.innerHTML = TOOL_CATEGORIES.map(cat => `
      <option value="${cat.id}" ${cat.id === activeCategory ? 'selected' : ''}>
        ${cat.name} (${cat.count})
      </option>
    `).join('');
  }
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

  const categorySelect = document.getElementById('category-select');
  if (categorySelect && categorySelect.value !== activeCategory) {
    categorySelect.value = activeCategory;
  }
}

// Render Download / Request Cards with maximum legibility and large buttons
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
    countBadge.textContent = `${filtered.length} software shown`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center glass-panel rounded-3xl border border-white/10 p-8">
        <div class="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <i data-lucide="search-x" class="w-8 h-8"></i>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">No software matched your search</h3>
        <p class="text-slate-300 max-w-md mx-auto mb-6 text-sm">
          We could not find anything matching "${searchQuery}". Try clearing your search or call our helpline.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <button onclick="resetFilters()" class="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-colors inline-flex items-center gap-2">
            <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Show All Softwares
          </button>
          <a href="https://wa.me/923339962474" target="_blank" class="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors inline-flex items-center gap-2">
            <i data-lucide="phone-call" class="w-4 h-4"></i> WhatsApp Helpline (0333-9962474)
          </a>
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
    const isBillScrapper = tool.id === 'bill-scrapper';

    // Status Badge & Action Buttons
    let statusPill = '';
    let actionButton = '';

    if (isPublic) {
      const startingPrice = tool.id === 'pitc-suite' ? 'Starting from Rs. 600' : (tool.id === 'bill-scrapper' ? 'Starting from Rs. 300' : 'Direct Download');
      statusPill = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Direct Download Ready (${startingPrice})
      </span>`;

      actionButton = `<button 
        onclick="triggerToolDownload('${tool.id}', '${tool.title}')"
        class="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-950/30 flex items-center justify-center gap-1.5 glow-btn"
        title="Download ${tool.name} for Windows PC"
      >
        <i data-lucide="download" class="w-4 h-4"></i> Download EXE
      </button>`;
    } else if (isDev) {
      statusPill = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span> In Development
      </span>`;

      actionButton = `<button 
        onclick="openContactRequestModal(getToolById('${tool.id}'))"
        class="w-full py-2.5 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
      >
        <i data-lucide="clock" class="w-3.5 h-3.5 text-amber-400"></i> Early Access
      </button>`;
    } else {
      // Available on request
      statusPill = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
        <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span> Available on Request
      </span>`;

      actionButton = `<button 
        onclick="openContactRequestModal(getToolById('${tool.id}'))"
        class="w-full py-2.5 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-sky-950/20"
      >
        <i data-lucide="phone-call" class="w-3.5 h-3.5"></i> Request Copy
      </button>`;
    }

    const cardBorder = tool.isFlagship 
      ? 'border-sky-500/40 bg-slate-900/90 shadow-xl' 
      : (isPublic ? 'border-emerald-500/30 bg-slate-900/85' : 'border-white/10 bg-slate-900/80');

    // Filename / specs display under title
    let filenameDisplay = '';
    if (isBillScrapper) {
      filenameDisplay = `
        <p class="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-1 truncate">
          <i data-lucide="layers" class="w-3 h-3 text-sky-400 shrink-0"></i> Windows 10/11 • Windows 7 • Linux ARM64
        </p>`;
    } else if (showSpecs && tool.filename) {
      filenameDisplay = `
        <p class="text-[11px] text-slate-300 font-mono mt-0.5 flex items-center gap-1 truncate">
          <i data-lucide="file" class="w-3 h-3 text-sky-400 shrink-0"></i> ${tool.filename}
        </p>`;
    }

    // File specs bar
    let footerSpecs = '';
    if (isBillScrapper) {
      footerSpecs = `
        <div class="flex items-center justify-between text-[11px] text-slate-300 mb-2.5 font-mono">
          <span class="flex items-center gap-1 text-white font-semibold">
            <i data-lucide="hard-drive" class="w-3 h-3 text-sky-400"></i> Size: <span class="bill-size-badge">22.2 MB</span>
          </span>
          <span class="flex items-center gap-1 text-emerald-400 font-semibold">
            <i data-lucide="check-circle-2" class="w-3 h-3"></i> 100% Offline
          </span>
        </div>`;
    } else if (showSpecs) {
      footerSpecs = `
        <div class="flex items-center justify-between text-[11px] text-slate-300 mb-2.5 font-mono">
          <span class="flex items-center gap-1 text-white font-semibold">
            <i data-lucide="hard-drive" class="w-3 h-3 text-sky-400"></i> Size: <span class="${tool.id === 'pitc-suite' ? 'pitc-size-badge' : 'bill-size-badge'}">${tool.size}</span>
          </span>
          <span class="flex items-center gap-1 text-emerald-400 font-semibold">
            <i data-lucide="check-circle-2" class="w-3 h-3"></i> 100% Offline
          </span>
        </div>`;
    } else {
      footerSpecs = `
        <div class="flex items-center justify-between text-[11px] text-slate-400 mb-2.5">
          <span class="flex items-center gap-1 text-sky-300 font-medium">
            <i data-lucide="shield" class="w-3 h-3 text-sky-400"></i> Commercial Tool
          </span>
          <span class="flex items-center gap-1 text-emerald-400 font-medium">
            <i data-lucide="check" class="w-3 h-3"></i> Win 7/8/10/11
          </span>
        </div>`;
    }

    // Action buttons section
    let actionButtonsSection = '';
    if (isBillScrapper) {
      actionButtonsSection = `
        <div class="space-y-1.5" onclick="event.stopPropagation()">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button 
              onclick="triggerToolDownload('bill-scrapper', 'Bill Scrapper - Windows 10/11', 'https://github.com/naqasht128/BillScrapper/releases/latest/download/BillScrapper-Setup.exe', 'BillScrapper-Setup.exe')"
              class="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-950/30 flex items-center justify-center gap-1.5 glow-btn"
              title="Download Bill Scrapper for Windows 10 & 11 (22.2 MB)"
            >
              <i data-lucide="download" class="w-4 h-4"></i> Download Windows 10/11
            </button>
            <a 
              href="details.html?tool=bill-scrapper"
              class="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-white/10 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <i data-lucide="info" class="w-3.5 h-3.5 text-sky-400"></i> Details & Guide
            </a>
          </div>
          <div class="flex items-center justify-between text-[11px] text-slate-400 px-0.5 pt-0.5">
            <span class="text-slate-400">Windows 10/11 (22.2 MB)</span>
            <div class="flex items-center gap-1.5">
              <span class="text-slate-500">Other:</span>
              <button onclick="triggerToolDownload('bill-scrapper', 'Bill Scrapper - Windows 7 Legacy', 'https://github.com/naqasht128/BillScrapper/releases/latest/download/BillScrapper-Win7-Setup.exe', 'BillScrapper-Win7-Setup.exe')" class="text-teal-400 hover:underline">Win 7</button>
              <span class="text-slate-600">•</span>
              <button onclick="triggerToolDownload('bill-scrapper', 'Bill Scrapper - Linux ARM64', 'https://github.com/naqasht128/BillScrapper/releases/latest/download/BillScrapper', 'BillScrapper')" class="text-sky-400 hover:underline">Linux</button>
            </div>
          </div>
        </div>
      `;
    } else {
      actionButtonsSection = `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2" onclick="event.stopPropagation()">
          ${actionButton}
          <a 
            href="details.html?tool=${tool.id}"
            class="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-white/10 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
          >
            <i data-lucide="info" class="w-3.5 h-3.5 text-sky-400"></i> Details & Guide
          </a>
        </div>
      `;
    }

    return `
      <div 
        onclick="navigateToDetails('${tool.id}', event)"
        class="glass-card rounded-xl p-4 sm:p-5 flex flex-col justify-between relative group ${cardBorder} cursor-pointer hover:border-sky-400/50 hover:shadow-xl transition-all duration-200"
        title="Click to view full software details & instructions"
      >
        
        <div>
          <!-- Header Badges -->
          <div class="flex items-center justify-between gap-2 mb-2.5">
            ${statusPill}
          </div>

          <!-- Icon & Title -->
          <div class="flex items-center gap-3 mb-2.5">
            <div class="w-10 h-10 rounded-lg ${tool.isFlagship ? 'bg-sky-600/30 text-sky-300 border border-sky-400/40' : (isPublic ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-sky-400 border border-white/10')} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
              <i data-lucide="${tool.icon}" class="w-5 h-5"></i>
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-tight truncate flex items-center gap-1.5">
                <span>${tool.name}</span>
                <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 text-slate-400 opacity-60 group-hover:opacity-100 group-hover:text-sky-300 transition-all shrink-0"></i>
              </h3>
              ${filenameDisplay}
            </div>
          </div>

          <!-- Description (Reduced & High Contrast) -->
          <p class="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
            ${tool.summary}
          </p>
        </div>

        <!-- Footer Actions -->
        <div class="pt-2 border-t border-white/5">
          ${footerSpecs}
          ${actionButtonsSection}
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
  const categorySelect = document.getElementById('category-select');
  if (categorySelect) categorySelect.value = 'all';
  updateActivePill();
  renderDownloads();
}
