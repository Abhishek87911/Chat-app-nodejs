
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const connect = require('./config/database-config');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log(' a user connected');
    socket.on('join_room', (roomid) => {
        socket.join(roomid);
    })
    socket.on('msg_send',(data)=>{
        console.log(data);
        io.to(data.roomid).emit('msg_rcvd', data) //-->give message to all the clinet connected to server
        //socket.emit('msg_rcvd', data)//--> give message to same client the one who send the message
        // socket.broadcast.emit('msg_rcvd', data) //-->except the one who send message it will give message to all client
    })
  
});

app.set('view engine', 'ejs');

app.use('/', express.static(__dirname + '/public'));

app.get('/chat/:roomId', (req,res) => {
    res.render('index',{
        name: 'Abhishek',
        id: req.params.roomId
    });
});

server.listen(3000, async ()=> {
    
  console.log('Server started');
  await connect();
  console.log('MongoDB Connected');

});