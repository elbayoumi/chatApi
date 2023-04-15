const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*"

    }
});
app.get('/', (req, res) => {
    res.status(200).json({ message: 'ok' });
})
io.on('connection', (socket) => {
    console.log('connection');
    socket.on("sendChatToServer", (messege) => {
        // console.log(messege);
        io.sockets.emit('sendChatToClient', messege);

        ///to make broadcast
        // socket.broadcast.emit('sendChatToClient', messege)
        // socket.broadcast.emit('sendChatTyping', messege);
    })
    socket.on("sendChatToServerTyping", (messege) => {
        console.log(messege);
        ///to make broadcast
        socket.broadcast.emit('sendChatToClientTyping', messege);
    })
    socket.on('desconnect', (socket) => {
        console.log('Desconnect');
    })
});

server.listen(3000, () => {
    console.log("Server listening on port 3000 is runing")
});
//
