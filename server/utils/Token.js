const secret = "liaobirong";
const jwt  = require('jsonwebtoken');

module.exports =  {
  /**
   * 生成token
   * @param {*} payload 用户信息
   * @returns 
   */
  sign(payload) {
    let token = jwt.sign(payload, secret);
    console.log("生成token  ", token);
    return token
  },
  /**
   * 验证token
   * @param {*} token 
   * @returns 
   */
  verify(token) {
    let flag = false;
    let payload = jwt.verify(token, secret, (err, decode) => {
        if (err) {
            flag = false;
            console.log("token 错误 ", err);
        } else {
            flag = true;
            console.log("token 验证成功 ", decode);
        }
    });
    return {
        flag: flag,
        payload: payload
    }
  }
};