/**
 * frontend/src/pages/Frame.jsx
 */


import { Outlet } from 'react-router-dom'
import Tabs from './Tabs'
import '../css/frame.css'


export default function Frame(props) {


  return (
    <div id="frame">
      <Tabs />
      <Outlet />
    </div>
  )
}