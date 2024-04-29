// 存储数据库配置信息

const mysql = require('mysql2');

// 使用连接池提高性能
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: true,  // 启用命名占位符
  charset: 'utf8mb4' // 指定字符集
});

const promisePool = pool.promise();

module.exports = promisePool;