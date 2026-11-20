import http.server
import socketserver
import webbrowser
import os
import socket
import json

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(DIRECTORY, "roadmap_db.json")

def read_db():
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def write_db(data):
    try:
        with open(DB_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        print(f"Error saving DB: {e}")
        return False

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_cors_headers()
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok"}).encode("utf-8"))
            return
        elif self.path == "/api/data":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_cors_headers()
            self.end_headers()
            db = read_db()
            self.wfile.write(json.dumps(db, ensure_ascii=False).encode("utf-8"))
            return
        super().do_GET()

    def do_POST(self):
        if self.path == "/api/sync":
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)
            try:
                incoming = json.loads(post_data.decode("utf-8"))
                db = read_db()
                if "users" not in db:
                    db["users"] = {}
                
                # Merge full users dictionary if provided
                if "users" in incoming and isinstance(incoming["users"], dict):
                    for uid, udata in incoming["users"].items():
                        db["users"][uid] = udata
                
                # Merge single user if provided
                if "user" in incoming and "userId" in incoming:
                    db["users"][incoming["userId"]] = incoming["user"]

                write_db(db)
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "ok", "db": db}, ensure_ascii=False).encode("utf-8"))
                return
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
                return
        self.send_response(404)
        self.end_headers()

def run():
    os.chdir(DIRECTORY)
    local_ip = get_local_ip()
    laptop_url = f"http://localhost:{PORT}/index.html"
    phone_url = f"http://{local_ip}:{PORT}/index.html"
    
    print("=" * 64)
    print("  🚀 AI Roadmap Tracker Server & Real-time Sync is Running!")
    print("=" * 64)
    print(f"\n  💻 على اللاب توب:")
    print(f"     {laptop_url}\n")
    print(f"  📱 على الموبايل (اتصل بنفس شبكة الـ Wi-Fi وافتح هذا الرابط):")
    print(f"     {phone_url}\n")
    print("  🤝 مزامنة أسامة ومرشد: السيرفر يقوم بحفظ وتحديث بيانات الجميع فورياً!")
    print("  💡 نصيحة للموبايل: بعد فتح الرابط في Chrome أو Safari، اضغط (3 نقاط)")
    print("     واختر 'إضافة إلى الشاشة الرئيسية (Add to Home screen)'")
    print("     ليتحول إلى تطبيق مستقل يفتح بشاشة كاملة مثل أي أبلكيشن على الموبايل!")
    print("=" * 64)
    print("  اضغط Ctrl + C لإيقاف السيرفر في أي وقت.")
    print("=" * 64)
    
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")
            httpd.server_close()

if __name__ == "__main__":
    run()
