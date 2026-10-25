import os
import re

# 1. New summaries dictionary for tools in tools-data.js
short_summaries = {
    "pitc-suite": "All-in-one workstation for DISCO billing, scraping, and CP reconciliations.",
    "bill-scrapper": "Extracts consumer bills, arrears, and tariff data directly into clean Excel spreadsheets.",
    "e-bills-downloader": "Bulk downloads official consumer electricity duplicate bills into PDF files.",
    "cp52-posting-pdf": "Converts CP-52 records and defaulter lists into formatted, printable PDFs.",
    "cp139-checker": "Verifies CP-139 payment postings and flags unposted bank credits.",
    "cp136-checker": "Reconciles CP-136 summary scrolls against bank deposit vouchers.",
    "convert-cp21c": "Converts legacy CP-21c billing ledgers into modern Excel and DB formats.",
    "88l-extract": "Extracts consumer payment records from Form 88-L archives and deposit scrolls.",
    "pdf-merger": "Merges, splits, and compresses DISCO billing documents and scrolls.",
    "cp22t-checker": "Audits CP-22T tariff adjustments and credit/debit memos.",
    "govt-assessment": "Tracks billing assessments and realizations for government departments."
}

def update_tools_data(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update summaries
    for tid, new_sum in short_summaries.items():
        # Match tool block
        pattern = re.compile(rf'(id:\s*"{tid}".*?summary:\s*)"[^"]+"', re.DOTALL)
        content = pattern.sub(rf'\1"{new_sum}"', content, count=1)

    # Shorten category names in TOOL_CATEGORIES
    content = content.replace('name: "Available on Request"', 'name: "On Request"')
    content = content.replace('name: "All Softwares"', 'name: "All Tools"')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated tools-data.js: {filepath}")

def update_downloads_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace main top down to downloads-grid
    new_html = '''  <!-- ================= MAIN DOWNLOADS REPOSITORY ================= -->
  <main class="flex-1 pt-4 sm:pt-6 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Big Long Search Bar on Top -->
      <div class="mb-4">
        <div class="relative w-full shadow-lg rounded-xl group">
          <div class="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-sky-400 transition-colors">
            <i data-lucide="search" class="w-5 h-5 sm:w-6 sm:h-6"></i>
          </div>
          <input 
            type="text" 
            id="search-input" 
            placeholder="Search software or tool (e.g. PITCSuite, Bill Scrapper, CP52, PDF)..." 
            class="w-full pl-11 sm:pl-14 pr-4 py-3 sm:py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-slate-600 focus:border-sky-500 text-white placeholder-slate-400 text-sm sm:text-base font-medium shadow-inner transition-all focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            autocomplete="off"
            autofocus
          >
        </div>

        <!-- Filters Line: Strictly One-Liner with Compact Buttons -->
        <div class="mt-2.5 flex items-center justify-between gap-3 overflow-hidden">
          <div id="category-pills-container" class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 whitespace-nowrap flex-nowrap scroll-smooth flex-1 min-w-0">
            <!-- Rendered dynamically by downloads.js -->
          </div>

          <div class="flex items-center gap-2.5 shrink-0 pl-2">
            <span id="results-count" class="hidden md:inline-block text-xs font-mono font-semibold text-sky-400 whitespace-nowrap">
              <!-- Dynamic Count -->
            </span>
            <div class="flex items-center gap-1.5">
              <label for="sort-select" class="text-xs text-slate-400 font-medium whitespace-nowrap flex items-center gap-1">
                <i data-lucide="arrow-up-down" class="w-3 h-3"></i> Sort:
              </label>
              <select id="sort-select" class="px-2 py-1 rounded-lg text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 focus:outline-none focus:border-sky-500">
                <option value="default">Default</option>
                <option value="status">Downloadable</option>
                <option value="name">A - Z</option>
                <option value="size">Size</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= DYNAMIC TOOLS GRID ================= -->
      <div id="downloads-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">'''

    pattern = re.compile(
        r'<!-- ================= MAIN DOWNLOADS REPOSITORY ================= -->.*?<div id="downloads-grid"[^>]*>',
        re.DOTALL
    )
    if pattern.search(content):
        content = pattern.sub(new_html, content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated downloads.html: {filepath}")
    else:
        print(f"Pattern not found in {filepath}!")

def update_styles_css(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Ensure no-scrollbar utility and category-pill height override
    custom_add = '''
/* Compact Category Filter Pills & No-Scrollbar Utility */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.category-pill {
  min-height: 28px !important;
  font-size: 0.75rem !important;
  padding-top: 0.35rem !important;
  padding-bottom: 0.35rem !important;
}
'''
    if '/* Compact Category Filter Pills & No-Scrollbar Utility */' not in content:
        content += custom_add

    # Also update the generic min-height: 44px so .category-pill isn't forced to 44px
    content = content.replace(
        'button, a.btn, .glow-btn, .category-pill {\n  min-height: 44px;\n}',
        'button, a.btn, .glow-btn {\n  min-height: 44px;\n}\n.category-pill {\n  min-height: 28px !important;\n}'
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated styles.css: {filepath}")

def update_downloads_js(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update renderCategoryPills to be smaller and flex-shrink-0
    new_render_pills = '''// Render Category Filter Pills as a compact single row
function renderCategoryPills() {
  const container = document.getElementById('category-pills-container');
  if (!container) return;

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
}'''

    content = re.sub(
        r'// Render Category Filter Pills with large touch targets\s*function renderCategoryPills\(\)\s*\{.*?\n\}',
        new_render_pills,
        content,
        flags=re.DOTALL
    )

    # 2. Update renderDownloads card template
    # Let's inspect renderDownloads in downloads.js
    new_card_template = '''  container.innerHTML = filtered.map(tool => {
    const isPublic = tool.isPublicDownload === true;
    const isDev = tool.status === 'in-development';
    const showSpecs = tool.id === 'pitc-suite' || tool.id === 'bill-scrapper';

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
        <i data-lucide="download" class="w-4 h-4"></i> Download (.EXE)
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

    // Filename / specs
    const filenameDisplay = (showSpecs && tool.filename) ? `
      <p class="text-[11px] text-slate-300 font-mono mt-0.5 flex items-center gap-1 truncate">
        <i data-lucide="file" class="w-3 h-3 text-sky-400 shrink-0"></i> ${tool.filename}
      </p>` : '';

    // File specs bar
    const footerSpecs = showSpecs ? `
      <div class="flex items-center justify-between text-[11px] text-slate-300 mb-2.5 font-mono">
        <span class="flex items-center gap-1 text-white font-semibold">
          <i data-lucide="hard-drive" class="w-3 h-3 text-sky-400"></i> Size: <span class="${tool.id === 'pitc-suite' ? 'pitc-size-badge' : 'bill-size-badge'}">${tool.size}</span>
        </span>
        <span class="flex items-center gap-1 text-emerald-400 font-semibold">
          <i data-lucide="check-circle-2" class="w-3 h-3"></i> 100% Offline
        </span>
      </div>` : `
      <div class="flex items-center justify-between text-[11px] text-slate-400 mb-2.5">
        <span class="flex items-center gap-1 text-sky-300 font-medium">
          <i data-lucide="shield" class="w-3 h-3 text-sky-400"></i> Commercial Tool
        </span>
        <span class="flex items-center gap-1 text-emerald-400 font-medium">
          <i data-lucide="check" class="w-3 h-3"></i> Win 7/8/10/11
        </span>
      </div>`;

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

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2" onclick="event.stopPropagation()">
            ${actionButton}
            <a 
              href="details.html?tool=${tool.id}"
              class="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-white/10 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <i data-lucide="info" class="w-3.5 h-3.5 text-sky-400"></i> Details & Guide
            </a>
          </div>
        </div>

      </div>
    `;
  }).join('');'''

    pattern_map = re.compile(
        r'container\.innerHTML\s*=\s*filtered\.map\(tool\s*=>\s*\{.*?\n\s*\}\)\.join\(\'\'\);',
        re.DOTALL
    )
    if pattern_map.search(content):
        content = pattern_map.sub(new_card_template, content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated downloads.js: {filepath}")
    else:
        print(f"Pattern for filtered.map not found in {filepath}!")

for base_dir in [r'd:\Projects\Pesco Tools Website', r'd:\Projects\DISCO Tools Website']:
    if not os.path.exists(base_dir):
        continue
    update_tools_data(os.path.join(base_dir, 'js', 'tools-data.js'))
    update_downloads_html(os.path.join(base_dir, 'downloads.html'))
    update_styles_css(os.path.join(base_dir, 'css', 'styles.css'))
    update_downloads_js(os.path.join(base_dir, 'js', 'downloads.js'))

print("All updates applied successfully!")
