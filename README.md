# yike-back-end
###

安装

npm install

启动

node yike.js

yike的后端代码，使用node+express+mogonDB，后端完成了一对一好友聊天的相关存储，个人信息的修改以及其他相关，除群的信息修改部分没有完成，其他基本完成

websocket使用的socket.io 注意版本是2.3.0 前端weapp.socket.io版本是2.0.6（应该？）本人亲测，其他版本会出现通讯失败的情况，具体，可以自己慢慢尝试，前端我配了反向代理，所以后端没有处理相关cors
