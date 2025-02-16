import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./drizzle/schema.ts",
	out: "./drizzle/migrations",
	dialect: "sqlite",
	driver: "turso",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.DATABASE_AUTH_TOKEN!,
	},
});
