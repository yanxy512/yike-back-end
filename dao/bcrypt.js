const bcrypt = require('bcryptjs');

//密码加密
exports.encryption = function(e){
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(e, salt)

    return hash;
}

//验证密码
exports.verification = function(e,hash){
    let verifi = bcrypt.compareSync(e, hash) 
    return verifi;
}