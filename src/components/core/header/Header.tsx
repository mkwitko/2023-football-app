import React from 'react'
import { IonHeader } from '@ionic/react'
import HeaderSwiper from './Swiper'

const Header = ({ className = '' }: { className?: string }) => {
  return (
    <IonHeader className={`${className} h-[15%]`}>
      <HeaderSwiper />
    </IonHeader>
  )
}

export default React.memo(Header)
