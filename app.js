
var express = require('express')

var path = require('path')

var router = require('./router')

var fs = require('fs')

var bodyParser = require('body-parser')

var session = require('express-session')

var app = express()

const hostname = '127.0.0.1';
app.use('/public/',express.static(path.join(__dirname,'./public/')))

app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

//在express这个框架中，默认不支持session和cookie
//但是我们可以使用第三方中间件，express-session 来解决
app.use(session({
	secret: 'itcast',//配置加密字符串
	resave: false,
	saveUninitialized: true//无论你是否使用session，我都默认直接给你分配一把钥匙
  }))



app.set('views',path.join(__dirname,'./views'))//默认就是 ./views 目录

app.engine('html',require('express-art-template'))

//配置模板引擎和body-parse必须在 app.use(router)挂在；路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(router)

//配置404页面
app.use(function(req,res,next){
	res.render('404.html')
})

//配置全局错误处理中间件

app.use(function(err,req,res,next){
	res.status(500).json({
		err_code:500,
		message:err.message
	})
})

const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`serve starded on  ${port}`)
})

module.exports = app