const express = require('express');
const router = express.Router();
const sqlRun = require('../DBHelper');
const SQL = require('../sqlMap');
const bcryptjs = require('../utils/BcryptJS');
const bcrypt = require('../utils/BcryptJS');
const MODE = require('../utils/Mode');
const jsonWrite = require('../utils/JsonWrite');
const JWT = require('../utils/Token');
const multer = require('multer')
const fs = require('fs')

const api = {
  uploadImg: '/img',
  readImg: '/public/images'
}

//图片上传
router.post(api.uploadImg,
  multer({
    //设置文件存储路径
    dest: "public/images",
  }).array("file", 1),
  function (req, res, next) {
    let files = req.files;
    let file = files[0];
    let fileInfo = {};
    let type = file.originalname.replace(/.+\./g,'');
    let path = "public/images/" + Date.now().toString() + '.' + type;
    fs.renameSync("./public/images/" + file.filename, path);
    //获取文件基本信息
    fileInfo.type = file.mimetype;
    fileInfo.name = file.originalname;
    fileInfo.size = file.size;
    fileInfo.path = path;
    jsonWrite(res, {
      mode: MODE.UPLOAD_SUCCESS,
      msg: "图片上传成功",
      data: fileInfo,
    });
  }
)


module.exports = router;