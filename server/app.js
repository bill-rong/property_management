//搭建express服务
const express = require('express')
const app = express()
//post 请求表单数据
app.use(express.urlencoded({ extended: true }))
//资源共享
const cors = require('cors')
app.use(cors())
// http:localhost:3000/public/images/...png
app.use('/public/images', express.static('public/images'))

// 上传图片需要的模块
const multer = require('multer')
const fs = require('fs')

const JWT = require('./utils/Token')


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// 拦截请求  判断token
app.use(function (req, res, next) { 
  console.log("请求接口-> ", req.url, req.body);
  next();
  // if (req.url.includes("login")) {
  //   console.log("登录请求");
  //   next();
  // } else {
  //   let token = req.headers['authorization'];
  //   if (token) {
  //     // 解码 token (验证 secret 和检查有效期（exp）)
  //     let verifyRes = JWT.verify(token);
  //     if (verifyRes.flag) {
  //         next(); //继续下一步路由
  //     } else {
  //       return res.status(401).send({
  //         success: false,
  //         msg: 'token 错误'
  //     });
  //     }
  //   } else {
  //     // 没有拿到token 返回错误 
  //     return res.status(403).send({
  //         success: false,
  //         msg: '没有找到token'
  //     });
  //   }
  // }
});

// 添加接口路由
const user = require('./api/user')
app.use('/api/user', user)

const admin = require('./api/admin')
app.use('/api/admin', admin)

const community = require('./api/community')
app.use('/api/community', community)

const payment = require('./api/payment')
app.use('/api/payment', payment)

const affairs = require('./api/affairs')
app.use('/api/affairs', affairs)

const repair = require('./api/repair')
app.use('/api/repair', repair)

const complaint = require('./api/complaint')
app.use('/api/complaint', complaint)

const upload = require('./api/upload')
app.use('/api/upload', upload)



// 监听3000端口
app.listen(3000, () => {
  console.log("property management");
  console.log('success listen at port: 3000......');
})




