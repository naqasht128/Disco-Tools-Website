#!/usr/bin/env python3
"""
Automatically synchronizes software pricing plans from PitcSuite & BillScrapper source code
into the DISCO Tools Website (data/pricing.json and js/tools-data.js).
Run this script whenever you update prices in PitcSuite or BillScrapper.
"""
import os
import re
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECTS_DIR = os.path.dirname(BASE_DIR)

def extract_pitc_prices():
    path = os.path.join(PROJECTS_DIR, "PitcSuite", "pitcsuite", "license_manager.py")
    if not os.path.exists(path):
        return None
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        text = f.read()
    m = re.search(r'plans_data\s*=\s*\[([\s\S]*?)\]', text)
    if not m: return None
    plans = []
    for line in m.group(1).splitlines():
        line = line.strip()
        if not line or line.startswith('#'): continue
        t_m = re.search(r'\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\)', line)
        if t_m:
            plans.append({
                "name": t_m.group(1),
                "price": t_m.group(2),
                "validity": t_m.group(3),
                "devices": t_m.group(4)
            })
    return plans

def extract_bill_scrapper_prices():
    path = os.path.join(PROJECTS_DIR, "BillScrapper", "main.py")
    if not os.path.exists(path):
        return None
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        text = f.read()
    m = re.search(r'plans_data\s*=\s*\[([\s\S]*?)\]', text)
    if not m: return None
    plans = []
    for line in m.group(1).splitlines():
        line = line.strip()
        if not line or line.startswith('#'): continue
        t_m = re.search(r'\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\)', line)
        if t_m:
            p_name = t_m.group(1) + (" Plan" if "Plan" not in t_m.group(1) else "")
            val = "30 Days Validity" if "1 Month" in p_name else ("90 Days Validity" if "3 Months" in p_name else ("180 Days Validity" if "6 Months" in p_name else "365 Days Validity"))
            plans.append({
                "name": p_name,
                "price": t_m.group(2),
                "validity": val,
                "devices": t_m.group(3)
            })
    return plans

def main():
    pitc_plans = extract_pitc_prices()
    bs_plans = extract_bill_scrapper_prices()

    pricing = {}
    if pitc_plans:
        pricing["pitc-suite"] = {
            "startingPrice": pitc_plans[0]["price"],
            "badge": f"Starting from {pitc_plans[0]['price']}",
            "plans": pitc_plans
        }
    if bs_plans:
        pricing["bill-scrapper"] = {
            "startingPrice": bs_plans[0]["price"],
            "badge": f"Starting from {bs_plans[0]['price']}",
            "plans": bs_plans
        }

    json_path = os.path.join(BASE_DIR, "data", "pricing.json")
    os.makedirs(os.path.dirname(json_path), exist_ok=True)
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(pricing, f, indent=2)
    print(f"Updated {json_path}")

if __name__ == "__main__":
    main()
