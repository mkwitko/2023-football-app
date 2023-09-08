import {
  IonPage,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/react';
import React, { useContext } from 'react';
import Header from '../../components/core/header/Header';
import { getCache } from '../../services/Cache';
import { useHistory } from 'react-router';
import { Context } from '../../context/Context';
import Footer from '../../components/core/footer/Footer';
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
    <IonPage id="start">
      <Header />
      <IonContent
        id="content"
        fullscreen
      >
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="w-full h-[30vh]">
              <img
                className="w-full h-full"
                src={news.url}
                alt="Sunset in the mountains"
              />
              <div className="p-4">
                <div className="flex items-center justify-between font-bold text-xl text-primary-900">
                  <p>{news.title}</p>
                  <button
                    type="button"
                    className="bg-primary text-white p-2 rounded-full mt-[-4rem] shadow-md"
                  >
                    <AiOutlineShareAlt className="text-[1.5rem]" />
                  </button>
                </div>
                <p className="text-[0.7rem] mb-2">
                  Publicado em{' '}
                  {new Date(news.created_at.seconds).toLocaleDateString()}
                </p>
                <p className="text-base whitespace-break-spaces">{news.text}</p>
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
      <Footer />
    </IonPage>
  );
}
