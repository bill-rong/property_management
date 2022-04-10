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
    updateInfo: "UPDATE resident SET idcard=?, name=?, sex=?, email=?, birthday=? WHERE tel=?;",
    // 修改密码
    updatePwd: 'UPDATE resident SET password=? WHERE tel=?;',
    // 注销用户
    unRegister: "UPDATE resident SET living='0' WHERE tel=?;",
    // 删除用户
    delete: "DELETE FROM resident WHERE tel=?;",
  },
  admin: {
    // 物业管理员登录
    login: "SELECT tel, name, password, permission FROM admin WHERE tel=?;",
    // 查询管理员
    selectAll: "SELECT * FROM admin;",
    selectByTel: "SELECT * FROM admin WHERE tel=?;",
    // 添加管理员
    add: "INSERT INTO admin(tel, name, sex, email, permission, password) VALUES (?, ?, ?, ?, ?, ?);",
    // 修改密码
    updatePwd: "UPDATE admin SET password=? WHERE tel=?;",
    // 修改管理员信息
    updateInfo: "UPDATE admin SET name=?, sex=?, email=? WHERE tel=?",
    // 删除管理员
    delete: "DELETE FROM admin WHERE tel=?;"
  },
  community: {
    select: "SELECT * FROM community;",
    update: "UPDATE community SET `name`=?, created=?, `describe`=?, phone=?, address=?;",

    selectBuilding: "SELECT * FROM building;",
    selectBuildingByName: "SELECT * FROM building;",
    updateBuilding: "UPDATE building SET name=? WHERE id=?;",
    addBuilding: "INSERT INTO building(name) VALUES(?);",
    deleteBuilding: "DELETE FROM building WHERE id=?;",

    selectRoom: "SELECT rm.*, bd.name bdname, ri.name riname FROM room rm LEFT JOIN building bd ON rm.building_id=bd.id LEFT JOIN resident ri ON ri.id=rm.resident_id;",
    selectRoomName: "SELECT name value from room;",
    selectRoomByName: "SELECT name FROM room WHERE name=?;",
    updateRoomUnLiving: "UPDATE room SET living='0', resident_id=null WHERE `name`=?;",
    updateRoomLiving: "UPDATE room SET living='1', resident_id=? WHERE `name`=?;",
    addRoom: "INSERT INTO room(building_id, name) VALUES(?);",
    deleteRoom: "DELETE FROM room WHERE id=?;"
  },
  payment: {
    selectUnPay: "SELECT * FROM property_management.payment WHERE handler='0';",
    selectPay: "SELECT * FROM property_management.payment WHERE handler!='0';",
    selectUnPayByRoom: "SELECT * FROM property_management.payment WHERE handler='0' and room=?;",
    selectPayByRoom: "SELECT * FROM property_management.payment WHERE handler!='0' and room=?;",
    pay: "UPDATE payment SET handler=?, paydate=? WHERE id=?;"
  },
  announcement: {
    add: "",
    get: "SELECT announcement.*,admin.name name FROM announcement LEFT JOIN admin on announcement.admin_id=admin.id order by date DESC;"
    
  },
  repair: {
    add: "INSERT INTO repair(contacts,tel,room,`type`,`describe`,`date`) VALUES(?,?,?,?,?,?);"
  }
  
}

module.exports = sqlMap;