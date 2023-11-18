import { Context } from 'src/context/Context';
import React, { useContext, useEffect } from 'react'
import Navigation from 'src/services/Navigation';
import { IonContent, useIonAlert, useIonLoading } from '@ionic/react';
import { StringCutter } from 'src/utils/StringUtils';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import Toast from 'src/services/Toast';
import ModalProsper from 'src/components/Shadcn/Modal';
import QRCode from 'qrcode.react';

export default function ClubDetails() {
    const { eventos, wallets, user, userPurchases } = useContext(Context);
    const { balance } = wallets.hook.data
    const { currentEvent } = eventos.hook;
    const [open, setOpen] = React.useState(false);
    const { navigateTo } = Navigation();
    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();

    const findHistoric = () => {
        if (userPurchases.hook.data && Object.keys(userPurchases.hook.data).length > 0) {
            const historic = userPurchases.hook.data.some((e: any) => {
                return e.event_id === currentEvent.id
            });
            return historic;
        }
    }

    useEffect(() => {
        if (!currentEvent || Object.keys(currentEvent).length === 0) navigateTo('/club');

        // if(findHistoric()) {
        //     Toast().error('Você já possui este ingresso');
        //     navigateTo('/club');
        // }

        if (balance < currentEvent.price) setOpen(true);
    }, [userPurchases.hook.data])

    const action = async () => {
        if (currentEvent.price) {
            if (balance < currentEvent.price) {
                Toast().error('Saldo insuficiente');
                return;
            }

            presentAlert({
                header: 'Atenção',
                subHeader: 'Você está prestes a comprar um ingresso',
                message: 'O saldo da sua carteira será utilizado!',
                buttons: [{
                    text: 'Cancelar',
                    role: 'cancel'
                }, {
                    text: 'Confirmar',
                    role: 'confirm',
                    handler: () => {
                        present({
                            message: 'Aguarde...',
                        });
                        fetch(`${process.env.REACT_APP_ENVIRONMENT === 'production' ? process.env.REACT_APP_REACT_APP_BACKEND + '/payments/pay' : process.env.REACT_APP_REACT_APP_BACKEND_DEV + '/payments/pay'}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                user_id: user.hook.data.id,
                                user: user.hook.data,
                                amount: -currentEvent.price,
                                purchase: {
                                    date: new Date(),
                                    event_id: currentEvent.id,
                                    event_image: currentEvent.imagePath,
                                    event_date: currentEvent.date,
                                    title: currentEvent.title,
                                    description: currentEvent.description,
                                    link: currentEvent.link,
                                    price: currentEvent.price,
                                    privacy: currentEvent.privacy,
                                    type: 'event'
                                }
                            })
                        }).then(res => res.json()).then(() => {
                            navigateTo('/club');
                            Toast().success('Ingresso adquirido com sucesso!');
                        }).finally(() => dismiss());
                    }
                }],
            })
        } else {
            if (Capacitor.getPlatform() === 'web') window.open(currentEvent.link);
            else Browser.open({ url: currentEvent.link });
        }
    }

    return (
        <IonContent>
            <div className='h-56' style={{
                backgroundImage: `url(${currentEvent?.imagePath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className='flex flex-col h-full w-full items-center justify-center px-8 sm:px-12 divide-y gap-4'>
                    <p className='text-white text-[2.5rem] leading-[2.5rem] font-bold text-start w-full'>{currentEvent.title}</p>
                    <div
                        className='text-[0.85rem] text-white pt-4 w-full'
                        dangerouslySetInnerHTML={{
                            __html: StringCutter(currentEvent.subtitle, 60),
                        }}
                    ></div>
                </div>
            </div>
            <div className='flex flex-col px-8 sm:px-12 py-8 gap-6'>
                <div className='flex flex-col'>
                    <p className='text-primary-700 font-bold text-[0.85rem]'>Atrações:</p>
                    <div className='text-[0.85rem] text-primary-700 font-bold'
                        dangerouslySetInnerHTML={{
                            __html: currentEvent.description,
                        }}
                    ></div>
                </div>
                <div className='flex flex-col'>
                    <p className='text-primary-700 font-bold text-[0.85rem]'>Local:</p>
                    <p className='text-[0.85rem] font-bold'>
                        {currentEvent.local}
                    </p>
                </div>
                <div className='flex flex-col'>
                    <p className='text-primary-700 font-bold text-[0.85rem]'>Endereço:</p>
                    <p className='text-[0.85rem]  font-bold'>
                        {currentEvent.address} número {currentEvent.number}, <br />{currentEvent.neighborhood} - {currentEvent.city} - {currentEvent.state}
                    </p>
                </div>

                <div className='bg-primary-700 rounded-[0.625rem] text-white p-4 mt-8'>
                    <p className='text-[0.75rem] font-bold text-center'>Nunca pediremos suas senhas pessoais ou entraremos em contato por meios não oficiais.</p>
                </div>

                <div className='flex flex-col items-end justify-center'>
                    <p className='text-primary-700 font-bold text-[0.75rem]'>Investimento:</p>
                    <p className='text-[2.5rem] font-bold text-primary-700 leading-[2.5rem]'>
                        {currentEvent.price ? `R$${currentEvent.price}` : 'Gratuito'}
                    </p>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='border border-primary-700 rounded-[0.625rem]'>
                        <button onClick={() => {
                            navigateTo('/club')
                        }} className=' text-primary-700 py-2 px-4 font-bold text-[0.75rem]' type='button'>Voltar</button>
                    </div>
                    {(currentEvent.price || currentEvent.link) && (
                        findHistoric() ? (
                            <ModalProsper.Modal>
                                <ModalProsper.ModalTrigger>   <button className='disabled:opacity-50 py-2 px-4 bg-primary-700 text-white font-bold text-[0.75rem] rounded-[0.625rem]'>
                                    <p className="text-white">Abrir Voucher</p>
                                </button>
                                </ModalProsper.ModalTrigger>
                                <ModalProsper.ModalContent className='w-4/5 rounded-[0.625rem] gap-0 p-0'>
                                    <ModalProsper.ModalHeader className='bg-primary rounded-t-[0.625rem]'>
                                        <p className='text-[1.75rem] text-white font-bold capitalize p-4'>Compra de Ingresso</p>
                                    </ModalProsper.ModalHeader>
                                    <div className='flex flex-col gap-4 p-4 items-center justify-center'>
                                        {/* <img className='w-3/5 h-auto' src={currentEvent.imagePath} alt="" /> */}
                                        <div
                                            className="text-primary-900 text-center text-[0.75rem] font-light"
                                            dangerouslySetInnerHTML={{
                                                __html: StringCutter(currentEvent.description, 125),
                                            }}
                                        ></div>
                                        <div className='border-2 p-3 rounded-[0.625rem]'>
                                            <QRCode value={currentEvent.id} size={180} />
                                        </div>
                                    </div>
                                </ModalProsper.ModalContent>
                            </ModalProsper.Modal>
                        ) : (
                            <button disabled={currentEvent.price && (balance < currentEvent.price)} className='disabled:opacity-50 py-2 px-4 bg-primary-700 text-white font-bold text-[0.75rem] rounded-[0.625rem]' onClick={action} type='button'>{currentEvent.price ? 'Comprar Entrada' : 'Participar'}</button>
                        )
                    )}
                </div>
            </div>

            <ModalProsper.Modal open={open} setOpen={setOpen}>
                <ModalProsper.ModalContent className='w-[80%] p-0 rounded-[0.625rem] gap-0'>
                    <ModalProsper.ModalHeader className='bg-primary rounded-t-[0.625rem]'>
                        <div className='flex flex-col px-2 py-4'>
                            <span className='text-white text-[1.5rem] font-bold'>Atenção!</span>
                            <span className='text-white text-[0.75rem]'>
                                Você não tem saldo suficiente para adquirir o ingresso para este evento.
                            </span>
                        </div>
                    </ModalProsper.ModalHeader>
                    <div className='flex items-end justify-center w-full p-4'>
                        <p>O que você deseja fazer?</p>
                    </div>
                    <ModalProsper.ModalFooter>
                        <div className='flex items-center justify-between'>
                            <button onClick={() => {
                                navigateTo('/club')
                            }} className='flex-1 bg-primary text-white p-4 font-bold' type='button'>
                                Voltar
                            </button>
                            <button onClick={() => {
                                navigateTo('/wallet')
                            }} className='flex-1 bg-primary text-white p-4 font-bold' type='button'>
                                Wallet
                            </button>
                        </div>
                    </ModalProsper.ModalFooter>
                </ModalProsper.ModalContent>
            </ModalProsper.Modal>
        </IonContent>
    )
}
