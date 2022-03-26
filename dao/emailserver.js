const nodemailer = require("nodemailer");
const credentials = require('../config/credentials')

let transporter = nodemailer.createTransport({
    service: 'QQ', 
    host: 'smtp.qq.com',
    secureConnection: true, 
    port: 465,
    secure: true,
    auth: {
      user: credentials.qq.user, // generated ethereal user
      pass: credentials.qq.pass, // generated ethereal password
    },
})

exports.emailSignUp = function(email,res){
    let options={
        from: '3136465847@qq.com', // sender address
        to: email, // list of receivers
        subject: "感谢使用yike", // Subject line
        html: "<span>感谢使用yike<span> ", // html body
    }
    transporter.sendMail(options,function(res,msg){
        if(msg){
            console.log(err)
        }else{
            console.log('发送成功')
        }
    })
}