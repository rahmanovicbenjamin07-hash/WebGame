import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { config } from './config.js';
import usersRoute from './routes/users-route.js';
import locationRoute from './routes/locations-route.js';
import guessesRoute from './routes/guess-routes.js';
import { authMiddleware } from '../middleware/middleware.js';

const app = new Hono();

app.use('/user/me', authMiddleware);

app.use('*', cors({
    origin:         config.WEB_ORIGIN,
    allowMethods:   ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders:   ['Content-Type', 'Authorization'],
    exposeHeaders:  ['Content-Length'],
    maxAge:         600,
    credentials:    true,
}));

app.get('/', (c) => c.text('Hello Hono!'));

app.route('/user',     usersRoute);
app.route('/location', locationRoute);
app.route('/guess',    guessesRoute);

serve({
    fetch: app.fetch,
    port:  config.PORT,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});