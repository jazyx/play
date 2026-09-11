/**
 * frontend/src/state/index.jsx
 */


import { IOContext, IOProvider } from "./IOContext";
import { GameContext, GameProvider } from "./GameContext";


const Provider = ({ children }) => {
  return (
    <IOProvider>
      <GameProvider>
        {children}
      </GameProvider>
    </IOProvider>
  )
}


export {
  Provider,
  IOContext,
  GameContext
}