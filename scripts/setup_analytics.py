import re

ANALYTICS_SNIPPET = '''  <!-- Vercel Web Analytics & Speed Insights -->
  <script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
  </script>
  <script defer src="/_vercel/insights/script.js"></script>
  <script defer src="/_vercel/speed-insights/script.js"></script>
</head>'''

HTML_FILES = ['index.html', 'downloads.html', 'details.html', 'contact.html']

for filename in HTML_FILES:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Avoid duplicate insertion
    if '/_vercel/insights/script.js' not in content:
        content = content.replace('</head>', ANALYTICS_SNIPPET)
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Added Vercel Analytics to {filename}")
    else:
        print(f"Vercel Analytics already in {filename}")

# Update js/main.js with custom event tracking
with open('js/main.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# In triggerToolDownload, add event dispatch
if 'tool_download_' not in js_content:
    target_dl = "function triggerToolDownload(filenameOrId, toolTitle) {"
    replacement_dl = """function triggerToolDownload(filenameOrId, toolTitle) {
  // Track download event in Vercel Analytics
  if (typeof window !== 'undefined' && window.va) {
    try { window.va('event', { name: 'tool_download_' + (typeof filenameOrId === 'string' ? filenameOrId.replace(/[^a-zA-Z0-9_-]/g, '_') : 'unknown') }); } catch (e) {}
  }"""
    js_content = js_content.replace(target_dl, replacement_dl)
    print("Added download tracking to triggerToolDownload")

if 'software_request' not in js_content:
    target_req = "function submitSoftwareRequest(e) {"
    replacement_req = """function submitSoftwareRequest(e) {
  // Track request event in Vercel Analytics
  if (typeof window !== 'undefined' && window.va) {
    try { window.va('event', { name: 'software_request' }); } catch (e) {}
  }"""
    js_content = js_content.replace(target_req, replacement_req)
    print("Added request tracking to submitSoftwareRequest")

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(js_content)
