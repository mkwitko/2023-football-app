import React, { useContext } from 'react';
import { IonContent, IonFooter, IonPage, IonToolbar } from '@ionic/react';
import Header from '../components/core/header/Header';
import Categories from '../components/core/categories/Categories';
import NewsCard from '../components/home/cards/NewsCard';
import { Context } from '../context/Context';
import HomeMatchCardSwiper from './components/HomeMatchCardSwiper';
import Footer from '../components/core/footer/Footer';

const Page: React.FC = () => {
  const { noticias, hook } = useContext(Context);

  const findMatches = () => {
    const nextGame = hook.games.findIndex((e: any) => {
      return e.match_status === '' || e.match_live === '1';
    });
    const pastGamesToShow = hook.games.slice(nextGame - 2, nextGame);
    const postGamesToShow = hook.games.slice(nextGame, nextGame + 3);
    return [...pastGamesToShow, ...postGamesToShow];
  };
  const gamesToShow = findMatches();

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col px-8 pt-6 gap-6">
            <Categories />
          </div>

          <div className="mt-[-.5rem]">
            <HomeMatchCardSwiper gamesToShow={gamesToShow} />
          </div>
          <div className="flex flex-col gap-6 px-8">
            <NewsCard noticias={noticias} />
          </div>
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Page;
