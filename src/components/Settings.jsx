/**
 * frontend/src/components/Settings.jsx
 *
 * Allows the teacher to:
 *  + Remove a player
 *  + Pass the turn to the player
 *  + Allow the player to peek at names on the backs of the cards
 */


import { useContext } from 'react'
import { IOContext } from '../state/IOContext'


export default function Settings(props) {
  const { name, peek, className, close } = props
  const { socket, TIMEOUT } = useContext(IOContext)

  const removePlayer = () => {
    socket.timeout(TIMEOUT).emit(
      "memory:REMOVE_PLAYER",
      name
    )
    close()
  }

  const activatePlayer = () => {
    socket.timeout(TIMEOUT).emit(
      "memory:ACTIVATE_PLAYER", name
    )
    close()
  }

  const allowPeeking = () => {
    socket.timeout(TIMEOUT).emit(
      "memory:ALLOW_PEEKING",
      name,
      !peek
    )
    close()
  }


  const peekTitle = peek
    ? "✅ Peek"
    : "❌ Peek"

  return (
    <div className={className}>
      <button
        onClick={removePlayer}
      >
        Remove
      </button>
      <button
        onClick={activatePlayer}
      >
        Activate
      </button>
      <button
        onClick={allowPeeking}
      >
        {peekTitle}
      </button>
    </div>
  )
}