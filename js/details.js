/**
 * DISCO Tools Website - Software Details & Overview Dynamic Logic
 */

let selectedToolId = 'pitc-suite';

document.addEventListener('DOMContentLoaded', () => {
  // Check URL query parameters (e.g. ?tool=bill-scrapper)
  const params = new URLSearchParams(window.location.search);
  if (params.has('tool')) {
    const requestedId = params.get('tool');
    if (getToolById(requestedId)) {
      selectedToolId = requestedId;
    }
  }

  renderToolSidebar();
  renderTutorialContent(selectedToolId);

  // Setup sidebar quick filter
  const sidebarSearch = document.getElementById('details-search') || document.getElementById('tutorial-search');
  if (sidebarSearch) {
    sidebarSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      filterSidebarList(q);
    });
  }
});

// Render sidebar tool selector list
function renderToolSidebar() {
  const container = document.getElementById('tools-sidebar-list');
  if (!container) return;

  const countBadge = document.querySelector('aside span.font-mono');
  if (countBadge) {
    countBadge.textContent = `${DISCO_TOOLS.length} Tools`;
  }

  container.innerHTML = DISCO_TOOLS.map(tool => {
    const isSelected = tool.id === selectedToolId;
    return `
      <button 
        onclick="selectTutorial('${tool.id}')"
        class="w-full text-left p-3.5 rounded-xl transition-all flex items-center justify-between gap-3 group sidebar-item ${isSelected ? 'bg-sky-600/20 text-white border border-sky-500/40 shadow-sm' : 'text-slate-300 hover:bg-slate-800/60 border border-transparent hover:border-white/5'}"
        data-tool-id="${tool.id}"
        data-tool-name="${tool.name.toLowerCase()}"
        data-tool-title="${tool.title.toLowerCase()}"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-8 h-8 rounded-lg ${isSelected ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-sky-400'} flex items-center justify-center flex-shrink-0 transition-colors">
            <i data-lucide="${tool.icon}" class="w-4 h-4"></i>
          </div>
          <div class="truncate">
            <div class="text-xs font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-200'}">${tool.name}</div>
            <div class="text-[11px] text-slate-400 truncate">${tool.badge}</div>
          </div>
        </div>
        <i data-lucide="chevron-right" class="w-4 h-4 flex-shrink-0 ${isSelected ? 'text-sky-400' : 'text-slate-600 group-hover:text-slate-400'}"></i>
      </button>
    `;
  }).join('');

  refreshIcons();
}

