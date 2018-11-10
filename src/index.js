
//This is then entry point for your app. Do as you wish.

import "./index.scss";
import io from "socket.io-client";

var d = new Date();

//connecting to Socket.IO chat server
const socket = io("https://spotim-demo-chat-server.herokuapp.com");
socket.on("connect", function() {
  console.log("connected to chat server!");
  if (window.name != null && window.name != "" && window.name != "null") {
    socket.emit('spotim/chat', {'code':'0' ,'name': window.name, 'avatar': window.image, 'time' : d.getHours() + ':'+d.getMinutes()});
  }
});
socket.on("spotim/chat", function(data) {
  console.log(data);
  if (data['code'] == 0)
  {
    window.system_message(data['name']+ " just entered the chat!", data['time']);
  }
  else if (data['code'] == 1)
  {
    window.add_message(data['avatar'], data['name'], data['msg'], data['time']);
  }
});
socket.on("disconnect", function() {
  console.log("disconnected from chat server!");
});

window.send_message = function(_msg) {
  socket.emit('spotim/chat', {'code':'1' ,'name': window.name, 'msg':_msg, 'avatar': window.image, 'time' : d.getHours() + ':'+d.getMinutes()});
}
