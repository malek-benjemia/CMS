const express = require('express');
const router = express.Router();
const db = require('../../db/database');
const inputCheck = require('../../utils/inputCheck');


// Get all employees

router.get('/employees', (req, res) => {
    const sql = `SELECT emp1.id, emp1.first_name, emp1.last_name, rls.title, dep.name as departmet_name, rls.salary, emp2.first_name as manager_first_name, emp2.last_name as manager_last_name
                  FROM employees emp1
                  LEFT JOIN roles rls on (emp1.role_id = rls.id)
                  LEFT JOIN departments dep on (rls.department_id = dep.id)
                  LEFT JOIN employees emp2 on (emp1.manager_id = emp1.id)
                  ORDER BY last_name`;
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
  
    db.execute(sql, params, function(err, result, fields) {
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
    const params = [req.body.id, req.params.id];
  
    // Execute
    db.execute(sql, params, function(err, result, fields) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: body,
        changes: this.changes
      });
    });
  });

  module.exports = router;