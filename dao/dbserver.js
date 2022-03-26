const dbmodel = require('../model/dbmodel')
const bcrypt = require('../dao/bcrypt');
const User = dbmodel.model('User')
const Friend = dbmodel.model('Friend')
const Message = dbmodel.model('Message')
const Group = dbmodel.model('Group')
const GroupUser = dbmodel.model('GroupUser')
const GroupMsg = dbmodel.model('GroupMsg')
const jwt = require('./jwt');

//新建用户
exports.buildUser = function (data,res) {
    let psw = bcrypt.encryption(data.psw)
    let info = {
        name: data.name,
        email: data.email,
        psw: psw,
        time: new Date(),
    }

    let user = new User(info)

    user.save(function (err, result) {
        if (err) {
            res.send({ code: 500 })
        } else {
            res.send({ code: 200, result })
        }
    })
}

//检验用户名和邮箱重复 countuservalue
exports.CheckRepeat = function (data, res) {
    let user = {}
    user[data.type] = data.data
    User.countDocuments(user, function (err, result) {
        if (err) {
            res.send({ code: 500 })
        } else {
            res.send({ code: 200, result })
        }
    })
}

//用户验证
exports.UserAuthentication = function (data, res) {
    let conditions = { $or: [{ 'name': data.data }, { 'email': data.data }] }
    let out = { 'name': 1, 'img_url': 1, 'psw': 1 }
    User.find(conditions, out, function (err, result) {
        if (err) {
            res.send({ code: 500 })
        } else {
            if (result == '') {
                res.send({ code: 400 })
            }
            result.map(function (e) {
                let pswMatch = bcrypt.verification(data.psw, e.psw)
                let token = jwt.createToken(e._id)
                if (pswMatch) {
                    let back = {
                        id: e._id,
                        name: e.name,
                        img_url: e.img_url,
                        token: token,
                    }
                    res.send({ code: 200, back })
                } else {
                    res.send({ code: 300 })
                }
            })
        }
    })
}

//搜索用户
exports.searchUser = function (data, res) {
    let conditions = { $or: [{ 'name': { $regex: data } }, { 'email': { $regex: data } }] }
    let out = { 'name': 1, 'img_url': 1, 'email': 1 }
    User.find(conditions, out, function (err, result) {
        if (err) {
            res.send({ code: 500 })
        } else {
            res.send({ code: 200, result })
        }
    })
}

//是否为好友
exports.isFriend = function (data,res) {
    let conditions = { 'userID': data.uID, 'friendID': data.fID, 'status': 0 }
    Friend.findOne(conditions, function (err, result) {
        if (err) {
            res.send({ code: 500 })
        } else {
            if (result) {
                res.send({ code: 200 })
            } else {
                res.send({ code: 400 })
            }
        }
    })
}

//搜索群
exports.searchGroup = function (data, res) {
    let conditions = { 'name': { $regex: data } }
    let out = { 'name': 1, 'img_url': 1 }
    Group.find(conditions, out, function (err, result) {
        if (err) {
            res.send({ code: 500 })
        } else {
            res.send({ code: 200, result })
        }
    })
}

//是否在群中
exports.isInGroup = function (gID, uID, res) {
    let conditions = { 'groupID': gID, 'userID': uID }
    GroupUser.findOne(conditions, function (err, result) {
        if (err) {
            res.send({ code: 500 })
        } else {
            if (result) {
                res.send({ code: 200 })
            } else {
                res.send({ code: 400 })
            }
        }
    })
}

//用户详情
exports.userDetails = function (data, res) {
    let conditions = { '_id': data.id }
    // console.log(data.id)
    let out = { 'psw': 0 }
    User.findOne(conditions, out, function (err, result) {
        if (err) {
            res.send({ code: 500 })
        } else {
            res.send({ code: 200, result })
        }
    })
}

