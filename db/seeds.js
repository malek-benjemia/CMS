const con = require('./database.js');

con.on('connect', () => {
  const sql = `INSERT INTO departments (id,name)
VALUES
  (0,'Capital Markets'),
  (1,'Wealth Management'),
  (2,'Commercial Banking'),
  (3,'Retail Banking'),
  (4,'Technology'),
  (5,'Operations'),
  (6,'Human Resources'),
  (7,'Finance');

INSERT INTO roles (id,title, department_id, salary)
VALUES
  (0,'CEO', 0, 10000000),
  (1,'Managing Director - Head', 0, 250000),
  (2,'Managing Director', 1, 200000),
  (3,'Director', 2, 180000),
  (4,'Vice President', 3, 150000),
  (5,'Associate', 4, 120000),
  (6,'Analyst', 5, 90000);
  
INSERT INTO employees (id,first_name, last_name, role_id, manager_id)
VALUES
  (0,'Ronald', 'Firbank', 0, NULL),
  (1,'Virginia', 'Woolf', 1, 0);`;
  const params = [];

  con.query(sql, params, (err, rows, fields) => {
    if (err) {
      console.log(err.message);
      return;
    }
    else console.log("Tables populated");
    
  });

});