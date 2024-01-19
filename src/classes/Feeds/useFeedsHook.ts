import { getCache } from '../../services/Cache'
import { useState } from 'react'

export default function useFeedsHook() {
  const [data, setData] = useState<any>(getCache('feeds') || [])
  return {
    data,
    setData,
  }
}
