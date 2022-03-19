// 数据库连接助手
const mysql = require('mysql');

const DB = require('./db');

const conn = mysql.createConnection(DB.mysql);
conn.connect();


//封装数据库操作语句 sql语句 参数数组arr  callback成功函数结果
// function sqlRun(sql, arr, callback) {
//     conn.query(sql, arr, function (error, result) {
//         if (error) {
//             console.log('数据库语句错误');
//             return;
//         }
//         callback(result)
//     })
// }
function sqlRun(sql, arr, callback) {
    conn.query(sql, arr, callback)
}

module.exports = sqlRun