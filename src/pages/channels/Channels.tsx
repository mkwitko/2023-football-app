import { Context } from 'src/context/Context';
import { IonContent } from '@ionic/react';
import React, { useContext } from 'react';

export default function Channels() {

    const { orders, userPurchases } = useContext(Context);
    return (
        <IonContent fullscreen>
            <div className='flex flex-col px-4 sm:px-8 pt-8 gap-8'>
                <div className='flex flex-col gap-4'>
                    <p className='uppercase text-primary-700 font-bold'>Playlists</p>
                    <div className='flex justif gap-4 flex-wrap'>
                        {[0, 1, 2, 3, 4, 5].map((e) => (
                            <div className='rounded-[0.625rem] w-[20%] aspect-square h-auto' style={{
                                backgroundImage: 'url(https://i.ytimg.com/vi/9XaS93WMRQQ/maxresdefault.jpg)',
                            }} />
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <p className='uppercase text-primary-700 font-bold'>Canais do Youtube</p>
                    <div className='flex justif gap-4 flex-wrap'>
                        {[0, 1, 2, 3, 4, 5].map((e) => (
                            <div className='rounded-[0.625rem] w-[20%] aspect-square h-auto' style={{
                                backgroundImage: 'url(https://i.ytimg.com/vi/9XaS93WMRQQ/maxresdefault.jpg)',
                            }} />
                        ))}
                    </div>
                </div>
            </div>
        </IonContent>
    );
}
