import React, { useContext } from 'react';
import { IonContent } from '@ionic/react';
import Categories from '../components/core/categories/Categories';
import NewsCard from '../components/home/cards/NewsCard';
import { Context } from '../context/Context';
import HomeMatchCardSwiper from './components/HomeMatchCardSwiper';
import Feed from './components/Feed';

const Page: React.FC = () => {
    const { noticias, hook, feeds } = useContext(Context);

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
        <IonContent fullscreen>
            <div className="flex flex-col gap-8">

                <div className="flex flex-col px-4 sm:px-8 pt-8 gap-6">
                    <Categories />
                </div>

                <div className="mt-[-.5rem]">
                    <HomeMatchCardSwiper gamesToShow={gamesToShow} />
                </div>

                <div className='flex overflow-x-auto px-4 sm:px-8 gap-4'>
                    {feeds.hook.data.map((e: any, i: number) => (
                        <Feed key={i} feed={e} />
                    ))}

                </div>

                <div className="flex flex-col gap-6 px-4 sm:px-8 mb-8">
                    <NewsCard noticias={noticias} />
                </div>
            </div>
        </IonContent>
    );
};

export default Page;
