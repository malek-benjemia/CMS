const express = require('express');
const router = express.Router();
const db = require('../../db/database');
const inputCheck = require('../../utils/inputCheck');

// Get single employee
router.get('/employee/:id', (req, res) => {
  const sql = `SELECT * FROM employees WHERE id = ?`;
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

// Get all employees

router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employees ORDER BY last_name`;
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

 // Create an employee

  router.post('/employee', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'manager_id');

    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
  
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

  // Update an employee role

  router.put('/employee/:id', (req, res) => {
    // Data validation
    const errors = inputCheck(req.body, 'role_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    // Prepare statement
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const params = [req.body.email, req.params.id];
  
    // Execute
    db.execute(sql, params, function(err, data, fields) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: req.body,
        changes: this.changes
      });
    });
  });

  module.exports = router;