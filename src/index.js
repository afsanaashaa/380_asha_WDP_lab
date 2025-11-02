const express = require('express');
const taskRoutes = require('./routes/tasks');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Task Management API is running!');
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    uptime: process.uptime() 
  });
});

// Use routes
app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});