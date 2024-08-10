import { sqliteTable, AnySQLiteColumn, foreignKey, integer, text } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const documents = sqliteTable("documents", {
	documentId: integer("document_id").primaryKey().notNull(),
	title: text("title"),
	content: text("content"),
	creatorId: integer("creator_id").notNull().references(() => users.userId),
	createdAt: text("created_at").default("sql`(CURRENT_TIME)`"),
	updatedAt: text("updated_at").default("sql`(CURRENT_TIME)`"),
	collaborators: text("collaborators"),
});

export const refreshToken = sqliteTable("refresh-token", {
	tokenId: text("token_id").primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => users.userId),
});

export const users = sqliteTable("users", {
	userId: text("user_id").primaryKey().notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
});