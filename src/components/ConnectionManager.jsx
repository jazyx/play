/**
 * frontend/src/components/ConnectionManager.jsx
 */


import socket from '../socket'


export default function ConnectionManager({ isConnected }) {

  const connect = () => {
    socket.connect()
  }

  const disconnect = () => {
    socket.disconnect()
  }

  const connectStyle = isConnected
    ? { opacity: 0.5, pointerEvents: "none" }
    : { backgroundColor: "#090", cursor: "pointer" }
    
  const disconnectStyle = isConnected
    ? { backgroundColor: "#900", cursor: "pointer" }
    : { opacity: 0.5, pointerEvents: "none" }

  return (
    <>
      <button
        onClick={connect}
        style={connectStyle}
      >
        Connect
      </button>
      <button
        onClick={disconnect}
        style={disconnectStyle}
      >
        Disconnect
      </button>
    </>
  )
}