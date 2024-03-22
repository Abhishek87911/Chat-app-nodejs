const { log } = require('console');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log(' a user connected');

    socket.on('msg_send',(data)=>{
        console.log(data);
        // io.emit('msg_rcvd', data) //-->give message to all the clinet connected to server
        //socket.emit('msg_rcvd', data)//--> give message to same client the one who send the message
        socket.broadcast.emit('msg_rcvd', data) //-->except the one who send message it will give message to all client
    })
  
});


app.use('/', express.static(__dirname+'/public'));

server.listen(3000, ()=> {
    
  console.log('Server started');

});