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
    verify(userToken, JWT_SECRET_KEY);

            // console.log('User authenticated:', decodedToken);
            socket.onAny((eventName, data) => {
                // Emit an event with a dynamic response name in response to any received event
                io.emit(`r${eventName}`, data);
            });
            socket.on("se", ( messege) => {
                // console.log(messege);
                let messages = JSON.parse(messege)
                io.sockets.emit("re", JSON.stringify(messages));

            })
            socket.on("customEvent", (eventName, messege) => {
                // console.log(messege);
                let messages = JSON.parse(messege)
                io.sockets.emit(eventName, JSON.stringify(messages));

            })
            socket.on("driver", (eventName, messege) => {
                io.sockets.emit(eventName, messege);

            })
            socket.on("admin", (eventName, messege) => {
                io.sockets.emit(eventName, messege);

            })
            socket.on('desconnect', (socket) => {
                console.log('Desconnect');
            })
        } catch (error) {
            // console.error('Token verification failed:', error.message);
        }

    


});
const verify = (userToken, JWT_SECRET_KEY) => {
    if(userToken != JWT_SECRET_KEY ){
        throw new Error('not authorized');
    }
}
server.listen(3000, () => {
    console.log("Server listening on port 3000 is runing")
});
//

