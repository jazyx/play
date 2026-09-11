/**
 * frontend/src/pages/GameWrapper.jsx
 */


import { useContext } from 'react'
import { IOContext } from '../state'
import {
  ConnectionState,
  ConnectionManager,
  Events,
  SetName,
  Form
} from '../components'
import '../css/chat.css'


export default function GameWrapper(props) {
  const {
    isConnected,
    incomingEvents,
    addEvent
  } = useContext(IOContext)
  const options = { isConnected, addEvent }


  return (
    <div className="App">
      <ConnectionState {...options}/>
      <ConnectionManager {...options}/>
      <Events events={incomingEvents}/>
      <SetName {...options}/>
      <Form {...options}/>
    </div>
  )
}