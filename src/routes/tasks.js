const express = require('express');
const router = express.Router();

const tasks = [
  { id: 1, title: 'Learn Node.js', completed: false, priority: 'high', createdAt: new Date('2025-10-01') },
  { id: 2, title: 'Build REST API', completed: false, priority: 'high', createdAt: new Date('2025-10-02') },
  { id: 3, title: 'Set up database', completed: true, priority: 'medium', createdAt: new Date('2025-10-03') },
  { id: 4, title: 'Write tests', completed: false, priority: 'low', createdAt: new Date('2025-10-04') },
  { id: 5, title: 'Deploy application', completed: false, priority: 'medium', createdAt: new Date('2025-10-05') }
];

router.get('/', (req, res) => {
  res.json(tasks);
});

router.get('/:id', (req, res) => {
  const idParam = req.params.id;
  

  if (isNaN(idParam) || idParam.trim() === '') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  
  const id = parseInt(idParam);
  const task = tasks.find(t => t.id === id);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  res.json(task);
});

module.exports = router;