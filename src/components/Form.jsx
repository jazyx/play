/**
 * frontend/src/components/Form.jsx
 */


import { useState, useContext } from 'react'
import { IOContext } from '../state/IOContext'


const EVENT   = "submit"


export default function Form({ isConnected, addEvent }) {
  const { socket, TIMEOUT } = useContext(IOContext)

  const [ value, setValue ] = useState('Send me')
  const [ isLoading, setIsLoading ] = useState(false)


  const onChange = ({target}) => {
    setValue(target.value)
  }
  
  
  const onSubmit = event => {
    event.preventDefault()
    setIsLoading(true)

    socket.timeout(TIMEOUT).emit(
      EVENT,
      value,
      callback
    )
  }


  const callback = (error, response) => {
    if (error) {
      console.error(error)
    } else {
      // callback  and io.emit events received in the order
      // they were sent
      addEvent(`Received ${response.status}!`)
    }
    setIsLoading(false)
  }


  const loadingStyle = {
    width: "16px",
    height: "16px",
    borderRadius: "16px",
    backgroundColor: isLoading ? "red" : "#555"
  }


  return (
    <form
      onSubmit={onSubmit}
    >
      <div
        style={loadingStyle}
      >
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
      <button
        type="submit"
        disabled={!isConnected || isLoading || !value}
      >
        Submit
      </button>
    </form>
  )
}