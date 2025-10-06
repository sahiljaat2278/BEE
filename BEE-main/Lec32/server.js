const {WebSocketServer} = require('ws');    
const ws = new WebSocketServer({port:8015});


ws.on('connection', function(socket) {
    console.log("User connected");
})