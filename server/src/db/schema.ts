import { int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';
export const usersTable = mysqlTable('users_table', {
  id: serial().primaryKey(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({length:30}).notNull(),
});