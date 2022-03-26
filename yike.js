const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const jwt = require('./dao/jwt')
const WebSocket = require('ws') 
const socket = require('./dao/socket')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// path.join(__dirname, 'public') 表示工程路径后面追加 public
app.use(express.static(path.join(__dirname, '/data')))

app.use(function(req,res,next){
  if(typeof(req.body.token)!=='undefined'){
    let token = req.body.token;
    let tokenMatch = jwt.verifyToken(token);
    if(tokenMatch == 1){
      next();
    }else{
      res.send({code:301});
    }
  }else{
    next();
  }
})

var io = require('socket.io').listen(8082)

require('./dao/socket')(io)
require('./router/index')(app)
require('./router/file')(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})