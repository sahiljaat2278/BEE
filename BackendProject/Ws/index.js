const {WebsocketServer} = require('ws');
const wss = new WebsocketServer({port:8080});

wss.on("connection",(socket)=>[
    console.log("New client connected")
]);