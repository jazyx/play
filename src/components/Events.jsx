/**
 * frontend/src/components/Events.jsx
 */

import { useRef, useEffect } from 'react'


export default function Events({ events }) {
  const listRef = useRef()

  const eventList = events.map((event, index) => (
    <li key={index}>{event}</li>
  ))


  const scrollToEnd = () => {
    const list = listRef.current
    if (!list) { return }
    list.scroll(0, list.scrollHeight)
  }


  useEffect(scrollToEnd)


  return (
    <ul
      ref={listRef}
    >
      {eventList}
    </ul>
  )
}