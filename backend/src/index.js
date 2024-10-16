import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

let tasks = [];  

 
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Task Manager API!');
});

 
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

 
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = { id: tasks.length + 1, title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});
 
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const task = tasks.find(t => t.id === parseInt(id));

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    task.completed = completed;
    res.json(task);
});

 
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(t => t.id !== parseInt(id));
    res.status(204).send();  
});

 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
