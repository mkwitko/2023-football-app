/* eslint-disable react/prop-types */
import React from 'react';
import { Payment, initMercadoPago } from '@mercadopago/sdk-react';

import {
  IonPage,
  IonToolbar,
  IonContent,
  IonHeader,
  IonButtons,
  IonButton,
} from '@ionic/react';

import QRCode from 'qrcode.react';

export default function MercadoPago({ componentProps }) {
  const [value, setValue] = React.useState(10);
  const [qrCode, setQrCode] = React.useState(null);

  const key = 'TEST-e665ba26-48bc-4bc0-aef3-2be1d76fb7c6';
  initMercadoPago(key);

  const initialization = {
    amount: 100,
  };
  const customization = {
    paymentMethods: {
      bankTransfer: 'all',
    },
    visual: {
      defaultPaymentOption: {
        bankTransfer: true,
      },
      style: {
        customVariables: {
          textPrimaryColor: '#340202',
          textSecondaryColor: '#340202',
          buttonTextColor: '#fff',
          baseColor: '#340202',
          borderRadiusFull: '0.625rem',
          formBackgroundColor: 'transparent',
        },
      },
    },
  };
  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    formData = {
      ...formData,
      transaction_amount: value,
    };
    // callback chamado ao clicar no botão de submissão dos dados
    return new Promise((resolve, reject) => {
      fetch('https://api.mercadopago.com/v1/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${'TEST-7219221164481546-092509-47bda7c77276066bbb6194a5b9b3cf92-1133343639'}`,
        },
        body: JSON.stringify({
          description: 'Pagamento de teste',
          installments: 1,
          payer: {
            email: 'oficialkwitko@gmail.com',
          },
          payment_method_id: 'pix',
          transaction_amount: +value,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          // receber o resultado do pagamento
          console.log(response.point_of_interaction.transaction_data);
          setQrCode(response.point_of_interaction.transaction_data.qr_code);
          resolve(response);
        })
        .catch((error) => {
          // lidar com a resposta de erro ao tentar criar o pagamento
          reject();
        });
    });
  };
  const onError = async (error) => {
    // callback chamado para todos os casos de erro do Brick
    console.log(error);
  };
  const onReady = async () => {
    /*
      Callback chamado quando o Brick estiver pronto.
      Aqui você pode ocultar loadings do seu site, por exemplo.
    */
  };

  return (
    <IonPage>
      <IonContent>
        <div className="bg-white z-50">
          <div className="flex items-start gap-4 flex-col p-4 pb-0">
            <button
              type="button"
              className="p-2 self-end z-50"
              onClick={() => {
                console.log('aaa');
                componentProps.close();
              }}
            >
              Fechar
            </button>
          </div>
          {qrCode ? (
            <QRCode value={qrCode} />
          ) : (
            <>
              <p className="text-[1.125rem] font-semibold text-[#340202]">
                Valor
              </p>
              <input
                className="bg-transparent p-4 border border-borderColor/20 rounded-[0.625rem] w-full focus:ring-0 focus:border-transparent"
                type="text"
                placeholder="R$10.00"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Payment
                initialization={initialization}
                customization={customization}
                locale="pt-BR"
                onSubmit={onSubmit}
                onReady={onReady}
                onError={onError}
              />
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
