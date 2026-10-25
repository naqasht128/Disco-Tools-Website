import re

with open('js/tools-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

tools = re.findall(r'id:\s*"([^"]+)".*?name:\s*"([^"]+)".*?summary:\s*"([^"]+)"', text, re.DOTALL)
for tid, name, summary in tools:
    print(f"[{tid}] {name}:\n  {summary}\n")
