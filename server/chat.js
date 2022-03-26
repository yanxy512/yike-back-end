const dbserver = require('../dao/dbserver')

//获取分页消息
exports.getPagingMessage = function(req,res){
    var data = req.body
    dbserver.getPagingMessage(data,res)
}