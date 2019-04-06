//设计数据表
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/itcast',{ useNewUrlParser: true })

var Schema = mongoose.Schema

var studentSchema = new Schema({
    text1:{
        type:String,
        require:true
    },
    text2:{
        type:String,
        require:true
    },
    i5:{
        type:Number,
        require:true
    },
    text4:{
        type:String,
        require:true
    },
    created_time:{
        type:Date,
        //注意：这里不要写 Date.now()因为辉即刻调用
        //这里直接给了一个方法： Date.now
        //当你去 new Model 的时候，如果你没有传递  create_time，则mongoose就会调用default指定的Date.now方法，使用其返回值作为默认值
        default:Date.now
    },
    last_modifyed_time:{
        type:Date,
        default:Date.now
    },
    //lgin
    inputEmail:{
        type:String,
        require:true

    },
    inputPassword:{
        type:String,
        require:true
    },
    ststus:{
        //是否可以评论 可以登陆
        //0没有任何权限限制
        //1 不可以评论
        // 2.不可以登陆
        type:Number,
        enum:[0,1,2],
        default:0
    },
    inputEmail:{
        type:String,
        require:true
    },
    inputPassword:{
        type:String,
        require:true
    }
})

//直接导出模型构造函数
module.exports = mongoose.model('User',studentSchema)