const jwt = require('jsonwebtoken');
const secret = 'yike'

//生成token
exports.createToken = function(id,res){
    let info = {
        id:id,
        time:new Date(),
    }
    let token = jwt.sign(info, secret, {expiresIn:60 * 60 * 10})
    return token
}

//验证Token
exports.verifyToken = function(token) {
    let payload;
    jwt.verify(token, secret, (error, result) => {
        if(error){
            payload = 0;
        } else {
            payload = 1;
        }
    })
    return payload;
}