import http.server
import socketserver
import webbrowser
import os
import sys

# Ensure clean console output on Windows cp1252 / cmd.exe
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

DEFAULT_PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def translate_path(self, path):
        # Support clean URLs locally (e.g., /tutorials -> /tutorials.html, /downloads -> /downloads.html)
        clean_path = path.split('?', 1)[0].split('#', 1)[0]
        full_path = super().translate_path(clean_path)
        if not os.path.exists(full_path) and os.path.exists(full_path + '.html'):
            return full_path + '.html'
        return super().translate_path(path)

    def end_headers(self):
        # Enable CORS and disable aggressive caching for local dev
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

def find_available_server(start_port=DEFAULT_PORT, max_tries=20):
    for port in range(start_port, start_port + max_tries):
        try:
            httpd = ReusableTCPServer(("", port), Handler)
            return httpd, port
        except OSError:
            continue
    # Fallback to random free port chosen by OS
    httpd = ReusableTCPServer(("", 0), Handler)
    return httpd, httpd.server_address[1]

def main():
    os.chdir(DIRECTORY)
    httpd, port = find_available_server(DEFAULT_PORT)
    url = f"http://localhost:{port}/index.html"
    
    print("=" * 68)
    print("   [OK] DISCO Tools & PITCSuite Web Server Started")
    print("=" * 68)
    print(f"  Access Portal at: {url}")
    print(f"  Serving Directory: {DIRECTORY}")
    print("  Compatible DISCOs: LESCO, GEPCO, FESCO, IESCO, MEPCO,")
    print("                     PESCO, HAZECO, SEPCO, HESCO, QESCO, TESCO")
    print("  Clean URLs supported: /tutorials?tool=..., /downloads, etc.")
    print("  Press Ctrl+C in this window to stop the server.")
    print("=" * 68)
    
    try:
        webbrowser.open(url)
    except Exception:
        pass
        
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer gracefully shut down.")

if __name__ == '__main__':
    main()
