const express = require('express');
const taskRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

const tasks = [
  { id: 1, title: 'Sample Task', completed: false }
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

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Task Manager API running' });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
