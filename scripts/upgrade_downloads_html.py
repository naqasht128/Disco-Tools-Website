import re

with open('downloads.html', 'r', encoding='utf-8') as f:
    c = f.read()

guide_box = '''      <!-- Comprehensive How to Download & Run Guide for Non-Tech & Aged Users -->
      <div class="glass-panel rounded-3xl p-6 sm:p-8 mb-8 border border-sky-500/30 bg-gradient-to-b from-sky-950/40 via-slate-900 to-slate-900 shadow-xl">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold mb-2">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i> Official DISCO Office Software
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white">
              How to Download & Run on Your Computer
            </h2>
            <p class="text-sm sm:text-base text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Simple, safe, and works 100% offline. Compatible with Windows 7, 8, 10, and 11 on all DISCO office computers.
            </p>
          </div>

          <!-- Helpline Callout Box -->
          <div class="flex-shrink-0 w-full sm:w-auto bg-slate-950/90 p-4 rounded-2xl border border-emerald-500/40 flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <i data-lucide="phone-call" class="w-6 h-6"></i>
            </div>
            <div>
              <div class="text-xs text-slate-400 uppercase font-bold tracking-wider">Helpline & WhatsApp Support</div>
              <a href="https://wa.me/923339962474" target="_blank" class="text-xl font-mono font-extrabold text-emerald-400 hover:text-emerald-300">
                0333-9962474
              </a>
              <div class="text-xs text-slate-300">Free phone & WhatsApp help for all DISCO staff</div>
            </div>
          </div>
        </div>

        <!-- 3 Easy Steps -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <div class="p-5 rounded-2xl bg-slate-950/60 border border-white/10 flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 font-extrabold text-lg flex items-center justify-center shrink-0 border border-sky-500/30">
              1
            </div>
            <div>
              <h4 class="text-base font-bold text-white mb-1">Choose Software</h4>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Pick <strong>PITCSuite</strong> for all billing & posting modules, or <strong>Bill Scrapper</strong> to extract consumer bills into Excel.
              </p>
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-slate-950/60 border border-white/10 flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-extrabold text-lg flex items-center justify-center shrink-0 border border-emerald-500/30">
              2
            </div>
            <div>
              <h4 class="text-base font-bold text-white mb-1">Click Download (.EXE)</h4>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Click the big green <strong>Download for Windows</strong> button. The file will download directly to your computer.
              </p>
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-slate-950/60 border border-white/10 flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 font-extrabold text-lg flex items-center justify-center shrink-0 border border-indigo-500/30">
              3
            </div>
            <div>
              <h4 class="text-base font-bold text-white mb-1">Double-Click to Run</h4>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Double-click the downloaded file. No complex installation or internet needed while conducting your work!
              </p>
            </div>
          </div>
        </div>

        <!-- Direct vs Request Explanation Strip -->
        <div class="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div class="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
            <i data-lucide="check-circle" class="w-5 h-5 text-emerald-400 shrink-0"></i>
            <div>
              <strong>🟢 Direct Download:</strong> PITCSuite & Bill Scrapper download directly from this page in 1 click.
            </div>
          </div>
          <div class="flex items-center gap-3 p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/30 text-sky-200">
            <i data-lucide="message-square" class="w-5 h-5 text-sky-400 shrink-0"></i>
            <div>
              <strong>🔵 Available on Request:</strong> For specialized CP checkers, tap "Request Copy on WhatsApp" to receive the executable file.
            </div>
          </div>
        </div>
      </div>

'''

# Insert guide_box before Search & Sort Controls Toolbar
target = '<!-- Search & Sort Controls Toolbar -->'
if '<!-- Comprehensive How to Download & Run Guide' not in c:
    c = c.replace(target, guide_box + '      ' + target)

# Update page header for high legibility
c = re.sub(
    r'<h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">\s*Downloads Repository\s*</h1>\s*<p class="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">[\s\S]*?</p>',
    '''<h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Software Downloads & Tools
        </h1>
        <p class="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
          Official, verified desktop utilities for commercial and billing staff across all 11 Pakistan DISCOs. Simple, safe, and runs 100% offline on any Windows PC.
        </p>''',
    c
)

with open('downloads.html', 'w', encoding='utf-8') as f:
    f.write(c)

print("downloads.html upgraded with comprehensive guide box")
