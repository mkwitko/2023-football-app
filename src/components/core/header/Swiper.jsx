/* eslint-disable no-undef */
import React, { useContext } from 'react';
import { IonButtons, IonMenuButton, IonToolbar } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Context } from '../../../context/Context';

export default function HeaderSwiper() {
  const { banner } = useContext(Context);
  return (
    <>
      <Swiper
        onClick={() => {
          console.log('a');
        }}
        autoplay={{
          delay: banner.hook.data.length > 0 ? 3000 : 0,
        }}
        speed={1500}
        loop={true}
        className="h-full z-10"
      >
        <SwiperSlide className="bg-firstHeader bg-cover bg-no-repeat"></SwiperSlide>

        {banner.hook.data.length > 0 &&
          banner.hook.data.map((e, i) => {
            return (
              <SwiperSlide
                key={i}
                className="bg-no-repeat bg-cover"
                style={{
                  backgroundImage: `url(${e.url})`,
                }}
              >
                {/* <InsideHeader /> */}
              </SwiperSlide>
            );
          })}
      </Swiper>
      <IonToolbar className="h-full absolute top-0">
        <IonButtons slot="start">
          <IonMenuButton className="text-white bg-primary-700 shadow-md rounded-full h-12 w-12 mt-1 ml-1" />
        </IonButtons>
      </IonToolbar>
    </>
  );
}
