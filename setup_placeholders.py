import os

TOOLS = [
    "PitcSuite.exe",
    "CP139PostingChecker.exe",
    "FeederCodeRanging.exe",
    "FCodeBulkPDFtoExcelConvert.exe",
    "CP136_Posting_Checker.exe",
    "ConvertCP21c.exe",
    "BillScrapper.exe",
    "88LPaymentExtract.exe",
    "TransformerFetch.exe",
    "CP-52_Posting_Checker.exe",
    "PITCLoginAndroid.apk",
    "PDFMerger.exe",
    "CP22T_Posting_Checker.exe",
    "GovtAssessmentRealization.exe"
]

downloads_dir = os.path.join(os.path.dirname(__file__), "downloads")
os.makedirs(downloads_dir, exist_ok=True)

for tool in TOOLS:
    file_path = os.path.join(downloads_dir, tool)
    if not os.path.exists(file_path):
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(f"=== PESCO Tools Binary Placeholder ===\nFile: {tool}\nStatus: Ready for deployment.\nReplace this placeholder file with your actual compiled executable or APK package.\n")
        print(f"Created placeholder: {tool}")
