// 数据库表名
var property_management = {
  resident: "resident",
  admin: "admin"
}

// sql语句
const sqlMap = {
  user: {
    // 用户登录
    login: "SELECT tel, name, password FROM resident WHERE tel=?;",
    // 添加用户
    add: 'INSERT INTO user(name, age) VALUES (?, ?)',
    // 查询所有用户
    selectAll: 'SELECT * FROM resident;',
    // 查询单个用户
    selectByTel: 'SELECT * FROM resident WHERE tel=?;',
    // 修改密码
    updatePwd: 'UPDATE resident SET password=? WHERE tel=?;',

  },
  admin: {
    // 物业管理员登录
    login: "SELECT tel, name, password, permission FROM admin WHERE tel=?;"
  }
}

module.exports = sqlMap;