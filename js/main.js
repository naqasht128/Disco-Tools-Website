/**
 * PESCO Tools Website & PITCSuite - Main Interactive Script
 * Shared navigation, Contact/Request Software Modal, Direct Download Handler & Toast System
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

  // Populate dynamic developer profile info in DOM elements
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

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }
  }, 5000);
}

// Download Trigger Helper
// ONLY PITCSuite and Bill Scrapper are directly downloadable.
// All other tools trigger the Contact/Request modal with developer info!
function triggerToolDownload(filename, toolTitle) {
  const tool = typeof getToolByFilename === 'function' ? getToolByFilename(filename) : null;

  // If this tool is not flagged as a public download, open the contact/request modal
  if (!tool || !tool.isPublicDownload) {
    openContactRequestModal(tool || { name: toolTitle, filename: filename, status: 'on-request' });
    return;
  }

  // Handle direct download for PITCSuite and Bill Scrapper
  const localPath = `downloads/${filename}`;

  const link = document.createElement('a');
  link.href = localPath;
  link.setAttribute('download', filename);
  link.setAttribute('target', '_blank');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(
    `Starting download for <strong>${filename}</strong>.`,
    'success',
    'Download Initiated'
  );

  const storageKey = `pesco_dl_${filename}`;
  const currentCount = parseInt(localStorage.getItem(storageKey) || '0', 10) + 1;
  localStorage.setItem(storageKey, currentCount);
}

// =========================================================================
// CONTACT / REQUEST FOR SOFTWARE MODAL (SHOWS DEVELOPER CONTACT INFO)
// =========================================================================
function openContactRequestModal(tool) {
  let modal = document.getElementById('contact-request-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'contact-request-modal';
    modal.className = 'fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 transition-opacity overflow-y-auto';
    document.body.appendChild(modal);
  }

  const profile = typeof DEVELOPER_PROFILE !== 'undefined' ? DEVELOPER_PROFILE : {
    corporateName: "TN Developers & Co.",
    developerName: "Tahir Naqash",
    email: "tahir.naqash4@gmail.com",
    cell: "0333-9962474",
    whatsappNumber: "923339962474"
  };

  const isDev = tool && tool.status === 'in-development';
  const toolName = tool ? (tool.title || tool.name) : 'Specialized Utility';
  const toolFilename = tool ? tool.filename : '';
  const toolSummary = tool ? tool.summary : '';

  // Pre-filled messages for WhatsApp & Email
  const waText = encodeURIComponent(
    `Hello Tahir Naqash, I am contacting you regarding "${toolName}" (${toolFilename}). I would like to inquire about obtaining the executable / sub-division license.`
  );
  const mailSubject = encodeURIComponent(`Software Request: ${toolName}`);
  const mailBody = encodeURIComponent(
    `Hello Tahir Naqash,\n\nI am interested in acquiring the executable for:\nSoftware: ${toolName} (${toolFilename})\n\nPlease provide licensing / purchase details and delivery instructions.\n\nThank you,\n[Your Name & Sub-Division]`
  );

  const badgeHtml = isDev
    ? `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
        <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span> In Development (Pre-Order / Register Interest)
       </span>`
    : `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
        <span class="w-2 h-2 rounded-full bg-sky-400"></span> Available on Request (Private Distribution)
       </span>`;

  modal.innerHTML = `
    <div class="glass-card max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-sky-500/30 bg-slate-900/95 relative shadow-2xl my-8">
      <button onclick="closeContactRequestModal()" class="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <!-- Header -->
      <div class="mb-4">
        ${badgeHtml}
        <h3 class="text-xl sm:text-2xl font-extrabold text-white mt-2 leading-snug">${toolName}</h3>
        ${toolFilename ? `<p class="text-xs text-sky-400 font-mono mt-0.5">${toolFilename}</p>` : ''}
      </div>

      <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
        ${isDev 
          ? 'This utility is currently under active development. Contact developer <strong>Tahir Naqash</strong> (TN Developers & Co.) to request priority access, suggest features, or pre-order for your sub-division.'
          : 'This standalone software is distributed directly upon request. Contact developer <strong>Tahir Naqash</strong> (TN Developers & Co.) to arrange payment, licensing, and receive the executable file directly.'}
      </p>

      <!-- Developer Contact Information Card -->
      <div class="bg-slate-950/80 rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3 mb-6">
        <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between pb-2 border-b border-white/5">
          <span>Developer Direct Contact</span>
          <span class="text-sky-400 font-medium">${profile.corporateName}</span>
        </div>

        <!-- WhatsApp Button -->
        <a 
          href="https://wa.me/${profile.whatsappNumber}?text=${waText}" 
          target="_blank"
          class="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/20"
        >
          <i data-lucide="phone-call" class="w-4 h-4"></i> WhatsApp Tahir Naqash (0333-9962474)
        </a>

        <!-- Email Button -->
        <a 
          href="mailto:${profile.email}?subject=${mailSubject}&body=${mailBody}" 
          class="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 font-semibold text-xs sm:text-sm border border-sky-500/30 transition-all flex items-center justify-center gap-2.5"
        >
          <i data-lucide="mail" class="w-4 h-4 text-sky-400"></i> Email: ${profile.email}
        </a>
      </div>

      <!-- Quick Message Form -->
      <div class="border-t border-white/5 pt-4">
        <div class="text-xs font-semibold text-slate-300 mb-2">Or leave a quick message below:</div>
        <form onsubmit="submitQuickInquiry(event, '${toolName}')" class="space-y-3">
          <div class="grid grid-cols-2 gap-2">
            <input 
              type="text" 
              id="inquiry-name" 
              placeholder="Your Name / Designation" 
              required
              class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:border-sky-500 focus:outline-none"
            >
            <input 
              type="text" 
              id="inquiry-subdiv" 
              placeholder="Sub-Division / Circle" 
              required
              class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:border-sky-500 focus:outline-none"
            >
          </div>
          <input 
            type="text" 
            id="inquiry-contact" 
            placeholder="Your WhatsApp or Cell Number" 
            required
            class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:border-sky-500 focus:outline-none"
          >
          <button 
            type="submit" 
            class="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wide shadow-md shadow-sky-600/30 transition-all flex items-center justify-center gap-2 glow-btn"
          >
            <i data-lucide="send" class="w-3.5 h-3.5"></i> Send Request to Developer
          </button>
        </form>
      </div>

    </div>
  `;

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  refreshIcons();
}

function closeContactRequestModal() {
  const modal = document.getElementById('contact-request-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function submitQuickInquiry(e, toolName) {
  e.preventDefault();
  const name = document.getElementById('inquiry-name').value;
  const subdiv = document.getElementById('inquiry-subdiv').value;
  const contact = document.getElementById('inquiry-contact').value;

  closeContactRequestModal();

  showToast(
    `Thank you <strong>${name}</strong>! Your inquiry for <em>"${toolName}"</em> has been logged. Tahir Naqash will connect with you via ${contact}.`,
    'success',
    'Request Dispatched'
  );
}

// =========================================================================
// REQUEST A NEW SOFTWARE PROPOSAL MODAL
// =========================================================================
function openRequestSoftwareModal(presetToolName = '') {
  closeContactRequestModal();
  let modal = document.getElementById('request-software-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'request-software-modal';
    modal.className = 'fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 transition-opacity overflow-y-auto';
    document.body.appendChild(modal);
  }

  const profile = typeof DEVELOPER_PROFILE !== 'undefined' ? DEVELOPER_PROFILE : {
    corporateName: "TN Developers & Co.",
    developerName: "Tahir Naqash",
    email: "tahir.naqash4@gmail.com",
    cell: "0333-9962474"
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
          <p class="text-xs text-slate-400">Direct proposal to Developer (${profile.developerName})</p>
        </div>
      </div>

      <p class="text-xs text-slate-300 leading-relaxed mb-6">
        Need a specialized PESCO billing utility, bank scroll matcher, PDF converter, or custom Excel macro? Submit your requirements directly to Tahir Naqash (TN Developers & Co.).
      </p>

      <form id="software-request-form" onsubmit="submitSoftwareRequest(event)" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Software Name or Tool Concept *</label>
          <input 
            type="text" 
            id="req-tool-name" 
            value="${presetToolName}"
            placeholder="e.g. Sub-Division Defaulter Filter or E-Bills Batch Exporter" 
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
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Problem to Solve / Detailed Description *</label>
          <textarea 
            id="req-description" 
            rows="3" 
            placeholder="Explain the manual calculations or ledger issues this software should handle..."
            required
            class="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-xs sm:text-sm focus:border-sky-500 focus:outline-none resize-none"
          ></textarea>
        </div>

        <div class="pt-2 flex flex-col sm:flex-row gap-3">
          <button 
            type="submit" 
            class="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center gap-2 glow-btn"
          >
            <i data-lucide="send" class="w-4 h-4"></i> Submit Software Proposal
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
    `Thank you <strong>${userName}</strong>! Your proposal for <em>"${toolName}"</em> has been dispatched to Tahir Naqash.`,
    'success',
    'Proposal Dispatched'
  );
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
