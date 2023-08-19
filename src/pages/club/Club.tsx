import Header from '../../components/core/header/Header';
import { IonPage, IonContent } from '@ionic/react';
import React from 'react';
import Footer from '../../components/core/footer/Footer';
import ClubCard from '../../components/club/ClubCard';

export default function Club() {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <div className="flex flex-col items-center justify-center py-8 mx-4 gap-8">
          {[0, 1, 2, 3, 4].map((e: any, i: number) => (
            <ClubCard key={i} />
          ))}
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
}
