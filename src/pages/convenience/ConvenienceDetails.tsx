import { IonContent } from '@ionic/react'
import React, { useContext, useEffect } from 'react'
import { Context } from './../../context/Context';
import Navigation from './../../services/Navigation';
import { StringCutter } from '../../utils/StringUtils';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

export default function ConvenienceDetails() {
    const { propaganda } = useContext(Context);
    const { navigateTo } = Navigation();
    useEffect(() => {
        if (!propaganda.hook.current) goBack();

        console.log(propaganda.hook.current);
    }, [])

    const goBack = () => {
        navigateTo('/convenience')
    }
    return (
        <IonContent fullscreen>
            {propaganda.hook.current && (
                <div className='flex flex-col p-8 gap-4'>
                    <img className='w-32 h-auto' src={propaganda.hook.current.logoPath} alt="" />
                    <p className='text-primary font-bold border-b pb-4 border-primary'>{propaganda.hook.current.title}</p>
                    <div className='flex gap-8 h-[15rem]'>
                        <img className='aspect-square w-full h-full rounded[0.325rem]' src={propaganda.hook.current.imagePath} alt="" />
                    </div>
                    <div className='text-primary-900'
                        dangerouslySetInnerHTML={{
                            __html: StringCutter(propaganda.hook.current.description, 9999),
                        }}
                    ></div>
                    <div className='flex items-center justify-between w-full'>
                        <div className='text-[0.75rem] bg-white border border-primary-700 text-primary-700 py-2 px-6 rounded-[0.625rem]'>
                            <button onClick={goBack} type='button' >
                                Voltar
                            </button>
                        </div>
                        <div className='bg-primary-700 text-[0.75rem] text-white py-2 px-6 rounded-[0.625rem]'>
                            <button onClick={() => {

                                if (Capacitor.getPlatform() === 'web') window.open(propaganda.hook.current.link);
                                else Browser.open({ url: propaganda.hook.current.link });
                            }} type='button'>
                                Participar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </IonContent>
    )
}
