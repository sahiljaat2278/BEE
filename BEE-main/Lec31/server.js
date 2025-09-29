const { WebSocketServer } = require( 'ws');

const ws = new WebSocketServer({ port: 8015 });
//event handler
ws.on('connection', function connection(socket) {
    console.log(socket);
    
    setInterval(() => {
        socket.send(new Date().toLocaleTimeString());
    
    socket.send('Reliance stock price is ' +" "+ Math.random());
    }, 500);
    socket.on('message', function message(data) {
        console.log(data.toString());
    });
})

  ///app.get("/",(req,res)=>{});
