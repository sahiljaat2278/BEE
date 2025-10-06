import { useEffect } from 'react'
function App() {
  //useEffect is a hook use to do side effect in react
  let[ws,setWs]=useState(null);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8015");
    setWs(socket);
  }, [])
  function SendMessage(){
    ws.send("Ping");
  }


  return (
    <>
    <h1>Ping Pong</h1>
    <input type="text" />
    <button onClick={SendMessage}>Send</button>
    </>
  )
}

export default App
