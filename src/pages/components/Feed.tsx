import Navigation from './../../services/Navigation';
import { StringCutter } from '../../utils/StringUtils'
import React from 'react'

export default function Feed({ feeds }: {
    feeds: any
}) {

    // {feeds.hook.data.sort((a: any, b: any) => b.timestamp - a.timestamp).map((e: any, i: number) => (
    //     ))}
    const { navigateTo } = Navigation();
    return (
        <div className="flex overflow-x-auto gap-4">
            {feeds.length > 0
                ? feeds.sort((a: any, b: any) => b.timestamp - a.timestamp)
                    .map((feed: any, i: number) => (
                        <div key={`feed_${i}`}>
                            <div onClick={() => {
                                navigateTo('feed');
                            }} className='border border-primary-800 rounded-[0.625rem] bg-transparent flex flex-col p-4 h-[9rem] w-[75vw] gap-2'>
                                <div className='flex items-center gap-2'>
                                    <img className='rounded-full h-8 w-8' src={feed.author && feed.author.avatar ? feed.author.avatar : 'https://shorturl.at/qGJRY'} alt="" />
                                    <div className='flex flex-col'>
                                        <span className='text-primary-900 text-[0.75rem] font-bold'>{feed.author && feed.author.name ? feed.author.name : 'Autor Desconhecido'}</span>
                                        <span className='text-primary-900 text-[0.6rem]'>
                                            {feed.createdAt}
                                        </span>
                                    </div>
                                </div>
                                <div className='text-[0.75rem] '
                                    dangerouslySetInnerHTML={{
                                        __html: StringCutter(feed.description, 200, '...'),
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))
                : Array.of(2).map((e, i) => {
                    <p>carregando</p>;
                })}
        </div>
    )
}
