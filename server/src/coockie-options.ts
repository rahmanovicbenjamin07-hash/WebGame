import { config } from './config.js';

const isProd = config.NODE_ENV === 'production';

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export const sessionCookieOptions = {
    httpOnly: true,
    secure:   isProd,
    sameSite: 'Lax' as const,
    path:     '/',
    domain:   isProd ? undefined : 'localhost',
    maxAge:   SESSION_MAX_AGE,
};

export const sessionCookieDeleteOptions = {
    httpOnly: true,
    secure:   isProd,
    sameSite: 'Lax' as const,
    path:     '/',
    domain:   isProd ? undefined : 'localhost',
};