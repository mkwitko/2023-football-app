/* eslint-disable react/prop-types */
import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import MatchCard from './../../components/home/cards/MatchCard';

// eslint-disable-next-line react/prop-types
export default function HomeMatchCardSwiper({ gamesToShow }) {
  return (
    <Swiper
      initialSlide={2}
      pagination
    >
      {gamesToShow.map((e) => (
        <SwiperSlide key={e.match_id}>
          <MatchCard match={e} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
