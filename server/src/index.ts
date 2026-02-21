import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import usersRoute from './routes/users-route.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/users",usersRoute);

serve({
  fetch: app.fetch,
  port: 3001
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
