/**
 * PESCO Tools Website & PITCSuite - Master Tools Data Registry
 * Corporate & Developer Metadata, Software Catalog, Download Targets, and Tutorials
 */

const DEVELOPER_PROFILE = {
  corporateName: "TN Developers & Co.",
  developerName: "Tahir Naqash",
  role: "Developer",
  email: "tahir.naqash4@gmail.com",
  cell: "0333-9962474",
  whatsappNumber: "923339962474",
  whatsappFormatted: "0333-9962474",
  location: "Peshawar, Khyber Pakhtunkhwa, Pakistan",
  mission: "Eliminating manual billing errors, automating CP posting reconciliations, and engineering zero-friction desktop utilities for PESCO sub-divisions."
};

const PESCO_TOOLS = [
  // =========================================================================
  // 1. PITCSuite (PUBLIC DOWNLOADABLE - HAS REPO)
  // =========================================================================
  {
    id: "pitc-suite",
    name: "PITCSuite",
    title: "PITCSuite - All-In-One Enterprise Workstation",
    category: "flagship",
    badge: "Public Download",
    isFlagship: true,
    status: "ready", // 'ready' (downloadable), 'on-request' (contact for exe), 'in-development'
    isPublicDownload: true,
    version: "v2.8.97",
    size: "144.8 MB",
    filename: "PITCSuite_Setup.exe",
    downloadUrl: "https://pit-csuite.vercel.app/api/updates/download?asset_id=656535865",
    updateApi: "https://pit-csuite.vercel.app/api/updates/latest",
    updated: "October 2026",
    icon: "layers",
    summary: "A complete unified workstation package having all the tools in one unified desktop suite. Includes CP posting verifiers, converters, bill scrapers, and ledger reconcilers.",
    description: "PITCSuite v2.8.97 is the comprehensive flagship all-in-one productivity suite engineered specifically for PESCO commercial staff, revenue officers, and computer operators. Combines CP-139, CP-136, CP-52, CP-22T posting checkers, bill scrapers, and converters inside a single high-speed dashboard.",
    features: [
      "All-in-one launcher bundling all 14+ PESCO tools into a single desktop interface",
      "One-click batch verification for CP-139, CP-136, CP-52, and CP-22T",
      "Built-in PDF extraction, Excel transformation, and bank scroll match engine",
      "Real-time database connectivity and local offline caching mode",
      "Live anomaly detection with instant discrepancy highlight alerts",
      "Zero DLL dependencies - runs smoothly on Windows 10 & 11"
    ],
    tutorial: {
      overview: "PITCSuite brings all PESCO commercial verification utilities together. Launch the suite, pick your sub-division, and run any module with instant reports.",
      prerequisites: [
        "Windows 10 or Windows 11 (64-bit recommended)",
        "Microsoft Excel or LibreOffice (for viewing generated audit spreadsheets)",
        "Local bank scroll files or PITC billing exports"
      ],
      steps: [
        {
          step: 1,
          title: "Download & Launch v2.8.97",
          desc: "Download `PITCSuite_Setup.exe` and run the installer. Launch directly from your desktop shortcut."
        },
        {
          step: 2,
          title: "Select Operational Module",
          desc: "Use the top navigation tabs to select between CP-139 Checking, Bill Scraping, CP-136 Reconciling, or Ledger Conversion."
        },
        {
          step: 3,
          title: "Import Data Files & Run Audit",
          desc: "Browse to your scroll or billing export file and click 'Execute Batch Run'. Records will be verified in seconds."
        },
        {
          step: 4,
          title: "Export Clean Excel Dossier",
          desc: "Click 'Export to Excel' to generate complete audit dossiers ready for sub-divisional filing."
        }
      ],
      tips: [
        "Press Ctrl+F to search for any 14-digit consumer reference number across all loaded modules.",
        "Keep configuration files in the same directory if custom proxy settings are used."
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
    badge: "Public Download",
    isFlagship: false,
    status: "ready",
    isPublicDownload: true,
    version: "v1.3.2",
    size: "22.1 MB",
    filename: "BillScrapper-Setup.exe",
    downloadUrl: "https://bill-scrapper.vercel.app/api/updates/download?asset_id=656052606",
    updateApi: "https://bill-scrapper.vercel.app/api/updates/latest",
    updated: "October 2026",
    icon: "file-spreadsheet",
    summary: "Scrape Billing information into Excel. Extracts consumer bills, tariff breakdowns, current arrears, due dates, and paid amounts directly into clean spreadsheets.",
    description: "Bill Scrapper is a dedicated high-speed utility that queries PESCO online billing servers using consumer reference numbers, parses billing metadata (units consumed, cost of electricity, taxes, FCA, TV fee, arrears), and exports them directly into formatted Microsoft Excel workbooks.",
    features: [
      "Bulk reference number import via text list, CSV, or Excel column",
      "Extracts total payable amount, payable within due date, and arrears",
      "Breaks down complex taxes (Sales Tax, Further Tax, FCA, FPA, Neelum-Jhelum)",
      "Multi-threaded background scraping with automated proxy and retry logic",
      "Instant one-click export to structured .XLSX spreadsheets",
      "Offline caching to prevent repeated network queries"
    ],
    tutorial: {
      overview: "Quickly scrape complete billing records for hundreds of consumer reference numbers into an Excel sheet for analysis.",
      prerequisites: [
        "Windows 7 / 8 / 10 / 11",
        "Active Internet connection (for querying live billing servers)",
        "List of 14-digit PESCO consumer reference numbers"
      ],
      steps: [
        {
          step: 1,
          title: "Launch Bill Scrapper v1.3.2",
          desc: "Run `BillScrapper-Setup.exe`. Paste consumer reference numbers into the input box or click 'Import List'."
        },
        {
          step: 2,
          title: "Configure Extraction Fields",
          desc: "Select the data points you need (Billing Amount, Units, Tax Breakdown, Arrears, Tariff Category)."
        },
        {
          step: 3,
          title: "Run Scraper",
          desc: "Click 'Start Scraping'. The utility queries servers concurrently with live progress."
        },
        {
          step: 4,
          title: "Save to Excel (.xlsx)",
          desc: "Once complete, click 'Save as Excel' to output cleanly formatted workbooks with all calculated columns."
        }
      ],
      tips: [
        "Use multi-batch mode for lists over 1,000 reference numbers to prevent sub-divisional network timeouts.",
        "Filtered lists can be exported directly into CP-139 verifier formats."
      ]
    }
  },

  // =========================================================================
  // 3. E-BILLS DOWNLOADER (IN DEVELOPMENT - CONTACT / PRE-ORDER)
  // =========================================================================
  {
    id: "e-bills-downloader",
    name: "E-Bills Downloader",
    title: "E-Bills Downloader - Downloads E-Bills into PDF",
    category: "extractors",
    badge: "In Development",
    isFlagship: false,
    status: "in-development",
    isPublicDownload: false,
    version: "v1.0.0 (In Development)",
    size: "Estimated 35 MB",
    filename: "EBillsDownloader.exe",
    updated: "Coming Soon",
    icon: "file-down",
    summary: "Downloads the E-Bills into PDF. High-speed bulk engine to automatically fetch consumer duplicate electricity bills and save them as individual or collated PDF files.",
    description: "E-Bills Downloader is currently in active development. When completed, it will allow sub-divisions and customer service centers to feed lists of consumer reference numbers, automatically retrieve official high-resolution E-Bills from PITC servers, and archive or print them as crisp PDF files.",
    features: [
      "Bulk automated downloading of duplicate electricity bills in PDF format",
      "Organizes saved PDFs automatically by Feeder Code, Sub-Division, or Reference Number",
      "Option to merge multiple consumer bills into single printable multi-page PDF documents",
      "Preserves original barcode and QR code readability for bank scanning",
      "Built-in queue system with pause, resume, and failed reference retry"
    ],
    tutorial: {
      overview: "Currently under development. This tool will streamline duplicate bill generation for revenue and commercial complaint desks.",
      prerequisites: [
        "Windows 10 / 11",
        "Stable Internet Connection"
      ],
      steps: [
        {
          step: 1,
          title: "Development in Progress",
          desc: "This software is currently in active coding. Click 'Contact / Request Software' to register your interest with Tahir Naqash."
        }
      ],
      tips: [
        "Will support batch downloads of up to 10,000 bills per run."
      ]
    }
  },

  // =========================================================================
  // 4. CP-52 POSTING INTO PDF (IN DEVELOPMENT)
  // =========================================================================
  {
    id: "cp52-posting-pdf",
    name: "CP 52 Posting into PDF",
    title: "CP 52 Posting into PDF - Disconnection & Posting Vouchers",
    category: "posting",
    badge: "In Development",
    isFlagship: false,
    status: "in-development",
    isPublicDownload: false,
    version: "v1.1.0 (In Development)",
    size: "Estimated 50 MB",
    filename: "CP 52 Posting into PDF.exe",
    updated: "Coming Soon",
    icon: "file-text",
    summary: "Converts CP-52 posting records and defaulter disconnection schedules directly into formatted, printable PDF rosters.",
    description: "CP 52 Posting into PDF transforms raw CP-52 posting data files into official, standardized PDF audit rosters. It automatically groups defaulters by feeder and line superintendent sections, calculating outstanding balances and interest.",
    features: [
      "Converts raw CP-52 text data into formal sub-divisional PDF dossiers",
      "Automatic breakdown by Feeder code and Lineman beat",
      "Computes cumulative arrears and surcharge assessments",
      "Print-optimized layouts with official signatures and stamping blocks"
    ],
    tutorial: {
      overview: "Automates the generation of official CP-52 disconnection and posting verification sheets in clean PDF format.",
      prerequisites: ["Windows 10/11", "CP-52 posting dump"],
      steps: [
        {
          step: 1,
          title: "Release Pending",
          desc: "Full executable release scheduled for upcoming update cycle."
        }
      ],
      tips: ["Will integrate directly into PITCSuite."]
    }
  },

  // =========================================================================
  // 5. CONSUMER TARIFF & DEFAULTER RECOVERY ANALYZER (IN DEVELOPMENT)
  // =========================================================================
  {
    id: "tariff-recovery-analyzer",
    name: "Tariff & Defaulter Recovery Analyzer",
    title: "Consumer Tariff & Defaulter Recovery Analyzer",
    category: "posting",
    badge: "In Development",
    isFlagship: false,
    status: "in-development",
    isPublicDownload: false,
    version: "v1.0.0 (In Development)",
    size: "Estimated 45 MB",
    filename: "TariffRecoveryAnalyzer.exe",
    updated: "Coming Soon",
    icon: "calculator",
    summary: "Analyzes commercial consumer tariffs, flags incorrect tariff categorizations, and projects recovery strategies for chronic defaulters.",
    description: "A specialized data analytics tool designed to inspect consumer billing ledgers for tariff anomalies (e.g. commercial premises billed on domestic tariffs) and profile long-standing arrears to assist sub-divisional recovery teams.",
    features: [
      "Automatic tariff audit against NEPRA / PESCO authorized rates",
      "Defaulter stratification (30-day, 60-day, 90-day, and 1-year+ chronic arrears)",
      "Recovery projection models and installment scheduler",
      "Export executive recovery dossiers with pie charts and summary tables"
    ],
    tutorial: {
      overview: "Provides commercial officers with actionable audit insights on tariff discrepancies and high-value defaulters.",
      prerequisites: ["Windows 10/11"],
      steps: [{ step: 1, title: "In Active Development", desc: "Slated for upcoming release." }],
      tips: ["Customized for PESCO tariff schedule."]
    }
  },

  // =========================================================================
  // 6. FEEDER & SUBSTATION LOAD MONITOR (IN DEVELOPMENT)
  // =========================================================================
  {
    id: "feeder-load-monitor",
    name: "Feeder & Substation Load Monitor",
    title: "Feeder & Substation Peak Load Monitor",
    category: "utility",
    badge: "In Development",
    isFlagship: false,
    status: "in-development",
    isPublicDownload: false,
    version: "v1.0.0 (In Development)",
    size: "Estimated 38 MB",
    filename: "FeederLoadMonitor.exe",
    updated: "Coming Soon",
    icon: "activity",
    summary: "Monitors 11kV feeder loads, detects over-stressed distribution transformers, and logs peak amp hours from grid telemetry logs.",
    description: "Designed for SDOs and line staff to monitor 11kV feeder load profiles, calculate technical line losses, and balance phase distribution across distribution transformers.",
    features: [
      "Visual feeder load profiling with hourly peak indicators",
      "Automated AT&C loss calculations by comparing grid feed vs billed units",
      "Transformer overloading alerts based on kVA rating vs recorded load",
      "Daily and monthly load trend reports ready for Superintending Engineer reviews"
    ],
    tutorial: {
      overview: "Bridges engineering telemetry with commercial billing units for accurate line loss monitoring.",
      prerequisites: ["Windows 10/11"],
      steps: [{ step: 1, title: "In Development", desc: "Engine and UI currently being assembled." }],
      tips: ["Supports SCADA and manual telemetry log imports."]
    }
  },

  // =========================================================================
  // 7. AMR METER DATA & TELEMETRY SYNC (IN DEVELOPMENT)
  // =========================================================================
  {
    id: "amr-meter-sync",
    name: "AMR Meter Data Sync",
    title: "AMR / AMI Automated Meter Reading Data Sync",
    category: "utility",
    badge: "In Development",
    isFlagship: false,
    status: "in-development",
    isPublicDownload: false,
    version: "v1.0.0 (In Development)",
    size: "Estimated 42 MB",
    filename: "AMRMeterSync.exe",
    updated: "Coming Soon",
    icon: "radio",
    summary: "Synchronizes automated meter reading (AMR) telemetry data directly from smart GSM meters into billing databases.",
    description: "AMR Meter Data Sync fetches time-of-use (TOU) interval data, maximum demand indicator (MDI) peaks, and power factor logs from industrial and commercial consumer smart meters.",
    features: [
      "Direct protocol communication with major smart meter manufacturers",
      "Automated MDI reset and peak/off-peak consumption synchronization",
      "Detects reverse power flow, tamper alarms, and neutral disturbance",
      "Exports clean billing-ready registers directly to PITC format"
    ],
    tutorial: {
      overview: "Automated retrieval tool for high-end industrial and commercial smart meter data.",
      prerequisites: ["Windows 10/11"],
      steps: [{ step: 1, title: "In Development", desc: "Hardware protocol testing underway." }],
      tips: ["Includes DLMS / COSEM protocol support."]
    }
  },

  // =========================================================================
  // 8. BATCH CUSTOMER IMPORTER (IN DEVELOPMENT)
  // =========================================================================
  {
    id: "batch-customer-importer",
    name: "Batch Customer Importer",
    title: "Batch Customer Data Importer (Cosmos / PITC)",
    category: "utility",
    badge: "In Development",
    isFlagship: false,
    status: "in-development",
    isPublicDownload: false,
    version: "v1.0.0 (In Development)",
    size: "Estimated 30 MB",
    filename: "BatchCustomerImporter.exe",
    updated: "Coming Soon",
    icon: "users",
    summary: "Facilitates rapid bulk importing and validation of new connection customer records and meter replacements into Cosmos & PITC systems.",
    description: "Eliminates tedious manual typing of new service connections, tariff changes, and meter change orders (MCOs) by validating Excel sheets and uploading batches securely.",
    features: [
      "Validates 14-digit reference number syntax and feeder code hierarchy",
      "Sanitizes customer names, CNIC numbers, and premise addresses",
      "Pre-checks meter serial numbers against duplicate registry",
      "Automates batch upload with zero manual data entry errors"
    ],
    tutorial: {
      overview: "Fast customer data ingestion engine for new connection clerks and computer operators.",
      prerequisites: ["Windows 10/11"],
      steps: [{ step: 1, title: "In Development", desc: "Excel template mapping completed." }],
      tips: ["Reduces new connection entry time by over 80%."]
    }
  },

  // =========================================================================
  // 9. CP-139 POSTING CHECKER (ON REQUEST / DIRECT PURCHASE)
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
    version: "v2.1.2",
    size: "71.4 MB",
    filename: "CP139PostingChecker.exe",
    updated: "October 2026",
    icon: "check-circle",
    summary: "Verifies CP-139 payment postings, detects missing bank scrolls, flags unposted consumer credits, and validates bank reconciliations.",
    description: "CP139PostingChecker automates the verification of CP-139 daily collection and payment scrolls against commercial bank statements and billing systems.",
    features: [
      "Instant matching of CP-139 bank scrolls with PITC billing server data",
      "Identifies unposted amounts, duplicate postings, and misplaced batches",
      "Supports all PESCO commercial bank formats (NBP, HBL, UBL, MCB, BOP)",
      "High-speed parsing of multi-thousand consumer scroll files"
    ],
    tutorial: {
      overview: "Verify CP-139 bank scrolls against PITC records to ensure every collected rupee is credited to consumer accounts without discrepancy.",
      prerequisites: ["Windows 7 / 8 / 10 / 11", "Bank scroll text/dat files", "Billing ledger copy"],
      steps: [
        { step: 1, title: "Acquire & Launch Executable", desc: "Contact developer to receive licensed `CP139PostingChecker.exe`." },
        { step: 2, title: "Select Bank Scroll & Ledger", desc: "Load the bank collection file and ledger dump." },
        { step: 3, title: "Analyze Discrepancies", desc: "Review matched versus unposted receipts." },
        { step: 4, title: "Export Findings", desc: "Save discrepancy summary to Excel." }
      ],
      tips: ["Check for transposed digits in bank reference numbers."]
    }
  },

  // =========================================================================
  // 10. CP-136 POSTING CHECKER (ON REQUEST / DIRECT PURCHASE)
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
    version: "v2.0.4",
    size: "92.2 MB",
    filename: "CP136_Posting_Checker.exe",
    updated: "October 2026",
    icon: "file-check",
    summary: "Reconciles CP-136 summary scrolls against branch-level bank deposit vouchers and general ledger accounts.",
    description: "CP-136 reconciles monthly collection totals reported by sub-divisions against credit entries confirmed by commercial bank main branches.",
    features: [
      "Automated cross-check between bank scroll records and CP-136 summaries",
      "Detects commission deductions and incorrect branch remittance codes",
      "Flags timing differences between bank credit dates and posting dates",
      "Exports audit-compliant monthly reconciliation registers"
    ],
    tutorial: {
      overview: "Reconcile CP-136 monthly collection totals to ensure clean audit compliance.",
      prerequisites: ["Windows 10/11", "Bank scroll extracts"],
      steps: [
        { step: 1, title: "Acquire Executable", desc: "Contact Tahir Naqash for the standalone build." },
        { step: 2, title: "Execute Audit", desc: "Click reconcile and review mismatch registers." }
      ],
      tips: ["Match by transaction date and scroll ID."]
    }
  },

  // =========================================================================
  // 11. FEEDER CODE RANGING (ON REQUEST / DIRECT PURCHASE)
  // =========================================================================
  {
    id: "feeder-code-ranging",
    name: "FeederCodeRanging",
    title: "Feeder Code Ranging & Sub-Division Organizer",
    category: "converters",
    badge: "Contact to Acquire",
    isFlagship: false,
    status: "on-request",
    isPublicDownload: false,
    version: "v1.8.4",
    size: "43.2 MB",
    filename: "FeederCodeRanging.exe",
    updated: "October 2026",
    icon: "git-fork",
    summary: "Segments consumer records and billing scrolls by 11kV feeder codes, sub-divisions, and geographic boundaries.",
    description: "FeederCodeRanging parses large unsegmented billing files and groups records by feeder numbers, line routes, and sub-divisions.",
    features: [
      "Rapid splitting of massive multi-feeder dumps into clean per-feeder rosters",
      "Customizable feeder code mapping tables",
      "Instant summary of consumer counts, total load, and revenue by feeder",
      "Supports legacy and modern PITC feeder numbering conventions"
    ],
    tutorial: {
      overview: "Split bulk billing files into isolated feeder rosters in seconds.",
      prerequisites: ["Windows 10/11"],
      steps: [
        { step: 1, title: "Acquire Executable", desc: "Request executable from developer." },
        { step: 2, title: "Partition by Code", desc: "Select target feeder and click export." }
      ],
      tips: ["Useful for preparing lineman route rosters."]
    }
  },

  // =========================================================================
  // 12. FCODE BULK PDF TO EXCEL CONVERTER (ON REQUEST / DIRECT PURCHASE)
  // =========================================================================
  {
    id: "pdf-to-excel",
    name: "FCodeBulkPDFtoExcelConvert",
    title: "Feeder Code Bulk PDF to Excel Converter",
    category: "converters",
    badge: "Contact to Acquire",
    isFlagship: false,
    status: "on-request",
    isPublicDownload: false,
    version: "v3.0.1",
    size: "37.3 MB",
    filename: "FCodeBulkPDFtoExcelConvert.exe",
    updated: "October 2026",
    icon: "file-type-2",
    summary: "Extracts tabular data from locked PESCO PDF billing ledgers and converts them into editable, formula-ready Excel files.",
    description: "FCodeBulkPDFtoExcelConvert parses tabular PESCO PDF billing reports, accurately preserving consumer reference numbers, meter numbers, units, and arrears.",
    features: [
      "High-speed extraction with intelligent table structure detection",
      "Preserves leading zeroes on 14-digit reference numbers",
      "Batch mode processes hundreds of PDFs in a single click",
      "Generates clean XLSX with sum formulas and formatted headers"
    ],
    tutorial: {
      overview: "Convert locked PDF reports into dynamic Excel sheets without retyping.",
      prerequisites: ["Windows 10/11", "PESCO PDF Reports"],
      steps: [
        { step: 1, title: "Acquire Tool", desc: "Contact developer for licensed executable." },
        { step: 2, title: "Convert to Excel", desc: "Select PDFs and export to structured XLSX." }
      ],
      tips: ["Batch mode handles thousands of pages effortlessly."]
    }
  },

  // =========================================================================
  // 13. CONVERT CP21C (ON REQUEST / DIRECT PURCHASE)
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
    version: "v1.6.0",
    size: "62.1 MB",
    filename: "ConvertCP21c.exe",
    updated: "October 2026",
    icon: "file-output",
    summary: "Converts legacy CP-21c billing ledger reports into structured modern database and Excel formats.",
    description: "ConvertCP21c parses CP-21c revenue statements, isolating assessment, realization, adjustments, and closing arrears into audit-ready tables.",
    features: [
      "Decodes legacy CP-21c fixed-width print files",
      "Calculates assessment vs realization percentages automatically",
      "Identifies tariff category shifts between billing cycles",
      "Outputs directly to formatted Excel and CSV tables"
    ],
    tutorial: {
      overview: "Transform fixed-width CP-21c statements into clean Excel pivot tables.",
      prerequisites: ["Windows 10/11"],
      steps: [
        { step: 1, title: "Acquire Executable", desc: "Contact developer." },
        { step: 2, title: "Run Conversion", desc: "Export formatted financial schedules." }
      ],
      tips: ["Use for monthly revenue closing audits."]
    }
  },

  // =========================================================================
  // 14. 88L PAYMENT EXTRACT (ON REQUEST / DIRECT PURCHASE)
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
    version: "v1.9.0",
    size: "68.6 MB",
    filename: "88LPaymentExtract.exe",
    updated: "October 2026",
    icon: "receipt",
    summary: "Extracts consumer payment records from Form 88-L archives and bank deposit summaries with date filtering.",
    description: "Extracts individual consumer payment entries from Form 88-L revenue archives. Allows commercial officers to filter by payment date, bank code, or sub-division.",
    features: [
      "High-speed extraction of consumer payments from Form 88-L archives",
      "Date-range and commercial bank branch filtering",
      "Matches payments with corresponding billing cycle reference numbers",
      "Exports clean reconciliations directly to Excel"
    ],
    tutorial: {
      overview: "Trace payments and verify Form 88-L revenue entries easily.",
      prerequisites: ["Windows 10/11"],
      steps: [
        { step: 1, title: "Acquire Tool", desc: "Contact developer." },
        { step: 2, title: "Extract Payments", desc: "Set filters and export to Excel." }
      ],
      tips: ["Helpful for locating miscredited consumer payments."]
    }
  },

  // =========================================================================
  // 15. PDF MERGER (ON REQUEST / DIRECT PURCHASE)
  // =========================================================================
  {
    id: "pdf-merger",
    name: "PDFMerger",
    title: "High-Speed Bulk PDF Document Merger",
    category: "converters",
    badge: "Contact to Acquire",
    isFlagship: false,
    status: "on-request",
    isPublicDownload: false,
    version: "v2.0.0",
    size: "72.4 MB",
    filename: "PDFMerger.exe",
    updated: "October 2026",
    icon: "file-symlink",
    summary: "Combines thousands of separate PDF bills, scrolls, or reports into single collated, indexed PDF documents.",
    description: "A lightning-fast offline PDF merger that stitches thousands of PDF bills or scroll vouchers together with custom page ordering and bookmarks.",
    features: [
      "Stitches thousands of PDF files in seconds without memory leaks",
      "Drag-and-drop file reordering with alphabetical sorting",
      "Generates interactive table of contents bookmarks automatically",
      "Reduces merged PDF file sizes with lossless compression"
    ],
    tutorial: {
      overview: "Merge individual consumer bills or audit scrolls into one tidy file for printing or archiving.",
      prerequisites: ["Windows 10/11"],
      steps: [
        { step: 1, title: "Acquire Tool", desc: "Contact developer." },
        { step: 2, title: "Merge & Save", desc: "Click 'Merge PDFs' and save the combined file." }
      ],
      tips: ["Sort by filename to maintain correct reference number order."]
    }
  },

  // =========================================================================
  // 16. CP-22T ADJUSTMENT CHECKER (ON REQUEST / DIRECT PURCHASE)
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
    version: "v1.7.3",
    size: "58.1 MB",
    filename: "CP22T_Posting_Checker.exe",
    updated: "October 2026",
    icon: "sliders-horizontal",
    summary: "Audits CP-22T tariff adjustments, installment sanctions, and credit/debit memos to prevent unauthorized ledger tampering.",
    description: "CP-22T Posting Checker verifies commercial tariff adjustments, installment sanctions, and manual debit/credit memos against authorized sanction rosters.",
    features: [
      "Validates CP-22T adjustment vouchers against approved sanction lists",
      "Flags unapproved credit adjustments and altered reference numbers",
      "Verifies fuel price adjustment (FPA) and tariff differential credits",
      "Generates variance reports for commercial audit inspections"
    ],
    tutorial: {
      overview: "Audit CP-22T adjustment entries before closing monthly accounts.",
      prerequisites: ["Windows 10/11"],
      steps: [
        { step: 1, title: "Acquire Tool", desc: "Contact developer." },
        { step: 2, title: "Cross-Check Sanctions", desc: "Verify approved versus posted credits." }
      ],
      tips: ["Always review FCA adjustments highlighted in orange."]
    }
  },

  // =========================================================================
  // 17. GOVT ASSESSMENT REALIZATION (ON REQUEST / DIRECT PURCHASE)
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
    version: "v1.5.0",
    size: "93.1 MB",
    filename: "GovtAssessmentRealization.exe",
    updated: "October 2026",
    icon: "landmark",
    summary: "Audits and tracks billing assessments vs actual realizations for Provincial & Federal Government departments and at-source deductions.",
    description: "Audits monthly billing assessments and arrears recovery against Federal and Provincial Government connections (Police, Health, Education, TMAs). Reconciles at-source treasury deductions.",
    features: [
      "Department-wise breakdown of current assessed billing vs cash realization",
      "Reconciles at-source deductions by KP Finance Department and Federal ministries",
      "Tracks chronic arrears of Tehsil Municipal Administrations (TMAs)",
      "Generates executive briefs for CEO and CFO PESCO"
    ],
    tutorial: {
      overview: "Audit government electricity bill assessments and track at-source recoveries.",
      prerequisites: ["Windows 10/11"],
      steps: [
        { step: 1, title: "Acquire Tool", desc: "Contact developer." },
        { step: 2, title: "Run Realization Audit", desc: "Correlate assessed billing with credited funds." }
      ],
      tips: ["Filter by Provincial vs Federal departments."]
    }
  }
];

