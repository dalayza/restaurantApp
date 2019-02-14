// get the client
const mysql = require('mysql2');


// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    database: 'saboroso',
    password: '1234567812345678'
  });


  module.exports = connection;