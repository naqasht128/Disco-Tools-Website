with open('downloads.html', 'r', encoding='utf-8') as f:
    text = f.read()

required_ids = ['search-input', 'sort-select', 'category-pills-container', 'results-count', 'downloads-grid']
for rid in required_ids:
    assert f'id="{rid}"' in text, f'Missing ID: {rid}'
print('All required IDs verified successfully!')
