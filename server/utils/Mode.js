const mode = {
  OPERATION_FAILED: 0,    // 操作失败
  PASSWORD_CORRECT: 1,   // 密码正确
  PASSWORD_INCORRECT: 2, // 密码错误
  USER_NOT_EXIST: 3,    // 用户不存在
  LOW_PERMISSION: 4,    // 低权限（管理员）
  IDCARD_INCORRECT: 5,  // 身份证号不正确
  UPDATE_PWD_SUCCESS: 6,  // 密码修改成功
};

module.exports = mode;