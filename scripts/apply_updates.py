import re

def update_details():
    with open('details.html', 'r', encoding='utf-8') as f:
        c = f.read()

    # Desktop nav
    c = re.sub(
        r'<a href="tutorials\.html"[^>]*class="nav-link[^"]*"[^>]*>\s*<i data-lucide="book-open"[^>]*></i>\s*Tutorials\s*</a>',
        '''<a href="details.html" class="nav-link px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-slate-800/80 transition-all flex items-center gap-1.5 active">
          <i data-lucide="file-text" class="w-3.5 h-3.5 text-sky-400"></i> Details
        </a>''',
        c
    )

    # Mobile menu
    c = re.sub(
        r'<a href="tutorials\.html"[^>]*class="block[^"]*"[^>]*>\s*<i data-lucide="book-open"[^>]*></i>\s*(?:Usage )?Tutorials\s*</a>',
        '''<a href="details.html" class="block p-3.5 rounded-xl bg-slate-800/60 font-semibold text-white flex items-center gap-3">
          <i data-lucide="file-text" class="w-5 h-5 text-sky-400"></i> Software Details
        </a>''',
        c
    )

    # 13 Tools count
    c = c.replace('13 Tools', '11 Tools')

    with open('details.html', 'w', encoding='utf-8') as f:
        f.write(c)
    print("details.html updated")

def update_index():
    with open('index.html', 'r', encoding='utf-8') as f:
        c = f.read()

    # Desktop nav
    c = re.sub(
        r'<a href="tutorials\.html"[^>]*class="nav-link[^"]*"[^>]*>\s*<i data-lucide="book-open"[^>]*></i>\s*Tutorials\s*</a>',
        '''<a href="details.html" class="nav-link px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all flex items-center gap-1.5">
          <i data-lucide="file-text" class="w-3.5 h-3.5"></i> Details
        </a>''',
        c
    )

    # Mobile menu
    c = re.sub(
        r'<a href="tutorials\.html"[^>]*class="block[^"]*"[^>]*>\s*<i data-lucide="book-open"[^>]*></i>\s*(?:Usage )?Tutorials\s*</a>',
        '''<a href="details.html" class="block p-3.5 rounded-xl bg-slate-800/60 font-semibold text-white flex items-center gap-3">
          <i data-lucide="file-text" class="w-5 h-5 text-sky-400"></i> Software Details
        </a>''',
        c
    )

    # Hero top download button removal
    # Replace CTA Action Buttons block
    old_cta_pattern = r'<!-- CTA Action Buttons -->\s*<div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">[\s\S]*?<!-- ================= FLAGSHIP SPOTLIGHT'
    new_cta_block = '''<!-- CTA Action Buttons -->
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="downloads.html" class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-sky-600/30 hover:shadow-sky-500/50 transition-all flex items-center justify-center gap-2.5 glow-btn">
            <i data-lucide="grid" class="w-5 h-5"></i> Browse All Tools Repository
          </a>

          <button 
            onclick="openRequestSoftwareModal()"
            class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-sky-300 hover:text-white font-bold text-sm tracking-wide border border-white/10 hover:border-sky-500/40 transition-all flex items-center justify-center gap-2"
          >
            <i data-lucide="sparkles" class="w-5 h-5 text-sky-400"></i> Request a Software
          </button>
        </div>

        <!-- ================= FLAGSHIP SPOTLIGHT'''
    c = re.sub(old_cta_pattern, new_cta_block, c)

    # View All 13 Tools -> View All 11 Tools
    c = c.replace('View All 13 Tools &rarr;', 'View All 11 Tools &rarr;')
    c = c.replace('View All 13 Tools', 'View All 11 Tools')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(c)
    print("index.html updated")

def update_downloads():
    with open('downloads.html', 'r', encoding='utf-8') as f:
        c = f.read()

    # Desktop nav
    c = re.sub(
        r'<a href="tutorials\.html"[^>]*class="nav-link[^"]*"[^>]*>\s*<i data-lucide="book-open"[^>]*></i>\s*Tutorials\s*</a>',
        '''<a href="details.html" class="nav-link px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all flex items-center gap-1.5">
          <i data-lucide="file-text" class="w-3.5 h-3.5"></i> Details
        </a>''',
        c
    )

    # Mobile menu
    c = re.sub(
        r'<a href="tutorials\.html"[^>]*class="block[^"]*"[^>]*>\s*<i data-lucide="book-open"[^>]*></i>\s*(?:Usage )?Tutorials\s*</a>',
        '''<a href="details.html" class="block p-3.5 rounded-xl bg-slate-800/60 font-semibold text-white flex items-center gap-3">
          <i data-lucide="file-text" class="w-5 h-5 text-sky-400"></i> Software Details
        </a>''',
        c
    )

    with open('downloads.html', 'w', encoding='utf-8') as f:
        f.write(c)
    print("downloads.html updated")

def update_contact():
    with open('contact.html', 'r', encoding='utf-8') as f:
        c = f.read()

    # Desktop nav
    c = re.sub(
        r'<a href="tutorials\.html"[^>]*class="nav-link[^"]*"[^>]*>\s*<i data-lucide="book-open"[^>]*></i>\s*Tutorials\s*</a>',
        '''<a href="details.html" class="nav-link px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all flex items-center gap-1.5">
          <i data-lucide="file-text" class="w-3.5 h-3.5"></i> Details
        </a>''',
        c
    )

    # Mobile menu
    c = re.sub(
        r'<a href="tutorials\.html"[^>]*class="block[^"]*"[^>]*>\s*<i data-lucide="book-open"[^>]*></i>\s*(?:Usage )?Tutorials\s*</a>',
        '''<a href="details.html" class="block p-3.5 rounded-xl bg-slate-800/60 font-semibold text-white flex items-center gap-3">
          <i data-lucide="file-text" class="w-5 h-5 text-sky-400"></i> Software Details
        </a>''',
        c
    )

    # Clean up dropdown options
    old_dropdown_pattern = r'<select id="contact-tool"[\s\S]*?</select>'
    new_dropdown = '''<select id="contact-tool" class="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm bg-slate-900 text-slate-200">
                  <option value="PITCSuite (v2.8.97)">PITCSuite (v2.8.97)</option>
                  <option value="Bill Scrapper">Bill Scrapper</option>
                  <option value="E-Bills Downloader">E-Bills Downloader</option>
                  <option value="CP-52 Posting into PDF">CP-52 Posting into PDF</option>
                  <option value="CP139PostingChecker">CP139PostingChecker</option>
                  <option value="CP136_Posting_Checker">CP136_Posting_Checker</option>
                  <option value="ConvertCP21c">ConvertCP21c</option>
                  <option value="88LPaymentExtract">88LPaymentExtract</option>
                  <option value="DISCO PDF Toolkit">DISCO PDF Toolkit</option>
                  <option value="CP22T_Posting_Checker">CP22T_Posting_Checker</option>
                  <option value="GovtAssessmentRealization">GovtAssessmentRealization</option>
                  <option value="New Software Proposal">New Software Proposal</option>
                  <option value="General Support">General Support</option>
                </select>'''
    c = re.sub(old_dropdown_pattern, new_dropdown, c)

    with open('contact.html', 'w', encoding='utf-8') as f:
        f.write(c)
    print("contact.html updated")

if __name__ == '__main__':
    update_details()
    update_index()
    update_downloads()
    update_contact()
