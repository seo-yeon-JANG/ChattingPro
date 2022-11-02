"use strict"

const socket = io();
//client io가 socket에 담아짐.

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");


chatInput.addEventListener("keypress", (event)=>{
    if(event.keyCode === 13){
        send()
    }
})

function send(){
    const param = {
        name : nickname.value,
        msg : chatInput.value
    }
    socket.emit("chatting", param)
}

sendButton.addEventListener("click", send)

//메시지를 server에 보낸다.


//server에서 data값을 받음 / data에는 서버에서 받은 값이 들어감. ex)그래 반가워 ${data}
socket.on("chatting", (data)=>{
    const {name, msg, time} =data;
   const item = new LiModel(name, msg, time); //LiModel 인스턴스화 
   item.makeLi()
   displayContainer.scrollTo(0, displayContainer.scrollHeight)
}) 

function LiModel(name, msg, time) {
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () =>{
         const li = document.createElement("li");
         li.classList.add(nickname.value === this.name ? "sent" : "received")
         const dom = `<span class="profile">
         <span class="user">${this.name}</span>
         <img class="image" src="https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg" alt="any" >
        </span>
        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatList.appendChild(li)

    }
}


