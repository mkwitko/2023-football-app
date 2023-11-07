/* eslint-disable no-undef */
import React, { useContext, useEffect } from 'react';
import { IonButtons, IonMenuButton, IonToolbar } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Context } from '../../../context/Context';

export default function HeaderSwiper() {
    const { banner } = useContext(Context);

    const banners = banner.hook.data && banner.hook.data.filter((e) => e.active);

    return (
        <>
            <Swiper
                speed={1500}
                loop={true}
                className="h-full z-10"
                autoplay={{
                    delay: 500,
                }}
                onSlideChange={(e) => {
                    const index = e.realIndex - 1;
                    if(banners[index] !== undefined) {
                        e.autoplay.stop();
                        setTimeout(() => {
                            e.autoplay.start();
                          }, banners[index].highlighted ? 10000 : 5000);
                    } else {
                        e.autoplay.stop();
                        setTimeout(() => {
                            e.autoplay.start();
                          }, 5000);
                    }
                }}
            >
                <SwiperSlide className="bg-firstHeader bg-cover bg-no-repeat"></SwiperSlide>

                {banners.length > 0 &&
                    banners.map((e, i) => {
                        return (
                            <SwiperSlide
                                key={i}
                                className="bg-no-repeat bg-cover"
                                style={{
                                    backgroundImage: `url(${e.imagePath})`,
                                }}
                            >
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
