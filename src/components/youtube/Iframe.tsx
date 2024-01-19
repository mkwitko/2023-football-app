import React from 'react'

export default function Iframe({
  videoId,
  title = 'Youtube Video Player',
}: {
  videoId: string
  title?: string
}) {
  return (
    <iframe
      className="w-full aspect-video"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  )
}
