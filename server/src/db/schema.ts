import {
  pgTable,
  serial,
  text,
  doublePrecision,
  integer,
  timestamp,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";


export const usersTable = pgTable(
  "users",
  {
    id: serial().primaryKey(),
    firstname: text().notNull(),
    lastname: text().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    image: text(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("email_idx").on(table.email)]
);

export type User = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;


export const locationsTable = pgTable("locations", {
  id: serial().primaryKey(),
  location: text().notNull(),
  locationImage: text("location_image").notNull(),
  lat: doublePrecision().notNull(),
  lng: doublePrecision().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Location = typeof locationsTable.$inferSelect;
export type InsertLocation = typeof locationsTable.$inferInsert;


export const guessesTable = pgTable(
  "guesses",
  {
    id: serial().primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    locationId: integer("location_id")
      .notNull()
      .references(() => locationsTable.id, { onDelete: "cascade" }),
    guessedLat: doublePrecision("guessed_lat").notNull(),
    guessedLng: doublePrecision("guessed_lng").notNull(),
    missMeters: integer("miss_meters").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("guesses_user_miss_idx").on(table.userId, table.missMeters),
  ]
);

export type Guess = typeof guessesTable.$inferSelect;
export type InsertGuess = typeof guessesTable.$inferInsert;