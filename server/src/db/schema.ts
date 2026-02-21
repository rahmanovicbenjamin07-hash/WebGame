import { sql } from "drizzle-orm";
import { int, sqliteTable, text, uniqueIndex , index,real} from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable(
  "users",
  {
    id: int().primaryKey({ autoIncrement: true }),
    firstname: text().notNull(),
    lastname: text().notNull(),
    email: text().notNull().unique(),
    password:text().notNull(),
    image:text(),
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [uniqueIndex("email_idx").on(table.email)]
);

export type User = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;

export const locationsTable = sqliteTable("locations",
  {
    id: int().primaryKey({ autoIncrement: true }),
    location: text().notNull().unique(),
    locationImage:text().notNull(),
    lat: real().notNull(),
    lng: real().notNull(),
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [uniqueIndex("location_idx").on(table.location)]
);

export type Location = typeof usersTable.$inferSelect;
export type InsertLocation = typeof usersTable.$inferInsert;

export const guessesTable = sqliteTable("guesses", {
  id: int().primaryKey({ autoIncrement: true }),
  userId:int().notNull().references(()=> usersTable.id, { onDelete: "cascade" }),
  locationId:int().notNull().references(() => locationsTable.id, { onDelete:"cascade" }),
  guessedLat: real().notNull(),
  guessedLng: real().notNull(),
  missMeters: int().notNull(), 
  createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
},
  (table) => [index("guesses_user_miss_idx").on(table.userId, table.missMeters),]
)

export type Guess = typeof guessesTable.$inferSelect;
export type InsertGuess = typeof guessesTable.$inferInsert;