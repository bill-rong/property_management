const mode = {
  OPERATION_FAILED: 0,    // 操作失败
  PASSWORD_CORRECT: 1,   // 密码正确
  PASSWORD_INCORRECT: 2, // 密码错误
  USER_NOT_EXIST: 3,    // 用户不存在
  LOW_PERMISSION: 4,    // 低权限（管理员）
  IDCARD_INCORRECT: 5,  // 身份证号不正确
  UPDATE_PWD_SUCCESS: 6,  // 密码修改成功
  UPDATE_INFO_SUCCESS: 7, // 修改信息成功
  UPDATE_SUCCESS: 8,       // 修改成功
  UPDATE_FAILURE: 14,     // 修改失败
  ADD_SUCCESS: 9,         // 添加成功
  ADD_FAILURE: 10,        // 修改失败
  DELETE_SUCCES: 11,       // 删除成功
  DELETE_FAILURE: 12,      // 删除失败
  USER_IS_EXIST: 13,        // 用户存在
  TOLL_SUCCESS: 15,       // 收费发起成功
  TOLL_FAILURE: 16,       // 收费发起失败
  UPLOAD_SUCCESS: 17,     // 上传成功
  UPLOAD_FAILURE: 18,     // 上传失败
};

module.exports = mode;