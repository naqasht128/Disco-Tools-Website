/**
 * DISCO Tools Website & PITCSuite - Master Tools Data Registry
 * Corporate & Developer Metadata, Software Catalog, Download Targets, and Details
 */

const DEVELOPER_PROFILE = {
  corporateName: "DISCO Tools & Commercial IT Support",
  developerName: "DISCO Tools Support Desk",
  role: "Developer",
  email: "tahir.naqash4@gmail.com",
  cell: "0333-9962474",
  whatsappNumber: "923339962474",
  whatsappFormatted: "0333-9962474",
  location: "Peshawar, Khyber Pakhtunkhwa, Pakistan",
  mission: "Eliminating manual billing errors, automating CP posting reconciliations, and engineering zero-friction desktop utilities for all Pakistan DISCOs (LESCO, GEPCO, FESCO, IESCO, MEPCO, PESCO, HAZECO, SEPCO, HESCO, QESCO, TESCO)."
};

const DISCO_TOOLS = [
  // =========================================================================
  // 1. PITCSuite (PUBLIC DOWNLOADABLE - HAS REPO)
  // =========================================================================
  {
    id: "pitc-suite",
    name: "PITCSuite",
    title: "PITCSuite - All-In-One Enterprise Workstation",
    category: "flagship",
    badge: "Starting from Rs. 600",
    startingPrice: "Rs. 600",
    pricingPlans: [
      { name: "1 Month Plan", price: "Rs. 600", validity: "30 Days Validity", devices: "1 Device Limit" },
      { name: "3 Months Plan", price: "Rs. 1,400", validity: "90 Days Validity", devices: "Up to 2 Devices" },
      { name: "6 Months Plan", price: "Rs. 2,400", validity: "180 Days Validity", devices: "Up to 2 Devices" },
      { name: "1 Year Plan", price: "Rs. 4,000", validity: "365 Days Validity", devices: "Up to 3 Devices" }
    ],
    isFlagship: true,
    status: "ready",
    isPublicDownload: true,
    version: "v2.8.97",
    size: "144.8 MB",
    filename: "PITCSuite_Setup.exe",
    downloadUrl: "https://github.com/naqasht128/PitcSuite/releases/latest/download/PITCSuite_Setup.exe",
    githubRepo: "naqasht128/PitcSuite",
    githubReleaseUrl: "https://github.com/naqasht128/PitcSuite/releases/latest",
    githubRepoUrl: "https://github.com/naqasht128/PitcSuite",
    updated: "October 2026",
    icon: "layers",
    helperTool: {
      name: "MPos Portable",
      filename: "MPos-v.0.5.0-Portable.zip",
      downloadUrl: "downloads/MPos-v.0.5.0-Portable.zip",
      size: "118 KB",
      purpose: "Mouse Coordinates Utility for PITC reports lacking a Print button"
    },
    summary: "All-in-one workstation for DISCO billing, scraping, and CP reconciliations.",
    description: "PITCSuite is the flagship all-in-one productivity workstation engineered specifically for Commercial Assistants, Revenue Officers, Computer Operators, and Sub-Divisional Clerks across all 11 Pakistan electricity distribution companies (LESCO, GEPCO, FESCO, IESCO, MEPCO, PESCO, HAZECO, SEPCO, HESCO, QESCO, TESCO). It unites automatic PITC report downloads, bulk duplicate E-bill fetching, high-speed web bill scraping, 88-L payment extraction, CP-52 disconnect roster generation, CP-139 / CP-136 / CP-22T bank posting checkers, and government department reconciliation into one cohesive desktop application. Operating 100% locally and offline without external cloud dependencies for audit privacy, PITCSuite drastically compresses multi-day month-end commercial closing tasks into minutes.",
    features: [
      "Automatic PITC Report Downloader: Direct scheduled fetching of monthly billing matrices without browser overhead",
      "E/Bill PDF Downloader: High-speed engine for retrieving duplicate electricity bills in batch PDF format",
      "Bill Scrapper: Fast multi-threaded web scraper extracting full consumer billing and tariff breakdowns into Excel",
      "Payment Extractor from 88L: Instant search and extraction across multi-thousand-page Form 88-L collection archives",
      "CP-52 Posting to PDF: Automatically parses raw mainframe dumps into print-ready disconnection and defaulter rosters",
      "Multiple CPs Posting Checkers: Validates CP-139 daily collection scrolls, CP-136 monthly reconciliations, and CP-22T adjustments",
      "Govt Reconciliation & PDF Tools: Department-wise assessment tracking alongside offline PDF splitting, merging, and stamping",
      "Built-in Licensing System: Hardware-locked subscription manager supporting offline and instant online key activation"
    ],
    tutorial: {
      overview: "PITCSuite unites all DISCO commercial verification modules under a unified, high-performance desktop interface. Launch the workstation, select your operating sub-division, and execute audit batches in seconds.",
      prerequisites: [
        "Windows 10 or Windows 11 (64-bit recommended)",
        "Microsoft Excel 2016+ or LibreOffice Calc (for inspecting generated audit workbooks)",
        "Local bank collection scrolls (.txt / .dat) or PITC commercial billing exports",
        "Active Internet connection (only required for online bill scraping or PITC report downloading)"
      ],
      steps: [
        {
          step: 1,
          title: "Download & Launch",
          desc: "Download `PITCSuite_Setup.exe` from the Downloads page and complete installation. Launch PITCSuite via the desktop shortcut."
        },
        {
          step: 2,
          title: "Select Operational Module",
          desc: "Choose your desired operational task from the top navigation ribbon (e.g., CP-139 Verification, Bill Scraper, CP-136 Reconciler, 88-L Extractor, or CP-52 PDF Formatter)."
        },
        {
          step: 3,
          title: "Import Data Files & Run Audit",
          desc: "Click 'Load Input Files' to browse your bank scroll dump, reference numbers list, or billing ledger extract. Click 'Execute Batch Run' to process thousands of records within seconds."
        },
        {
          step: 4,
          title: "Export Clean Excel Dossier",
          desc: "Review discrepancies, unposted receipts, or tariff variances directly in the preview table. Click 'Export to Excel' to save audit-ready workbooks formatted with summary totals."
        }
      ],
      tips: [
        "Press Ctrl+F inside any module to instantly search for a specific 14-digit consumer reference number.",
        "Custom DISCO endpoints or proxy settings can be adjusted in the Settings tab for specialized sub-divisional networks.",
        "PDF not downloading? If a PITC report window (e.g. Bill Adjustment Detail) lacks a web 'Print this Report' button, download MPos Portable (118 KB) to configure mouse screen coordinates for the top-left printer icon."
      ]
    }
  },

  // =========================================================================
  // 2. BILL SCRAPPER (PUBLIC DOWNLOADABLE - HAS REPO)
  // =========================================================================
  {
    id: "bill-scrapper",
    name: "Bill Scrapper",
    title: "Bill Scrapper - Scrape Billing Information into Excel",
    category: "extractors",
    badge: "Starting from Rs. 300",
    startingPrice: "Rs. 300",
    pricingPlans: [
      { name: "1 Month Plan", price: "Rs. 300", validity: "30 Days Validity", devices: "1 Device" },
      { name: "3 Months Plan", price: "Rs. 700", validity: "90 Days Validity", devices: "Up to 2 Devices" },
      { name: "6 Months Plan", price: "Rs. 1,200", validity: "180 Days Validity", devices: "Up to 2 Devices" },
      { name: "1 Year Plan", price: "Rs. 2,000", validity: "365 Days Validity", devices: "Up to 2 Devices" }
    ],
    isFlagship: false,
    status: "ready",
    isPublicDownload: true,
    version: "v1.3.4",
    size: "22.2 MB",
    filename: "BillScrapper-Setup.exe",
    builds: [
      {
        id: "win10",
        label: "Windows 10 / 11",
        shortLabel: "Win 10/11",
        filename: "BillScrapper-Setup.exe",
        downloadUrl: "https://github.com/naqasht128/BillScrapper/releases/latest/download/BillScrapper-Setup.exe",
        size: "22.2 MB",
        icon: "monitor"
      },
      {
        id: "win7",
        label: "Windows 7 / Legacy",
        shortLabel: "Win 7",
        filename: "BillScrapper-Win7-Setup.exe",
        downloadUrl: "https://github.com/naqasht128/BillScrapper/releases/latest/download/BillScrapper-Win7-Setup.exe",
        size: "27.9 MB",
        icon: "monitor"
      },
      {
        id: "linux-arm64",
        label: "Linux (ARM64)",
        shortLabel: "Linux ARM64",
        filename: "BillScrapper",
        downloadUrl: "https://github.com/naqasht128/BillScrapper/releases/latest/download/BillScrapper",
        size: "34.4 MB",
        icon: "terminal"
      }
    ],
    downloadUrl: "https://github.com/naqasht128/BillScrapper/releases/latest/download/BillScrapper-Setup.exe",
    githubRepo: "naqasht128/BillScrapper",
    githubReleaseUrl: "https://github.com/naqasht128/BillScrapper/releases/latest",
    githubRepoUrl: "https://github.com/naqasht128/BillScrapper",
    updated: "October 2026",
    icon: "file-spreadsheet",
    summary: "Extracts consumer bills, arrears, and tariff data directly into clean Excel spreadsheets.",
    description: "Bill Scrapper is a dedicated high-speed utility engineered for Commercial, Technical & Managerial staff who need to analyze and verify billing records across large consumer batches. By querying official DISCO web billing servers across all 11 Pakistan DISCOs (LESCO, GEPCO, FESCO, IESCO, MEPCO, PESCO, HAZECO, SEPCO, HESCO, QESCO, TESCO), it automatically extracts complete consumer billing matrices—including 14-digit reference number, consumer name, address, tariff code, units consumed, cost of electricity, meter rent, fuel price adjustment (FCA), sales tax, further tax, TV fee, total bill within due date, payable after due date, and payment status—and outputs them into cleanly structured, formula-ready Microsoft Excel (.xlsx) workbooks.",
    features: [
      "Bulk reference number import via text list, CSV file, or copy-pasting an Excel column",
      "Extracts full tariff breakdowns, government taxes, fuel adjustments (FCA/FPA), and surcharges",
      "Preserves leading zeroes on 14-digit DISCO reference numbers without Excel formatting corruption",
      "Multi-threaded concurrent background scraping engine with auto-retry on server timeouts",
      "Calculates summary totals (aggregate units, gross revenue, net arrears) automatically",
      "Built-in offline cache ensures scraped records are never lost during power or network blips"
    ],
    tutorial: {
      overview: "Quickly scrape complete billing records for hundreds of consumer reference numbers into an Excel sheet for analysis.",
      prerequisites: [
        "Windows 10 / 11, Windows 7 (Legacy), or Linux (ARM64)",
        "Active Internet connection (for querying live billing servers)",
        "List of 14-digit DISCO consumer reference numbers (select your DISCO in settings)"
      ],
      steps: [
        {
          step: 1,
          title: "Download & Launch",
          desc: "Download and run `BillScrapper-Setup.exe`. Launch the utility and select your target DISCO from the dropdown menu."
        },
        {
          step: 2,
          title: "Import Reference Numbers",
          desc: "Paste 14-digit consumer reference numbers into the text box, or click 'Import List' to load a CSV or Excel column."
        },
        {
          step: 3,
          title: "Configure Fields & Run Scraper",
          desc: "Select the required billing fields (Amount, Arrears, Units, Taxes, Tariff Category). Click 'Start Scraping' to initiate concurrent multi-threaded extraction."
        },
        {
          step: 4,
          title: "Save to Excel (.xlsx)",
          desc: "Once complete, click 'Save as Excel' to export a cleanly formatted spreadsheet with formula totals and proper cell formatting."
        }
      ],
      tips: [
        "Use multi-batch mode for lists over 1,000 reference numbers to prevent DISCO sub-divisional network timeouts.",
        "Filtered lists can be exported directly into CP-139 verifier formats."
      ]
    }
  },

  // =========================================================================
  // 3. E-BILLS DOWNLOADER (PUBLIC DOWNLOADABLE - HAS REPO)
  // =========================================================================
  {
    id: "e-bills-downloader",
    name: "E-Bills Downloader",
    title: "E-Bills Downloader - Downloads E-Bills into PDF",
    category: "extractors",
    badge: "Direct Download",
    isFlagship: false,
    status: "ready",
    isPublicDownload: true,
    version: "v1.0.0",
    size: "72.6 MB",
    filename: "EBillDownloader-Setup.exe",
    builds: [
      {
        id: "win10",
        label: "Windows 10 / 11",
        shortLabel: "Win 10/11",
        filename: "EBillDownloader-Setup.exe",
        downloadUrl: "https://github.com/naqasht128/EBillDownloader/releases/latest/download/EBillDownloader-Setup.exe",
        size: "72.6 MB",
        icon: "monitor"
      },
      {
        id: "win7",
        label: "Windows 7 / Legacy",
        shortLabel: "Win 7",
        filename: "EBillDownloader-Win7-Setup.exe",
        downloadUrl: "https://github.com/naqasht128/EBillDownloader/releases/latest/download/EBillDownloader-Win7-Setup.exe",
        size: "46.3 MB",
        icon: "monitor"
      }
    ],
    downloadUrl: "https://github.com/naqasht128/EBillDownloader/releases/latest/download/EBillDownloader-Setup.exe",
    githubRepo: "naqasht128/EBillDownloader",
    githubReleaseUrl: "https://github.com/naqasht128/EBillDownloader/releases/latest",
    githubRepoUrl: "https://github.com/naqasht128/EBillDownloader",
    updated: "October 2026",
    icon: "file-down",
    summary: "Bulk downloads official consumer electricity duplicate bills into PDF files.",
    description: "Sub-divisional complaint centers, revenue counters, and field recovery teams frequently require official duplicate electricity bills for hundreds or thousands of consumers simultaneously. E-Bills Downloader automates this tedious manual process by accepting a list of consumer reference numbers, connecting to official DISCO online billing endpoints, and generating official high-resolution PDF bills. Each bill retains its original high-density 1D/2D barcodes and QR codes for flawless scanning at bank counters, OMNI, EasyPaisa, and JazzCash collection points. Files can be automatically saved in dedicated folders structured by 11kV Feeder, Sub-Division, or Billing Cycle.",
    features: [
      "Automated bulk retrieval of official duplicate electricity bills in high-resolution PDF format",
      "Hierarchical auto-folder organization by Feeder Code, Sub-Division, Lineman Beat, or Month",
      "Batch collator option merges thousands of individual bills into a single printable master PDF",
      "Maintains 100% barcode and QR code clarity for laser and thermal bank counter scanners",
      "Resilient queue management with live progress bar, pause/resume, and failed reference retry"
    ],
    tutorial: {
      overview: "Automates mass generation and archiving of official duplicate electricity bills for commercial desks and recovery teams.",
      prerequisites: [
        "Windows 10 / 11 or Windows 7 (Legacy)",
        "Active Internet Connection (for contacting DISCO billing endpoints)",
        "List of 14-digit consumer reference numbers"
      ],
      steps: [
        {
          step: 1,
          title: "Download & Launch",
          desc: "Download and run EBillDownloader-Setup.exe (or Windows 7 legacy setup). Launch the utility on your Windows PC."
        },
        {
          step: 2,
          title: "Load Reference Batch",
          desc: "Load your consumer reference list or specify an 11kV feeder code to queue all consumer accounts."
        },
        {
          step: 3,
          title: "Select Storage Layout",
          desc: "Choose between individual PDFs named by reference number, or a single collated multi-page document."
        },
        {
          step: 4,
          title: "Execute Bulk Download",
          desc: "Click 'Download All' to download and verify all bill PDFs with automatic retry on temporary connection drops."
        }
      ],
      tips: [
        "Supports batch downloads of up to 10,000 bills in a single uninterrupted queue.",
        "Bills saved with barcodes intact allow instant scanning at all commercial bank branches."
      ]
    }
  },

  // =========================================================================
  // 4. CP-52 POSTING INTO PDF (AVAILABLE ON REQUEST)
  // =========================================================================
  {
    id: "cp52-posting-pdf",
    name: "CP 52 Posting into PDF",
    title: "CP 52 Posting into PDF - Disconnection & Posting Vouchers",
    category: "posting",
    badge: "Available on Request",
    isFlagship: false,
    status: "on-request",
    isPublicDownload: false,
    version: "",
    size: "",
    filename: "",
    updated: "October 2026",
    icon: "file-text",
    summary: "Converts CP-52 records and defaulter lists into formatted, printable PDFs.",
    description: "In DISCO commercial operations, CP-52 represents the primary schedule of consumer arrears, running defaulters, and disconnection notices issued to Line Superintendents (LS) and field recovery teams. Raw CP-52 text data generated by legacy mainframes is notoriously dense, disorganized, and difficult to execute in the field. CP 52 Posting into PDF parses these raw fixed-width files, automatically groups defaulting consumers by 11kV Feeder and Lineman beat, calculates cumulative outstanding balances and delayed payment surcharges, and formats them into official, beautifully formatted PDF audit rosters complete with signature blocks for SDO, Revenue Officer, and LS.",
    features: [
      "Parses raw fixed-width CP-52 mainframe data into standardized sub-divisional PDF rosters",
      "Automated sorting and segregation by 11kV Feeder, Lineman Beat, and Sub-Division code",
      "Calculates cumulative arrears, delayed payment surcharges, and running balances",
      "Print-ready layout with formal WAPDA/DISCO headings and signature endorsement blocks",
      "Generates executive summary sheets highlighting top 100 chronic defaulters per feeder"
    ],
    tutorial: {
      overview: "Automates the generation of official CP-52 disconnection and posting verification sheets in clean PDF format.",
      prerequisites: [
        "Windows 10 or Windows 11",
        "Raw CP-52 posting extract or mainframe text file",
        "Sub-divisional office code and feeder mapping table"
      ],
      steps: [
        {
          step: 1,
          title: "Download & Launch",
          desc: "Contact the DISCO Tools Support Team via WhatsApp (0333-9962474) to acquire this software."
        },
        {
          step: 2,
          title: "Select CP-52 Raw Dump",
          desc: "Load your raw CP-52 text or dat export file generated during monthly commercial closing."
        },
        {
          step: 3,
          title: "Filter by Feeder or Beat",
          desc: "Choose whether to generate rosters for the entire sub-division or filter by specific 11kV feeders."
        },
        {
          step: 4,
          title: "Generate Official PDFs",
          desc: "Click 'Render PDF Dossiers' to produce formatted, signature-ready disconnection schedules."
        }
      ],
      tips: [
        "Rosters include designated signature columns for SDO, LS, and Lineman acknowledgment.",
        "Integrated directly as a primary module inside PITCSuite."
      ]
    }
  },

  // =========================================================================
  // 5. CP-139 POSTING CHECKER (ON REQUEST / DIRECT PURCHASE)
  // =========================================================================
  {
    id: "cp139-checker",
    name: "CP139PostingChecker",
    title: "CP-139 Revenue & Payment Posting Checker",
    category: "posting",
    badge: "Contact to Acquire",
    isFlagship: false,
    status: "on-request",
    isPublicDownload: false,
    version: "",
    size: "",
    filename: "",
    updated: "October 2026",
    icon: "check-circle",
    summary: "Verifies CP-139 payment postings and flags unposted bank credits.",
    description: "Commercial sub-divisions receive daily CP-139 bank collection scrolls containing thousands of customer payments collected through commercial banks (NBP, HBL, UBL, MCB, Allied, BOP, etc.), post offices, and digital channels. Discrepancies between bank deposit scrolls and PITC billing database postings frequently result in unjustified disconnection notices, overbilling complaints, and audit objections. CP139PostingChecker performs high-speed automated cross-checks between bank collection scrolls and billing ledger dumps, instantly flagging missing credits, duplicate entries, misallocated payments, and transposed reference number digits.",
    features: [
      "Instant multi-bank scroll parsing supporting NBP, HBL, MCB, UBL, ABL, BOP, and Pakistan Post formats",
      "Cross-verifies scroll batches against PITC billing records to detect unposted consumer payments",
      "Flags transposed reference numbers, duplicate scroll entries, and incorrect sub-divisional codes",
      "Generates comprehensive discrepancy dossiers in Excel with color-coded audit flags",
      "Reduces monthly bank reconciliation audit preparation time from several days to under 5 minutes"
    ],
    tutorial: {
      overview: "Verify CP-139 bank scrolls against PITC records to ensure every collected rupee is credited to consumer accounts without discrepancy.",
      prerequisites: [
        "Windows 7 / 8 / 10 / 11",
        "Bank collection scroll files (.txt / .dat / .csv)",
        "Corresponding PITC billing ledger export"
      ],
      steps: [
        {
          step: 1,
          title: "Download & Launch",
          desc: "Contact developer to receive licensed `CP139PostingChecker`."
        },
        {
          step: 2,
          title: "Select Bank Scroll & Ledger",
          desc: "Load the commercial bank collection scroll and match against your sub-divisional billing extract."
        },
        {
          step: 3,
          title: "Analyze Discrepancies",
          desc: "Inspect matched versus unposted receipts in the interactive variance review screen."
        },
        {
          step: 4,
          title: "Export Findings",
          desc: "Save the audit report to Excel with highlighted missing vouchers and duplicate entries."
        }
      ],
      tips: [
        "Check for transposed digits in 14-digit bank reference numbers when receipts fail to auto-match.",
        "Can be scheduled to run automatically every evening following bank scroll arrivals."
      ]
    }
  },

  // =========================================================================
  // 6. CP-136 POSTING CHECKER (ON REQUEST / DIRECT PURCHASE)
  // =========================================================================
  {
    id: "cp136-checker",
    name: "CP136_Posting_Checker",
    title: "CP-136 Bank Collection & Scroll Reconciler",
    category: "posting",
    badge: "Contact to Acquire",
    isFlagship: false,
    status: "on-request",
    isPublicDownload: false,
    version: "",
    size: "",
    filename: "",
    updated: "October 2026",
    icon: "file-check",
    summary: "Reconciles CP-136 summary scrolls against bank deposit vouchers.",
    description: "CP-136 serves as the vital monthly bank collection summary that consolidates branch-level daily collections against main commercial bank remittance vouchers and headquarters general ledger accounts. Unreconciled CP-136 items create persistent suspense balances that trigger commercial audit scrutiny. CP136_Posting_Checker automates the comparison between sub-divisional collection logs, bank branch credit statements, and PITC central summaries, identifying unauthorized bank commission deductions, uncredited branch deposits, and timing gaps between collection date and posting date.",
    features: [
      "Automated three-way matching between bank deposit advices, sub-divisional scrolls, and CP-136 summaries",
      "Identifies unauthorized commission deductions and bank fee discrepancies automatically",
      "Detects inter-branch remittance transit delays and missing credit notices",
      "Exports audit-compliant monthly bank reconciliation registers ready for internal and external auditors",
      "Maintains historical reconciliation ledgers across multiple fiscal quarters"
    ],
    tutorial: {
      overview: "Reconcile CP-136 monthly collection totals to ensure clean audit compliance.",
      prerequisites: [
        "Windows 10/11",
        "Bank deposit summaries and sub-divisional CP-136 extracts"
      ],
      steps: [
        {
          step: 1,
          title: "Download & Launch",
          desc: "Contact the DISCO Tools Support Team via WhatsApp (0333-9962474) to acquire this software."
        },
        {
          step: 2,
          title: "Load Statements",
          desc: "Load monthly bank deposit statements alongside the sub-divisional collection register."
        },
        {
          step: 3,
          title: "Execute Audit",
          desc: "Click 'Run Reconciliation' to cross-verify remittance dates and branch totals."
        },
        {
          step: 4,
          title: "Export Reconciliation Certificate",
          desc: "Export the formal monthly reconciliation statement formatted for the Revenue Officer's signature."
        }
      ],
      tips: [
        "Match by transaction date and scroll ID to catch timing differences between bank cut-offs.",
        "Helps resolve chronic audit inquiries from commercial audit teams."
      ]
    }
  },

  // =========================================================================
  // 7. CONVERT CP21C (ON REQUEST / DIRECT PURCHASE)
  // =========================================================================
  {
    id: "convert-cp21c",
    name: "ConvertCP21c",
    title: "CP-21c Billing Ledger & Revenue Transformer",
    category: "converters",
    badge: "Contact to Acquire",
    isFlagship: false,
    status: "on-request",
    isPublicDownload: false,
    version: "",
    size: "",
    filename: "",
    updated: "October 2026",
    icon: "file-output",
    summary: "Converts legacy CP-21c billing ledgers into modern Excel and DB formats.",
    description: "The CP-21c statement is the definitive monthly commercial report detailing total assessment, cash realization, debit/credit adjustments, and closing arrears for each tariff category within a sub-division. Because legacy PITC systems output CP-21c in dense, fixed-width typewriter printer dumps, commercial officers often spend days manually transcribing figures into spreadsheets. ConvertCP21c parses raw CP-21c text files, accurately captures each column, and transforms the data into modern, formula-ready Excel workbooks complete with automated assessment vs realization recovery percentages, tariff variance metrics, and pivot tables.",
    features: [
      "Decodes fixed-width legacy CP-21c text outputs without character misalignments or column slips",
      "Computes assessment vs cash realization recovery percentages for domestic, commercial, and industrial tariffs",
      "Isolates current month billing from cumulative legacy arrears for precise financial reporting",
      "Generates ready-to-present executive summary sheets formatted for Revenue Officers and SDOs",
      "Exports directly to Microsoft Excel (.xlsx), CSV, and SQLite database formats"
    ],
    tutorial: {
      overview: "Transform fixed-width CP-21c statements into clean Excel pivot tables without retyping.",
      prerequisites: [
        "Windows 10 / 11",
        "Legacy CP-21c fixed-width print file (.txt / .prn / .rep)"
      ],
      steps: [
        {
          step: 1,
          title: "Download & Launch",
          desc: "Contact the DISCO Tools Support Team via WhatsApp (0333-9962474) to acquire this software."
        },
        {
          step: 2,
          title: "Load CP-21c Print File",
          desc: "Browse and select your raw fixed-width CP-21c report file."
        },
        {
          step: 3,
          title: "Verify Tariff Mapping",
          desc: "Check that tariff categories (A-1, A-2, B-1, C, etc.) map correctly in the preview table."
        },
        {
          step: 4,
          title: "Export Formatted Workbook",
          desc: "Click 'Convert to Excel' to output complete financial tables with formulas and recovery percentages."
        }
      ],
      tips: [
        "Ideal for preparing monthly revenue closing presentations for the Superintending Engineer (SE).",
        "Preserves exact paisa amounts without rounding errors."
      ]
    }
  },

  // =========================================================================
  // 8. 88L PAYMENT EXTRACT (ON REQUEST / DIRECT PURCHASE)
  // =========================================================================
  {
    id: "88l-extract",
    name: "88LPaymentExtract",
    title: "Form 88-L Revenue & Payment Scroll Extractor",
    category: "extractors",
    badge: "Contact to Acquire",
    isFlagship: false,
    status: "on-request",
    isPublicDownload: false,
    version: "",
    size: "",
    filename: "",
    updated: "October 2026",
    icon: "receipt",
    summary: "Extracts consumer payment records from Form 88-L archives and deposit scrolls.",
    description: "Form 88-L represents the official daily collection register compiled by sub-divisional cashiers and commercial bank branches. When addressing consumer disputed bills, audit requisitions, or court cases, finding a single payment entry inside massive 88-L archive ledgers spanning hundreds or thousands of pages can take hours of manual paper flipping. 88LPaymentExtract parses electronic 88-L archives and collection dumps, allowing commercial officers to instantly locate any payment by entering a 14-digit reference number, date range, bank code, or cashier scroll number.",
    features: [
      "Rapid search and extraction across massive multi-thousand-page Form 88-L collection ledgers",
      "Filter payments dynamically by specific date, date range, bank branch, or scroll batch",
      "Cross-verifies payment receipts against billing cycle demands to confirm full or partial clearance",
      "Exports certified payment verification slips in Excel and printable formats for consumer dispute resolution",
      "Supports batch extraction for thousands of consumer accounts in a single automated pass"
    ],
    tutorial: {
      overview: "Trace payments and verify Form 88-L revenue entries easily across massive multi-month archives.",
      prerequisites: [
        "Windows 10 / 11",
        "Form 88-L collection dumps or electronic ledger files"
      ],
      steps: [
        {
          step: 1,
          title: "Download & Launch",
          desc: "Contact developer to acquire the licensed `88LPaymentExtract` utility."
        },
        {
          step: 2,
          title: "Load 88-L Archive",
          desc: "Select the folder containing your sub-divisional 88-L daily collection text dumps."
        },
        {
          step: 3,
          title: "Apply Query Criteria",
          desc: "Enter target 14-digit reference numbers or select a payment date window."
        },
        {
          step: 4,
          title: "Extract & Export Dossier",
          desc: "Click 'Extract Payments' to generate a verified payment audit certificate in Excel."
        }
      ],
      tips: [
        "Invaluable for resolving disputed consumer bills during public hearings and consumer court inquiries.",
        "Allows commercial assistants to verify whether a customer paid before or after the due date."
      ]
    }
  },

  // =========================================================================
  // 9. PDF MERGER (ON REQUEST / DIRECT PURCHASE)
  // =========================================================================
  {
    id: "pdf-merger",
    name: "DISCO PDF Toolkit",
    title: "DISCO PDF Toolkit - Batch PDF Merger & Splitter",
    category: "converters",
    badge: "Contact to Acquire",
    isFlagship: false,
    status: "on-request",
    isPublicDownload: false,
    version: "",
    size: "",
    filename: "",
    updated: "October 2026",
    icon: "file-symlink",
    summary: "Merges, splits, and compresses DISCO billing documents and scrolls.",
    description: "DISCO revenue and commercial offices handle immense quantities of PDF documents every day—ranging from consumer bills, defaulter notices, and tariff circulars to bank scrolls and administrative orders. Standard online PDF tools risk leaking sensitive consumer data and bank records over the internet. DISCO PDF Toolkit is a 100% offline desktop utility engineered specifically to combine, split, reorder, stamp, and compress heavy DISCO PDF files in seconds without any data ever leaving your workstation.",
    features: [
      "100% offline desktop processing ensures complete confidentiality for sensitive utility documents",
      "High-speed batch merger capable of combining thousands of individual bills into unified volumes",
      "Smart splitter divides multi-thousand-page rosters into individual feeder or sub-division files",
      "Applies sequential Bates numbering, sub-divisional stamps, and custom watermarks in bulk",
      "Built-in PDF compression optimizes large billing files for lightweight email and WhatsApp sharing"
    ],
    tutorial: {
      overview: "Merge individual consumer bills or audit scrolls into one tidy file for printing or archiving.",
      prerequisites: [
        "Windows 10 / 11",
        "PDF files to process"
      ],
      steps: [
        {
          step: 1,
          title: "Download & Launch",
          desc: "Contact the DISCO Tools Support Team via WhatsApp (0333-9962474) to acquire this software."
        },
        {
          step: 2,
          title: "Choose Operation Mode",
          desc: "Select 'Merge Files', 'Split by Feeder', or 'Compress PDF' depending on your requirements."
        },
        {
          step: 3,
          title: "Select Input Documents",
          desc: "Drag and drop your PDF files into the tool and arrange them in the desired sequence."
        },
        {
          step: 4,
          title: "Process & Save",
          desc: "Click 'Process Documents' to produce clean, indexed, and compressed PDF outputs."
        }
      ],
      tips: [
        "Sort by filename before merging to keep consumer bills arranged in strict reference number order.",
        "Zero internet access is required, ensuring compliance with government data protection standards."
      ]
    }
  },

  // =========================================================================
  // 10. CP-22T ADJUSTMENT CHECKER (ON REQUEST / DIRECT PURCHASE)
  // =========================================================================
  {
    id: "cp22t-checker",
    name: "CP22T_Posting_Checker",
    title: "CP-22T Tariff Adjustment & Sanction Verifier",
    category: "posting",
    badge: "Contact to Acquire",
    isFlagship: false,
    status: "on-request",
    isPublicDownload: false,
    version: "",
    size: "",
    filename: "",
    updated: "October 2026",
    icon: "sliders-horizontal",
    summary: "Audits CP-22T tariff adjustments and credit/debit memos.",
    description: "CP-22T represents the accounting register used to record manual tariff adjustments, court-ordered installment plans, deferred amounts, and billing corrections. Because CP-22T transactions directly reduce or alter consumer ledger balances, they are closely scrutinized by commercial audit teams and NAB/FIA inquiries. CP22T_Posting_Checker cross-checks every posted CP-22T adjustment against approved competent authority sanctions (SDO, RO, XEN, or SE approvals), flagging unauthorized credit adjustments, altered reference numbers, or miscalculated fuel price adjustments (FPA).",
    features: [
      "Automated cross-check of CP-22T adjustment entries against authorized sanction lists",
      "Flags unauthorized credit postings, altered consumer names, and unverified reference numbers",
      "Audits Fuel Price Adjustment (FPA) credits, TR subsidy adjustments, and delayed payment wavers",
      "Generates comprehensive discrepancy rosters highlighting deviations from standard operating procedures",
      "Maintains an immutable audit log to protect honest Commercial, Technical & Managerial personnel during internal reviews"
    ],
    tutorial: {
      overview: "Audit CP-22T adjustment entries before closing monthly accounts to ensure 100% regulatory compliance.",
      prerequisites: [
        "Windows 10 / 11",
        "CP-22T posting ledger export",
        "Approved sanction lists from SDO/RO"
      ],
      steps: [
        {
          step: 1,
          title: "Download & Launch",
          desc: "Contact the DISCO Tools Support Team via WhatsApp (0333-9962474) to acquire this software."
        },
        {
          step: 2,
          title: "Import Sanctions & Postings",
          desc: "Load the approved adjustment sanctions file alongside the month's CP-22T posting transactions."
        },
        {
          step: 3,
          title: "Cross-Check Sanctions",
          desc: "Review discrepancies where posted credits lack corresponding competent authority approvals."
        },
        {
          step: 4,
          title: "Export Audit Dossier",
          desc: "Generate an audit-proof variance report formatted for commercial audit inspections."
        }
      ],
      tips: [
        "Always review FCA and tariff adjustment entries highlighted in orange before signing off on monthly closing.",
        "Helps safeguard sub-divisional staff from inadvertent audit penalties."
      ]
    }
  },

  // =========================================================================
  // 11. GOVT ASSESSMENT REALIZATION (ON REQUEST / DIRECT PURCHASE)
  // =========================================================================
  {
    id: "govt-assessment",
    name: "GovtAssessmentRealization",
    title: "Government Assessment & Arrears Realization Tracker",
    category: "posting",
    badge: "Contact to Acquire",
    isFlagship: false,
    status: "on-request",
    isPublicDownload: false,
    version: "",
    size: "",
    filename: "",
    updated: "October 2026",
    icon: "landmark",
    summary: "Tracks billing assessments and realizations for government departments.",
    description: "Government connections—spanning Provincial Police, Health, Education, Irrigation, Judiciary, and Tehsil Municipal Administrations (TMAs), alongside Federal departments—account for billions of rupees in monthly assessments and chronic arrears. Tracking these receivables is critical for DISCO cash flows and NEPRA performance reviews. GovtAssessmentRealization aggregates and audits monthly assessed billing against actual cash collections and at-source deductions executed through Provincial Finance Departments and Federal ministries, providing transparent department-wise variance ledgers.",
    features: [
      "Comprehensive department-wise tracking of monthly assessed billing versus actual cash realization",
      "Reconciles at-source treasury deductions with DISCO bank credit advices and ledger accounts",
      "Identifies chronic defaulting departments (such as TMAs, WASAs, and public health installations)",
      "Automates preparation of executive briefings for DISCO Chief Executive Officers (CEOs) and CFOs",
      "Exports formatted reconciliation dossiers for high-level meetings with Provincial Finance Secretaries"
    ],
    tutorial: {
      overview: "Audit government electricity bill assessments and track at-source recoveries with department-level granularity.",
      prerequisites: [
        "Windows 10 / 11",
        "Monthly government billing ledgers",
        "Treasury at-source credit advice statements"
      ],
      steps: [
        {
          step: 1,
          title: "Download & Launch",
          desc: "Contact the DISCO Tools Support Team via WhatsApp (0333-9962474) to acquire this software."
        },
        {
          step: 2,
          title: "Load Government Ledger",
          desc: "Import your government billing files and select Provincial vs Federal departments."
        },
        {
          step: 3,
          title: "Run Realization Audit",
          desc: "Correlate assessed billing demands against at-source treasury deductions and direct payments."
        },
        {
          step: 4,
          title: "Generate Executive Report",
          desc: "Export summary briefs and department ranking sheets ready for Board of Directors presentations."
        }
      ],
      tips: [
        "Filter by Provincial vs Federal departments to quickly prepare claims for Finance Departments.",
        "Highlight chronic defaulter connections for targeted recovery campaigns."
      ]
    }
  }
];

