const dbserver = require('../dao/dbserver')
const emailserver = require('../dao/emailserver')
const signup = require('../server/signup')
const signin = require('../server/signin')
const search = require('../server/search')
const userdetails = require('../server/userdetails')
const friend = require('../server/friend')
const index = require('../server/index')
const chat = require('../server/chat')
const group = require('../server/group')

module.exports = function(app){
    //注册页面
    //注册
    app.post('/signup/add',(req,res)=>{
        signup.buildUser(req,res);
    })

    //检验用户名和邮箱重复
    app.post('/signup/judge',(req,res)=>{
        signup.CheckRepeat(req,res)
    })

    //登录页面
    //登录
    app.post('/signin/match',(req,res)=>{
        signin.signIn(req,res)
    })

    //搜索页面
    //搜索用户
    app.post('/search/searchuser',(req,res)=>{
        search.searchUser(req,res)
    })

    //是否为好友
    app.post('/search/isfriend',(req,res)=>{
        search.isFriend(req,res)
    })

    //搜索群
    app.post('/search/searchgroup',(req,res)=>{
        search.searchGroup(req,res)
    })

    //是否在群中
    app.post('/search/isingroup',(req,res)=>{
        search.isInGroup(req,res)
    })

    //用户页
    //用户详情
    app.post('/user/details',(req,res)=>{
        // console.log('router')
        userdetails.userDetails(req,res)
    })

    //用户修改个人信息
    app.post('/user/update',(req,res)=>{
        userdetails.userUpdate(req,res)
    })

    //好友昵称修改
    app.post('/user/friendnick',(req,res)=>{
        userdetails.friendNick(req,res)
    })

    //获得好友昵称
    app.post('/user/getfriendnick',(req,res)=>{
        userdetails.getfriendNick(req,res)
    })

    //添加好友
    app.post('/friend/applyfriend',(req,res)=>{
        friend.applyFriend(req,res)
    })

    //更新好友状态
    //同意好友
    app.post('/friend/agreefriend',(req,res)=>{
        friend.agreeFriend(req,res)
    })

    //删除好友
    app.post('/friend/deletefriend',(req,res)=>{
        friend.deleteFriend(req,res)
    })

    //首页
    //按需求获取用户列表
    app.post('/index/getuser',(req,res)=>{
        index.getUser(req,res)
    })

    //获取一条消息
    app.post('/index/getonemsg',(req,res)=>{
        index.getOneMsg(req,res)
    })

    //获取消息总和 
    app.post('/index/upreadmsg',(req,res)=>{
        index.upReadMsg(req,res)
    })

    //改变消息状态
    app.post('/index/updatemsg',(req,res)=>{
        index.updateMsg(req,res)
    })

    //获取群列表
    app.post('/index/getgroup',(req,res)=>{
        index.getGroup(req,res)
    })

    //按要求获取群消息
    app.post('/index/getonegroupmsg',(req,res)=>{
        index.getOneGroupMsg(req,res)
    })
    
    //群消息状态修改
    app.post('/index/updategroupmsg',(req,res)=>{
        index.updateGroupMsg(req,res)
    })

    //聊天页面
    //获取分页消息
    app.post('/chat/getpagingmessage',(req,res)=>{
        chat.getPagingMessage(req,res)
    })

    //群页面
    ////新建群
    app.post('/group/buildgroup',(req,res)=>{
        group.buildGroup(req,res)
    })

    //添加群成员
    app.post('/group/insertgroup',(req,res)=>{
        group.insertGroup(req,res)
    })
}