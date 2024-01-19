import React, { useContext, useEffect } from 'react';
import { IonContent } from '@ionic/react';
import Categories from '../components/core/categories/Categories';
import NewsCard from '../components/home/cards/NewsCard';
import { Context } from '../context/Context';
import HomeMatchCardSwiper from './components/HomeMatchCardSwiper';
import Feed from './components/Feed';
import Navigation from 'src/services/Navigation';
import Toast from 'src/services/Toast';
import Cookies from 'js-cookie';

const Page: React.FC = () => {
    const { user, noticias, hook, feeds } = useContext(Context);

    const findMatches = () => {
        const nextGame = hook.games.findIndex((e: any) => {
            return e.match_status === '' || e.match_live === '1';
        });
        console.log('next game from find matches - ', nextGame)
        const pastGamesToShow = hook.games.slice(nextGame - 2, nextGame);
        const postGamesToShow = hook.games.slice(nextGame, nextGame + 3);
        return [...pastGamesToShow, ...postGamesToShow];
    };

    const [gamesToShow, setGamesToShow] = React.useState<any[]>([]);

    useEffect(() => {
        if(hook.games) {
            const matches = findMatches();
            setGamesToShow(matches);
        }
    }, [hook.games])


    const { navigateTo } = Navigation();

    useEffect(() => {
        if (user.hook.data && !user.hook.data.youtubeEmail && Cookies.get('showProfileToast') !== 'true') {
            Toast().info('Preencha o seu perfil e sincronize sua conta do Youtube para aproveitar todas funcionalidades da aplicação.');
            navigateTo('/profile');
            Cookies.set('showProfileToast', 'true', { expires: 1 });
        }
    }, [user.hook.data])

    return (
        <IonContent fullscreen>
            <div className="flex flex-col gap-8">

                <div className="flex flex-col px-4 sm:px-8 pt-8 gap-6">
                    <Categories />
                </div>

                <div className="mt-[-.5rem]">
                    <HomeMatchCardSwiper gamesToShow={gamesToShow} />
                </div>

                <div className='flex gap-6 px-4 sm:px-8'>
                    <Feed feeds={feeds.hook.data} />
                </div>

                <div className="flex gap-6 px-4 sm:px-8 mb-8">
                    <NewsCard noticias={noticias} />
                </div>
            </div>
        </IonContent>
    );
};

export default Page;
