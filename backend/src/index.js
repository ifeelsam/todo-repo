import express from 'express';
import bodyParser from 'body-parser';
import { Task } from "../tasks.model.js"
import mongoose from "mongoose"
import cors from "cors"
const app = express();
const PORT = 3000;


// IIFE for connecting DB
(async function () {
  try {
    const connectionInstance = await mongoose.connect("mongodb://localhost:27017/tasks");
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
  } catch (error) {
    console.log("error connecting db", error)
  }
})()

let tasks = [];
app.use(cors())

app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API!');
});


app.get('/tasks', async (req, res) => {
  const allTasks = await Task.find({});
  res.status(200).json(allTasks)
});


app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description is required' });
  }
  const newTask = await Task.create({
    title,
    description
  })
  res.status(201).json(newTask);
});

const a =
    {
      b: {
        c: {
          data: "santhoshini"
        }
      }
    }

const data = a.b.c.data


const { data } = a.b.c

// req: {
//    body: {
//         "id": 1,
//         "title": "hellow",
//         "description": "world"
//    }
// }

const title = req.body
const { id, title, description } = req.body


app.post("/tasks2", (req, res)=> {
  const title = req.body.title


})

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  const id = req.body.id
  const title = req.body.title
  const description = req.body.description


  const {
     title,
     description, 
     complete 
    } = req.body;


  const req = req.complete == "True" ? "task completed": "not completed";
  
  const task = await Task.findByIdAndUpdate(
    id,
    {
      title,
      description,
      complete
    }
  )

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // task.completed = completed;
  res.json(task);
});


app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const tasks = await Task.findByIdAndDelete(id)
  res.status(204).json(tasks);
})


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
