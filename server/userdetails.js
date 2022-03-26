const dbserver = require('../dao/dbserver')

//用户详情
exports.userDetails = function(req,res){
    var data = req.body
    // console.log(data)
    dbserver.userDetails(data,res)
}

//修改用户个人信息
exports.userUpdate = function(req,res){
    var data = req.body
    dbserver.userUpdate(data,res)
}

//修改好友昵称
exports.friendNick = function(req,res){
    var data = req.body
    dbserver.friendNick(data,res)
}

//获得好友昵称
exports.getfriendNick = function(req,res){
    var data = req.body
    dbserver.getfriendNick(data,res)
}