import Navigation from './../../services/Navigation';
import { StringCutter } from '../../utils/StringUtils'
import React from 'react'

export default function Feed({ feed }: {
    feed: any
}) {
    const { navigateTo } = Navigation();
    return (
        <div>
            <div onClick={() => {
                navigateTo('feed');
            }} className='rounded-[0.625rem] bg-bgFeed text-white flex flex-col p-4 
        h-[7rem] w-[55vw] overflow-hidden gap-2'>
                <div className='flex items-center gap-2'>
                    <img className='rounded-full h-8 w-8' src="https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.600.jpg" alt="" />
                    <div className='flex flex-col'>
                        <span className='text-white text-[0.75rem] font-bold'>Nome do autor</span>
                        <span className='text-white text-[0.6rem]'>
                            {feed.createdAt}
                        </span>
                    </div>
                </div>
                {/* <p className='font-bold mb-2 capitalize'>{title}</p> */}
                <div className='text-[0.75rem] text-white'
                    dangerouslySetInnerHTML={{
                        __html: StringCutter(feed.description, 50, '...'),
                    }}
                ></div>
            </div>
        </div>
    )
}
