import { ServerWebSocket } from "bun";

type UserWebSockets = Map<string, ServerWebSocket>;
type ConnectionMap = Map<string, UserWebSockets>;

export class WebSocketManager {
	private static instance: WebSocketManager;
	private connectionMap: ConnectionMap = new Map();
	private constructor() {}

	public static getInstance() {
		if (!this.instance) {
			this.instance = new WebSocketManager();
		}
		return this.instance;
	}

	public addUserToRoom(
		room: string,
		userId: string,
		websocket: ServerWebSocket
	) {
		if (!this.connectionMap.has(room)) {
			this.connectionMap.set(room, new Map());
		}

		this.connectionMap.get(room)?.set(userId, websocket);
	}

	public removeUserFromRoom(room: string, userId: string) {
		if (!this.connectionMap.has(room)) {
            console.log("room not found")
			return;
		}

		this.connectionMap.get(room)?.delete(userId);
	}

    public getRoomUsers(room: string) {
        return this.connectionMap.get(room);
    }
}
