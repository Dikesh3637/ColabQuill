import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuid4 } from "uuid";
export const users = sqliteTable("users", {
	id: text("user_id")
		.notNull()
		.$defaultFn(() => uuid4())
		.primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
});

export const documents = sqliteTable("documents", {
	id: integer("document_id").notNull().primaryKey(),
	title: text("title"),
	content: text("content"),
	creatorId: integer("creator_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),

	createdAt: text("created_at").default(sql`(CURRENT_TIME)`),
	updatedAt: text("updated_at").default(sql`(CURRENT_TIME)`),
	collaborators: text("collaborators", { mode: "json" }).$type<{
		collaborators: string[];
	}>(),
});

export const refreshToken = sqliteTable("refresh_tokens", {
	tokenId: text("token_id").notNull().primaryKey(),
	userId: text("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull()
		.unique(),
});
