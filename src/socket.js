/**
 * src/socket.js
 */


import { io } from 'socket.io-client'
const ORIGIN = import.meta.env.VITE_ORIGIN
const SERVER = import.meta.env.VITE_SERVER

const URL = (process.env.NODE_ENV === "production")
  ? SERVER // if undefined, computed from window.location
  : ORIGIN

const socket = io(URL)

export default socket