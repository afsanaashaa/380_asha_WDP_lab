// test.js  ← ONLY THIS VERSION WORKS
const db = require('./config/db');

(async () => {
  try {
    console.log('Testing MySQL connection...');
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('Connection SUCCESS:', rows);

    await db.query('USE taskdb');
    console.log('Database taskdb selected');

    const [tables] = await db.query('SHOW TABLES');
    console.log('Tables found:', tables.map(t => Object.values(t)[0]));

    const [tasks] = await db.query('SELECT * FROM tasks LIMIT 3');
    console.log('Sample tasks:', tasks);
  } catch (err) {
    console.error('REAL ERROR:');
    console.error('Code   →', err.code);
    console.error('Message →', err.message);
  }
})();