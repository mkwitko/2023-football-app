import { Context } from './../../context/Context'
import { IonContent } from '@ionic/react'
import React, { useContext } from 'react'

export default function Feed() {
    const { feeds } = useContext(Context);

    return (
        <IonContent fullscreen>
                <div className='flex flex-col gap-4 overflow-y-auto px-4 sm:px-8 my-4'>
                    {feeds.hook.data.map((e: any, i: number) => (
                        <FeedCards key={i} feed={e} />
                    ))}
                </div>
            </IonContent>
    )
}

const FeedCards = ({ feed }: any) => {
    return (
        <div className='bg-bgFeed rounded-[0.625rem] flex flex-col'>
            {feed.imagePath && (
                <img className=' shadow-feedShadow object-cover h-[10rem] rounded-t-[0.625rem]' src={feed.imagePath} alt={feed.title} />
            )}
            <div className='flex flex-col p-4 gap-4 text-white'>
                <div className='flex items-center gap-2'>
                    <img className='rounded-full h-8 w-8' src="https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.600.jpg" alt="" />
                    <div className='flex flex-col'>
                        <span className='text-white text-[0.75rem] font-bold'>Nome do autor</span>
                        <span className='text-white text-[0.6rem]'>
                            {feed.createdAt}
                        </span>
                    </div>
                </div>
                {/* <p className='text-[1.25rem] font-bold'>{feed.title}</p> */}
                <div className='text-[0.75rem] text-white'
                    dangerouslySetInnerHTML={{
                        __html: feed.description,
                    }}
                ></div>
            </div>
        </div>
    )
}