// Master Categories & Statuses
const PESCO_TOOLS = DISCO_TOOLS; // Backwards compatibility alias

const TOOL_CATEGORIES = [
  { id: "all", name: "All Tools", count: DISCO_TOOLS.length },
  { id: "downloadable", name: "Direct Download", count: DISCO_TOOLS.filter(t => t.isPublicDownload).length },
  { id: "on-request", name: "On Request", count: DISCO_TOOLS.filter(t => t.status === "on-request").length },
  { id: "flagship", name: "Flagship Suite", count: DISCO_TOOLS.filter(t => t.category === "flagship").length },
  { id: "posting", name: "Posting Checkers", count: DISCO_TOOLS.filter(t => t.category === "posting").length },
  { id: "converters", name: "Converters", count: DISCO_TOOLS.filter(t => t.category === "converters").length },
  { id: "extractors", name: "Scrapers & Extractors", count: DISCO_TOOLS.filter(t => t.category === "extractors").length }
];

function getToolById(id) {
  if (!id) return null;
  return DISCO_TOOLS.find(t => t.id === id);
}

function getToolByFilename(filename) {
  if (!filename) return null;
  const target = filename.toLowerCase().trim();

  // 1. Direct ID, Name, or Filename exact match
  let found = DISCO_TOOLS.find(t => 
    (t.id && t.id.toLowerCase() === target) ||
    (t.name && t.name.toLowerCase() === target) ||
    (t.filename && t.filename.toLowerCase() === target)
  );
  if (found) return found;

  // 2. High-priority keyword matching for main downloadable tools
  if (target.includes('pitc')) {
    return DISCO_TOOLS.find(t => t.id === 'pitc-suite');
  }
  if (target.includes('scrapper') || target.includes('scraper') || (target.includes('bill') && !target.includes('downloader') && !target.includes('e-bills'))) {
    return DISCO_TOOLS.find(t => t.id === 'bill-scrapper');
  }

  // 3. Normalized stripped match
  const clean = target.replace(/[\s_\-\.]+/g, '').replace(/exe$/i, '').replace(/setup$/i, '');
  return DISCO_TOOLS.find(t => {
    const tFile = (t.filename || '').toLowerCase().replace(/[\s_\-\.]+/g, '').replace(/exe$/i, '').replace(/setup$/i, '');
    const tId = (t.id || '').toLowerCase().replace(/[\s_\-\.]+/g, '');
    const tName = (t.name || '').toLowerCase().replace(/[\s_\-\.]+/g, '');
    return tFile === clean || tFile.includes(clean) || clean.includes(tFile) || tId === clean || tName === clean;
  });
}
