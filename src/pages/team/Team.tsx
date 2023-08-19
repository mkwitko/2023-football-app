import Header from './../../components/core/header/Header';
import { IonPage, IonContent } from '@ionic/react';
import React from 'react';

export default function Team() {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <div className="flex flex-col gap-12 p-4"></div>
      </IonContent>
    </IonPage>
  );
}