//修改用户个人信息
exports.userUpdate = function (data, res) {
    let change = {}
    if (data.psw !== undefined) {
        User.find({ '_id': data.id }, { 'psw': 1 }, function (err, result) {
            if (err) {
                res.send({ code: 500 })
            } else {
                result.map(function (e) {
                    let psw = bcrypt.verification(data.psw, e.psw)
                    if (psw) {
                        if (data.type == 'psw') {
                            let password = bcrypt.encryption(data.data)
                            change[data.type] = password;
                            User.findByIdAndUpdate(data.id, change, function (err, ress) {
                                if (err) {
                                    res.send({ code: 500 })
                                } else {
                                    res.send({ code: 200, ress })
                                }
                            })
                        } else {
                            change[data.type] = data.data
                            User.countDocuments(change, function (err, ress) {
                                if (err) {
                                    res.send({ code: 500 })
                                } else {
                                    if (ress == 0) {
                                        User.findByIdAndUpdate(data.id, change, function (err, ress) {
                                            if (err) {
                                                res.send({ code: 500 })
                                            } else {
                                                res.send({ code: 200, ress })
                                            }
                                        })
                                    } else {
                                        res.send({ code: 201 })
                                    }
                                }
                            })
                        }
                    } else {
                        res.send({ code: 202 })
                    }
                })
            }
        })
    } else if (data.type == 'name') {
        change[data.type] = data.data
        User.countDocuments(change, function (err, ress) {
            if (err) {
                res.send({ code: 500 })
            } else {
                if (ress == 0) {
                    User.findByIdAndUpdate(data.id, change, function (err, ress) {
                        if (err) {
                            res.send({ code: 500 })
                        } else {
                            res.send({ code: 200, ress })
                        }
                    })
                } else {
                    res.send({ code: 201 })
                }
            }
        })
    }
    else {
        change[data.type] = data.data
        User.findByIdAndUpdate(data.id, change, function (err, ress) {
            if (err) {
                res.send({ code: 500 })
            } else {
                res.send({ code: 200 })
            }
        })
    }
}

//获得好友昵称
exports.getfriendNick = function (data, res) {
    let conditions = { 'userID': data.uID, 'friendID': data.fID }
    let out = { 'nick': 1 }
    Friend.findOne(conditions, out, function (err, result) {
        if (err) {
            res.send({ code: 500 })
        } else {
            res.send({ code: 200, result })
        }
    })
}

//修改好友昵称
exports.friendNick = function (data, res) {
    let conditions = { 'userID': data.uID, 'friendID': data.fID }
    let out = { 'nick': data.nick }
    Friend.updateOne(conditions, out, function (err, result) {
        if (err) {
            res.send({ code: 500 })
        } else {
            res.send({ code: 200, result })
        }
    })
}

//好友操作
//添加好友表
exports.buildFriend = function (uid, fid, status) {
    let data = {
        userID: uid,
        friendID: fid,
        status: status,
        time: new Date(),
        lastTime: new Date(),
    }

    let friend = new Friend(data)

    friend.save(function (err, result) {
    })
}

//好友最后通讯时间
exports.friendLastTime = function (uid,fid) {
    let conditions = { 'userID': uid, 'friendID': fid }
    let out = { 'lastTime': new Date() }

    Friend.updateOne(conditions, out, function (err, res) {
    })
}

//添加一对一消息
exports.insertMsg = function (uid, fid, msg, types, res) {
    let data = {
        userID: uid,
        friendID: fid,
        message: msg,
        types: types,
        time: new Date(),
        status: 1,
    }

    let message = new Message(data)

    message.save(function (err, result) {
        if (err) {
            if(res!==undefined){
                res.send({ code: 500 })
            } 
        } else {
            if(res!==undefined){
                res.send({ code: 200 })
            } 
        }
    })
}

//好友申请
exports.applyFriend = function (data, res) {
    let conditions = { 'userID': data.uid, 'friendID': data.fid }
    Friend.countDocuments(conditions, (err, result) => {
        if (err) {
            res.send({ code: 500 })
        } else {
            if (result == 0) {
                this.buildFriend(data.uid, data.fid, 2)
                this.buildFriend(data.fid, data.uid, 1)
            } else {
                this.friendLastTime(data.uid, data.fid)
                this.friendLastTime(data.fid, data.uid)
            }
            this.insertMsg(data.uid, data.fid, data.msg, 0, res)
        }
    })
}

//更新好友状态
//同意好友
exports.agreeFriend = function (data, res) {
    let conditions = { $or: [{ 'userID': data.uid, 'friendID': data.fid }, { 'userID': data.fid, 'friendID': data.uid }] }
    Friend.updateMany(conditions, { 'status': 0 }, (err, result) => {
        if (err) {
            res.send({ code: 500 })
        } else {
            res.send({ code: 200 })
        }
    })
}

//删除好友
exports.deleteFriend = function (data, res) {
    let conditions = { $or: [{ 'userID': data.uid, 'friendID': data.fid }, { 'userID': data.fid, 'friendID': data.uid }] }
    Friend.deleteMany(conditions, function (err, result) {
        if (err) {
            res.send({ code: 500 })
        } else {
            res.send({ code: 200 })
        }
    })
}

//首页
//按需求获取用户列表
exports.getUser = function (data, res) {
    let query = Friend.find({})
    query.where({ 'userID': data.uid, 'status': data.status });
    query.populate('friendID');
    query.sort({ 'lastTime': -1 });
    query.exec().then(function (e) {
        let result = e.map(function (ver) {
            return {
                id: ver.friendID._id,
                name: ver.friendID.name,
                img_url: ver.friendID.img_url,
                nick: ver.nick,
                lastTime: ver.lastTime,
                time:ver.time,
                type:0,
            }
        })
        res.send({ code: 200, result })
    }).catch(function (err) {
        res.send({ code: 500 })
    })
}

