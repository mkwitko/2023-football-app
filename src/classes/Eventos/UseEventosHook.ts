import { getCache } from '../../services/Cache'
import { useState } from 'react'

export default function useEventosHook() {
  const [data, setData] = useState<any>(getCache('events') || [])
  const [currentEvent, setCurrentEvent] = useState<any>(
    getCache('currentEvent') || null,
  )

  return {
    data,
    setData,
    currentEvent,
    setCurrentEvent,
  }
}
