#!/usr/bin/env python3
"""
Unified Pricing Manager for DISCO Tools
=======================================
Dynamically update prices across the website, JavaScript data, HTML badges,
and all desktop software (PitcSuite, BillScrapper, EBillDownloader) in ONE command.

Usage:
  # 1. Update with explicit prices:
  python scripts/update_prices.py --pitc 4000,7000 --bill 3000,5000 --ebill 3000,5000

  # 2. Sync from data/pricing.json to all files:
  python scripts/update_prices.py --sync

  # 3. Interactive mode (prompts for prices):
  python scripts/update_prices.py

  # 4. Update and auto-push to Git/Vercel:
  python scripts/update_prices.py --pitc 4000,7000 --bill 3000,5000 --ebill 3000,5000 --push
"""

import os
import re
import sys
import json
import argparse
import subprocess

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
WEBSITE_DIR = os.path.dirname(SCRIPT_DIR)
PROJECTS_DIR = os.path.dirname(WEBSITE_DIR)

PRICING_JSON_PATH = os.path.join(WEBSITE_DIR, "data", "pricing.json")
TOOLS_DATA_JS_PATH = os.path.join(WEBSITE_DIR, "js", "tools-data.js")
INDEX_HTML_PATH = os.path.join(WEBSITE_DIR, "index.html")

PITC_LICENSE_MGR = os.path.join(PROJECTS_DIR, "PitcSuite", "pitcsuite", "license_manager.py")
PITC_GEN_KEY = os.path.join(PROJECTS_DIR, "PitcSuite", "generate_key.py")

BILL_MAIN = os.path.join(PROJECTS_DIR, "BillScrapper", "main.py")
BILL_GEN_KEY = os.path.join(PROJECTS_DIR, "BillScrapper", "generate_key.py")

EBILL_MAIN = os.path.join(PROJECTS_DIR, "EBillDownloader", "main.py")
EBILL_GEN_KEY = os.path.join(PROJECTS_DIR, "EBillDownloader", "generate_key.py")

MCO_MAIN = os.path.join(PROJECTS_DIR, "MCOMaker", "main.py")
MCO_GEN_KEY = os.path.join(PROJECTS_DIR, "MCOMaker", "generate_key.py")


def fmt_price(val):
    """Format integer or string price to 'Rs. X,XXX'."""
    if isinstance(val, (int, float)):
        return f"Rs. {int(val):,}"
    val_clean = str(val).replace("Rs.", "").replace(",", "").strip()
    try:
        return f"Rs. {int(val_clean):,}"
    except ValueError:
        return f"Rs. {val_clean}"


def load_pricing_json():
    if os.path.exists(PRICING_JSON_PATH):
        try:
            with open(PRICING_JSON_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"[!] Error reading {PRICING_JSON_PATH}: {e}")
    return {}


def save_pricing_json(data):
    os.makedirs(os.path.dirname(PRICING_JSON_PATH), exist_ok=True)
    with open(PRICING_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"[✓] Updated {PRICING_JSON_PATH}")


