import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from '../config.js';
 
let connectionString = config.DATABASE_URL;
 
if (connectionString.includes('postgres:postgres@supabase_db_')) {
    const url = new URL(connectionString);
    url.hostname = url.hostname.split('_')[1];
    connectionString = url.href;
}
 
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);