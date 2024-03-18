import { Context } from 'src/context/Context'
import { IonContent } from '@ionic/react'
import React, { useContext } from 'react'
import ModalProsper from 'src/components/Shadcn/Modal'
import { StringCutter } from 'src/utils/StringUtils'
import QRCode from 'qrcode.react'

export default function Calendar() {
  const { orders, userPurchases } = useContext(Context)

  return (
    <IonContent fullscreen>
      <div className="flex flex-col p-8 gap-8">
        <div className="flex flex-col">
          <p className="text-primary font-bold">
            Histórico de Compras e Ingressos
          </p>
          <p className="text-[0.75rem]">
            Nossas diretrizes respondem todas as dúvidas, antes de fazer
            pagamentos pelo aplicativo por favor,{' '}
            <a
              href="https://www.google.com.br"
              className="text-[0.75rem] text-primary"
            >
              leia elas aqui.
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {userPurchases.hook.data &&
            userPurchases.hook.data.map((item: any, index: number) => (
              <PurchaseCard key={`each_purchase_${index}`} data={item} />
            ))}
          {orders.hook.data &&
            orders.hook.data?.map((item: any, index: number) => (
              <OrderCard key={`each_order_${index}`} data={item} />
            ))}
        </div>
      </div>
    </IonContent>
  )
}

const PurchaseCard = ({ data }: { data: any }) => {
  const screenHeight: number = window.innerHeight
  const isMd = screenHeight > 768

  console.log('purchase - ', data)

  return (
    <div className="flex flex-col border-b border-primary-700/50 pb-4 gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-primary-700 font-bold">Compra</p>
          {data.date && (
            <p className="font-[300] text-[0.75rem]">
              Data da Compra - {new Date(data.date).toLocaleDateString()}
            </p>
          )}
          <p>{data.title}</p>
          <p>Data do Evento {data.event_date}</p>
        </div>
        <div className="h-24 w-24 aspect-square">
          <img
            src={data.event_image}
            alt=""
            className="rounded-[0.625rem] h-24 w-24 aspect-square"
          />
        </div>
      </div>

      {data.qrCode && (
        <ModalProsper.Modal>
          <ModalProsper.ModalTrigger>
            <button className="bg-primary text-white w-full p-2 rounded-[0.325rem]">
              Ver QR Code
            </button>
          </ModalProsper.ModalTrigger>
          <ModalProsper.ModalContent className="w-4/5 rounded-[0.625rem] gap-0 p-0">
            <ModalProsper.ModalHeader className="bg-primary rounded-t-[0.625rem]">
              <p className="text-[1.75rem] text-white font-bold capitalize p-4">
                {data.title}
              </p>
            </ModalProsper.ModalHeader>
            <div className="flex flex-col gap-4 p-4 items-center justify-center">
              {data.event_image && (
                <img className="w-3/5 h-auto" src={data.event_image} alt="" />
              )}
              <div
                className="text-primary-900 text-center text-[0.75rem] md:text-[1.25rem]  md:px-16 md:mt-4 font-light"
                dangerouslySetInnerHTML={{
                  __html: StringCutter(data.description, 125),
                }}
              ></div>
              <div className="border-2 p-3 md:mt-4 md:mb-8 rounded-[0.625rem]">
                <QRCode value={data.qrCode ?? '123'} size={isMd ? 240 : 180} />
              </div>
            </div>
          </ModalProsper.ModalContent>
        </ModalProsper.Modal>
      )}
    </div>
  )
}

const OrderCard = ({ data }: { data: any }) => {
  const makeDate = (date: any) => {
    return typeof date === 'string'
      ? `${new Date(date).toLocaleDateString()} - ${new Date(date).toLocaleTimeString()}`
      : `${new Date(date.seconds * 1000).toLocaleDateString()} - ${new Date(date.seconds * 1000).toLocaleTimeString()}`
  }

  return (
    <div className="flex items-center justify-between border-b border-primary-700/50 pb-4">
      <div className="flex flex-col items-start">
        <p className="text-primary-700 font-bold">Compra de Saldo</p>
        {data.date && (
          <p className="font-[300] text-[0.75rem]">
            Data da Compra - {makeDate(data.date)}
          </p>
        )}
        <p className="capitalize">
          Metódo de Pagamento - {data.payment_method_id}
        </p>
        <p>Valor adicionado R${data.transaction_amount}</p>
      </div>
    </div>
  )
}
