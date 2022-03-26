const mongoose = require('mongoose');
const db = require('../config/db')
const Schema = mongoose.Schema

var UserSchema = new Schema(
    {
        name:{type:String},//用户名
        email:{type:String},//邮箱
        birth:{type:Date},//生日
        sex:{type:String,default:'unknown'},//
        phone:{type:Number},//电话
        psw:{type:String},//密码
        time:{type:Date},//注册时间
        news:{type:String},//签名
        img_url:{type:String,default:'/user/user.png'},//头像链接
    }
)

var FriendSchema = new Schema(
    {
        userID:{type:Schema.Types.ObjectId,ref:'User'},//用户ID
        friendID:{type:Schema.Types.ObjectId,ref:'User'},//好友ID
        time:{type:Date},//生成时间
        status:{type:Number},//好友状态（0已为好友，1申请中，2申请发送）
        nick:{type:String},//好友昵称
        lastTime:{type:Date},//最后通讯时间
    }
)

var MessageSchema = new Schema(
    {
        userID:{type:Schema.Types.ObjectId,ref:'User'},//用户ID
        friendID:{type:Schema.Types.ObjectId,ref:'User'},//好友ID
        message:{type:String},//发送内容
        types:{type:Number},//内容类型(0文字，1图片链接，2音频链接)
        time:{type:Date},//发送时间
        status:{type:Number},//消息状态（0已读，1未读）
    }
)

var GroupSchema = new Schema(
    {
        userID:{type:Schema.Types.ObjectId,ref:'User'},//用户ID
        name:{type:String},//群名
        img_url:{type:String,default:'group.png'},//群封面链接
        notice:{type:String},//群公告
        time:{type:Date},//群建立时间
    }
)

var GroupUserSchema = new Schema(
    {
        groupID:{type:Schema.Types.ObjectId,ref:'Group'},//群ID
        userID:{type:Schema.Types.ObjectId,ref:'User'},//用户ID
        nick:{type:String},//群内名
        time:{type:Date},//加入时间
        tip:{type:Number,default:0},//未读消息
        shield:{type:Number},//屏蔽群消息
        lastTime:{type:Date},//最后通讯时间
    }
)

var GroupMsgSchema = new Schema(
    {
        groupID:{type:Schema.Types.ObjectId,ref:'Group'},//群ID
        userID:{type:Schema.Types.ObjectId,ref:'User'},//用户ID
        time:{type:Date},//发送时间
        message:{type:String},//发送内容
        types:{type:Number},//内容类型(0文字，1图片链接，2音频链接)
        status:{type:Number},//消息状态（0已读，1未读）
    }
)

module.exports = db.model('User',UserSchema)
module.exports = db.model('Friend',FriendSchema)
module.exports = db.model('Message',MessageSchema)
module.exports = db.model('Group',GroupSchema)
module.exports = db.model('GroupUser',GroupUserSchema)
module.exports = db.model('GroupMsg',GroupMsgSchema)

