type WebSocketData = {
	userId: string;
	documentId: string;
};

const server = Bun.serve({
	fetch(req, server) {
		if (server.upgrade(req)) {
			return; // do not return a Response
		}
		return new Response("Upgrade failed", { status: 500 });
	},
	websocket: {
		open(ws) {
			ws.send("hello from the server");
		},
		message(ws, message) {
			console.log("message received from client:", message);
		},
	},
	port: 3001,
});

console.log(`Listening on ${server.hostname}:${server.port}`);
