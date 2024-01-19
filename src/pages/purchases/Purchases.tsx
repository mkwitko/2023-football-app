import { Context } from 'src/context/Context';
import { IonContent } from '@ionic/react';
import React, { useContext, useEffect } from 'react';

export default function Calendar() {

    const { orders, userPurchases } = useContext(Context);

    useEffect(() => {
        console.log('orders - ', orders.hook.data);
    }, [])
    return (
        <IonContent fullscreen>
            <div className='flex flex-col p-8 gap-8'>
                <div className='flex flex-col'>
                    <p className='text-primary font-bold'>Histórico de Compras e Ingressos</p>
                    <p className='text-[0.75rem]'>Nossas diretrizes respondem todas as dúvidas, antes de fazer pagamentos pelo aplicativo por favor, <a href='https://www.google.com.br' className='text-[0.75rem] text-primary'>leia elas aqui.</a></p>
                </div>

                <div className='flex flex-col gap-8'>
                    {userPurchases.hook.data && userPurchases.hook.data.map((item: any) => (
                        <PurchaseCard data={item} />
                    ))}
                    {orders.hook.data && orders.hook.data?.map((item: any) => (
                        <OrderCard data={item} />
                    ))}
                </div>
            </div>
        </IonContent>
    );
}

const PurchaseCard = ({
    data
}: {
    data: any
}) => {


    const action = () => {
        // TODO mostrar QR CODE
    }

    return (
        <div className='flex items-center justify-between border-b border-primary-700/50 pb-4'>
            <div onClick={action} className='flex flex-col items-start'>
                <p className='text-primary-700 font-bold'>Compra</p>
                {data.date && (
                    <p className='font-[300] text-[0.75rem]'>Data da Compra - {new Date(data.date).toLocaleDateString()}</p>)}
                <p>{data.title}</p>
                <p>Data do Evento {data.event_date}</p>
            </div>
            <div className='h-24 w-24 aspect-square'>
                <img src={data.event_image} alt="" className='rounded-[0.625rem] h-24 w-24 aspect-square' />
            </div>
        </div>
    )
}

const OrderCard = ({
    data
}: {
    data: any
}) => {
    const action = () => {
        // TODO mostrar QR CODE
    }

    const makeDate = (date: any) => {
        return typeof(date) === 'string' ? `${new Date(date).toLocaleDateString()} - ${new Date(date).toLocaleTimeString()}` : `${new Date(date.seconds * 1000).toLocaleDateString()} - ${new Date(date.seconds * 1000).toLocaleTimeString()}`;
    }

    return (
        <div className='flex items-center justify-between border-b border-primary-700/50 pb-4'>
            <div onClick={action} className='flex flex-col items-start'>
                <p className='text-primary-700 font-bold'>Compra de Saldo</p>
                {/* {data.date && (
                    <p className='font-[300] text-[0.75rem]'>Data da Compra - {makeDate(data.date)}</p>)} */}
                <p>Metódo de Pagamento - {data.payment_method_id}</p>
                <p>Valor adicionado R${data.transaction_amount}</p>
            </div>
            {/* <div className='h-24 w-24 aspect-square'>
                <img src={data.event_image} alt="" className='rounded-[0.625rem] h-24 w-24 aspect-square' />
            </div> */}
        </div>
    )
}
