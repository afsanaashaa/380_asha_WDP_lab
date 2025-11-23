// src/routes/tasks.js
const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const logger = require('../../logger');

// GET /tasks - Pagination + Search (Assignment 1 + 2)
router.get('/', async (req, res) => {
  try {
    let { page = 1, limit = 10, q } = req.query;
    page = Math.max(1, parseInt(page));
    limit = Math.min(50, Math.max(1, parseInt(limit)));
    const offset = (page - 1) * limit;

    let sql = 'SELECT * FROM tasks WHERE deleted_at IS NULL';
    let countSql = 'SELECT COUNT(*) as total FROM tasks WHERE deleted_at IS NULL';
    const values = [];
    const countValues = [];

    if (q) {
      const term = `%${q}%`;
      sql += ' AND title LIKE ?';
      countSql += ' AND title LIKE ?';
      values.push(term);
      countValues.push(term);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    values.push(limit, offset);

    const [[{ total }]] = await db.query(countSql, countValues);
    const [rows] = await db.query(sql, values);

    res.json({
      totalTasks: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      limit,
      data: rows
    });
  } catch (err) {
    logger.error(`GET /tasks error: ${err.message}`);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /tasks/deleted - Show soft-deleted (Assignment 3)
router.get('/deleted', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks WHERE deleted_at IS NOT NULL');
    res.json(rows);
  } catch (err) {
    logger.error(`GET /tasks/deleted error: ${err.message}`);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /tasks/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ? AND deleted_at IS NULL', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Task not found' });
    res.json(rows[0]);
  } catch (err) {
    logger.error(`GET /tasks/${req.params.id} error: ${err.message}`);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /tasks
router.post('/', async (req, res) => {
  const { title, description, status = 'pending', priority = 'medium' } = req.body;
  if (!title?.trim()) return res.status(400).json({ error: 'Title required' });

  try {
    const [result] = await db.query(
      'INSERT INTO tasks (title, description, status, priority) VALUES (?, ?, ?, ?)',
      [title.trim(), description || null, status, priority]
    );
    const [newTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(newTask[0]);
  } catch (err) {
    logger.error(`POST /tasks error: ${err.message}`);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT /tasks/:id
router.put('/:id', async (req, res) => {
  const { title, description, status, priority } = req.body;
  try {
    const fields = [];
    const values = [];
    if (title !== undefined) { fields.push('title = ?'); values.push(title); }
    if (description !== undefined) { fields.push('description = ?'); values.push(description); }
    if (status !== undefined) { fields.push('status = ?'); values.push(status); }
    if (priority !== undefined) { fields.push('priority = ?'); values.push(priority); }
    if (fields.length === 0) return res.status(400).json({ error: 'Nothing to update' });

    values.push(req.params.id);
    const sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ? AND deleted_at IS NULL`;
    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });

    const [updated] = await db.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    logger.error(`PUT /tasks/${req.params.id} error: ${err.message}`);
    res.status(500).json({ error: 'Failed to update' });
  }
});

// DELETE → Soft Delete (Assignment 3)
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      'UPDATE tasks SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL',
      [req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });
    res.status(204).send();
  } catch (err) {
    logger.error(`DELETE /tasks/${req.params.id} error: ${err.message}`);
    res.status(500).json({ error: 'Delete failed' });
  }
});

// Restore soft-deleted task (Assignment 3)
router.put('/:id/restore', async (req, res) => {
  try {
    const [result] = await db.query('UPDATE tasks SET deleted_at = NULL WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not deleted or not found' });
    const [task] = await db.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    res.json(task[0]);
  } catch (err) {
    logger.error(`RESTORE /tasks/${req.params.id} error: ${err.message}`);
    res.status(500).json({ error: 'Restore failed' });
  }
});

module.exports = router;