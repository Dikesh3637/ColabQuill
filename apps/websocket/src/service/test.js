const redis = require("redis");

(async () => {
	try {
		// Create a Redis client
		const client = redis.createClient({
			port: 5000, // Port on which Redis server is listening
			host: "localhost", // Replace with your Redis server host if different
		});

		// Connect to Redis
		await client.connect();

		// Handle errors
		client.on("error", (err) => {
			console.error("Redis error:", err);
		});

		// Example usage: Set a key-value pair
		const setReply = await client.set("mykey", "myvalue");
		console.log("Set reply:", setReply);

		// Example usage: Get a value by key
		const getReply = await client.get("mykey");
		console.log("Get reply:", getReply);

		// Close the connection when done
		await client.quit();
	} catch (err) {
		console.error("Error:", err);
	}
})();
