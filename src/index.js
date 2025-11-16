const express = require('express');
const taskRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

const tasks = [
  { id: 1, title: 'Learn Node.js', completed: false, priority: 'high', createdAt: new Date('2025-10-01T09:00:00Z') },
  { id: 2, title: 'Build REST API', completed: false, priority: 'high', createdAt: new Date('2025-10-02T09:00:00Z') },
  { id: 3, title: 'Set up database', completed: true, priority: 'medium', createdAt: new Date('2025-10-03T09:00:00Z') },
  { id: 4, title: 'Write tests', completed: false, priority: 'low', createdAt: new Date('2025-10-04T09:00:00Z') },
  { id: 5, title: 'Deploy application', completed: false, priority: 'medium', createdAt: new Date('2025-10-05T09:00:00Z') }
];

app.locals.tasks = tasks;

app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ success: false, error: 'Invalid JSON payload' });
  }
  next();
});

app.use('/tasks', taskRouter);

app.get('/health', (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime()
  });
});

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Task Manager API running' });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
