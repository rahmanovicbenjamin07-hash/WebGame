import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
    DATABASE_URL:  z.string().min(1, 'DATABASE_URL is required'),
    SUPABASE_URL:  z.string().min(1, 'SUPABASE_URL is required'),
    SUPABASE_KEY:  z.string().min(1, 'SUPABASE_KEY is required'),
    AUTH_SECRET:   z.string().min(1, 'AUTH_SECRET is required'),
    PORT:          z.coerce.number().default(3001),
    WEB_ORIGIN:    z.string().default('http://localhost:3000'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error('Missing environment variables:');
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
}

export const config = parsed.data;