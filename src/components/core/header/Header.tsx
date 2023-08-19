import React from 'react';
import { IonHeader } from '@ionic/react';
import HeaderSwiper from './Swiper';

export default function Header() {
  return (
    <IonHeader className="h-[15%]">
      <HeaderSwiper />
    </IonHeader>
  );
}
