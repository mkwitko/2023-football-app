import { IonContent } from '@ionic/react';
import React, { useContext } from 'react';
import ClubCard from '../../components/club/ClubCard';
import { Context } from '../../context/Context';

export default function Club() {
  const { eventos } = useContext(Context);
  return (
    <IonContent fullscreen>
    <div className="flex flex-col items-center justify-center py-8 mx-4 gap-8">
      {eventos.hook.data.map((e: any, i: number) => (
        <ClubCard
          data={e}
          key={i}
        />
      ))}
    </div>
  </IonContent>
  );
}
