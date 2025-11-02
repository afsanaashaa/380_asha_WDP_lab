const express = require('express');
const app = express();
const port = 3000;
const tasks = [
  { id: 1, title: 'Learn Node.js', completed: false, priority: 'high', createdAt: new Date('2025-10-01') },
  { id: 2, title: 'Build REST API', completed: false, priority: 'high', createdAt: new Date('2025-10-02') },
  { id: 3, title: 'Set up database', completed: true, priority: 'medium', createdAt: new Date('2025-10-03') },
  { id: 4, title: 'Write tests', completed: false, priority: 'low', createdAt: new Date('2025-10-04') },
  { id: 5, title: 'Deploy application', completed: false, priority: 'medium', createdAt: new Date('2025-10-05') }
];
app.get('/', (req, res) => {
       res.send('Task Management API is running!');
});
app.get('/tasks', (req, res) => {
       res.json(tasks);
});
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    uptime: process.uptime() 
  });
});

app.get('/task/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  res.json(task);
});

app.listen(port, () => {
       console.log(`Server running at http://localhost:${port}`);
});

