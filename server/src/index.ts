import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import usersRoute from './routes/users-route.js'
import { cors } from 'hono/cors' 
import { authMiddleware } from '../middleware/middleware.js'

const app = new Hono()
app.use('/user/me', authMiddleware);

app.use('*', cors({
  origin: 'http://localhost:3000', 
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))

app.use('*', async (c, next) => {
  await next();
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/user",usersRoute);

serve({
  fetch: app.fetch,
  port: 3001
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
