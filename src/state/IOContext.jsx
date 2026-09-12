/**
 * frontend/src/state/IOContext.jsx
 *
 * Creates a Socket.io connection with the URL defined in .env
 * 
 * NOTE that without a VPN, connections to a remote production
 * server will fail.
 */


import { createContext, useState, useEffect } from 'react'
import { io } from 'socket.io-client'


const ORIGIN = import.meta.env.VITE_ORIGIN
const SERVER = import.meta.env.VITE_SERVER
const URL = (process.env.NODE_ENV === "production")
  ? SERVER // if undefined, computed from window.location
  : ORIGIN
const socket = io(URL)
// console.log("URL:", URL)
// console.log("socket:", socket)

const TIMEOUT = 5000


export const IOContext = createContext()


export const IOProvider = ({ children }) => {
  const [ isConnected, setIsConnected ] = useState(
    socket.connected
  )
  const [ incomingEvents, setIncomingEvents ] = useState([])
  const [ username, setUsername ] = useState("")


  const initializeIO = () => {
    function onConnect() {
      setIsConnected(true)
      // console.log("CONNECTED")
    }

    function onDisconnect() {
      setIsConnected(false)
      // console.log("DISCONNECTED")
    }

    function onIncomingEvent(value) {
      addEvent(value)
    }

    socket.on("connect",    onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("incoming",   onIncomingEvent)

    return (() => {
      socket.off("connect",    onConnect)
      socket.off("disconnect", onDisconnect)
      socket.off("incoming",   onIncomingEvent)
    })
  }


  const addEvent = value => {
    setIncomingEvents(previous => [...previous, value])
  }


  const reconnect = () => {
    if (!socket.isConnected) {
      // console.log("reconnecting...")
      socket.connect()
    }
  }


  useEffect(initializeIO, [])
  // useEffect(reconnect)


  return (
    <IOContext.Provider
      value ={{
        socket,
        isConnected,
        incomingEvents,
        addEvent,
        TIMEOUT,

        username,
        setUsername
      }}
    >
      {children}
    </IOContext.Provider>
  )
}


export default {
  label: "IO",
  Context: IOContext,
  Provider: IOProvider
}
