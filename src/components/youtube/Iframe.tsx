import { Capacitor } from '@capacitor/core'
import { useEffect } from 'react'
import { ScreenOrientation } from '@ionic-native/screen-orientation'

export default function Iframe({
  videoId,
  title = 'Youtube Video Player',
}: {
  videoId: string
  title?: string
}) {
  useEffect(() => {
    const iframe = document.getElementById('iframe') as HTMLIFrameElement
    iframe.onfullscreenchange = () => {
      if (document.fullscreenElement) ScreenOrientation.unlock()
      else ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT)
    }
  }, [])

  return (
    <iframe
      id="iframe"
      className="w-full aspect-video"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  )
}
