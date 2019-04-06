
//数据操作模块，只处理数据，不处理业务

var fs = require('fs')

var dbpath = './db.json'

//获取所有的学生列表

exports.find = function(callback){
    fs.readFile(dbpath,'utf-8',function(err,data){
        // JSON.parse(data).students
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        callback(null,students)
    })
}


//根据id获取学生信息
exports.findById = function(id,callback){
    fs.readFile(dbpath,'utf-8',function(err,data){
        // JSON.parse(data).students
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        var ret = students.find(function(item){
            return item.id === parseInt(id)
        })
        callback (null,ret)
    })
}

//获取保存学生

exports.save = function(student,callback){
    fs.readFile(dbpath,'utf-8',function(err,data){
        // JSON.parse(data).students
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        //处理id，使id唯一
        student.id = students[students.length-1].id+1
        //把用户传递的对象保存到数组当中
        students.push(student)
        //JSON.stringify() 方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串
        var ret = JSON.stringify({
            students:students
        })

        fs.writeFile(dbpath,ret,function(err){
            if(err){
                return callback(err)
            }
            //成功就没有错，所以错误对象就是null
            callback(null)
        })

    })
}


//更新学生


exports.updateById = function(student,callback){
    fs.readFile(dbpath,'utf-8',function(err,data){
        // JSON.parse(data).students
        if(err){
            return callback(err)
        }
       var students =JSON.parse(data).students

       //注意，将id 转化成统一的数字
       student.id  = parseInt(student.id)

       //你要修改谁就需要得到谁
       //这是ES6中的一个数组函数 find，需要接受一个函数作为参数

       //遍历数组，返回遍历项
       //注意：返回的是数据，不是数组的下标
       var stu = students.find(function(item){
           return item.id === student.id
       })
       //遍历拷贝对象
       for(var key in student){
           stu[key] = student[key]
       }

       var fileDate = JSON.stringify({
           students:students
       })

       fs.writeFile(dbpath,fileDate,function(err){
           if(err){
               return callback(err)
           }
           callback(null)
       })
    })
}

//删除学生

exports.deleteById = function(id,callback){
    fs.readFile(dbpath,'utf-8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students

        //findIndex根据条件查找下标   
        var deleteId = students.findIndex(function(item){
            return item.id === parseInt(id)
        })
        //删除
        students.splice(deleteId,1)
        //重写
        var ret = JSON.stringify({
            students:students
        })
        fs.writeFile(dbpath,ret,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}
