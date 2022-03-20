// sql语句
var sqlMap = {
    user: {
        // 用户登录
        login: "select tel, name, password from resident where tel=?;",
        // 添加用户
        add: 'insert into user(name, age) values (?, ?)',
        // 查询用户
        select: 'select * from resident;',

    }
}

module.exports = sqlMap;