const {WebSocketServer} = require('ws');
const wss = new WebSocketServer({port:8015});

// Simple UUID generator function
function generateRoomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

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
        console.log("Raw message received:", message.toString());
        try {
            let parsedMessage = JSON.parse(message.toString());
            let {type, payload} = parsedMessage;
            console.log("Parsed message:", {type, payload});
            
            if(type == "join"){
                let {roomId} = payload;
                if(!rooms.get(roomId)){
                    rooms.set(roomId, new Set());
                }
                rooms.get(roomId).add(socket);
                socket.roomId = roomId; // Store roomId on socket
                console.log(`User joined room: ${roomId}`);
                console.log("Current rooms:", rooms);
                
                socket.send(JSON.stringify({
                    type: "joined",
                    payload: { roomId }
                }));
            }
            else if(type == "chat"){
                let {message} = payload;
                let roomId = socket.roomId; // Get roomId from socket
                if(roomId && rooms.get(roomId)){
                    let allClients = rooms.get(roomId);
                    allClients.forEach((s)=>{
                        if(s !== socket && s.readyState === s.OPEN){
                            s.send(JSON.stringify({
                                type: "message",
                                payload: { message, roomId }
                            }));
                        }
                    });
                }
            }
            else if(type == "create"){
                let roomId = generateRoomId();
                socket.send(JSON.stringify({
                    type:"roomCreated",
                    payload:{
                        roomId: roomId
                    }
                }));
            }
        } catch(error) {
            console.error("Error parsing message:", error);
            console.error("Invalid message was:", message.toString());
            socket.send(JSON.stringify({
                type: "error",
                payload: { message: "Invalid JSON format" }
            }));
        }
    });
    
    socket.on("close", () => {
        console.log("User disconnected");
        // Remove socket from room
        if(socket.roomId && rooms.get(socket.roomId)){
            rooms.get(socket.roomId).delete(socket);
            if(rooms.get(socket.roomId).size === 0){
                rooms.delete(socket.roomId);
                console.log(`Room ${socket.roomId} deleted - no users left`);
            }
        }
    });
    
    socket.on("error", (error) => {
        console.error("WebSocket error:", error);
    });
});

console.log("WebSocket server running on port 8015");