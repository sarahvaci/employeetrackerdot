const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: ' ', //insert your password
      database: 'employees_db'
    });

  module.exports = connection;
