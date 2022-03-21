const MODE = require('../utils/Mode');

const jsonWrite = function(res, result) {
  if(typeof result === 'undefined') {
    res.json({
      code: MODE.OPERATION_FAILED,
      msg: '操作失败'
    });
  } else {
    console.log("请求返回-> status: ", res.status, "  date: ", result);
    res.json(result);
  }
};

module.exports = jsonWrite;