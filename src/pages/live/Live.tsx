import {
  IonAlert,
  IonContent,
  IonPage,
  IonTextarea,
  useIonModal,
} from '@ionic/react';
import React, { useContext, useState } from 'react';
import Header from '../../components/core/header/Header';
import Footer from '../../components/core/footer/Footer';
import Iframe from '../../components/youtube/Iframe';
import { Context } from '../../context/Context';
import MercadoPago from '../../services/MercadoPago';
import { OverlayEventDetail } from '@ionic/core';

export default function Live() {
  const { youtube, user } = useContext(Context);
  const id = youtube.hook.live?.id?.videoId;

  const [comment, setComment] = useState('');

  const [present, dismiss] = useIonModal(MercadoPago, {
    componentProps: {
      close: () => handleCloseModal(),
    },
    onDismiss: () => dismiss(),
  });

  const handleCloseModal = () => {
    dismiss();
  };

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        //
      },
    });
  }

  const handleComment = async () => {
    console.log('comment - ', comment);
    await youtube.insert({
      comment,
      isPaid: false,
      user: user.hook.data,
    });
  };

  //   TODO colocar formulário
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <div className="flex flex-col h-full items-center justify-between pb-2">
          <Iframe videoId={id} />
          <div className="w-[95%] flex items-end flex-col gap-2">
            <button
              id="present-alert"
              className="bg-primary rounded-[0.625rem] py-2 px-4 text-white"
              type="button"
            >
              Enviar
            </button>
            <IonTextarea
              className="w-full rounded-[0.625rem] border border-borderColor p-2"
              rows={4}
              label="Enviar comentário"
              labelPlacement="stacked"
              placeholder="Entre o seu comentário aqui"
              value={comment}
              onIonChange={(e: any) => {
                setComment(e.detail.value);
              }}
            ></IonTextarea>
          </div>
        </div>

        <IonAlert
          trigger="present-alert"
          header="Atenção"
          subHeader="Deseja ter prioridade na mensagem?"
          message="Envie um PIX para ter prioridade na sua mensagem."
          buttons={[
            {
              text: 'Enviar normal',
              handler: () => {
                handleComment();
              },
            },
            {
              text: 'Enviar PIX',
              handler: () => {
                openModal();
              },
            },
          ]}
        ></IonAlert>
      </IonContent>
      <Footer />
    </IonPage>
  );
}
