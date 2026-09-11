/**
 * frontend/src/components/SetName.jsx
 */


import { useState } from 'react'
import socket from '../socket'


const TIMEOUT = 5000


export default function SetName({ addEvent }) {
  const [ name, setName ] = useState("")
  

  const onChange = ({target}) => {
    setName(target.value)
  }


  const onSubmit = event => {
    event.preventDefault()
    if (name) {
      socket.timeout(TIMEOUT).emit("set_username", name, callback)
    }
  }


  const callback = (error, response) => {
    addEvent(error || response.status)
  }


  return (
    <form
      onSubmit={onSubmit}
    >
      <label htmlFor="id"></label>
      <input
        type="text"
        id="id"
        value={name}
        onChange={onChange}
      />
      <button
        onClick={onSubmit}
      >
        Set Username
      </button>
    </form>

  )
}