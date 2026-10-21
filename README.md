# ⚡ DISCO Tools & PITCSuite Enterprise Web Portal

A high-performance, responsive web application and software distribution hub built for all Pakistan Electricity Distribution Companies (DISCOs): LESCO, GEPCO, FESCO, IESCO, MEPCO, PESCO, HAZECO, SEPCO, HESCO, QESCO, and TESCO. Users can simply select their DISCO or configure endpoints inside each tool.

Designed with modern glassmorphism aesthetics, fluent animations, live tool search, category filters, and step-by-step tutorials for all **14 specialized tools** plus the flagship **PITCSuite (v2.8.91)**.

---

## 🌟 Key Features

- **Home Page (Overview)**:
  - Hero section with animated status indicators and glowing typography
  - System performance metrics (14+ tools, 100% offline, zero-error audit verifiers)
  - Dedicated spotlight showcase for the flagship **PITCSuite**
  - Architecture breakdown across Posting Checkers, Converters, Scrapers, and Mobile Utilities
  - 3-step zero-configuration quick start guide
- **Downloads Page**:
  - Live search bar by tool name, filename, or keywords
  - Category filter pills (All, Flagship Suite, Posting Checkers, Converters, Extractors, Android APKs, System Utilities)
  - Sorting options (Default, Alphabetical, File Size, Recently Updated)
  - Direct download buttons pointing directly to `downloads/<tool-name>.exe`
  - Deep-link button to open the specific tool's tutorial
- **Tutorials Page**:
  - Interactive split-screen layout with a quick-filter sidebar
  - Comprehensive guide for each tool: Overview, Prerequisites, Step-by-Step Walkthrough with numbered badges, Pro Tips, and Troubleshooting
  - Interactive video demonstration modal
  - Previous / Next tool navigation controls
  - Deep linking support (e.g. `tutorials.html?tool=cp139-checker`)
- **Contact Us Page**:
  - Technical ticket dispatch form with client-side validation and simulated ticket reference numbers
  - Direct communication channels (WhatsApp Desk, Official Email, Headquarters Address)
  - Interactive FAQ accordion addressing Windows SmartScreen whitelisting, offline execution, and bank scroll layout modifications

---

## 📁 Project Structure

```text
d:\Projects\DISCO Tools Website\
├── index.html                   # Home Page (Overview & Highlights)
├── downloads.html               # Downloads Repository
├── tutorials.html               # Step-by-Step Usage Guides & SOPs
├── contact.html                 # Contact Us & Technical FAQ
├── run_server.py                # Python local development web server
├── start_website.bat            # Windows 1-click launcher
├── css\
│   └── styles.css               # Fluent animations, glassmorphism & typography
├── js\
│   ├── tools-data.js            # Master registry containing metadata for all 16 tools
│   ├── main.js                  # Shared navbar, drawer, toasts & download triggers
│   ├── downloads.js             # Real-time search, category filters & download cards
│   ├── tutorials.js             # Interactive tutorial reader & video modal
│   └── contact.js               # Form handler & interactive FAQ accordion
└── downloads\                   # FOLDER WHERE EXECUTABLES AND APKS RESIDE
    ├── README.txt               # Manifest instructions
    ├── PitcSuite.exe            # (Flagship) All-in-One Enterprise Workstation
    ├── CP139PostingChecker.exe  # CP-139 Posting Checker
    ├── FeederCodeRanging.exe    # Feeder Code Ranging Utility
    ├── FCodeBulkPDFtoExcelConvert.exe # Feeder PDF to Excel Converter
    ├── CP136_Posting_Checker.exe# CP-136 Bank Scroll Reconciler
    ├── ConvertCP21c.exe         # CP-21c Billing Ledger Converter
    ├── BillScrapper.exe         # All-DISCO Duplicate Bill Scraper
    ├── 88LPaymentExtract.exe    # Form 88-L Payment Extractor
    ├── TransformerFetch.exe     # PMT Load & Spec Fetcher
    ├── CP-52_Posting_Checker.exe# CP-52 Defaulter Posting Verifier
    ├── PITCLoginAndroid.apk     # Android Quick Portal Authenticator
    ├── PDFMerger.exe            # High-Speed PDF Document Merger
    ├── CP22T_Posting_Checker.exe# CP-22T Tariff Adjustment Verifier
    └── GovtAssessmentRealization.exe # Government Assessment & Arrears Realization Tracker
```

---

## 🚀 How to Run the Website Locally

### Method 1: Double-Click Launcher (Windows)
Simply double-click **`start_website.bat`**. It will automatically start a local server and launch your default web browser to:
```
http://localhost:8080/index.html
```

### Method 2: Command Line (Python)
Run:
```powershell
python run_server.py
```

---

## 📤 How to Upload & Replace Tool Executables

To provide your actual compiled `.exe` and `.apk` files to users:
1. Open the folder: `d:\Projects\DISCO Tools Website\downloads\`
2. Copy your compiled `.exe` or `.apk` files directly into this folder.
3. Keep the exact filenames as listed above (e.g. `PitcSuite.exe`, `CP139PostingChecker.exe`, etc.).
4. When users click **Download** on any page, the browser will download that file directly from the `downloads/` directory!

---

## 🌐 Deploying to the Web or Intranet

This website is completely static (HTML5, Tailwind CSS, JavaScript) and requires **no complex Node.js build steps or database configuration**:
- **DISCO Local Sub-Division Intranet**: Drop the entire folder into IIS or Apache / XAMPP `htdocs`.
- **Cloud Hosting**: Compatible with GitHub Pages, Vercel, Netlify, Cloudflare Pages, or cPanel hosting.
