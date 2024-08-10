import { relations } from "drizzle-orm/relations";
import { users, documents, refreshToken } from "./schema";

export const documentsRelations = relations(documents, ({one}) => ({
	user: one(users, {
		fields: [documents.creatorId],
		references: [users.userId]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	documents: many(documents),
	refreshTokens: many(refreshToken),
}));

export const refreshTokenRelations = relations(refreshToken, ({one}) => ({
	user: one(users, {
		fields: [refreshToken.userId],
		references: [users.userId]
	}),
}));