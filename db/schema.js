const con = require('./database.js');

con.on('connect', () => {
  const sql = `DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments; 
CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);
CREATE TABLE roles (
  id INTEGER PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  department_id INTEGER,
  salary DECIMAL NOT NULL,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);`;
  const params = [];

  con.query(sql, params, (err, rows, fields) => {
    if (err) {
      console.log(err.message);
      return;
    }
    else console.log("Tables created");
    
  });

});