exports.getUsers = function(data,res){
    doIt(data,res)
}

async function doIt(data,res){
    let result,bb,cc,err;
    [err,result] = await getUser(data).then(data=>[null,data]).catch(err=>[err,null])
    for(var i=0;i<result.length;i++){
        [err,bb] = await getOneMsg(data.uid,result[i].id).then(data =>[null,data]).catch(err=>[err,null])
        if(bb.types == 0){
            //文字
        }else if(bb.types ==1){
            bb.message = '[图片]'
        }else if(bb.types ==2){
            bb.message = '[音频]'
        }else if(bb.types ==3){
            bb.message = '[位置]'
        }
        result[i].news = bb.message
        let cc = ''
        await unreadMsg(data.uid,result[i].id).then(data=>{
            cc = data
        }).catch(err=>[err,null])
        result[i].tip = cc
    }
    if(err){
        res.send(err)
    }else{
        res.send({code:200,result})
    }
}

function getUser(data){
    return new Promise(function(resolve,reject){
        let query = Friend.find({})
        query.where({ 'userID': data.uid, 'status': data.status });
        query.populate('friendID');
        query.sort({ 'lastTime': -1 });
        query.exec().then(function (e) {
        let result = e.map(function (ver) {
            return {
                id: ver.friendID._id,
                name: ver.friendID.name,
                img_url: ver.friendID.img_url,
                nick: ver.nick,
                lastTime: ver.lastTime,
                time:ver.time,
                type:0,
            }
        })
            resolve( result )
        }).catch(function (err) {
            reject({ code: 500 })
        })
    })
}

//获取一条消息
exports.getOneMsg = function (data, res) {
    let query = Message.findOne({})
    query.where({ $or: [{ 'userID': data.uid, 'friendID': data.fid }, { 'userID': data.fid, 'friendID': data.uid }] })
    query.sort({ 'time': -1 })
    query.exec().then(function (ver) {
        let result = {
            message: ver.message,
            types: ver.types,
            time: ver.time,
        }
        res.send({ code: 200, result })
    }).catch(function (err) {
        res.send({ code: 500 })
    })
}

function getOneMsg(uid,fid){
    return new Promise(function(resolve,reject){
        let query = Message.findOne({})
        query.where({ $or: [{ 'userID': uid, 'friendID': fid }, { 'userID': fid, 'friendID': uid }] })
        query.sort({ 'time': -1 })
        query.exec().then(function (ver) {
            let result = {
                message: ver.message,
                types: ver.types,
                time: ver.time,
            }
            resolve( result )
        }).catch(function (err) {
            reject({ code: 500 })
        })
    })
}

//获取消息总和 
exports.upReadMsg = function(data,res){
    let query = Message.find({})
    query.where({  'friendID': data.uid,'userID': data.fid,'status':1 })
    query.sort({ 'time': -1 })
    query.exec().then(function (ver) {
        res.send({ code: 200, ver })
    }).catch(function (err) {
        res.send({ code: 500 })
    })
}

function unreadMsg(uid,fid){
    return new Promise((resolve,reject)=>{
        let wherestr = {'friendID': uid,'userID': fid,'status':1 }
        Message.countDocuments(wherestr,(err,result)=>{
            if(err){
                reject({code:500})
            }else{
                resolve(result)
            }
        })
    })
}

//改变消息状态
exports.updateMsg = function(data,res){
    let conditions = { 'userID': data.uid, 'friendID': data.fid }
    let out = { 'status':0}
    Friend.updateMany(conditions, out, function (err, result) {
        if(err){
            res.send({code:500})
        }else{
            res.send({code:200,result})
        }
    })
}

async function getG(data,res){
    let result,bb,err;
    [err,result] = await getGroup(data.uid).then(data=>[null,data]).catch(err=>[err,null])
    for(var i=0;i<result.length;i++){
        await getOneGroupMsg(data.gid).then(data =>{
            bb = data
        }).catch(err=>[err,null])
        if(bb.types == 0){
            //文字
        }else if(bb.types ==1){
            bb.message = '[图片]'
        }else if(bb.types ==2){
            bb.message = '[音频]'
        }else if(bb.types ==3){
            bb.message = '[位置]'
        }
        result[i].news = bb.message
    }
    if(err){
        res.send(err)
    }else{
        res.send({code:200,result})
    }
}

//获取群列表
exports.getGroup = function(data,res){
    getG(data,res)
}

