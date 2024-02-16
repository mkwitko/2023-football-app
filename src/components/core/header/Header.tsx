import React from 'react'
import { IonHeader } from '@ionic/react'
import HeaderSwiper from './Swiper'
import { isIos } from 'src/utils/PlatformUtil'

const Header = ({ className = '' }: { className?: string }) => {
  return (
    <IonHeader className={`${className} h-[16%]`}>
      <HeaderSwiper />
    </IonHeader>
  )
}

export default React.memo(Header)
