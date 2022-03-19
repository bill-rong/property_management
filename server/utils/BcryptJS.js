module.exports =  {
  /**
   * MD5加密
   * @param {*} word 明文密码
   * @returns 加密后的密码
   */
  encrypt(word) {
    const bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(12);    //定义密码加密的计算强度,默认10
    var hash = bcrypt.hashSync(word, salt);   //变量hash就是加密后的密码
    return hash;
  },
  
  /**
   * MD5密码验证
   * @param {*} word 明文密码
   * @param {*} encryptWord 加密过后的密码
   * @returns true || false
   */
  decrypt(word, encrypted) {
    const bcrypt = require('bcryptjs');
    return bcrypt.compareSync(word, encrypted);
  }
};