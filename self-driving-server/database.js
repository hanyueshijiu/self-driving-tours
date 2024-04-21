const mysql = require('mysql2');

// 使用连接池提高性能
const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '123',
  database: 'self_driving',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

module.exports = promisePool;