import { Hono } from "hono";
import { post } from "./routes/post";
import { user } from "./routes/user";

const app = new Hono();

app.get("/", async (c, next) => {
	return c.text("Hello from the api!");
});

app.route("/api/v1/user", user);
app.route("/api/v1/post", post);

export default app;
