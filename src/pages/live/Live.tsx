import { IonContent, IonPage } from '@ionic/react';
import React, { useContext, useEffect } from 'react';
import Header from '../../components/core/header/Header';
import Footer from '../../components/core/footer/Footer';
import Iframe from '../../components/youtube/Iframe';
import { Context } from '../../context/Context';
import Navigation from '../../services/Navigation';

export default function Live() {
  const { youtube } = useContext(Context);
  const id = youtube.hook.live?.id?.videoId;

  //   const { navigateTo } = Navigation();

  //   useEffect(() => {
  //     if (!id) navigateTo('/');
  //   }, []);

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <div className="flex flex-col h-full">
          <Iframe videoId={id} />
          <iframe
            className="w-full flex-1"
            src={`https://www.youtube.com/live_chat?v=${id}&embed_domain=${window.location.hostname}}`}
          ></iframe>
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
}
