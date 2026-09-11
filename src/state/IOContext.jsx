/**
 * frontend/src/state/IOContext.jsx
 *
 * description
 */


import { createContext, useState, useEffect } from 'react'
import socket from '../socket'

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
    }
    
    function onDisconnect() {
      setIsConnected(false)
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


  useEffect(initializeIO, [])


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
