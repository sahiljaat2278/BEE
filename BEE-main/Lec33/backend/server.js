const {WebSocketServer} = require("./node_modules/ws");
const wss = new WebSocketServer({port:8015});

// wss.on("connection", function(socket){
//     console.log("User connected");
//     socket.on("message", function(msg){
//         console.log("Message received: " + msg);
//         if(msg.toString() === "ping"){
//             socket.send("pong");
//         }
        
//     });
// })

// let allSocket = [];
// wss.on("connection", function(socket){
//     console.log("User connected");
//     allSocket.push(socket);
//     socket.on("message", function(msg){
//         console.log("Message received: " + msg.toString());
//         if(msg.toString() === "ping"){
//             socket.send("pong");
//         }
//         allSocket.forEach((s)=>{
//             s.send(msg.toString());
//         }) 
//     });
// })


let rooms = new Map();




wss.on("connection", (socket)=>{
    console.log("User connected");
    socket.on("message", function(message){
          let parsedMessage = JSON.parse(message);
          let {type, payload} = parsedMessage;
            if(type == "join"){
                let {roomId} = payload;
                if(!rooms.get(roomId)){
                    rooms.set(roomId, new Set());
                }
                rooms.get(roomId).add(socket);
                console.log(rooms);
                socket.send("added to room");

            }
            else if(type==="chat"){
                let{message} = payload;
                let{roomId} = socket;
                let allClients = rooms.get(roomId);
                allClients.forEach((s)=>{
                    s.send(message);
                });
            }
    })
})