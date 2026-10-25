import re

with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Update hero section text
c = re.sub(
    r'<h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight">\s*DISCO Tools & <span class="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">PITCSuite</span> Automation Portal\s*</h1>',
    '''<h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight">
          Simple Office Software for <span class="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">DISCO Commercial Staff</span>
        </h1>''',
    c
)

c = re.sub(
    r'<p class="mt-6 text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">[\s\S]*?</p>',
    '''<p class="mt-6 text-base sm:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed">
          Easy-to-use software engineered for Commercial Assistants, Revenue Officers, and Computer Operators across all 11 Pakistan electricity companies. Automate monthly billing, extract bills into Excel, and verify CP-139 / CP-52 postings without errors.
        </p>''',
    c,
    count=1
)

# 2. Update CTA buttons
old_cta = '''        <!-- CTA Action Buttons -->
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
        </div>'''

new_cta = '''        <!-- CTA Action Buttons -->
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="downloads.html" class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base tracking-wide shadow-xl shadow-emerald-950/40 transition-all flex items-center justify-center gap-2.5 glow-btn">
            <i data-lucide="download" class="w-5 h-5"></i> Download Software Now
          </a>

          <a href="https://wa.me/923339962474" target="_blank" class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 font-bold text-base tracking-wide border border-emerald-500/40 transition-all flex items-center justify-center gap-2">
            <i data-lucide="phone-call" class="w-5 h-5"></i> Helpline: 0333-9962474
          </a>
        </div>

        <!-- 4 Key Benefits for Non-Tech & Aged Staff -->
        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left max-w-6xl mx-auto">
          <div class="p-5 rounded-2xl bg-slate-900/80 border border-white/10">
            <div class="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
              <i data-lucide="zap" class="w-5 h-5"></i>
            </div>
            <h4 class="text-base font-bold text-white mb-1">No Manual Retyping</h4>
            <p class="text-xs sm:text-sm text-slate-300">Extract thousands of consumer bills, arrears, and taxes directly into formatted Excel sheets in seconds.</p>
          </div>
          <div class="p-5 rounded-2xl bg-slate-900/80 border border-white/10">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <i data-lucide="shield-check" class="w-5 h-5"></i>
            </div>
            <h4 class="text-base font-bold text-white mb-1">100% Offline & Safe</h4>
            <p class="text-xs sm:text-sm text-slate-300">Run audits locally on your computer. No internet needed during work and office records stay completely private.</p>
          </div>
          <div class="p-5 rounded-2xl bg-slate-900/80 border border-white/10">
            <div class="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
              <i data-lucide="laptop" class="w-5 h-5"></i>
            </div>
            <h4 class="text-base font-bold text-white mb-1">Runs on Any Windows PC</h4>
            <p class="text-xs sm:text-sm text-slate-300">Compatible with Windows 7, 8, 10, and 11 across all sub-divisional computers without special setup.</p>
          </div>
          <div class="p-5 rounded-2xl bg-slate-900/80 border border-white/10">
            <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
              <i data-lucide="phone" class="w-5 h-5"></i>
            </div>
            <h4 class="text-base font-bold text-white mb-1">Help via WhatsApp & Call</h4>
            <p class="text-xs sm:text-sm text-slate-300">Have a question? Call or WhatsApp our helpline at 0333-9962474 for friendly, step-by-step guidance.</p>
          </div>
        </div>'''

c = c.replace(old_cta, new_cta)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(c)

print("index.html upgraded with friendly hero and benefits strip")
