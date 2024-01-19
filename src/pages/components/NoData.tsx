import React from 'react'
import noData from 'src/assets/noData.svg'

export default function NoData({ text }: {
  text?: string
}) {
  return (
    <div className='flex flex-col justify-center h-full w-full gap-4 items-center'>
      <img src={noData} alt="" />
      <p className='text-center px-8'>Ainda não temos {text} para mostrar aqui.</p>
    </div>
  )
}
