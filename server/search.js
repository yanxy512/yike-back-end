const dbserver = require('../dao/dbserver')

//搜索用户
exports.searchUser = function(req,res){
    var data = req.body.data

    dbserver.searchUser(data,res)
}

//是否为好友
exports.isFriend = function(req,res){
    var data = req.body
    
    dbserver.isFriend(data,res)
}


//搜索群
exports.searchGroup = function(req,res){
    var data = req.body.data

    dbserver.searchGroup(data,res)
}


//是否在群中
exports.isInGroup = function(req,res){
    var gID = req.body.gID
    var uID = req.body.uID

    dbserver.searchUser(gID,uID,res)
}