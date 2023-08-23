const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*"

    }
});
const JWT_SECRET_KEY = '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';    
// const socket = require("socket.io-client")("https://elbayoumi.github.io/Ecommerce-OOP/chat.html");

// socket.on("connect_error", (err) => {
//   console.log(`connect_error due to ${err.message}`);
// });

app.get('/', (req, res) => {
    res.status(200).json({ message: 'ok' });
})
io.on('connection', (socket) => {
    const userToken = socket.handshake.query.token;

    try {
        const decodedToken = jwt.verify(userToken, JWT_SECRET_KEY);
    
        // تحقق من بعض المعلومات الإضافية في التوكن إذا لزم الأمر
        // مثال: const userId = decodedToken.userId;
    
        // console.log('User authenticated:', decodedToken);
    
      } catch (error) {
        // console.error('Token verification failed:', error.message);
      }

      socket.onAny((eventName, data) => {    
        // Emit an event with a dynamic response name in response to any received event
        io.emit('r'+eventName, data);
      });
    
    socket.on("customEvent", (eventName,messege) => {
        // console.log(messege);
        let token = JSON.parse(messege).token
        let messages =JSON.parse(messege)
        delete messages.token
            if (checkToken(messege,token)) {
            io.sockets.emit(eventName, JSON.stringify(messages));
            }
    })
    socket.on('desconnect', (socket) => {
        console.log('Desconnect');
    })
});
function checkToken(messege,token) {
    return token == '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' ? JSON.parse(messege).type : false
}
server.listen(3000, () => {
    console.log("Server listening on port 3000 is runing")
});
//