function getGroup(uid){
    return new Promise((resolve,reject)=>{
        let query = GroupUser.find({})
        query.where({'userID':uid})
        query.populate('groupID')
        query.sort({'lastTime':-1})
        query.exec().then(function(e){
            let result = e.map(function(ver){
                return {
                    gid:ver.groupID._id,
                    name:ver.groupID.name,
                    img_url:ver.groupID.img_url,
                    lastTime:ver.lastTime,
                    tip:ver.tip,
                    type:1,
                }
            })
            resolve(result)
        }).catch(function(err){
            reject({code:500})
        })
    })
}

//按要求获取群消息
exports.getOneGroupMsg = function(data,res){
    let query = GroupMsg.findOne({});
    query.where({'groupID':data.gid})
    query.populate('userID')
    query.sort({'time':-1});
    query.exec().then(function(ver){
        let result = {
            message:ver.message,
            time:ver.time,
            types:ver.types,
            name:ver.userID.name,
        }
        res.send({status:200,result})
    }).catch(function(err){
        res.send({code:500})
    })
}

function getOneGroupMsg(gid){
    return new Promise((resolve,reject)=>{
        let query = GroupMsg.findOne({});
        query.where({'groupID':gid})
        query.populate('userID')
        query.sort({'time':-1});
        query.exec().then(function(ver){
            let result = {
                message:ver.message,
                time:ver.time,
                types:ver.types,
                name:ver.userID.name,
            }
            resolve(result)
        }).catch(function(err){
            resolve({code:500})
        })
    })
}

//群消息状态修改
exports.updateGroupMsg = function(data,res){
    let conditions = { 'userID': data.uid, 'friendID': data.fid }
    let out = {'tip':0}

    Message.updateOne(conditions, out, (err,result)=>{
        if(err){
            res.send({code:500})
        }else{
            res.send({code:200})
        }
    })
}

//获取分页消息
exports.getPagingMessage = function(data,res){
    let skipNum = data.nowPage*data.pageSize
    let query = Message.find({})
    query.where({ $or: [{ 'userID': data.uid, 'friendID': data.fid }, { 'userID': data.fid, 'friendID': data.uid }] })
    query.sort({'time':-1})
    query.populate('userID')
    query.skip(skipNum)
    query.limit(data.pageSize)
    query.exec().then(function(e){
        let result = e.map(function(ver){
            return {
                id:ver._id,
                message:ver.message,
                types:ver.types,
                time:ver.time,
                fromID:ver.userID._id,
                img_url:ver.userID.img_url
            }
        })
        res.send({code:200,result})
    }).catch(function(err){
        res.send({code:500})
    })
}

//新建群
// exports.buildGroup = function(data,res){
//     let groupData = {
//         userID:data.uid,
//         name:data.name,//群名
//         img_url:data.img_url,//群封面链接
//         time:new Date(),//群建立时间
//     }
//     let group = new Group(groupData)
//     group.save(function(err,result){
//         if(err){
//             res.send({code:500})
//         }else{
//             let conditions = { 'userID': data.uid, 'name': data.name }
//             let out = {'_id':1}
//             Group.find(conditions,out,function(err,resu){
//                 if(err){
//                     res.send({code:500})
//                 }else{
//                     resu.map(function(e){
//                         let user = {
//                             groupID:e._id,//群ID
//                             userID:data.uid,//用户ID
//                             time:new Date(),//加入时间
//                             lastTime:new Date(),//最后通讯时间
//                         }
//                         this.insertGroup(user)
//                         data.user.map(function(uid){
//                             let group = {
//                                 groupID:e._id,//群ID
//                                 userID:uid,//用户ID
//                                 time:new Date(),//加入时间
//                                 lastTime:new Date(),
//                             }
//                             this.insertGroup(uid)
//                         })
//                     })
//                     res.send({code:200})
//                 }
//             })
//         }
//     })
// }
exports.buildGroup = function(data,res){
    var a = data
    return new Promise(function(resolve,reject){ 
        let groupDate = {
            userID:data.uid,
            name:data.name,//群名
            img_url:data.img_url,//群封面链接
            time:new Date(),//群建立时间
        }
        let group = new Group(groupDate)
        group.save(function(err,result){
            if(err){
                reject({code:500})
            }else{
                resolve(result)
            }
        })
    }).then((value,data)=>{
        for(let i = 0;i<a.user.length;i++){
            let fdata = {
                groupID:value._id,//群ID
                userID:a.user[i],//用户ID
                time:new Date(),//加入时间
                lastTime:new Date(),//最后通讯时间
            }
            this.insertGroup(fdata,res)
        }
        res.send({code:200})
    }).catch((error)=>{
        res.send(error)
    })
}

//添加群成员
exports.insertGroup = function(data){
    let groupuser = new GroupUser(data)

    groupuser.save(function(err,ress){
        if(err){
            res.send({code:500})
        }else{
            // console.log('成功')
        }
    })
}