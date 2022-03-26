const dbserver = require('../dao/dbserver')

//添加好友
exports.applyFriend = function(req,res){
    var data = req.body
    dbserver.applyFriend (data,res)
}

//更新好友状态
exports.agreeFriend = function(req,res){
    var data = req.body
    dbserver.agreeFriend(data,res)
}

//删除好友
exports.deleteFriend = function(req,res){
    var data = req.body
    dbserver.deleteFriend(data,res)
}