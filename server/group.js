const dbserver = require('../dao/dbserver')

//新建群
exports.buildGroup = function(req,res){
    var data = req.body
    dbserver.buildGroup(data,res)
}

//添加群成员
exports.insertGroup = function(req,res){
    var data = req.body
    dbserver.insertGroup(data,res)
}