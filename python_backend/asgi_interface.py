# ASGI Application
import asyncio
from typing import Callable, Awaitable

class ASGIApp:
    def __init__ (self):
        self.host = 'localhost'
        self.port = 8000
        
    async def app(self, scope: dict, receive: Callable, send: Callable) -> Awaitable[None]:
        if scope['type'] == 'http':
            await send({
                'type': 'http.response.start',
                'status': 200,
                'headers': [(b'content-type', b'text/plain')],
            })
            await send({
                'type': 'http.response.body',
                'body': b'Hello, ASGI!',
            })
            
    async def handle_client(self, reader: asyncio.StreamReader, writer: asyncio.StreamWriter):
        data = await reader.read(1024)
        method, path, _ = data.decode().split(' ', 2)
        print(f"Received {method} request for {path}")
        
        scope = {
            'type': 'http',
            'method': method,
            'path': path,
            'headers': [],
        }
        
        async def receive():
            return {
                'type': 'http.request',
                'body': b'',
            }
        
        async def send(message):
            if message['type'] == 'http.response.start':
                status = message['status']
                headers = message['headers']
                print(f"Status: {status}")
                writer.write(f"HTTP/1.1 {status} OK\r\n".encode())
                print("Headers:")
                for header in headers:
                    print(f"  {header[0].decode()}: {header[1].decode()}")
                    writer.write(f"{header[0].decode()}: {header[1].decode()}\r\n".encode())
                    
                writer.write(b"\r\n")
            elif message['type'] == 'http.response.body':
                body = message['body']
                print(f"Body: {body.decode()}")
                writer.write(body)
                await writer.drain()
                writer.close()
            
        await self.app(scope, receive, send)
            
    async def run(self):
        server = await asyncio.start_server(self.handle_client, self.host, self.port)
        print(f"Serving on http://{self.host}:{self.port}...")
        async with server:
            await server.serve_forever()
            
    def listen(self):
        asyncio.run(self.run())
        
if __name__ == '__main__':
    app = ASGIApp()
    app.listen()
