const dbserver = require('../dao/dbserver')

module.exports = function(io){
  let users = {}
  io.on('connection',(socket)=>{
    //用户登录注册
    socket.on('join',(id)=>{
      socket.name = id
      users[id] = socket.id
      socket.emit('join',socket.id)
    })
    //用户一对一消息
    socket.on('msg',(msg,fromid,toid)=>{
      dbserver.friendLastTime(fromid,toid)
      dbserver.insertMsg(fromid,toid,msg.message,msg.types)
      if(users[toid]){
        socket.to(users[toid]).emit('msg',msg,fromid,0)
      }
      socket.emit('msg',msg,toid,1)
    })
    //用户离开
    // socket.on('disconnecting',()=>{
    //   if(users.hasOwnProperty(socket.name)){
    //     delete users[socket.name]
    //   }
    // })
    socket.on('group',function(data){
      socket.join(data)
    })
    socket.on('groupMsg',function(msg,fromid,gid,name,img_url){
      socket.to(gid).emit('groupmsg',msg,gid,0,name,img_url)
    })
  })
}