const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",      // ← your MySQL root password
  database: "fitness_friend"
});
module.exports = db;