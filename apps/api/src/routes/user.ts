import { DbClient } from "@repo/db";
import { JWTPayloadType } from "@repo/typing/auth";
import {
	UserSignInType,
	UserSignUpType,
	userSignUpSchema,
} from "@repo/typing/user";
import * as bcrypt from "bcryptjs";
import { eq, sql } from "drizzle-orm";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { v4 as uuidv4 } from "uuid";
import { ZodError } from "zod";
import { refreshToken as refreshTokenTable, users } from "../../drizzle/schema";
import { CustomError } from "../utils/error";
import { createAuthToken, createRefreshToken } from "../utils/jwtService";

export const user = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
		JWT_ALGO: string;
		DATABASE_AUTH_TOKEN: string;
	};
}>();

//sign-up route
user.post("/signup", async (c) => {
	const body: UserSignUpType = await c.req.json();
	const db = DbClient.getDb(c.env.DATABASE_URL, c.env.DATABASE_AUTH_TOKEN);

	try {
		userSignUpSchema.parse(body);
		const hashedPassword = await bcrypt.hash(body.password, 10);

		const presentUser = await db
			.select()
			.from(users)
			.where(eq(users.email, body.email));

		if (presentUser.length !== 0) {
			throw new CustomError("user already exists", 409);
		}

		await db.insert(users).values({
			name: body.username,
			email: body.email,
			password: hashedPassword,
		});

		return c.json("user created");
	} catch (err) {
		if (err instanceof ZodError) {
			c.status(400);
			return c.json({
				type: "zod",
				issues: err.issues,
			});
		} else if (err instanceof CustomError) {
			c.status(err.statusCode);
			return c.json(err.message);
		}
		c.status(500);
		return c.json({
			message: "Internal server error",
			error: err,
		});
	}
});

//sign-in route
user.post("/signin", async (c) => {
	const secret = new TextEncoder().encode(c.env.JWT_SECRET);
	const algo = c.env.JWT_ALGO;
	const body: UserSignInType = await c.req.json();
	const db = DbClient.getDb(c.env.DATABASE_URL, c.env.DATABASE_AUTH_TOKEN);

	try {
		const user = await db
			.select()
			.from(users)
			.where(eq(users.email, body.email));

		if (user.length === 0) {
			throw new CustomError("user not found", 404);
		}

		const isMatch = await bcrypt.compare(body.password, user[0].password);

		if (!isMatch) {
			throw new CustomError("invalid credentials", 401);
		}

		const payload: JWTPayloadType = {
			username: user[0].name,
			email: user[0].email,
			id: user[0].id,
		};

		const authToken = await createAuthToken(secret, algo, payload);

		const randomUuid = uuidv4();

		console.log(payload, "the payload");
		await db
			.insert(refreshTokenTable)
			.values({
				tokenId: randomUuid,
				userId: user[0].id,
			})
			.onConflictDoUpdate({
				target: refreshTokenTable.userId,
				targetWhere: sql`user_id = ${user[0].id}`,
				set: { tokenId: randomUuid },
			});

		const refreshToken = await createRefreshToken(secret, algo, {
			id: randomUuid,
		});

		setCookie(c, "authToken", authToken, {
			httpOnly: true,
			sameSite: "lax",
		});

		setCookie(c, "refreshToken", refreshToken, {
			httpOnly: true,
			sameSite: "lax",
		});

		c.status(200);
		return c.json("the user has been signed in");
	} catch (err) {
		if (err instanceof ZodError) {
			c.status(400);
			return c.json({ error: err.issues });
		}
		if (err instanceof CustomError) {
			c.status(err.statusCode);
			return c.json(err.message);
		}
		c.status(500);
		return c.json({ err });
	}
});
