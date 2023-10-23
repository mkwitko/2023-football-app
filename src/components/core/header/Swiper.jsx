/* eslint-disable no-undef */
import React, { useContext } from 'react';
import { IonButtons, IonMenuButton, IonToolbar } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Context } from '../../../context/Context';
import { getCache, setCache } from 'src/services/Cache';

export default function HeaderSwiper() {
    const { banner } = useContext(Context);

    const cache = getCache('swiper');

    const swiper = cache ? cache : 0;

    const banners = banner.hook.data && banner.hook.data.filter((e) => e.active);

    return (
        <>
            <Swiper
                onSlideChange={(e) => {
                    setCache('swiper', e.activeIndex)
                }}
                autoplay
                speed={1500}
                loop={true}
                className="h-full z-10"
            >
                <SwiperSlide className="bg-firstHeader bg-cover bg-no-repeat"></SwiperSlide>

                {banners.length > 0 &&
                   banners.map((e, i) => {
                        return (
                            <SwiperSlide
                                delay={e.highlighted ? 10000 : 3000}
                                key={i}
                                className="bg-no-repeat bg-cover"
                                style={{
                                    backgroundImage: `url(${e.imagePath})`,
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
