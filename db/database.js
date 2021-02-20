var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "newuser",
  database: "company",
  password: "password",
  debug: false,
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("MySQL Connected!");
});

module.exports = con;