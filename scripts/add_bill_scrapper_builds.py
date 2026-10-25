import os
import re

def update_tools_data(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # In bill-scrapper definition:
    # 1. Update version to v1.3.4
    # 2. Update size to 22.2 MB
    # 3. Add builds array
    bill_block_pattern = re.compile(r'id:\s*"bill-scrapper".*?filename:\s*"BillScrapper-Setup\.exe",', re.DOTALL)
    match = bill_block_pattern.search(content)
    if not match:
        print(f"Bill scrapper block not found in {filepath}")
        return

    old_block = match.group(0)
    
    # Replacement with builds
    new_block = '''id: "bill-scrapper",
    name: "Bill Scrapper",
    title: "Bill Scrapper - Scrape Billing Information into Excel",
    category: "extractors",
    badge: "Starting from Rs. 300",
    startingPrice: "Rs. 300",
    pricingPlans: [
      { name: "1 Month Plan", price: "Rs. 300", validity: "30 Days Validity", devices: "1 Device" },
      { name: "3 Months Plan", price: "Rs. 700", validity: "90 Days Validity", devices: "Up to 2 Devices" },
      { name: "6 Months Plan", price: "Rs. 1,200", validity: "180 Days Validity", devices: "Up to 2 Devices" },
      { name: "1 Year Plan", price: "Rs. 2,000", validity: "365 Days Validity", devices: "Up to 2 Devices" }
    ],
    isFlagship: false,
    status: "ready",
    isPublicDownload: true,
    version: "v1.3.4",
    size: "22.2 MB",
    filename: "BillScrapper-Setup.exe",
    builds: [
      {
        id: "win10",
        label: "Windows 10 / 11",
        shortLabel: "Win 10/11",
        filename: "BillScrapper-Setup.exe",
        downloadUrl: "https://github.com/naqasht128/BillScrapper/releases/latest/download/BillScrapper-Setup.exe",
        size: "22.2 MB",
        icon: "monitor"
      },
      {
        id: "win7",
        label: "Windows 7 / Legacy",
        shortLabel: "Win 7",
        filename: "BillScrapper-Win7-Setup.exe",
        downloadUrl: "https://github.com/naqasht128/BillScrapper/releases/latest/download/BillScrapper-Win7-Setup.exe",
        size: "27.9 MB",
        icon: "monitor"
      },
      {
        id: "linux-arm64",
        label: "Linux (ARM64)",
        shortLabel: "Linux ARM64",
        filename: "BillScrapper",
        downloadUrl: "https://github.com/naqasht128/BillScrapper/releases/latest/download/BillScrapper",
        size: "34.4 MB",
        icon: "terminal"
      }
    ],'''

    content = content.replace(old_block, new_block)

    # Also update tutorial prerequisites
    content = content.replace(
        '"Windows 7 / 8 / 10 / 11",\n        "Active Internet connection (for querying live billing servers)",',
        '"Windows 10 / 11, Windows 7 (Legacy), or Linux (ARM64)",\n        "Active Internet connection (for querying live billing servers)",'
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated tools-data.js: {filepath}")

def update_main_js(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update triggerToolDownload signature and implementation
    old_trigger = '''function triggerToolDownload(filenameOrId, toolTitle) {
  // Track download event in Vercel Analytics
  if (typeof window !== 'undefined' && window.va) {
    try { window.va('event', { name: 'tool_download_' + (typeof filenameOrId === 'string' ? filenameOrId.replace(/[^a-zA-Z0-9_-]/g, '_') : 'unknown') }); } catch (e) {}
  }
  let tool = null;
  if (typeof getToolById === 'function') {
    tool = getToolById(filenameOrId);
  }
  if (!tool && typeof getToolByFilename === 'function') {
    tool = getToolByFilename(filenameOrId);
  }

  // If this tool is not flagged as a public download, open the contact/request modal
  if (!tool || !tool.isPublicDownload) {
    openContactRequestModal(tool || { name: toolTitle, filename: filenameOrId, status: 'on-request' });
    return;
  }

  // Handle direct download for PITCSuite and Bill Scrapper
  // Directly downloads the latest executable setup installer from GitHub Releases
  const downloadTarget = (tool && tool.downloadUrl) ? tool.downloadUrl : `downloads/${tool.filename || filenameOrId}`;
  const targetFilename = (tool && tool.filename) ? tool.filename : filenameOrId;

  const link = document.createElement('a');
  link.href = downloadTarget;
  link.setAttribute('download', targetFilename);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(
    `Starting download for <strong>${tool ? tool.name : targetFilename}</strong> from GitHub Releases.`,
    'success',
    'Download Initiated'
  );

  const storageKey = `disco_dl_${targetFilename}`;
  const currentCount = parseInt(localStorage.getItem(storageKey) || '0', 10) + 1;
  localStorage.setItem(storageKey, currentCount);
}'''

    new_trigger = '''function triggerToolDownload(filenameOrId, toolTitle, customUrl, customFilename) {
  // Track download event in Vercel Analytics
  const dlIdentifier = customFilename || (typeof filenameOrId === 'string' ? filenameOrId : 'unknown');
  if (typeof window !== 'undefined' && window.va) {
    try { window.va('event', { name: 'tool_download_' + dlIdentifier.replace(/[^a-zA-Z0-9_-]/g, '_') }); } catch (e) {}
  }
  let tool = null;
  if (typeof getToolById === 'function') {
    tool = getToolById(filenameOrId);
  }
  if (!tool && typeof getToolByFilename === 'function') {
    tool = getToolByFilename(filenameOrId);
  }

  // If this tool is not flagged as a public download, open the contact/request modal
  if (!tool || !tool.isPublicDownload) {
    openContactRequestModal(tool || { name: toolTitle, filename: filenameOrId, status: 'on-request' });
    return;
  }

  // Handle direct download (supports custom OS builds for Bill Scrapper and standard installers)
  const downloadTarget = customUrl || (tool && tool.downloadUrl) || `downloads/${tool.filename || filenameOrId}`;
  const targetFilename = customFilename || (tool && tool.filename) || filenameOrId;

  const link = document.createElement('a');
  link.href = downloadTarget;
  link.setAttribute('download', targetFilename);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(
    `Starting download for <strong>${tool ? tool.name : targetFilename}</strong> (${targetFilename}).`,
    'success',
    'Download Initiated'
  );

  const storageKey = `disco_dl_${targetFilename}`;
  const currentCount = parseInt(localStorage.getItem(storageKey) || '0', 10) + 1;
  localStorage.setItem(storageKey, currentCount);
}'''

    content = content.replace(old_trigger, new_trigger)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated main.js: {filepath}")

def update_downloads_js(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Look for the card rendering in downloads.js
    # We want to replace the filenameDisplay, footerSpecs, and action buttons for bill-scrapper
    # Let's inspect the block from `const showSpecs` down to `refreshIcons();`
    old_card_block_pattern = re.compile(r'container\.innerHTML\s*=\s*filtered\.map\(tool\s*=>\s*\{.*?\n\s*\}\)\.join\(\'\'\);', re.DOTALL)
    
    new_card_block = '''container.innerHTML = filtered.map(tool => {
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
            <i data-lucide="hard-drive" class="w-3 h-3 text-sky-400"></i> 3 Builds (22M - 34M)
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
        <div class="space-y-2" onclick="event.stopPropagation()">
          <div class="grid grid-cols-3 gap-1.5">
            <button 
              onclick="triggerToolDownload('bill-scrapper', 'Bill Scrapper (Windows 10/11)', 'https://github.com/naqasht128/BillScrapper/releases/latest/download/BillScrapper-Setup.exe', 'BillScrapper-Setup.exe')"
              class="py-2 px-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-0.5 text-center transition-all shadow-md shadow-emerald-950/30 glow-btn"
              title="Download Bill Scrapper for Windows 10 & 11 (22.2 MB)"
            >
              <span class="flex items-center gap-1 leading-none"><i data-lucide="monitor" class="w-3 h-3"></i> Win 10/11</span>
              <span class="text-[10px] text-emerald-200 font-mono font-normal">22 MB .exe</span>
            </button>

            <button 
              onclick="triggerToolDownload('bill-scrapper', 'Bill Scrapper (Windows 7 Legacy)', 'https://github.com/naqasht128/BillScrapper/releases/latest/download/BillScrapper-Win7-Setup.exe', 'BillScrapper-Win7-Setup.exe')"
              class="py-2 px-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-0.5 text-center transition-all shadow-sm"
              title="Download Bill Scrapper for Windows 7 & Legacy Systems (27.9 MB)"
            >
              <span class="flex items-center gap-1 leading-none"><i data-lucide="monitor" class="w-3 h-3"></i> Win 7</span>
              <span class="text-[10px] text-teal-200 font-mono font-normal">28 MB .exe</span>
            </button>

            <button 
              onclick="triggerToolDownload('bill-scrapper', 'Bill Scrapper (Linux ARM64)', 'https://github.com/naqasht128/BillScrapper/releases/latest/download/BillScrapper', 'BillScrapper')"
              class="py-2 px-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border border-sky-500/30 font-bold text-xs flex flex-col items-center justify-center gap-0.5 text-center transition-all shadow-sm"
              title="Download Bill Scrapper for Linux ARM64 Binary (34.4 MB)"
            >
              <span class="flex items-center gap-1 leading-none"><i data-lucide="terminal" class="w-3 h-3"></i> Linux</span>
              <span class="text-[10px] text-sky-200 font-mono font-normal">ARM64</span>
            </button>
          </div>

          <a 
            href="details.html?tool=bill-scrapper"
            class="w-full py-1.5 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
          >
            <i data-lucide="info" class="w-3.5 h-3.5 text-sky-400"></i> Details & Guide
          </a>
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
  }).join('');'''

    content = old_card_block_pattern.sub(new_card_block, content)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated downloads.js: {filepath}")

def update_details_js(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # In details.js, look for:
    # <!-- Download or Request Action Card in Details Header -->
    # <div class="flex-shrink-0 flex items-center">
    #   ${tool.isPublicDownload ? ...

    old_action_block = '''        <!-- Download or Request Action Card in Details Header -->
        <div class="flex-shrink-0 flex items-center">
          ${tool.isPublicDownload ? `
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
            <i data-lucide="phone-call" class="w-4 h-4 text-sky-400"></i> Contact / Request Tool
          </button>`}
        </div>'''

    new_action_block = '''        <!-- Download or Request Action Card in Details Header -->
        <div class="flex-shrink-0 flex items-center">
          ${tool.builds && tool.builds.length > 0 ? `
          <div class="flex flex-col gap-2">
            <span class="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <i data-lucide="download" class="w-3.5 h-3.5 text-emerald-400"></i> Choose OS to Download:
            </span>
            <div class="flex flex-wrap sm:flex-nowrap items-center gap-2">
              ${tool.builds.map(b => `
                <button 
                  onclick="triggerToolDownload('${tool.id}', '${tool.name} (${b.label})', '${b.downloadUrl}', '${b.filename}')"
                  class="px-3.5 py-2.5 rounded-xl ${b.id === 'win10' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-950/40 glow-btn' : (b.id === 'win7' ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 hover:text-white border border-emerald-500/40' : 'bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border border-sky-500/40')} font-bold text-xs flex items-center gap-1.5 transition-all"
                  title="Download for ${b.label} (${b.size})"
                >
                  <i data-lucide="${b.icon || 'download'}" class="w-3.5 h-3.5"></i>
                  <span>${b.label}</span>
                  <span class="text-[10px] opacity-75 font-mono">(${b.size})</span>
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
            <i data-lucide="phone-call" class="w-4 h-4 text-sky-400"></i> Contact / Request Tool
          </button>`)}
        </div>'''

    if old_action_block in content:
        content = content.replace(old_action_block, new_action_block)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated details.js/tutorials.js: {filepath}")
    else:
        print(f"Old action block not found in {filepath}!")

def update_index_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update Bill Scrapper card on index.html:
    # 1. Update version badge to v1.3.4
    # 2. Update subtitle to Win 10/11 • Win 7 • Linux ARM64
    # 3. Update download button to 3 buttons
    old_index_card = '''              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Scrape Billing information into Excel. Extracts consumer bills, arrears, taxes, and payment data directly into formatted spreadsheets.
              </p>
            </div>
            <div class="pt-4 border-t border-white/5" onclick="event.stopPropagation()">
              <button onclick="triggerToolDownload('bill-scrapper', 'Bill Scrapper')" class="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 glow-btn">
                <i data-lucide="download" class="w-4 h-4"></i> Download Bill Scrapper (<span class="bill-size-badge">22.1 MB</span>)
              </button>
            </div>'''

    new_index_card = '''              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Extracts consumer bills, arrears, and tariff data directly into clean Excel spreadsheets.
              </p>
            </div>
            <div class="pt-3 border-t border-white/5" onclick="event.stopPropagation()">
              <div class="text-[11px] font-semibold text-slate-400 mb-2 flex items-center justify-between">
                <span>Select OS Download:</span>
                <span class="text-[10px] text-sky-400 font-mono">v1.3.4</span>
              </div>
              <div class="grid grid-cols-3 gap-1.5">
                <button 
                  onclick="triggerToolDownload('bill-scrapper', 'Bill Scrapper (Win 10/11)', 'https://github.com/naqasht128/BillScrapper/releases/latest/download/BillScrapper-Setup.exe', 'BillScrapper-Setup.exe')" 
                  class="py-2 px-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-0.5 text-center transition-all shadow-sm glow-btn" 
                  title="Download for Windows 10 & 11 (22.2 MB)"
                >
                  <span class="flex items-center gap-1"><i data-lucide="monitor" class="w-3 h-3"></i> Win 10/11</span>
                  <span class="text-[10px] text-emerald-200 font-mono font-normal">22 MB</span>
                </button>
                <button 
                  onclick="triggerToolDownload('bill-scrapper', 'Bill Scrapper (Win 7 Legacy)', 'https://github.com/naqasht128/BillScrapper/releases/latest/download/BillScrapper-Win7-Setup.exe', 'BillScrapper-Win7-Setup.exe')" 
                  class="py-2 px-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-0.5 text-center transition-all shadow-sm" 
                  title="Download for Windows 7 & Legacy Systems (27.9 MB)"
                >
                  <span class="flex items-center gap-1"><i data-lucide="monitor" class="w-3 h-3"></i> Win 7</span>
                  <span class="text-[10px] text-teal-200 font-mono font-normal">28 MB</span>
                </button>
                <button 
                  onclick="triggerToolDownload('bill-scrapper', 'Bill Scrapper (Linux ARM64)', 'https://github.com/naqasht128/BillScrapper/releases/latest/download/BillScrapper', 'BillScrapper')" 
                  class="py-2 px-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-white border border-white/10 font-bold text-xs flex flex-col items-center justify-center gap-0.5 text-center transition-all shadow-sm" 
                  title="Download for Linux ARM64 Binary (34.4 MB)"
                >
                  <span class="flex items-center gap-1"><i data-lucide="terminal" class="w-3 h-3 text-sky-400"></i> Linux</span>
                  <span class="text-[10px] text-sky-300 font-mono font-normal">ARM64</span>
                </button>
              </div>
            </div>'''

    if old_index_card in content:
        content = content.replace(old_index_card, new_index_card)
        # Update filename subtitle
        content = content.replace(
            '<p class="text-xs text-slate-400 font-mono">BillScrapper-Setup.exe</p>',
            '<p class="text-[11px] text-slate-400 font-mono">Win 10/11 • Win 7 • Linux ARM64</p>'
        )
        # Update version badge
        content = content.replace(
            '<span class="text-xs font-mono text-slate-400 bill-version-badge">v1.3.2</span>',
            '<span class="text-xs font-mono text-slate-400 bill-version-badge">v1.3.4</span>'
        )
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated index.html: {filepath}")
    else:
        print(f"Old index card not found in {filepath}!")

for base_dir in [r'd:\Projects\Pesco Tools Website', r'd:\Projects\DISCO Tools Website']:
    if not os.path.exists(base_dir):
        continue
    update_tools_data(os.path.join(base_dir, 'js', 'tools-data.js'))
    update_main_js(os.path.join(base_dir, 'js', 'main.js'))
    update_downloads_js(os.path.join(base_dir, 'js', 'downloads.js'))
    update_details_js(os.path.join(base_dir, 'js', 'details.js'))
    update_details_js(os.path.join(base_dir, 'js', 'tutorials.js'))
    update_index_html(os.path.join(base_dir, 'index.html'))

print("Completed script execution.")
