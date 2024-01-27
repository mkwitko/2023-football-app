import { useState } from 'react'

export default function useUserHook() {
  const [data, setData] = useState<any>(null)
  const [tokenId, setTokenId] = useState<string>('')
  const [key, setKey] = useState<string>('')
  const [configs, setConfigs] = useState<any>({
    enableGoogleOAuth: false,
  })
  return {
    data,
    setData,
    tokenId,
    setTokenId,
    key,
    setKey,
    configs,
    setConfigs,
  }
}
