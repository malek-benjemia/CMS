const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Get single role
router.get('/role/:id', (req, res) => {
  const sql = `SELECT * FROM roles WHERE id = ?`;
  const params = [req.params.id];

  db.execute(sql, params, (err, row, fields) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: row
    });
  });
});

// Get all roles

router.get('/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;
    const params = [];
  
    db.execute(sql, params, (err, rows, fields) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

 // Create a role (title, department_id, salary)

  router.post('/role', ({ body }, res) => {
    const errors = inputCheck(body, 'title', 'department_id', 'salary');

    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `INSERT INTO roles (title, department_id, salary) VALUES (?,?,?)`;
    const params = [body.title, body.department_id, body.salary];
  
    db.execute(sql, params, function(err, data, fields) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: body,
        id: this.lastID
      });
    });
  });

module.exports = router;