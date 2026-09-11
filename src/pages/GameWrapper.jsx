/**
 * frontend/src/pages/GameWrapper.jsx
 *
 * This component is always shown in the Outlet slot. What it
 * displays will depend on:
 * + A successful connection to the WebSocket server, meaning that
 *   userId is set. If not, the Throbber will show.
 * + A successful login meaning that the server has echoed back a
 *   user_name. If not, the LogIn page will show.
 */


import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import {
  IOContext,
  GameContext
} from '../state'
import Throbber from '../components/Throbber'
import {
  Chat,
  LogIn,
  Memory
} from '../pages'



export default function GameWrapper() {
  // HACK to set role = "teacher" if name param has format
  // someName—teacher
  const { name: label } = useParams()

  const [ Display, setDisplay ] = useState(() => Throbber)

  const {
    isConnected,
    userId,
    username,
  } = useContext(IOContext)
  const { setRole } = useContext(GameContext)


  const params = (label || "").split("+")
  const [name, teacher] = params
  const role = teacher === "teacher" ? "teacher" : ""


  const loadDisplay = () => {
    if (!isConnected) {
      setDisplay(() => Throbber)
    } else if (!username) {
      setDisplay(() => LogIn)
    } else {
      setDisplay(() => Memory)
    }
  }


  const updateRole = () => {
    setRole(role)
  }


  useEffect(loadDisplay, [userId, username, isConnected])
  useEffect(updateRole, [role])


  return (
    <div id="main">
      <Display name={name} role={role}/>
    </div>
  )
}