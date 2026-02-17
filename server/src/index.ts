import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { usersTable } from './db/schema.js';
import "dotenv/config";

const app = new Hono()
app.get('/', (c) => c.text('Hello Node.js!'))

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});
const db = drizzle({ client: poolConnection });

async function main() {
  const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  });
  const db = drizzle({ client: connection });
}
main();

serve(app)