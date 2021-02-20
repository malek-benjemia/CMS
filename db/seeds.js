const con = require('./database.js');

con.on('connect', () => {
  const sql = `INSERT INTO departments (name)
VALUES
  ('Capital Markets'),
  ('Wealth Management'),
  ('Commercial Banking'),
  ('Retail Banking'),
  ('Technology'),
  ('Operations'),
  ('Human Resources'),
  ('Finance');

INSERT INTO roles (title, department_id, salary)
VALUES
  ('CEO', NULL, 10000000),
  ('Managing Director - Head', NULL, 250000),
  ('Managing Director', NULL, 200000),
  ('Director', NULL, 180000),
  ('Vice President', NULL, 150000),
  ('Associate', NULL, 120000),
  ('Analyst', NULL, 90000);
  
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', NULL, NULL),
  ('Virginia', 'Woolf', NULL, NULL);`;
  const params = [];

  con.query(sql, params, (err, rows, fields) => {
    if (err) {
      console.log(err.message);
      return;
    }
    else console.log("Tables populated");
    
  });

});