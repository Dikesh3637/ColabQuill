import { ServerWebSocket } from "bun";
import { RedisClientType, createClient } from "redis";
import { WebSocketManager } from "./userManagerService";
export class PubSubService {
	private static instance: PubSubService;
	private client!: RedisClientType;
	private subscriptions = new Set();
	private manager: WebSocketManager = WebSocketManager.getInstance();
	private constructor() {
		this.createRedisClient();
	}

	private async createRedisClient() {
		this.client = createClient({
			url: "http://localhost:6379",
		});
		this.client.on("error", (err) => console.log("Redis Client Error", err));

		await this.client.connect();
	}
	public static getInstance() {
		if (!this.instance) {
			this.instance = new PubSubService();
		}
		return this.instance;
	}

	public async subscribeToRoom(
		room: string,
		userId: string,
		websocket: ServerWebSocket
	) {
		this.manager.addUserToRoom(room, userId, websocket);
		this.client.subscribe(room,()=>{
			console.log(`subscribed to ${room}`)
		});
	}

	public async publishToRoom(room: string, message: string) {
		this.client.publish(room, message);
	}
}
