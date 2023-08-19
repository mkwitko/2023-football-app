import Header from './../../components/core/header/Header';
import { IonPage, IonContent } from '@ionic/react';
import React from 'react';

export default function About() {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
}
