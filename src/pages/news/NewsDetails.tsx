import {
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
} from '@ionic/react';
import React, { useContext } from 'react';
import { getCache } from '../../services/Cache';
import { useHistory } from 'react-router';
import { Context } from '../../context/Context';
import { arrowBackSharp, arrowForwardSharp } from 'ionicons/icons';
import { AiOutlineShareAlt } from 'react-icons/ai';

export default function NewsDetails() {
    const history = useHistory();
    const [news, setNews] = React.useState<any>(getCache('newsDetails'));

    if (!news) history.replace('news');

    const { noticias } = useContext(Context);

    const changeNews = (toAdd: number) => {
        const index = noticias.hook.data.findIndex((e: any) => e.id === news.id);
        if (index + toAdd < 0)
            setNews(noticias.hook.data[noticias.hook.data.length - 1]);
        else if (index + toAdd > noticias.hook.data.length - 1)
            setNews(noticias.hook.data[0]);
        else setNews(noticias.hook.data[index + toAdd]);
    };
    return (
        <IonContent
            id="content"
            fullscreen
        >
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <div className="w-full h-[30vh]">
                        <img
                            className="w-full h-full"
                            src={news.imagePath}
                            alt="Sunset in the mountains"
                        />
                        <div className="p-4 pb-40">
                            <div className='flex items-center gap-2 mb-2'>
                                <img className='rounded-full h-8 w-8' src={news.author && news.author.avatar ? news.author.avatar : 'https://shorturl.at/qGJRY'} alt="" />
                                <div className='flex flex-col'>
                                <span className='text-primary-900 text-[0.75rem] font-bold'>{news.author && news.author.name ? news.author.name : 'Autor Desconhecido'}</span>
                                    <span className='text-primary-900 text-[0.6rem]'>
                                        {news.createdAt}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between font-bold text-xl text-primary-900">
                                <p>{news.title}</p>
                                {/* <button
                                type="button"
                                className="bg-primary text-white p-2 rounded-full mt-[-4rem] shadow-md"
                            >
                                <AiOutlineShareAlt className="text-[1.5rem]" />
                            </button> */}
                            </div>
                            <p className="text-[0.7rem] mb-2">
                                Publicado em{' '}
                                {news.createdAt}
                            </p>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: news.description,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <IonFab
                slot="fixed"
                vertical="bottom"
                horizontal="start"
                color="light"
                onClick={() => {
                    changeNews(-1);
                }}
            >
                <IonFabButton color="light">
                    <IonIcon
                        className="text-primary-900"
                        icon={arrowBackSharp}
                    ></IonIcon>
                </IonFabButton>
            </IonFab>
            <IonFab
                slot="fixed"
                vertical="bottom"
                horizontal="end"
                onClick={() => {
                    changeNews(1);
                }}
            >
                <IonFabButton>
                    <IonIcon icon={arrowForwardSharp}></IonIcon>
                </IonFabButton>
            </IonFab>
        </IonContent>
    );
}
