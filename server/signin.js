const dbserver = require('../dao/dbserver')

//用户登录
exports.signIn = function(req,res){
    var data = req.body
    dbserver.UserAuthentication(data,res)
}