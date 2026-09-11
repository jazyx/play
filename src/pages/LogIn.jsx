/**
 * frontend/src/pages/LogIn.jsx
 */


import { useState, useRef, useEffect, useContext } from 'react'
import { IOContext } from '../state/IOContext'
import { GameContext } from '../state/GameContext'


export default function LogIn({ name }) {
  const {
    username,
    setUsername,
    isConnected,
    socket,
    TIMEOUT
  } = useContext(IOContext)
  const { setJSON } = useContext(GameContext)

  const [ userName, setUserName ] = useState(name || username)
  
  const inputRef = useRef()


  const updateUserName = ({ target }) => {
    setUserName(target.value)
  }


  const login = event => {
    event.preventDefault()
    loginWith(userName)
  }


  const loginWith = userName => {
    socket.timeout(TIMEOUT).emit(
      "memory:LOGIN",
      userName.trim(),
      callback
    )
    // First reply has subject LOGGED_IN, so user_name will be
    // set in IOContext

    // Second reply will be handled by GameContext
  }


  const callback = (error, response) => {
    if (error) {
      console.log("response:", response)
      return console.warn("Login error", error)
    }
    
    const { username, game_object } = response
    setUsername(username)
    setJSON(game_object)
  }

  const autoLogIn = () => {
    if (name) { 
      loginWith(name)
    }
  }

  
  useEffect(autoLogIn, [name])

  
  return (
    <div id="login">
      <h1>English Games</h1>

      <form>
        <span>Write your name:</span>
        <input
          ref={inputRef}
          type="text"
          autoFocus
          value={userName}
          onChange={updateUserName}
        />
        <button
          disabled={!isConnected || !userName}
          onClick={login}
        >
          Let's Play!
        </button>
      </form>
    </div>
  )
}