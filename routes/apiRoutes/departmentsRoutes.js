const express = require('express');
const router = express.Router();
const db = require('../../db/database');
const inputCheck = require('../../utils/inputCheck');

// Get single department
  router.get('/department/:id', (req, res) => {
    const sql = `SELECT * FROM departments WHERE departments.id = ?`;
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

  
// Get all departments
router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;
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


// Create a department
router.post('/department', ({ body }, res) => {
    const errors = inputCheck(body, 'name');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `INSERT INTO departments (name) 
              VALUES (?)`;
    const params = [body.name];
    // ES5 function, not arrow function, to use `this`
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

  module.exports = router;