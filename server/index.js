const dbserver = require('../dao/dbserver')

//按需求获取用户列表
exports.getUser = function(req,res){
    var data = req.body
    if(data.state == 0){
        dbserver.getUsers(data,res)
    }else if(data.state == 1){
        dbserver.getUser(data,res)
    }
}

//获取一条消息
exports.getOneMsg = function(req,res){
    var data = req.body
    dbserver.getOneMsg(data,res)
}

//获取消息总和 
exports.upReadMsg = function(req,res){
    var data = req.body
    dbserver.upReadMsg(data,res)
}

//改变消息状态
exports.updateMsg = function(req,res){
    var data = req.body
    dbserver.updateMsg(data,res)
}

//获取群列表
exports.getGroup = function(req,res){
    var data = req.body
    dbserver.getGroup(data,res)
}

//按要求获取群消息
exports.getOneGroupMsg = function(req,res){
    var data = req.body
    dbserver.getOneGroupMsg(data,res)
}

//群消息状态修改
exports.updateGroupMsg = function(req,res){
    var data = req.body
    dbserver.updateGroupMsg(data,res)
}

