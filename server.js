const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*"

    }
});
// const socket = require("socket.io-client")("https://elbayoumi.github.io/Ecommerce-OOP/chat.html");

// socket.on("connect_error", (err) => {
//   console.log(`connect_error due to ${err.message}`);
// });
app.get('/', (req, res) => {
    res.status(200).json({ message: 'ok' });
})
io.on('connection', (socket) => {
    console.log('connection');
    socket.on("sendBus", (messege) => {
        // console.log(messege);
        if (checkToken(messege) == "supervisor") {
            io.sockets.emit('receiveBus', messege);
        } else if (checkToken(messege) == "driver") {
            io.sockets.emit('receiveBus', messege);
        }
        ///to make broadcast
        // socket.broadcast.emit('sendChatToClient', messege)
        // socket.broadcast.emit('sendChatTyping', messege);
    })
    socket.on('desconnect', (socket) => {
        console.log('Desconnect');
    })
});
function checkToken(messege) {
    return JSON.parse(messege).token == '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' ? JSON.parse(messege).type : false
}
server.listen(3000, () => {
    console.log("Server listening on port 3000 is runing")
});
//
