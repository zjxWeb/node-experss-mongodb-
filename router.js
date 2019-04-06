//设置路由用户
var student = require('./student')

//设置路由用户
var user = require('./user')

//引入express
var express = require('express')

// 路由模块
var router = express.Router()

//加密
var md5 = require('blueimp-md5')

//文件模块
var fs = require('fs')


router.get('/users',function(req,res,next){
	// fs.readFile('db.json','utf-8',function(err,data){
	// })

	// console.log(req.session.isLogin)
	student.find(function(err,students)
	{
		
		if(err){
			return res.status(500).send('server err')
		}
		res.render('index.html',{
			
			fru:[
				{'pic':"/public/img/1.jpg",'txt1':"张三",'txt2':"优秀"},
				{'pic':"/public/img/2.jpg",'txt1':"李四",'txt2':"优秀"},	
				{'pic':"/public/img/3.jpg",'txt1':"刘六",'txt2':"良"},
				{'pic':"/public/img/4.jpg",'txt1':"合金",'txt2':"优秀"}
			],
			students:students,
			user:req.session.user
			
		})
	
	})

})



//登陆，注册
router.get('/users/login',function(req,res,next){
	res.render('login.html')
})

router.post('/users/login',function(req,res,next){
	var body = req.body
	user.findOne({
		text4:body.text4,
		text2:md5(md5(body.text2))	
	},function(err,user){
		if(err){
			// return res.status(500).json({
			// 	err_code:500,
			// 	message:err.message
			// })
			return next(err)
		}

		if(!user){
			return res.status(200).json({
				err_code:1,
				message:'emil or password is invalid'
			})
		}

		req.session.user = user

		res.status(200).json({
			err_code:0,
			message:'ok'
		})
	}) 
})

//退出
router.get('/users/login',function(req,res,next){
	req.session.user = null;
	console.log(req.session.user)
	res.redirect('/users/login')
})


router.get('/users/resgister',function(req,res,next){
	res.render('resgister.html')
})


router.post('/users/resgister',function(req,res,next){
	// 1.获取表单提交的数据
	// 2.操作数据库
	// 3.发送数据
	var body = req.body
	user.findOne({
		$or:[
			{
				text4:body.text4
			},
			{
				text1:body.text1
			}
		]
	},function(err,data){
		if(err)
		{
			return next(err)
		}
		if(data){
			//邮箱或者昵称已经存在
			return res.status(200).json({
				err_code:1,
				message:'email and username alery exists'
			})
		}
		//加密 md5 重复加密
		body.text2 = md5(md5(body.text2))
		new user(body).save(function(err,user){
			if(err){
				return next(err)
			}
			//express --json他会自动帮你把对象转为字符串发送给浏览器
			  //注册成功，使用session记录用户的登陆状态
		req.session.user = user
		
		res.status(200).json({
			err_code:0,
			message:'ok'
			
		})
		
		})
	})
	
})


router.get('/students/new',function(req,res,next){
	res.render('new.html')
})


router.get('/users/settting',function(req,res,next){
	res.render('settting.html')
})
 
router.post('/students/new',function(req,res,next){
	new student(req.body).save(function(err){
		if(err)
		{
			return next(err)
		}
		res.redirect('/users')
	})
})
router.get('/students/edit',function(req,res,next){
	//渲染编辑页面
		//根据id吧学生信息查出来
		//使用模板引擎渲染页面
	// res.render('edit.html',{
	// })
	student.findById(req.query.id.replace(/"/g,''),function(err,student){
		if(err){
			return next(err)
		}
		res.render('edit.html',{
			 student:student
		})
	})
})

router.post('/students/edit',function(req,res,next){
	//1.获取表单数据 req.query
	//2.更新 student.updateById
	var id = req.body.id.replace(/"/g,'')
	student.findByIdAndUpdate(id,req.body,function(err){
		if(err)
		{
			return next(err)
		}
		res.redirect('/users') 
	})
})

router.get('/students/delete',function(req,res,next){
	var id = req.query.id.replace(/"/g,'')
	student.findByIdAndRemove(id,function(err){
		if(err){
			return next(err)
		}
		res.redirect('/users')
	})
})


module.exports = router
     