// Master Categories & Statuses
const TOOL_CATEGORIES = [
  { id: "all", name: "All Softwares", count: PESCO_TOOLS.length },
  { id: "downloadable", name: "Direct Download (Free)", count: PESCO_TOOLS.filter(t => t.isPublicDownload).length },
  { id: "on-request", name: "Available on Request", count: PESCO_TOOLS.filter(t => t.status === "on-request").length },
  { id: "in-development", name: "In Development", count: PESCO_TOOLS.filter(t => t.status === "in-development").length },
  { id: "flagship", name: "Flagship Suite", count: PESCO_TOOLS.filter(t => t.category === "flagship").length },
  { id: "posting", name: "Posting Checkers", count: PESCO_TOOLS.filter(t => t.category === "posting").length },
  { id: "converters", name: "Converters", count: PESCO_TOOLS.filter(t => t.category === "converters").length },
  { id: "extractors", name: "Scrapers & Extractors", count: PESCO_TOOLS.filter(t => t.category === "extractors").length }
];

function getToolById(id) {
  return PESCO_TOOLS.find(t => t.id === id);
}

function getToolByFilename(filename) {
  if (!filename) return null;
  const clean = filename.toLowerCase().replace(/[\s_\-\.]+/g, '');
  return PESCO_TOOLS.find(t => {
    const tFile = (t.filename || '').toLowerCase().replace(/[\s_\-\.]+/g, '');
    const tId = (t.id || '').toLowerCase().replace(/[\s_\-\.]+/g, '');
    const tName = (t.name || '').toLowerCase().replace(/[\s_\-\.]+/g, '');
    return tFile.includes(clean) || clean.includes(tFile) || tId === clean || tName === clean;
  });
}
