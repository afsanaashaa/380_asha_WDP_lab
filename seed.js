// seed.js (in root)
const db = require('./config/db');

const sampleTasks = [
  "Learn Node.js", "Build REST API", "Connect MySQL", "Add Authentication",
  "Implement JWT", "Create User Routes", "Add Middleware", "Write Unit Tests",
  "Setup CI/CD", "Deploy to Render", "Add Rate Limiting", "Implement Caching",
  "Add Validation", "Create Documentation", "Fix Bugs"
].map((title, i) => ({
  title,
  description: `This is sample task number ${i + 1}`,
  status: ['pending', 'in-progress', 'completed'][i % 3],
  priority: ['low', 'medium', 'high'][i % 3]
}));

(async () => {
  try {
    const [count] = await db.query('SELECT COUNT(*) as total FROM tasks');
    if (count[0].total >= 15) {
      console.log('Already seeded 15+ tasks!');
      process.exit(0);
    }

    for (const task of sampleTasks) {
      await db.query(
        'INSERT INTO tasks (title, description, status, priority) VALUES (?, ?, ?, ?)',
        [task.title, task.description, task.status, task.priority]
      );
    }
    console.log('Successfully seeded 15 tasks!');
  } catch (err) {
    console.error('Seeding failed:', err.message);
  }
})();