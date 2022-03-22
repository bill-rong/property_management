// 数据库连接助手
const mysql = require('mysql');

const DB = require('./DB');

const conn = mysql.createConnection(DB.mysql);

function sqlRun(sql, arr, callback) {
  conn.connect(err => {
    if (err) {
      console.log("数据库连接失败");
    }
  });
  // 执行sql语句
  conn.query(sql, arr, callback);

  conn.end(err => {
    if (err) {
      console.log("关闭数据库连接失败");
    }
  });
}

module.exports = sqlRun