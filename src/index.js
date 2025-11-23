// src/index.js
const express = require('express');
const taskRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());           // ← only this one line for JSON

app.use('/tasks', taskRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API – Lab 03 (MySQL)' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

// Optional: global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});