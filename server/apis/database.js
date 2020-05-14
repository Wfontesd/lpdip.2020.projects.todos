'use strict';

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'rtlry',
  database: 'lpdip01'
});

module.exports = connection;