import { getCache } from './../../services/Cache'
import { useState } from 'react'

export default function useBannerHook() {
  const [data, setData] = useState<any>(getCache('banners') || [])

  return {
    data,
    setData,
  }
}
