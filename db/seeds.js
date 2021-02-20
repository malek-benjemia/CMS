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
  ('CEO', 1, 10000000),
  ('Managing Director - Head', 1, 250000),
  ('Managing Director', 1, 200000),
  ('Director', 1, 180000),
  ('Vice President', 1, 150000),
  ('Associate', 1, 120000),
  ('Analyst', 1, 90000);
  
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 2, 1);`;
  const params = [];

  con.query(sql, params, (err, rows, fields) => {
    if (err) {
      console.log(err.message);
      return;
    }
    else console.log("Tables populated");
    
  });

});