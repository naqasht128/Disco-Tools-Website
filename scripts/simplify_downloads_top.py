import os
import re

new_top_section = '''    <!-- ================= MAIN DOWNLOADS REPOSITORY ================= -->
  <main class="flex-1 pt-6 sm:pt-8 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Big Long Search Bar on Top -->
      <div class="mb-8">
        <div class="relative w-full shadow-2xl rounded-2xl group">
          <div class="absolute inset-y-0 left-0 pl-5 sm:pl-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-sky-400 transition-colors">
            <i data-lucide="search" class="w-6 h-6 sm:w-7 sm:h-7"></i>
          </div>
          <input 
            type="text" 
            id="search-input" 
            placeholder="Search all software and tools (e.g. PITCSuite, Bill Scrapper, CP52, PDF)..." 
            class="w-full pl-14 sm:pl-16 pr-5 py-4 sm:py-5 rounded-2xl bg-slate-900/90 border-2 border-slate-700/80 hover:border-slate-600 focus:border-sky-500 text-white placeholder-slate-400 text-base sm:text-xl font-medium shadow-xl transition-all focus:outline-none focus:ring-4 focus:ring-sky-500/20"
            autocomplete="off"
            autofocus
          >
        </div>

        <!-- Category Filter Pills & Sort Controls -->
        <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div id="category-pills-container" class="flex flex-wrap items-center gap-2">
            <!-- Rendered dynamically by downloads.js -->
          </div>

          <div class="flex items-center gap-4">
            <div id="results-count" class="text-xs sm:text-sm font-mono font-bold text-sky-400">
              <!-- Dynamic Count -->
            </div>
            <div class="flex items-center gap-2">
              <label for="sort-select" class="text-xs text-slate-400 font-medium flex items-center gap-1">
                <i data-lucide="arrow-up-down" class="w-3.5 h-3.5"></i> Sort:
              </label>
              <select id="sort-select" class="px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-slate-900 border border-slate-700 focus:outline-none focus:border-sky-500">
                <option value="default">Default Priority</option>
                <option value="status">Downloadable First</option>
                <option value="name">Alphabetical (A - Z)</option>
                <option value="size">File Size</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= DYNAMIC TOOLS GRID ================= -->
      <div id="downloads-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">'''

for base_dir in [r'd:\Projects\Pesco Tools Website', r'd:\Projects\DISCO Tools Website']:
    filepath = os.path.join(base_dir, 'downloads.html')
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = re.compile(
        r'<!-- ================= MAIN DOWNLOADS REPOSITORY ================= -->.*?<div id="downloads-grid"[^>]*>',
        re.DOTALL
    )

    if not pattern.search(content):
        print(f"Pattern not found in {filepath}")
        continue

    new_content = pattern.sub(new_top_section, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Updated {filepath}")