// Filter the sidebar list
function filterSidebarList(query) {
  const items = document.querySelectorAll('.sidebar-item');
  items.forEach(item => {
    const name = item.getAttribute('data-tool-name');
    const title = item.getAttribute('data-tool-title');
    if (!query || name.includes(query) || title.includes(query)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// Select tutorial/details and render
function selectTutorial(toolId) {
  if (selectedToolId === toolId) return;
  selectedToolId = toolId;

  // Update active state in sidebar
  renderToolSidebar();

  // Render tutorial content
  renderTutorialContent(toolId);

  // Scroll to content top on mobile
  if (window.innerWidth < 1024) {
    const mainContent = document.getElementById('tutorial-main-content');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// Render the main details view for the selected tool
function renderTutorialContent(toolId) {
  const tool = getToolById(toolId);
  const container = document.getElementById('tutorial-main-content');
  if (!container || !tool) return;

  const tut = tool.tutorial;

  container.innerHTML = `
    <!-- Tool Header Banner -->
    <div class="glass-panel rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden border border-white/10 ${tool.isFlagship ? 'border-sky-500/40 bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-900' : ''}">
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-3">
            <span class="px-3 py-1 rounded-full text-xs font-semibold ${tool.id === 'pitc-suite' || tool.id === 'bill-scrapper' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'} flex items-center gap-1.5">
              ${tool.id === 'pitc-suite' || tool.id === 'bill-scrapper' ? '<i data-lucide="tag" class="w-3.5 h-3.5 text-emerald-400"></i>' : ''}
              ${tool.id === 'pitc-suite' ? 'Starting from Rs. 600' : (tool.id === 'bill-scrapper' ? 'Starting from Rs. 300' : tool.badge)}
            </span>
            ${(tool.id === 'pitc-suite' || tool.id === 'bill-scrapper') && tool.version ? `
            <span class="px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-white/5 ${tool.id === 'pitc-suite' ? 'pitc-version-badge' : 'bill-version-badge'}">
              ${tool.version}
            </span>` : ''}
            ${(tool.id === 'pitc-suite' || tool.id === 'bill-scrapper') && tool.size ? `
            <span class="text-xs text-slate-400 flex items-center gap-1">
              <i data-lucide="hard-drive" class="w-3.5 h-3.5"></i> <span class="${tool.id === 'pitc-suite' ? 'pitc-size-badge' : 'bill-size-badge'}">${tool.size}</span>
            </span>` : ''}
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            ${tool.title}
          </h1>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            ${tool.description}
          </p>
        </div>

        <!-- Download or Request Action Card in Details Header -->
        <div class="flex-shrink-0 flex items-center">
          ${tool.builds && tool.builds.length > 0 ? `
          <div class="flex flex-col gap-2">
            <span class="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <i data-lucide="download" class="w-3.5 h-3.5 text-emerald-400"></i> Choose OS to Download:
            </span>
            <div class="flex flex-wrap sm:flex-nowrap items-center gap-2">
              ${tool.builds.map(b => `
                <button 
                  onclick="triggerToolDownload('${tool.id}', '${tool.name} - ${b.label}', '${b.downloadUrl}', '${b.filename}')"
                  class="px-3.5 py-2.5 rounded-xl ${b.id === 'win10' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-950/40 glow-btn' : (b.id === 'win7' ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 hover:text-white border border-emerald-500/40' : 'bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border border-sky-500/40')} font-bold text-xs flex items-center gap-1.5 transition-all"
                  title="Download for ${b.label} (${b.size})"
                >
                  <i data-lucide="${b.icon || 'download'}" class="w-3.5 h-3.5"></i>
                  <span>${b.label}</span>
                  <span class="text-[10px] opacity-75 font-mono">${b.size}</span>
                </button>
              `).join('')}
            </div>
          </div>` : (tool.isPublicDownload ? `
          <button 
            onclick="triggerToolDownload('${tool.id}', '${tool.title}')"
            class="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-sm shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center gap-2 glow-btn"
          >
            <i data-lucide="download" class="w-4 h-4"></i> Download ${tool.name}
          </button>` : `
          <button 
            onclick="openContactRequestModal(getToolById('${tool.id}'))"
            class="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border border-sky-500/30 font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <i data-lucide="phone-call" class="w-4 h-4 text-sky-400"></i> Request Software
          </button>`)}
        </div>
      </div>
    </div>

    <!-- Overview & Prerequisites Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      <!-- Key Highlights -->
      <div class="glass-card rounded-2xl p-6 md:col-span-2 border border-white/5">
        <h3 class="text-base font-bold text-white mb-4 flex items-center gap-2">
          <i data-lucide="zap" class="w-4 h-4 text-amber-400"></i> Core Capabilities
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${tool.features.map(f => `
            <div class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-slate-900/40 p-2.5 rounded-lg border border-white/5">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5"></i>
              <span>${f}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Prerequisites Card -->
      <div class="glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
        <div>
          <h3 class="text-base font-bold text-white mb-4 flex items-center gap-2">
            <i data-lucide="shield-check" class="w-4 h-4 text-sky-400"></i> Requirements
          </h3>
          <ul class="space-y-3 text-xs sm:text-sm text-slate-300">
            ${tut.prerequisites.map(req => `
              <li class="flex items-start gap-2">
                <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-1"></i>
                <span>${req}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        <div class="mt-4 pt-4 border-t border-white/5 text-[11px] text-slate-400">
          Compatible with all DISCOs (LESCO, GEPCO, FESCO, IESCO, MEPCO, PESCO, HAZECO, SEPCO, HESCO, QESCO, TESCO) / WAPDA standard office configurations.
        </div>
      </div>

    </div>

    <!-- Subscription & Pricing Plans (For PITCSuite and Bill Scrapper) -->
    ${tool.pricingPlans && tool.pricingPlans.length > 0 ? `
      <div class="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 via-slate-900/90 to-slate-900 mb-8 shadow-xl shadow-emerald-950/20">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/5">
          <div>
            <span class="text-xs font-semibold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <i data-lucide="tag" class="w-3.5 h-3.5"></i> Subscription &amp; Licensing Plans
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white mt-1">
              Choose Your License Plan
            </h2>
            <p class="text-slate-300 text-xs sm:text-sm mt-1">
              Hardware-locked subscription keys for DISCO commercial staff with instant online/offline activation.
            </p>
          </div>
          <div class="flex-shrink-0">
            <a 
              href="https://wa.me/923335022833?text=Hello%2C%20I%20want%20to%20order%20a%20license%20for%20${encodeURIComponent(tool.name)}" 
              target="_blank"
              rel="noopener"
              class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-600/25"
            >
              <i data-lucide="message-circle" class="w-4 h-4"></i> WhatsApp Order Desk
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${tool.pricingPlans.map((plan, pIdx) => `
            <div class="glass-card rounded-2xl p-5 border ${pIdx === tool.pricingPlans.length - 1 ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-white/10 bg-slate-900/60'} flex flex-col justify-between relative hover:border-emerald-400/50 transition-all group">
              ${pIdx === tool.pricingPlans.length - 1 ? `
                <span class="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500 text-slate-950 shadow-sm">
                  Best Value
                </span>
              ` : ''}
              <div>
                <h4 class="text-sm font-bold text-white mb-1">${plan.name}</h4>
                <div class="text-2xl font-extrabold text-emerald-400 font-mono mb-2">${plan.price}</div>
                <div class="space-y-1.5 text-xs text-slate-300 mb-4 pt-2 border-t border-white/5">
                  <div class="flex items-center gap-1.5">
                    <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-400"></i> ${plan.validity}
                  </div>
                  <div class="flex items-center gap-1.5">
                    <i data-lucide="laptop" class="w-3.5 h-3.5 text-slate-400"></i> ${plan.devices}
                  </div>
                </div>
              </div>
              <a 
                href="https://wa.me/923335022833?text=Hello%2C%20I%20want%20to%20order%20the%20${encodeURIComponent(tool.name)}%20${encodeURIComponent(plan.name)}%20(${encodeURIComponent(plan.price)})" 
                target="_blank"
                rel="noopener"
                class="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white border border-white/10 hover:border-emerald-500 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i> Order Plan
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Workflow & Functional Breakdown -->
    <div class="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 mb-8">
      <div class="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
        <div>
          <span class="text-xs font-semibold text-sky-400 uppercase tracking-widest">Operational Breakdown</span>
          <h2 class="text-xl sm:text-2xl font-bold text-white mt-1">Workflow & Functional Overview</h2>
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-white/5">
          ${tut.steps.length} Steps
        </span>
      </div>

      <div class="space-y-6">
        ${tut.steps.map(s => `
          <div class="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-sky-500/20 transition-all">
            <div class="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold text-sm flex-shrink-0">
              ${s.step}
            </div>
            <div>
              <h4 class="text-sm font-bold text-white mb-1">${s.title}</h4>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${s.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>

      ${tut.tips && tut.tips.length > 0 ? `
        <div class="mt-8 pt-6 border-t border-white/5">
          <h4 class="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
            <i data-lucide="lightbulb" class="w-3.5 h-3.5"></i> Operational Notes
          </h4>
          <ul class="space-y-2 text-xs sm:text-sm text-slate-300">
            ${tut.tips.map(tip => `
              <li class="flex items-start gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5"></i>
                <span>${tip}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}
    </div>

    <!-- Navigation Footer -->
    <div class="flex items-center justify-between pt-4 border-t border-white/10">
      <button 
        onclick="navigateTutorial(-1)"
        class="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 border border-white/5 transition-all"
      >
        <i data-lucide="chevron-left" class="w-4 h-4"></i> Previous Software
      </button>

      <span class="text-xs text-slate-500">
        DISCO Sub-Divisional Operations &copy; 2026
      </span>

      <button 
        onclick="navigateTutorial(1)"
        class="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 border border-white/5 transition-all"
      >
        Next Software <i data-lucide="chevron-right" class="w-4 h-4"></i>
      </button>
    </div>
  `;

  refreshIcons();
}

// Next / Previous navigation
function navigateTutorial(direction) {
  const currentIndex = DISCO_TOOLS.findIndex(t => t.id === selectedToolId);
  if (currentIndex === -1) return;

  let newIndex = currentIndex + direction;
  if (newIndex < 0) newIndex = DISCO_TOOLS.length - 1;
  if (newIndex >= DISCO_TOOLS.length) newIndex = 0;

  selectTutorial(DISCO_TOOLS[newIndex].id);
}

// Public API
window.selectTutorial = function(toolId) {
  selectTutorial(toolId);
};

window.navigateTutorial = function(direction) {
  navigateTutorial(direction);
};
