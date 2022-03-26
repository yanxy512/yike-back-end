const dbserver = require('../dao/dbserver')
const email = require('../dao/emailserver')

//用户注册
exports.buildUser = function(req,res){
    var data = req.body
    email.emailSignUp(data.email,res)
    dbserver.buildUser(data,res)
}

//用户
exports.CheckRepeat = function(req,res){
    var data = req.body
    dbserver.CheckRepeat(data,res)
}