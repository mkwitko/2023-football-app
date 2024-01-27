/* eslint-disable no-undef */
import React, { useContext } from 'react';
import { IonButtons, IonMenuButton, IonToolbar } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Context } from '../../../context/Context';

export default function HeaderSwiper() {
    const { banners } = useContext(Context);

    const banner = banners.hook.data && banners.hook.data.lengthj > 0 && banners.hook.data.filter((e) => e.active);

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
                   if(index && e) {
                    if(banner[index] !== undefined) {
                        e.autoplay.stop();
                        setTimeout(() => {
                            if(e.autoplay) e.autoplay.start();
                          }, banner[index].highlighted ? 10000 : 5000);
                    } else {
                        if(e.autoplay) e.autoplay.stop();
                        setTimeout(() => {
                            if(e.autoplay) e.autoplay.start();
                          }, 5000);
                    }
                   }
                }}
            >
                <SwiperSlide className="bg-firstHeader bg-cover bg-no-repeat"></SwiperSlide>

                {banner.length > 0 &&
                    banner.map((e, i) => {
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
