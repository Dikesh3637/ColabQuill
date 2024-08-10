import { Client, createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export class DbClient {
	private static clientInstance: Client;

	public static readonly getDb = (databaseUrl: string, authToken: string) => {
		if (!this.clientInstance) {
			this.clientInstance = createClient({
				url: databaseUrl,
				authToken: authToken,
			});
		}

		return drizzle(this.clientInstance, { schema });
	};
}
