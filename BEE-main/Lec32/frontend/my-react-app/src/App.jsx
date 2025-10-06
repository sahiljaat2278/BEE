import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
  //use Effect --> hook use to do side-effect in react
  let [ws,setWs] = useState(null);
  useEffect(()=>{
    let socket = new WebSocket("ws://localhost:8015");
    socket.onmessage=((e)=>{
      console.log(e.data);
    })
    setWs(socket);
  },[]);
  

  function sendMessage(){
    ws.send("ping");
  }

  return (
    <>
    <h1>Ping Pong</h1>
    <input type="text" />
    <button onClick={sendMessage}>Send</button>
 
    </>
  )
}

export default App