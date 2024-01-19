import { getCache } from '../../services/Cache'
import { useState } from 'react'

export default function useSurveysHook() {
  const [data, setData] = useState<any>(getCache('surveys') || [])
  return {
    data,
    setData,
  }
}
