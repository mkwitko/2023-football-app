import { getCache } from '../../services/Cache'
import { useState } from 'react'

export default function useYoutubeHook() {
  const [data, setData] = useState<any>(getCache('youtube') || [])
  const [live, setLive] = useState<any>(getCache('live') || [])
  const [liveChatId, setLiveChatId] = useState<any>('')

  return {
    data,
    setData,
    live,
    setLive,
    liveChatId,
    setLiveChatId,
  }
}
