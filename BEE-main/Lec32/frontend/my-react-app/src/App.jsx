import { useEffect } from 'react'
function App() {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8015");

  }, []);

  return (
    <>
    <h1>Ping Pong</h1>
    </>
  )
}

export default App
