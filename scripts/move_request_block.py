import re

def update_downloads():
    with open('downloads.html', 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Remove Get PITCSuite button from top right
    c = re.sub(
        r'\s*<button\s+onclick="triggerToolDownload\(\'pitc-suite\',\s*\'PITCSuite\'\)"[\s\S]*?Get PITCSuite[\s\S]*?</button>',
        '',
        c
    )

    # 2. Extract Quick Request Software Top Bar
    pattern = r'(\s*<!-- Quick Request Software Top Bar -->\s*<div class="glass-panel[\s\S]*?Request a Software\s*</button>\s*</div>)'
    match = re.search(pattern, c)
    if match:
        block = match.group(1)
        c = c.replace(block, '')

        moved_block = '''

      <!-- Quick Request Software Banner (Moved after tools block) -->
      <div class="glass-panel rounded-2xl p-5 sm:p-6 mt-12 border border-sky-500/20 bg-gradient-to-r from-sky-950/30 via-slate-900 to-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-sky-500/20">
            <i data-lucide="sparkles" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="text-sm sm:text-base font-bold text-white">Need a utility that isn't listed here?</div>
            <p class="text-xs text-slate-400 mt-0.5">Propose a specialized tool for your sub-division or commercial team.</p>
          </div>
        </div>
        <button 
          onclick="openRequestSoftwareModal()"
          class="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs tracking-wide transition-all shadow-md shadow-sky-600/20 whitespace-nowrap glow-btn"
        >
          Request a Software
        </button>
      </div>'''

        # Place moved block directly after the #downloads-grid
        grid_pattern = r'(<div id="downloads-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\s*<!-- Rendered dynamically by downloads\.js -->\s*</div>)'
        c = re.sub(grid_pattern, r'\1' + moved_block, c)
        print("downloads.html: Quick Request Software block successfully moved after tools grid")
    else:
        print("Warning: Quick Request Software block not found")

    with open('downloads.html', 'w', encoding='utf-8') as f:
        f.write(c)

def update_index():
    with open('index.html', 'r', encoding='utf-8') as f:
        c = f.read()

    # Remove Get PITCSuite button from top right header
    c = re.sub(
        r'\s*<button\s+onclick="triggerToolDownload\(\'pitc-suite\',\s*\'PITCSuite\'\)"\s+class="pitc-header-btn[\s\S]*?Get PITCSuite[\s\S]*?</button>',
        '',
        c
    )

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(c)
    print("index.html: Removed Get PITCSuite button from top right header")

if __name__ == '__main__':
    update_downloads()
    update_index()
