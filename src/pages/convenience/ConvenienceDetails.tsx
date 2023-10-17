import { IonContent } from '@ionic/react'
import React, { useContext, useEffect } from 'react'
import { Context } from './../../context/Context';
import Navigation from './../../services/Navigation';
import { StringCutter } from '../../utils/StringUtils';

export default function ConvenienceDetails() {
    const { propaganda } = useContext(Context);
    const { navigateTo } = Navigation();
    useEffect(() => {
        if (!propaganda.hook.current) goBack();
    }, [])

    const goBack = () => {
        navigateTo('/convenience')
    }
    return (
        <IonContent fullscreen>
            {propaganda.hook.current && (
                <div className='flex flex-col p-8 gap-4'>
                    <img className='w-16 h-auto' src={propaganda.hook.current.logoPath} alt="" />
                    <div className='text-primary-900 border-b border-primary-900 pb-4'
                        dangerouslySetInnerHTML={{
                            __html: StringCutter(propaganda.hook.current.description),
                        }}
                    />
                    <div className='flex gap-8'>
                        <div className='w-[40%]'>
                            <img className='aspect-square w-full h-full rounded-[0.625rem]' src={propaganda.hook.current.imagePath} alt="" />
                        </div>
                        <div className='w-[60%]'>
                            <p>{propaganda.hook.current.title}</p>
                            <p className='font-bold mt-4'>Regras:</p>
                            <ol>
                                <li className='ml-2'>Todo o brasil</li>
                                <li className='ml-2'>Maiores de 18 anos</li>
                                <li className='ml-2'>Ser vip no app</li>
                            </ol>
                        </div>
                    </div>

                    <p className='text-center mt-4'>
                        O premio será enviado em até 15 dias úteis à partir da data do anuncio do vencedor. Nunca pediremos suas senhas pessoais ou entraremos em contato por meios não oficiais.
                    </p>

                    <div className='flex items-center justify-between w-full mt-4'>
                        <div className='bg-primary text-white py-2 px-6 rounded-[0.625rem]'>
                            <button onClick={goBack} type='button' >
                                Voltar
                            </button>
                        </div>
                        <div className='border border-primary-900 py-2 px-6 rounded-[0.625rem]'>
                            <button type='button'>
                                Participar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </IonContent>
    )
}
