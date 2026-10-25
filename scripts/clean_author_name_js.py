import re

# 1. Update js/tools-data.js
with open('js/tools-data.js', 'r', encoding='utf-8') as f:
    td = f.read()

td = td.replace('developerName: "Tahir Naqash"', 'developerName: "DISCO Tools Support Desk"')
td = td.replace('corporateName: "TN Developers & Co."', 'corporateName: "DISCO Tools & Commercial IT Support"')
td = re.sub(
    r'Contact (?:developer )?Tahir Naqash to (?:acquire|receive)[\w\s`]*\.',
    'Contact the DISCO Tools Support Team via WhatsApp (0333-9962474) to acquire this software.',
    td
)
# Any remaining Tahir Naqash in tools-data.js
td = td.replace('Tahir Naqash', 'DISCO Tools Support Team')

with open('js/tools-data.js', 'w', encoding='utf-8') as f:
    f.write(td)
print("js/tools-data.js updated")

# 2. Update js/main.js
with open('js/main.js', 'r', encoding='utf-8') as f:
    jm = f.read()

jm = jm.replace('developerName: "Tahir Naqash"', 'developerName: "DISCO Tools Support Desk"')
jm = jm.replace('Hello Tahir Naqash,', 'Hello,')
jm = jm.replace('Hello Tahir Naqash\\n\\n', 'Hello Support Team,\\n\\n')
jm = jm.replace('Contact developer <strong>Tahir Naqash</strong> (TN Developers & Co.)', 'Contact the <strong>DISCO Tools Support Desk</strong>')
jm = jm.replace('WhatsApp Tahir Naqash (0333-9962474)', 'WhatsApp Support Helpline (0333-9962474)')
jm = jm.replace('Tahir Naqash will connect with you', 'Our support team will connect with you')
jm = jm.replace('Submit your requirements directly to Tahir Naqash (TN Developers & Co.).', 'Submit your requirements directly to our support desk.')
jm = jm.replace('has been dispatched to Tahir Naqash.', 'has been dispatched to our support team.')
jm = jm.replace('Tahir Naqash', 'DISCO Tools Support Team')

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(jm)
print("js/main.js updated")

# 3. Update js/details.js & js/tutorials.js
for js_file in ['js/details.js', 'js/tutorials.js']:
    with open(js_file, 'r', encoding='utf-8') as f:
        jd = f.read()
    jd = jd.replace('Hello%20Tahir%20Naqash%2C', 'Hello%2C')
    jd = jd.replace('Tahir%20Naqash', 'DISCO%20Tools%20Support')
    jd = jd.replace('Tahir Naqash', 'DISCO Tools Support Team')
    with open(js_file, 'w', encoding='utf-8') as f:
        f.write(jd)
    print(f"{js_file} updated")
