const {WebSocketServer} = require('ws');    
const ws = new WebSocketServer({port:8015});


ws.on('connection', function(socket) {
    console.log("User connected");
    socket.on("message", function(message) {
        console.log("Received: " + message.toString());
        if(message.toString() === "Ping") {
            socket.send("Pong");
        }
    });
})