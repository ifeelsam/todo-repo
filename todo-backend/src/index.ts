import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// Middleware
app.use('*', cors())

// Helper function to generate a unique ID
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 5)

// Root route
app.get('/', (c) => c.text('Welcome to the task manager API!'))

// Get all tasks
app.get('/tasks', async (c) => {
  const { TASKS } = c.env
  const taskKeys = await TASKS.list()
  const tasks = await Promise.all(taskKeys.keys.map(async (key) => {
    const task = await TASKS.get(key.name, 'json')
    return { id: key.name, ...task }
  }))
  return c.json(tasks, 200)
})

// Create a new task
app.post('/tasks', async (c) => {
  const { TASKS } = c.env
  const { title, description } = await c.req.json()
  if (!title || !description) {
    return c.json({ error: 'Title and description are required' }, 400)
  }
  const id = generateId()
  const newTask = { title, description, complete: false }
  await TASKS.put(id, JSON.stringify(newTask))
  return c.json({ id, ...newTask }, 201)
})

// Update a task
app.put('/tasks/:id', async (c) => {
  const { TASKS } = c.env
  const id = c.req.param('id')
  const { title, description, complete } = await c.req.json()

  const existingTask = await TASKS.get(id, 'json')
  if (!existingTask) {
    return c.json({ error: 'Task not found' }, 404)
  }

  const updatedTask = {
    ...existingTask,
    title: title || existingTask.title,
    description: description || existingTask.description,
    complete: complete !== undefined ? complete : existingTask.complete
  }

  await TASKS.put(id, JSON.stringify(updatedTask))
  return c.json({ id, ...updatedTask })
})

// Delete a task
app.delete('/tasks/:id', async (c) => {
  const { TASKS } = c.env
  const id = c.req.param('id')

  const existingTask = await TASKS.get(id)
  if (!existingTask) {
    return c.json({ error: 'Task not found' }, 404)
  }

  await TASKS.delete(id)
  return c.json(null, 204)
})

export default app
