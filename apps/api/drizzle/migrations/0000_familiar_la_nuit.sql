CREATE TABLE `documents` (
	`document_id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`content` text,
	`creator_id` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIME),
	`updated_at` text DEFAULT (CURRENT_TIME),
	`collaborators` text,
	FOREIGN KEY (`creator_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `refresh-token` (
	`token_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
