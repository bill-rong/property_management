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


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//路由
const userApi = require('./api/user')
const bcrypt = require('bcryptjs/dist/bcrypt')

app.use('/api/user',userApi)


app.listen(3000,()=>{
    console.log('success listen at port:3000......');
})




