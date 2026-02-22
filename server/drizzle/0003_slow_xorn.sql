CREATE TABLE `guesses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`locationId` integer NOT NULL,
	`guessedLat` real NOT NULL,
	`guessedLng` real NOT NULL,
	`missMeters` integer NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`locationId`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `guesses_user_miss_idx` ON `guesses` (`userId`,`missMeters`);--> statement-breakpoint
CREATE TABLE `locations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`location` text NOT NULL,
	`locationImage` text NOT NULL,
	`lat` real NOT NULL,
	`lng` real NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `locations_location_unique` ON `locations` (`location`);--> statement-breakpoint
CREATE UNIQUE INDEX `location_idx` ON `locations` (`location`);