import Header from '../../components/core/header/Header';
import { IonPage, IonContent } from '@ionic/react';
import React, { useContext } from 'react';
import Footer from '../../components/core/footer/Footer';
import ConvenienceCard from '../../components/convenience/Convenience';
import { Context } from '../../context/Context';

export default function Convenience() {
  const { propaganda } = useContext(Context);
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <div className="flex flex-col items-center justify-center py-8 mx-4 gap-8">
          {propaganda.hook.data.map((e: any, i: number) => (
            <ConvenienceCard
              data={e}
              key={i}
            />
          ))}
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
}
