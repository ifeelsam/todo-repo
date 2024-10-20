import { Hono } from 'hono'
import { renderer } from './renderer'
import { HoverEffect } from "./components/ui/hover-card.js"
const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    < HoverEffect />)
})

export default app
