import { useState } from 'react'

export default function useUserHook() {
  const [data, setData] = useState<any>(null)
  const [tokenId, setTokenId] = useState<string>('')

  return {
    data,
    setData,
    tokenId,
    setTokenId,
  }
}
