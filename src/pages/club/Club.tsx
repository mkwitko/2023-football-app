import { IonContent } from '@ionic/react';
import React, { useContext } from 'react';
import ClubCard from '../../components/club/ClubCard';
import { Context } from '../../context/Context';

export default function Club() {
  const { eventos, userPurchases } = useContext(Context);

  const findHistoric = (id: string) => {
    if(userPurchases.hook.data && userPurchases.hook.data.length > 0) {
        const historic = userPurchases.hook.data.some((e: any) => {
            return e.event_id === id
        });
        return historic;
    }
  }

  return (
    <IonContent fullscreen>
    <div className="flex flex-col items-center justify-center py-8 mx-4 gap-4">
      {userPurchases.hook.data && eventos.hook.data.map((e: any, i: number) => (
        <ClubCard
          data={e}
          key={i}
          disabled={findHistoric(e.id)}
        />
      ))}
    </div>
  </IonContent>
  );
}
