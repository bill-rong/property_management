// 数据库表名
var property_management = {
  resident: "resident",
  admin: "admin"
}

// sql语句
const sqlMap = {
  user: {
    // 用户登录
    login: "SELECT tel, name, password FROM resident WHERE tel=? and living='1';",
    // 添加用户
    add: 'INSERT INTO resident(tel, idcard, name, sex, email, birthday, password, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
    // 查询所有用户
    selectAll: 'SELECT * FROM resident;',
    // 查询单个用户
    selectByTel: 'SELECT rs.*, room.name room FROM resident rs LEFT JOIN room on rs.id=room.resident_id WHERE tel=?;',
    // 修改信息
    updateInfo: "UPDATE resident SET idcard=?, SET name=?, SET sex=?, SET email=?, SET birthday=? WHERE tel=?;",
    // 修改密码
    updatePwd: 'UPDATE resident SET password=? WHERE tel=?;',
    // 注销用户
    unRegister: "UPDATE resident SET living='0' WHERE tel=?;",
    // 删除用户
    delete: "DELETE FROM resident WHERE tel=?;"
  },
  admin: {
    // 物业管理员登录
    login: "SELECT tel, name, password, permission FROM admin WHERE tel=?;",
    // 查询所有管理员
    selectAll: "SELECT * from admin;",
    // 添加管理员
    add: "INSERT INTO admin(tel, name, sex, email, permission, password) VALUES (?, ?, ?, ?, ?, ?);",
    // 修改密码
    updatePwd: "UPDATE admin SET password=? WHERE tel=?;",
    // 修改管理员信息
    updateInfo: "UPDATE admin SET name=?, SET sex=?, SET email=? WHERE tel=?",
    // 删除管理员
    delete: "DELETE FROM admin WHERE tel=?;"
  }
}

module.exports = sqlMap;