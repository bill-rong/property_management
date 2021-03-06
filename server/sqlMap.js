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
    add: 'INSERT INTO resident(tel, idcard, name, sex, email, birthday, password, living, date) VALUES (?, ?, ?, ?, ?, null, ?, \'1\', ?);',
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
    delete: "DELETE FROM resident WHERE id=?;",
    bindRoom: "UPDATE room SET living='1', resident_id=? where id=?;",
    unBingRoom: "update property_management.room set living='0', resident_id=null where resident_id=?;"
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
    delete: "DELETE FROM admin WHERE tel=?;",
    // 修改权限
    updatePermission: "UPDATE admin SET permission=? WHERE tel=?;"
  },
  community: {
    select: "SELECT * FROM community;",
    update: "UPDATE community SET `name`=?, created=?, `describe`=?, phone=?, address=?;",

    selectBuilding: "SELECT * FROM building;",
    selectBuildingByName: "SELECT * FROM building WHERE name=?;",
    updateBuilding: "UPDATE building SET name=? WHERE id=?;",
    addBuilding: "INSERT INTO building(name) VALUES(?);",
    deleteBuilding: "DELETE FROM building WHERE id=?;",
    deleteBuilding: "DELETE FROM building WHERE id=?;",
    deleteRoomInBuilding: "DELETE FROM room WHERE building_id=?;",

    selectRoom: "SELECT rm.*, bd.name bdname, ri.name riname FROM room rm LEFT JOIN building bd ON rm.building_id=bd.id LEFT JOIN resident ri ON ri.id=rm.resident_id;",
    selectRoomName: "SELECT name value from room;",
    selectRoomLiving: "SELECT name value from room WHERE living='1';",
    selectRoomUnLiving: "SELECT * from room WHERE living='0';",
    selectRoomByName: "SELECT name FROM room WHERE name=?;",
    updateRoomUnLiving: "UPDATE room SET living='0', resident_id is null WHERE `name`=?;",
    updateRoomLiving: "UPDATE room SET living='1', resident_id=? WHERE `name`=?;",
    addRoom: "INSERT INTO room(building_id, name) VALUES(?,?);",
    deleteRoom: "DELETE FROM room WHERE id=?;",

    getParking: "SELECT parking.id,parking.name,resident_tel,ri.name riName,license FROM parking LEFT JOIN resident ri ON ri.tel=parking.resident_tel;",
    getParkingBind: "SELECT * FROM parking where resident_tel is not null;",
    addParking: "INSERT INTO parking(name) VALUES(?);",
    bindParking: "UPDATE parking SET resident_tel=?, license=?, date=? WHERE id=?;",
    unbindParking: "UPDATE parking SET resident_tel=null, license=null, date=null WHERE id=?;"
  },
  payment: {
    selectUnPay: "SELECT * FROM property_management.payment WHERE handler='0';",
    selectPay: "SELECT * FROM property_management.payment WHERE handler!='0';",
    selectUnPayByRoom: "SELECT * FROM property_management.payment WHERE handler='0' and room=?;",
    selectPayByRoom: "SELECT * FROM property_management.payment WHERE handler!='0' and room=?;",
    pay: "UPDATE payment SET handler=?, paydate=? WHERE id=?;",
    toll: "INSERT INTO payment(type,room,current,curryear,currmonth,amount) VALUES(?,?,?,?,?,?);",
    delete: "DELETE FROM payment WHERE id=?;"
  },
  announcement: {
    add: "INSERT INTO announcement(title,content,admin_tel,`date`) VALUES(?,?,?,?);",
    get: "SELECT announcement.*,admin.name name FROM announcement LEFT JOIN admin on announcement.admin_tel=admin.tel order by date DESC;",
    delete: "DELETE FROM announcement WHERE id=?;",
  },
  repair: {
    add: "INSERT INTO repair(contacts,tel,room,`type`,`describe`,`date`,status) VALUES(?,?,?,?,?,?,'0');",
    handle: "UPDATE repair SET status='1' WHERE id=?;",
    selectUnHandle: "SELECT * FROM repair WHERE status='0';",
    selectUnHandleByRoom: "SELECT * FROM repair WHERE status='0' and room=?;",
    selectHandle: "SELECT * FROM repair WHERE status='1';",
    selectHandleByRoom: "SELECT * FROM repair WHERE status='1' and room=?;",
    selectRepairByTel: "SELECT * FROM repair WHERE tel=? order by date DESC;",
  },
  complaint: {
    add: "INSERT INTO complaint(contacts,tel,`describe`,`date`,status) VALUES(?,?,?,?,'0');",
    handle: "UPDATE complaint SET status='1' WHERE id=?;",
    selectUnHandle: "SELECT * FROM complaint WHERE status='0';",
    selectUnHandleByRoom: "SELECT * FROM complaint WHERE status='0' and room=?;",
    selectHandle: "SELECT * FROM complaint WHERE status='1';",
    selectHandleByRoom: "SELECT * FROM complaint WHERE status='1' and room=?;",
    selectComplaintByTel: "SELECT * FROM complaint WHERE tel=? order by date DESC;",
  },
  pet: {
    selectAll: 'SELECT * FROM pet;',
    selectByRoom: 'SELECT * FROM pet WHERE resident=?;',
    add: 'INSERT INTO pet(resident,variety,name,documents,path) VALUES(?,?,?,?,?);',
    delete: "DELETE FROM pet WHERE id=?;",
  },
  visitor: {
    selectAll: 'SELECT * FROM visitor;',
    selectByRoom: 'SELECT * FROM visitor WHERE room=?;',
    add: 'INSERT INTO visitor(name,room,resident,purpose,date) VALUES(?,?,?,?,?);',
    delete: "DELETE FROM visitor WHERE id=?;",
  },
  healthy: {
    selectAll: 'SELECT * FROM healthy;',
    selectByRoom: 'SELECT * FROM healthy WHERE room=?;',
    delete: 'DELETE FROM healthy WHERE id=?;',
    add: 'INSERT INTO healthy(name,room,symptom,temperature,supplement,report_time) VALUES(?,?,?,?,?,?);'
  },
  family: {
    add: "INSERT INTO family(resident_tel,idcard,name,sex,relation,tel) VALUES(?,?,?,?,?,?);",
    selectByTel: "SELECT * FROM family WHERE resident_tel=?;",
    select: "SELECT * FROM family;",
    update: "UPDATE family SET idcard=?, name=?, sex=?, relation=?, tel=? WHERE id=?;",
    delete: 'DELETE FROM family WHERE id=?;',
  }
  
}

module.exports = sqlMap;