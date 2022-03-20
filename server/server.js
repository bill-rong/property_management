//搭建express服务
const express = require('express')
const app = express()
//post 请求表单数据
app.use(express.urlencoded({ extended: true }))
//资源共享
const cors = require('cors')
app.use(cors())
//静态文件托管 ----  访问：http:localhost:8989/图片.jpg
app.use(express.static('upload'))

// const bcrypt = require('bcrypt');
// app.use(bcrypt())
const JWT = require('./utils/Token')


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//路由
const userApi = require('./api/user')
const bcrypt = require('bcryptjs/dist/bcrypt')

app.use(function (req, res, next) { // 拦截请求
  console.log("请求接口-> ", req.url, req.body);
  if (req.url.includes("login")) {
    console.log("登录请求");
    next();
  } else {
    let token = req.headers['Authorization'] || req.body.token || req.query.token;
    if (token) {
      // 解码 token (验证 secret 和检查有效期（exp）)
      let verifyRes = JWT.verify(token);
      if (verifyRes.flag) {
          next(); //继续下一步路由
      } else {

      }
    } else {
      // // 没有拿到token 返回错误 
      // return res.status(403).send({
      //     success: false,
      //     message: '没有找到token.'
      // });
      next();
    }
  }



});

app.use('/api/user', userApi)




app.listen(3000, () => {
    console.log('success listen at port:3000......');
})




