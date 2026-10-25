import re

# 1. Update contact.html
with open('contact.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('Reach out to the DISCO Tools and PITCSuite developer (Tahir Naqash, TN Developers & Co.)', 'Reach out to the DISCO Tools Support Desk')
c = c.replace('Developer <strong>Tahir Naqash</strong> (TN Developers & Co.)', 'the <strong>DISCO Tools Support Desk</strong>')
c = c.replace('Direct inbox of <strong>Tahir Naqash</strong> (tahir.naqash4@gmail.com).', 'Direct inbox of DISCO Tools Support Desk (tahir.naqash4@gmail.com).')
c = re.sub(
    r'<div class="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 font-bold text-sm">\s*TN\s*</div>\s*<div>\s*<h4 class="text-sm font-bold text-white">Tahir Naqash</h4>\s*<p class="text-xs text-slate-400 mt-0.5">Developer</p>\s*<div class="mt-1 text-xs font-mono text-sky-400 font-semibold">TN Developers & Co\.</div>\s*</div>',
    '''<div class="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0">
                <i data-lucide="headphones" class="w-5 h-5"></i>
              </div>
              <div>
                <h4 class="text-sm font-bold text-white">DISCO Tools Support Desk</h4>
                <p class="text-xs text-slate-400 mt-0.5">Commercial IT & Helpdesk</p>
                <div class="mt-1 text-xs font-mono text-sky-400 font-semibold">Technical Assistance Desk</div>
              </div>''',
    c
)
c = c.replace('Developer & Corporate Profile', 'DISCO Support & Helpline Desk')
c = c.replace('Official Developer Email', 'Official Support Email')
c = c.replace('Dispatch Inquiry to Developer', 'Send Inquiry to Support Desk')
c = c.replace('Developer: <strong>Tahir Naqash</strong> | TN Developers & Co.', 'Support Desk: <strong>DISCO Tools Support Desk</strong>')
c = c.replace('Developed by Tahir Naqash (TN Developers & Co.)', 'DISCO Tools Portal')
c = c.replace('About Developer', 'About & Support Desk')

with open('contact.html', 'w', encoding='utf-8') as f:
    f.write(c)
print("contact.html cleaned")

# 2. Update downloads.html
with open('downloads.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('Developer: <strong>Tahir Naqash</strong> | TN Developers & Co.', 'Support Desk: <strong>DISCO Tools Support Desk</strong>')
c = c.replace('Developed by Tahir Naqash (TN Developers & Co.)', 'DISCO Tools Portal')
c = c.replace('About Developer', 'About & Support Desk')
c = c.replace('Download PITCSuite v2.8.97', 'Download PITCSuite')

with open('downloads.html', 'w', encoding='utf-8') as f:
    f.write(c)
print("downloads.html cleaned")

# 3. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('developer Tahir Naqash (TN Developers & Co.)', 'the DISCO Tools Support Desk')
c = c.replace('Corporate & Developer Profile', 'DISCO Tools Support & Helpdesk')
c = c.replace('About DISCO Tools & Development', 'About DISCO Tools & Support')

# Replace developer card in About section
old_dev_card = '''              <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl shadow-sky-500/20 mb-6">
                TN
              </div>

              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold mb-3">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Developer
              </div>

              <h3 class="text-2xl font-extrabold text-white">Tahir Naqash</h3>
              <p class="text-xs text-sky-400 font-mono mt-0.5">TN Developers & Co.</p>'''

new_dev_card = '''              <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-sky-500/20 mb-6">
                <i data-lucide="headphones" class="w-10 h-10"></i>
              </div>

              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold mb-3">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Official Support Desk
              </div>

              <h3 class="text-2xl font-extrabold text-white">DISCO Tools Support Desk</h3>
              <p class="text-xs text-sky-400 font-mono mt-0.5">Commercial Automation & Technical Helpline</p>'''

c = c.replace(old_dev_card, new_dev_card)
c = c.replace('TN Developers & Co.', 'DISCO Tools & Support Desk')
c = c.replace('Email Tahir Naqash', 'Send Email Support')
c = c.replace('Developer: <strong>Tahir Naqash</strong> | TN Developers & Co.', 'Support Desk: <strong>DISCO Tools Support Desk</strong>')
c = c.replace('Developed by Tahir Naqash (TN Developers & Co.)', 'DISCO Tools Portal')
c = c.replace('About Developer', 'About & Support Desk')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(c)
print("index.html cleaned")
