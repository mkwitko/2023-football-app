import { IonContent } from '@ionic/react';
import React, { useContext } from 'react';
import ConvenienceCard from '../../components/convenience/Convenience';
import { Context } from '../../context/Context';

export default function Convenience() {
  const { propaganda } = useContext(Context);
  return (
    <IonContent fullscreen>
    <div className="flex flex-col items-center justify-center py-6 mx-4 gap-6">
      {propaganda.hook.data.map((e: any, i: number) => (
        <ConvenienceCard
          data={e}
          index={i}
          key={i}
        /> 
      ))}
    </div>
  </IonContent>
  );
}
