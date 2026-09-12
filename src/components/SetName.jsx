/**
 * frontend/src/components/SetName.jsx
 */


import { useState, useContext } from 'react'
import { IOContext } from '../state/IOContext'


export default function SetName({ addEvent }) {
  const { socket, TIMEOUT } = useContext(IOContext)
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