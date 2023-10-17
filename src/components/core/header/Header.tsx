import React from 'react';
import { IonHeader } from '@ionic/react';
import HeaderSwiper from './Swiper';

const Header = () => {
  return (
    <IonHeader className="h-[15%]">
      <HeaderSwiper />
    </IonHeader>
  );
}

export default React.memo(Header);

