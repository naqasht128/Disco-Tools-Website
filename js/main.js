/**
 * PESCO Tools Website & PITCSuite - Main Interactive Script
 * Shared navigation, Request-a-Software Modal, Download Handlers & Toast System
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Mobile menu drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuDrawer.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  }

  if (mobileMenuClose && mobileMenuDrawer) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenuDrawer.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  }

  // Highlight active link in navbar
  highlightCurrentPage();

  // Setup Back-to-Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Populate dynamic developer profile info in DOM elements with data-profile attributes
  populateDeveloperProfile();
});

// Re-render Lucide icons safely
function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Highlight current page in navbar
function highlightCurrentPage() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-sky-400', 'font-semibold');
      link.classList.remove('text-slate-300');
    }
  });
}

// Global Toast Notification Helper
function showToast(message, type = 'info', title = 'Notice') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-auto';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg glass-card p-4 rounded-xl border flex items-start gap-3 shadow-2xl transition-all duration-300 animate-slide-up bg-slate-900/95';

  let iconName = 'info';
  let iconColor = 'text-sky-400';
  let borderColor = 'border-sky-500/40';

  if (type === 'success') {
    iconName = 'check-circle-2';
    iconColor = 'text-emerald-400';
    borderColor = 'border-emerald-500/40';
  } else if (type === 'warning') {
    iconName = 'alert-triangle';
    iconColor = 'text-amber-400';
    borderColor = 'border-amber-500/40';
  } else if (type === 'error') {
    iconName = 'alert-circle';
    iconColor = 'text-rose-400';
    borderColor = 'border-rose-500/40';
  }

  toast.classList.add(borderColor);

  toast.innerHTML = `
    <div class="flex-shrink-0 ${iconColor} mt-0.5">
      <i data-lucide="${iconName}" class="w-5 h-5"></i>
    </div>
    <div class="flex-1">
      <div class="text-xs font-bold text-white uppercase tracking-wider">${title}</div>
      <div class="text-xs text-slate-300 mt-0.5 leading-relaxed">${message}</div>
    </div>
    <button class="text-slate-400 hover:text-white transition-colors" onclick="this.parentElement.remove()">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  `;

  container.appendChild(toast);
  refreshIcons();

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }
  }, 5000);
}

// Download Trigger Helper
function triggerToolDownload(filename, toolTitle) {
  const tool = typeof getToolByFilename === 'function' ? getToolByFilename(filename) : null;

  // If tool is in development, display notification modal
  if (tool && tool.status === 'in-development') {
    openInDevelopmentModal(tool);
    return;
  }

  // Check if GitHub release URL exists (preferred for Vercel deployment where large .exe are hosted externally)
  const ghUrl = (tool && tool.githubReleaseUrl) ? tool.githubReleaseUrl : '';
  const localPath = `downloads/${filename}`;

  // If on local development, try local path first, else GitHub release
  const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const downloadTarget = (isLocalDev || !ghUrl) ? localPath : ghUrl;

  const link = document.createElement('a');
  link.href = downloadTarget;
  link.setAttribute('download', filename);
  link.setAttribute('target', '_blank');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(
    `Starting download for <strong>${filename}</strong>.<br><span class="text-slate-400 text-[11px]">${ghUrl ? 'Downloading from official release repository.' : 'Downloading local copy.'}</span>`,
    'success',
    'Download Initiated'
  );

  // Store download count in localStorage
  const storageKey = `pesco_dl_${filename}`;
  const currentCount = parseInt(localStorage.getItem(storageKey) || '0', 10) + 1;
  localStorage.setItem(storageKey, currentCount);
}

// Open "In Development" notice modal
function openInDevelopmentModal(tool) {
  let modal = document.getElementById('dev-notice-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'dev-notice-modal';
    modal.className = 'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="glass-card max-w-md w-full rounded-3xl p-6 sm:p-8 border border-amber-500/30 bg-slate-900/95 relative shadow-2xl">
      <button onclick="closeDevModal()" class="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <div class="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/30">
        <i data-lucide="hammer" class="w-6 h-6"></i>
      </div>

      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
        <span class="w-2 h-2 rounded-full bg-amber-400 pulse-indicator"></span>
        <span>Active Development</span>
      </div>

      <h3 class="text-xl font-bold text-white mb-2">${tool.title || tool.name}</h3>
      <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
        ${tool.summary}
      </p>

      <div class="bg-slate-950/70 p-4 rounded-xl border border-white/5 mb-6 text-xs text-slate-400 space-y-1.5">
        <div class="flex justify-between">
          <span class="text-slate-500">Target Executable:</span>
          <span class="font-mono text-sky-400">${tool.filename}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-500">Current Phase:</span>
          <span class="text-amber-400 font-semibold">Engine Testing & Verification</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-500">Release Stage:</span>
          <span class="text-slate-300">${tool.version}</span>
        </div>
      </div>

      <div class="flex gap-3">
        <button onclick="openRequestSoftwareModal('${tool.name}')" class="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 glow-btn">
          <i data-lucide="bell" class="w-4 h-4"></i> Request Priority Release
        </button>
        <button onclick="closeDevModal()" class="py-3 px-4 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs border border-white/10">
          Close
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  refreshIcons();
}

function closeDevModal() {
  const modal = document.getElementById('dev-notice-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

// =========================================================================
// REQUEST A SOFTWARE MODAL & FORM HANDLER
// =========================================================================
function openRequestSoftwareModal(presetToolName = '') {
  closeDevModal();
  let modal = document.getElementById('request-software-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'request-software-modal';
    modal.className = 'fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 transition-opacity overflow-y-auto';
    document.body.appendChild(modal);
  }

  const profile = typeof DEVELOPER_PROFILE !== 'undefined' ? DEVELOPER_PROFILE : {
    corporateName: "PESCO Commercial Automation",
    developerName: "Naqash",
    email: "naqasht128@gmail.com",
    cell: "+92 300 0000000"
  };

  modal.innerHTML = `
    <div class="glass-card max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-sky-500/30 bg-slate-900/95 relative shadow-2xl my-8">
      <button onclick="closeRequestModal()" class="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
          <i data-lucide="sparkles" class="w-6 h-6"></i>
        </div>
        <div>
          <h3 class="text-xl font-extrabold text-white">Request a Custom Software</h3>
          <p class="text-xs text-slate-400">Direct proposal to Lead Developer (${profile.developerName})</p>
        </div>
      </div>

      <p class="text-xs text-slate-300 leading-relaxed mb-6">
        Need a specialized PESCO billing scraper, posting validator, PDF converter, or ledger calculator? Submit your requirements below to have a custom utility developed for your sub-division.
      </p>

      <form id="software-request-form" onsubmit="submitSoftwareRequest(event)" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Software Name or Tool Concept *</label>
          <input 
            type="text" 
            id="req-tool-name" 
            value="${presetToolName}"
            placeholder="e.g. E-Bills Bulk Downloader or Sub-Division Defaulter Filter" 
            required
            class="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-xs sm:text-sm focus:border-sky-500 focus:outline-none"
          >
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Your Name & Designation *</label>
            <input 
              type="text" 
              id="req-user-name" 
              placeholder="e.g. Tariq Khan (Commercial Assistant)" 
              required
              class="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-xs sm:text-sm focus:border-sky-500 focus:outline-none"
            >
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Sub-Division / Office *</label>
            <input 
              type="text" 
              id="req-office" 
              placeholder="e.g. Hayatabad Sub-Division, Peshawar" 
              required
              class="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-xs sm:text-sm focus:border-sky-500 focus:outline-none"
            >
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">WhatsApp / Cell Number *</label>
            <input 
              type="text" 
              id="req-contact" 
              placeholder="e.g. 0300-1234567" 
              required
              class="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-xs sm:text-sm focus:border-sky-500 focus:outline-none"
            >
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Required Output Format</label>
            <select id="req-format" class="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:border-sky-500 focus:outline-none">
              <option value="Microsoft Excel (XLSX)">Microsoft Excel (XLSX)</option>
              <option value="Printable PDF Document">Printable PDF Document</option>
              <option value="Text / Bank Scroll Format">Text / Bank Scroll Format</option>
              <option value="Standalone Windows Desktop EXE">Standalone Windows Desktop EXE</option>
              <option value="Android Mobile APK">Android Mobile APK</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Problem to Solve / Detailed Description *</label>
          <textarea 
            id="req-description" 
            rows="3" 
            placeholder="Explain the manual problem, repetitive calculations, or bank scroll discrepancy this software should handle..."
            required
            class="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-xs sm:text-sm focus:border-sky-500 focus:outline-none resize-none"
          ></textarea>
        </div>

        <div class="pt-2 flex flex-col sm:flex-row gap-3">
          <button 
            type="submit" 
            class="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center gap-2 glow-btn"
          >
            <i data-lucide="send" class="w-4 h-4"></i> Submit Software Request
          </button>
          <button 
            type="button" 
            onclick="closeRequestModal()" 
            class="py-3 px-5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs border border-white/10"
          >
            Cancel
          </button>
        </div>

        <p class="text-[11px] text-slate-500 text-center">
          Proposals are reviewed directly by <strong>${profile.developerName}</strong> (${profile.corporateName}).
        </p>
      </form>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  refreshIcons();
}

function closeRequestModal() {
  const modal = document.getElementById('request-software-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function submitSoftwareRequest(e) {
  e.preventDefault();
  const toolName = document.getElementById('req-tool-name').value;
  const userName = document.getElementById('req-user-name').value;
  const office = document.getElementById('req-office').value;
  const contact = document.getElementById('req-contact').value;
  const format = document.getElementById('req-format').value;
  const desc = document.getElementById('req-description').value;

  closeRequestModal();

  showToast(
    `Thank you <strong>${userName}</strong>! Your proposal for <em>"${toolName}"</em> has been logged. Lead developer Naqash will review your request.`,
    'success',
    'Proposal Received'
  );

  // Optional: Prompt user to dispatch via WhatsApp directly
  const profile = typeof DEVELOPER_PROFILE !== 'undefined' ? DEVELOPER_PROFILE : { cell: "+92 300 0000000" };
  const waMsg = encodeURIComponent(
    `Hello Naqash, I would like to request a new software for PESCO Tools:\n\n*Tool:* ${toolName}\n*Requester:* ${userName} (${office})\n*Contact:* ${contact}\n*Output:* ${format}\n*Description:* ${desc}`
  );
  
  console.log("Request logged successfully:", { toolName, userName, office, contact, format, desc });
}

// Populate developer profile across all DOM elements
function populateDeveloperProfile() {
  if (typeof DEVELOPER_PROFILE === 'undefined') return;

  document.querySelectorAll('[data-profile="developerName"]').forEach(el => el.textContent = DEVELOPER_PROFILE.developerName);
  document.querySelectorAll('[data-profile="corporateName"]').forEach(el => el.textContent = DEVELOPER_PROFILE.corporateName);
  document.querySelectorAll('[data-profile="email"]').forEach(el => {
    el.textContent = DEVELOPER_PROFILE.email;
    if (el.tagName === 'A') el.href = `mailto:${DEVELOPER_PROFILE.email}`;
  });
  document.querySelectorAll('[data-profile="cell"]').forEach(el => {
    el.textContent = DEVELOPER_PROFILE.cell;
    if (el.tagName === 'A') el.href = `tel:${DEVELOPER_PROFILE.cell.replace(/\s+/g, '')}`;
  });
}
