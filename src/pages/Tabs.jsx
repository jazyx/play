/**
 * frontend/src/pages/Tabs.jsx
 */


import { useContext } from 'react'
import {
  IOContext,
  GameContext
} from '../state'


export default function Tabs() {
  const { socket, TIMEOUT, username } = useContext(IOContext)
  const { json, role } = useContext(GameContext)


  const newGame = () => {
    socket.timeout(TIMEOUT).emit("memory:NEW_GAME")
  }


  const display = (true) // (role)
    ? <button
        onClick={newGame}
      >
        New Game
      </button>
    : <p>{json.game}</p>


  return (
    <div id="tabs">
      {display}
    </div>
  )
}