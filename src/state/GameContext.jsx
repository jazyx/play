/**
 * frontend/src/state/GameContext.jsx
 *
 * description
 */


import { createContext, useContext, useState } from 'react'
import { IOContext } from './IOContext'


export const GameContext = createContext()


export const GameProvider = ({ children }) => {
  const { socket } = useContext(IOContext)
  const [ json, setJSON ] = useState("default")
  const [ role, setRole ] = useState()


  socket.on("memory:GAME_OBJECT", applyGameObject)


  function applyGameObject(game_object) {
    setJSON(game_object)
  }
  

  return (
    <GameContext.Provider
      value ={{
        json,
        setJSON,
        role,
        setRole
      }}
    >
      {children}
    </GameContext.Provider>
  )
}


export default {
  label: "Game",
  Context: GameContext,
  Provider: GameProvider
}
