import { useState } from 'react'

export default function useUserPurchasesHook() {
  const [data, setData] = useState<any>(null)

  return {
    data,
    setData,
  }
}
