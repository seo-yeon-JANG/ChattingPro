//서버를 구동시키는 js
//web socket은 http를 통해서 이루어져야 함.
const express = require("express"); 
//express라이브러리를 사용하기 위해 require 명령어를 사용해 express라는 변수에 지정시킴.
const http = require("http")
const app = express();
//express를 실행한 것을 app에 지정해줌
const path = require("path")
const server = http.createServer(app);
 
const socketIO = require("socket.io");
const moment = require("moment");
var io = require('socket.io')(server);
// const io = socketIO(server); 
// io변수에 server 담기

app.use(express.static(path.join(__dirname,"src")))
//__dirname은 현재 진행하고 있는 프로젝트명을 가리킴.
const PORT = process.env.PORT || 5000;
//server를 실행시키기 위해서는 port가 필요함.

//connection이 이루어졌을 때 얻어진 정보를 socket에 담는다. 
io.on("connection", (socket)=>{
    socket.on("chatting",(data)=>{
        const {name, msg} = data;
        // console.log(data) //chat에서 받은 from front를 server로 받음
        io.emit("chatting", {
            name,
            msg,
            time : moment(new Date()).format("h:mm A")
        }) //server에서 client에게 되돌려주기(io), 즉 보내주는 내용
    })
})
//app.listen은 server를 실행.
server.listen(PORT, ()=>console.log(`server is running ${PORT}`))
