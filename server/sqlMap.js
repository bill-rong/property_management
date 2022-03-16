// sql语句
var sqlMap = {
    user: {
        // 添加用户
        add: 'insert into user(name, age) values (?, ?)',
        // 查询用户
        select: 'select * from user;'
    }
}

module.exports = sqlMap;