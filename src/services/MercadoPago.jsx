/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Payment, initMercadoPago } from '@mercadopago/sdk-react'
import React from 'react'
import { AiOutlineCopy } from 'react-icons/ai'

import { IonContent, IonPage } from '@ionic/react'

import QRCode from 'qrcode.react'
import Authentication from './Auth'
import { checkClipboard, writeToClipboard } from './Clipboard'
import Toast from './Toast'

export default function MercadoPago({ componentProps }) {
  const { auth } = Authentication()
  initMercadoPago(componentProps.key)

  const [qrCode, setQrCode] = React.useState(null)

  const initialization = {
    amount: componentProps.value,
  }

  const customization = {
    paymentMethods: {
      bankTransfer: 'all',
      creditCard: 'all',
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
          baseColor: '#F93939',
          borderRadiusFull: '0.625rem',
          formBackgroundColor: 'transparent',
        },
      },
    },
  }

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    const token = await auth.currentUser?.getIdToken()
    const bodyJson = {
      description: 'Adição de Fundos na Wallet',
      installments: formData.installments || 1,
      payer: {
        email: formData.payer.email,
        identification: formData.payer.identification,
      },
      token: formData.token || '',
      issuer_id: formData.issuer_id || '',
      payment_method_id: formData.payment_method_id || '',
      transaction_amount: +componentProps.value,
      user_id: componentProps.id,
      user: componentProps.user,
    }
    if (selectedPaymentMethod === 'bank_transfer') delete bodyJson.issuer_id

    return new Promise((resolve, reject) => {
      fetch(
        `${process.env.REACT_APP_ENVIRONMENT === 'production' ? process.env.REACT_APP_BACKEND + '/payments' : process.env.REACT_APP_BACKEND_DEV + '/payments'}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyJson),
        },
      )
        .then((res) => {
          console.log('early res - ', res)
          res.json().then((data) => {
            if (data.status === 'rejected' || data.status === 400)
              Toast().error('Transação Rejeitada - ' + data.error)
            console.log('response - ', data)
            if (data.type === 'pix') {
              setQrCode(data.qr_code)
            } else {
              componentProps.close()
            }
            resolve(true)
          })
        })
        .catch((error) => {
          reject(error)
        })
        .finally(() => {
          if (!selectedPaymentMethod === 'bank_transfer') componentProps.close()
        })
    })
  }
  const onError = async (error) => {
    // callback chamado para todos os casos de erro do Brick
    console.log(error)
  }
  const onReady = async () => {
    /*
          Callback chamado quando o Brick estiver pronto.
          Aqui você pode ocultar loadings do seu site, por exemplo.
        */
  }

  return (
    <IonPage>
      <IonContent>
        <div className="bg-white z-50">
          <div className="flex items-start gap-4 flex-col p-4 pb-0">
            <button
              type="button"
              className="p-2 self-end z-50 text-[0.75rem]"
              onClick={() => {
                componentProps.close()
              }}
            >
              Fechar
            </button>
          </div>
          {qrCode ? (
            <QrCodeContainer qrCode={qrCode} />
          ) : (
            <Payment
              initialization={initialization}
              customization={customization}
              locale="pt-BR"
              onSubmit={onSubmit}
              onReady={onReady}
              onError={onError}
            />
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}

const QrCodeContainer = ({ qrCode }) => {
  return (
    <div className="flex flex-col justify-center items-center p-4 gap-8">
      <QRCode value={qrCode} />

      <div className="flex items-center justify-between border w-full rounded-[0.625rem] p-2 gap-4">
        <p className="whitespace-nowrap overflow-hidden">{qrCode}</p>
        <div className="flex p-2 border rounded-[0.625rem] bg-primary cursor-pointer">
          <AiOutlineCopy
            onClick={() => {
              writeToClipboard({
                value: qrCode,
              }).then(async () => {
                const { value } = await checkClipboard()
                if (value) {
                  Toast().success('Copiado para área de transferência')
                } else {
                  Toast().error('Falha ao copiar')
                }
              })
            }}
            className="w-6 h-6 text-white"
          />
        </div>
      </div>
    </div>
  )
}
