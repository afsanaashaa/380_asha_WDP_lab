const express = require('express');
const app = express();
app.use(express.json());

const taskRoutes = require('./routes/tasks');
app.use('/tasks', taskRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API – Lab 03 (MySQL)' });
});
