# WSGI Application
from wsgiref.simple_server import make_server # not for production use
from wsgiref.util import setup_testing_defaults

environ = {
    'REQUEST_METHOD': 'GET',
    'PATH_INFO': '/',
    'SERVER_NAME': 'localhost',
    'SERVER_PORT': '8000',
}

def start_response(status, headers):
    print(f"Status: {status}")
    print("Headers:")
    for header in headers:
        print(f"  {header[0]}: {header[1]}")

class WSGApp:
    def __init__(self):
        self.host = 'localhost'
        self.port = 8000
        
    def __call__(self, environ=environ, start_response=start_response):
        setup_testing_defaults(environ)
        status = '200 OK'
        headers = [('Content-Type', 'text/plain')]
        start_response(status, headers)
        return [b"Hello, WSGI!"]
    
    def listen(self):
        with make_server(self.host, self.port, self) as httpd:
            print("Serving on http://localhost:8000...")
            httpd.serve_forever()

if __name__ == '__main__':
    app = WSGApp()
    app.listen()