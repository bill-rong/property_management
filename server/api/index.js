
const express = require('express');
const router = express.Router();
const sqlRun = require('../DBHelper');

const $sql = require('../sqlMap');




var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    console.log("数据返回-> " + ret);
    res.json(ret);
  }
};

// 模板
// router.post('/router', (req, res) => {
//   let sql = $sql.user.add;
//   let params = req.body;
//   console.log(params);
//   sqlRun(sql, [params.name, params.age], function(err, result) {
//     if (err) {
//       console.log("添加失败"+err);
//     }
//     if (result) {
//       jsonWrite(res, result);
//     }
//   })
// });

router.get('/getUser', (req, res) => {
  console.log("请求接口-> /api/user/getUser");
  let sql = $sql.user.select;
  sqlRun(sql, (err, result) => {
    if (err) {
      console.log("失败" + err);
    }
    if (result) {
      jsonWrite(res, result);
      // res.json(result)
    }
  });
});


module.exports = router;