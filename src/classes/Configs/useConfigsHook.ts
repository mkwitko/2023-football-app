import { getCache } from '../../services/Cache'
import { useState } from 'react'

export default function useConfigsHook() {
  const [data, setData] = useState<any>(getCache('configs') || [])

  return {
    data,
    setData,
  }
}