def update_tools_data_js(pricing):
    if not os.path.exists(TOOLS_DATA_JS_PATH):
        print(f"[!] {TOOLS_DATA_JS_PATH} not found.")
        return

    with open(TOOLS_DATA_JS_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    for tool_id, tool_data in pricing.items():
        starting_price = tool_data.get("startingPrice", "")
        badge = tool_data.get("badge", f"Starting from {starting_price}")
        plans = tool_data.get("plans", [])

        # Format plans in JS
        plan_lines = []
        for p in plans:
            plan_lines.append(
                f'      {{ name: "{p["name"]}", price: "{p["price"]}", validity: "{p["validity"]}", devices: "{p["devices"]}" }}'
            )
        plans_js_block = "pricingPlans: [\n" + ",\n".join(plan_lines) + "\n    ]"

        # Match tool block
        pattern = re.compile(
            rf'(id:\s*"{tool_id}"[\s\S]*?badge:\s*")[^"]*("[\s\S]*?startingPrice:\s*")[^"]*("[\s\S]*?pricingPlans:\s*\[[\s\S]*?\])',
            re.MULTILINE
        )

        def repl(match):
            return f'{match.group(1)}{badge}{match.group(2)}{starting_price}"\n    {plans_js_block}'

        new_content, count = pattern.subn(repl, content)
        if count > 0:
            content = new_content
            print(f"[✓] Updated {tool_id} in js/tools-data.js")
        else:
            print(f"[!] Could not match {tool_id} block in js/tools-data.js")

    with open(TOOLS_DATA_JS_PATH, "w", encoding="utf-8") as f:
        f.write(content)


def update_index_html(pricing):
    if not os.path.exists(INDEX_HTML_PATH):
        return

    with open(INDEX_HTML_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Tool mapping to navigation id in index.html
    mapping = {
        "pitc-suite": "navigateToDetails('pitc-suite', event)",
        "bill-scrapper": "navigateToDetails('bill-scrapper', event)",
        "e-bills-downloader": "navigateToDetails('e-bills-downloader', event)",
        "mco-maker": "navigateToDetails('mco-maker', event)"
    }

    for tool_id, trigger_str in mapping.items():
        if tool_id in pricing:
            st_price = pricing[tool_id].get("startingPrice", "")
            # Find the card section
            idx = content.find(trigger_str)
            if idx != -1:
                # Search nearby for Starting from Rs. ...
                sub = content[idx:idx + 1000]
                new_sub = re.sub(
                    r'(Starting from\s+Rs\.\s*[\d,]+)',
                    f'Starting from {st_price}',
                    sub,
                    count=1
                )
                if new_sub != sub:
                    content = content[:idx] + new_sub + content[idx + 1000:]
                    print(f"[✓] Updated {tool_id} badge in index.html -> Starting from {st_price}")

    with open(INDEX_HTML_PATH, "w", encoding="utf-8") as f:
        f.write(content)


def update_pitcsuite_code(p_6m, p_1y):
    if os.path.exists(PITC_LICENSE_MGR):
        with open(PITC_LICENSE_MGR, "r", encoding="utf-8") as f:
            code = f.read()
        new_block = (
            f'plans_data = [\n'
            f'            ("6 Months Plan", "{p_6m}", "180 Days Validity", "Up to 2 Devices"),\n'
            f'            ("1 Year Plan", "{p_1y}", "365 Days Validity", "Up to 3 Devices"),\n'
            f'        ]'
        )
        code = re.sub(r'plans_data\s*=\s*\[[\s\S]*?\]', new_block, code, count=1)
        with open(PITC_LICENSE_MGR, "w", encoding="utf-8") as f:
            f.write(code)
        print(f"[✓] Updated PitcSuite/pitcsuite/license_manager.py")

    if os.path.exists(PITC_GEN_KEY):
        with open(PITC_GEN_KEY, "r", encoding="utf-8") as f:
            code = f.read()
        new_plans = (
            f'PLANS = [\n'
            f'    ("6_months", "6 Months  —  {p_6m}  (180 Days, Up to 2 Devices)"),\n'
            f'    ("1_year", "1 Year  —  {p_1y}  (365 Days, Up to 3 Devices)"),\n'
            f']'
        )
        code = re.sub(r'PLANS\s*=\s*\[[\s\S]*?\n\]', new_plans, code, count=1)
        with open(PITC_GEN_KEY, "w", encoding="utf-8") as f:
            f.write(code)
        print(f"[✓] Updated PitcSuite/generate_key.py")


def update_billscrapper_code(p_6m, p_1y):
    if os.path.exists(BILL_MAIN):
        with open(BILL_MAIN, "r", encoding="utf-8") as f:
            code = f.read()
        new_block = (
            f'plans_data = [\n'
            f'            ("6 Months", "{p_6m}", "Up to 2 Devices", "#d2a8ff"),\n'
            f'            ("1 Year", "{p_1y}", "Up to 2 Devices", "#ffa657"),\n'
            f'        ]'
        )
        code = re.sub(r'plans_data\s*=\s*\[[\s\S]*?\n\]', new_block, code, count=1)
        with open(BILL_MAIN, "w", encoding="utf-8") as f:
            f.write(code)
        print(f"[✓] Updated BillScrapper/main.py")

    if os.path.exists(BILL_GEN_KEY):
        with open(BILL_GEN_KEY, "r", encoding="utf-8") as f:
            code = f.read()
        new_plans = (
            f'PLANS = [\n'
            f'    ("6_months", "6 Months  —  {p_6m}  (180 Days, Up to 2 Devices)"),\n'
            f'    ("1_year", "1 Year  —  {p_1y}  (365 Days, Up to 2 Devices)"),\n'
            f']'
        )
        code = re.sub(r'PLANS\s*=\s*\[[\s\S]*?\n\]', new_plans, code, count=1)
        with open(BILL_GEN_KEY, "w", encoding="utf-8") as f:
            f.write(code)
        print(f"[✓] Updated BillScrapper/generate_key.py")


def update_ebilldownloader_code(p_6m, p_1y):
    if os.path.exists(EBILL_MAIN):
        with open(EBILL_MAIN, "r", encoding="utf-8") as f:
            code = f.read()
        new_block = (
            f'plans = [\n'
            f'            ("6 Months Subscription", "{p_6m}", "180 Days Validity  •  Up to 2 Devices"),\n'
            f'            ("1 Year Subscription (Best Value)", "{p_1y}", "365 Days Validity  •  Up to 2 Devices"),\n'
            f'        ]'
        )
        code = re.sub(r'plans\s*=\s*\[[\s\S]*?\]', new_block, code, count=1)
        with open(EBILL_MAIN, "w", encoding="utf-8") as f:
            f.write(code)
        print(f"[✓] Updated EBillDownloader/main.py")

    if os.path.exists(EBILL_GEN_KEY):
        with open(EBILL_GEN_KEY, "r", encoding="utf-8") as f:
            code = f.read()
        new_plans = (
            f'PLANS = [\n'
            f'    ("6_months", "6 Months  —  {p_6m}  (180 Days, Up to 2 Devices)"),\n'
            f'    ("1_year", "1 Year  —  {p_1y}  (365 Days, Up to 2 Devices)"),\n'
            f']'
        )
        code = re.sub(r'PLANS\s*=\s*\[[\s\S]*?\n\]', new_plans, code, count=1)
        with open(EBILL_GEN_KEY, "w", encoding="utf-8") as f:
            f.write(code)
        print(f"[✓] Updated EBillDownloader/generate_key.py")


def update_mcomaker_code(p_6m, p_1y):
    if os.path.exists(MCO_GEN_KEY):
        with open(MCO_GEN_KEY, "r", encoding="utf-8") as f:
            code = f.read()
        new_plans = (
            f'PLANS = [\n'
            f'    ("6_months", "6 Months  —  {p_6m}  (180 Days, 1 Device)", 180, 1),\n'
            f'    ("1_year", "1 Year  —  {p_1y}  (365 Days, 1 Device)  [Recommended]", 365, 1),\n'
            f']'
        )
        code = re.sub(r'PLANS\s*=\s*\[[\s\S]*?\n\]', new_plans, code, count=1)
        with open(MCO_GEN_KEY, "w", encoding="utf-8") as f:
            f.write(code)
        print(f"[✓] Updated MCOMaker/generate_key.py")


def git_commit_and_push(msg="Update software and website pricing"):
    print("\n[>] Staging and pushing website changes to Git/Vercel...")
    try:
        subprocess.run(["git", "add", "-A"], cwd=WEBSITE_DIR, check=True)
        subprocess.run(["git", "commit", "-m", msg], cwd=WEBSITE_DIR, check=True)
        subprocess.run(["git", "push"], cwd=WEBSITE_DIR, check=True)
        print("[✓] Pushed website repo to GitHub & Vercel.")
    except subprocess.CalledProcessError as e:
        print(f"[!] Git push warning: {e}")


def parse_pair(s):
    """Parse '4000,7000' or '4000:7000' into (p_6m, p_1y)."""
    parts = re.split(r'[,:]', s.strip())
    if len(parts) == 2:
        return fmt_price(parts[0]), fmt_price(parts[1])
    raise argparse.ArgumentTypeError("Must be formatted as 6month,1year (e.g. 4000,7000)")


def main():
    parser = argparse.ArgumentParser(description="Synchronize pricing across DISCO Tools Website and Desktop Softwares.")
    parser.add_argument("--pitc", type=parse_pair, help="PITCSuite prices '6m,1y' (e.g. 4000,7000)")
    parser.add_argument("--bill", type=parse_pair, help="Bill Scrapper prices '6m,1y' (e.g. 3000,5000)")
    parser.add_argument("--ebill", type=parse_pair, help="E-Bills Downloader prices '6m,1y' (e.g. 3000,5000)")
    parser.add_argument("--mco", type=parse_pair, help="MCO Maker prices '6m,1y' (e.g. 3000,5000)")
    parser.add_argument("--sync", action="store_true", help="Sync using existing values in data/pricing.json")
    parser.add_argument("--push", action="store_true", help="Auto git commit and push website changes")

    args = parser.parse_args()

    pricing = load_pricing_json()

    pitc_prices = args.pitc
    bill_prices = args.bill
    ebill_prices = args.ebill
    mco_prices = args.mco

    # Interactive prompt if no flags provided
    if not args.sync and not (pitc_prices or bill_prices or ebill_prices or mco_prices):
        print("=== Unified Pricing Manager (DISCO Tools) ===")
        print("Press Enter to keep current price, or type new prices (e.g. 4000,7000):\n")

        curr_pitc = (
            pricing.get("pitc-suite", {}).get("plans", [{}, {}])[0].get("price", "Rs. 5,000"),
            pricing.get("pitc-suite", {}).get("plans", [{}, {}])[1].get("price", "Rs. 9,000")
        ) if "pitc-suite" in pricing else ("Rs. 5,000", "Rs. 9,000")

        curr_bill = (
            pricing.get("bill-scrapper", {}).get("plans", [{}, {}])[0].get("price", "Rs. 3,000"),
            pricing.get("bill-scrapper", {}).get("plans", [{}, {}])[1].get("price", "Rs. 5,000")
        ) if "bill-scrapper" in pricing else ("Rs. 3,000", "Rs. 5,000")

        curr_ebill = (
            pricing.get("e-bills-downloader", {}).get("plans", [{}, {}])[0].get("price", "Rs. 3,000"),
            pricing.get("e-bills-downloader", {}).get("plans", [{}, {}])[1].get("price", "Rs. 5,000")
        ) if "e-bills-downloader" in pricing else ("Rs. 3,000", "Rs. 5,000")

        curr_mco = (
            pricing.get("mco-maker", {}).get("plans", [{}, {}])[0].get("price", "Rs. 3,000"),
            pricing.get("mco-maker", {}).get("plans", [{}, {}])[1].get("price", "Rs. 5,000")
        ) if "mco-maker" in pricing else ("Rs. 3,000", "Rs. 5,000")

        p_in = input(f"PITCSuite 6m,1y [{curr_pitc[0]}, {curr_pitc[1]}]: ").strip()
        pitc_prices = parse_pair(p_in) if p_in else curr_pitc

        b_in = input(f"Bill Scrapper 6m,1y [{curr_bill[0]}, {curr_bill[1]}]: ").strip()
        bill_prices = parse_pair(b_in) if b_in else curr_bill

        e_in = input(f"E-Bills Downloader 6m,1y [{curr_ebill[0]}, {curr_ebill[1]}]: ").strip()
        ebill_prices = parse_pair(e_in) if e_in else curr_ebill

        m_in = input(f"MCO Maker 6m,1y [{curr_mco[0]}, {curr_mco[1]}]: ").strip()
        mco_prices = parse_pair(m_in) if m_in else curr_mco

    # If --sync was specified, load from pricing.json
    if args.sync:
        if "pitc-suite" in pricing and len(pricing["pitc-suite"]["plans"]) >= 2:
            pitc_prices = (pricing["pitc-suite"]["plans"][0]["price"], pricing["pitc-suite"]["plans"][1]["price"])
        if "bill-scrapper" in pricing and len(pricing["bill-scrapper"]["plans"]) >= 2:
            bill_prices = (pricing["bill-scrapper"]["plans"][0]["price"], pricing["bill-scrapper"]["plans"][1]["price"])
        if "e-bills-downloader" in pricing and len(pricing["e-bills-downloader"]["plans"]) >= 2:
            ebill_prices = (pricing["e-bills-downloader"]["plans"][0]["price"], pricing["e-bills-downloader"]["plans"][1]["price"])
        if "mco-maker" in pricing and len(pricing["mco-maker"]["plans"]) >= 2:
            mco_prices = (pricing["mco-maker"]["plans"][0]["price"], pricing["mco-maker"]["plans"][1]["price"])

    # Update dictionary
    if pitc_prices:
        p_6m, p_1y = pitc_prices
        pricing["pitc-suite"] = {
            "startingPrice": p_6m,
            "badge": f"Starting from {p_6m}",
            "plans": [
                {"name": "6 Months Plan", "price": p_6m, "validity": "180 Days Validity", "devices": "Up to 2 Devices"},
                {"name": "1 Year Plan", "price": p_1y, "validity": "365 Days Validity", "devices": "Up to 3 Devices"}
            ]
        }
        update_pitcsuite_code(p_6m, p_1y)

    if bill_prices:
        p_6m, p_1y = bill_prices
        pricing["bill-scrapper"] = {
            "startingPrice": p_6m,
            "badge": f"Starting from {p_6m}",
            "plans": [
                {"name": "6 Months Plan", "price": p_6m, "validity": "180 Days Validity", "devices": "Up to 2 Devices"},
                {"name": "1 Year Plan", "price": p_1y, "validity": "365 Days Validity", "devices": "Up to 2 Devices"}
            ]
        }
        update_billscrapper_code(p_6m, p_1y)

    if ebill_prices:
        p_6m, p_1y = ebill_prices
        pricing["e-bills-downloader"] = {
            "startingPrice": p_6m,
            "badge": f"Starting from {p_6m}",
            "plans": [
                {"name": "6 Months Plan", "price": p_6m, "validity": "180 Days Validity", "devices": "Up to 2 Devices"},
                {"name": "1 Year Plan", "price": p_1y, "validity": "365 Days Validity", "devices": "Up to 2 Devices"}
            ]
        }
        update_ebilldownloader_code(p_6m, p_1y)

    if mco_prices:
        p_6m, p_1y = mco_prices
        pricing["mco-maker"] = {
            "startingPrice": p_6m,
            "badge": f"Starting from {p_6m}",
            "plans": [
                {"name": "6 Months Plan", "price": p_6m, "validity": "180 Days Validity", "devices": "1 Device"},
                {"name": "1 Year Plan", "price": p_1y, "validity": "365 Days Validity", "devices": "1 Device"}
            ]
        }
        update_mcomaker_code(p_6m, p_1y)

    # Save to pricing.json
    save_pricing_json(pricing)

    # Update website JS & HTML
    update_tools_data_js(pricing)
    update_index_html(pricing)

    print("\n[✓] All software and website pricing successfully synchronized!")

    if args.push:
        git_commit_and_push()


if __name__ == "__main__":
    main()
