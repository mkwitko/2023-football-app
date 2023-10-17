import React from 'react';
import { StringCutter } from '../../../utils/StringUtils';
import { useHistory } from 'react-router';
import { setCache } from '../../../services/Cache';

export default function NewsCard({ noticias }: { noticias: any }) {
    const history = useHistory();
    const limit = 2;
    return (
        <div className="flex overflow-x-auto gap-4">
            {noticias.hook.data.length > 0
                ? noticias.hook.data
                    .map((e: any, i: number) => (
                        <div
                            key={i}
                            className="flex flex-col "
                            onClick={() => {
                                setCache('newsDetails', e);
                                history.push('newsDetails');
                            }}
                        >
                            <div className="h-[20rem] w-[55vw] rounded-[0.625rem] overflow-hidden border border-borderColor/20 shadow-lg">
                                <img
                                    className="w-full"
                                    src={e.imagePath}
                                    alt="Sunset in the mountains"
                                />
                                <div className="flex flex-col gap-2 p-4">
                                    <div className='flex items-center gap-2'>
                                        <img className='rounded-full h-8 w-8' src="https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.600.jpg" alt="" />
                                        <div className='flex flex-col'>
                                            <span className='text-primary-900 text-[0.75rem] font-bold'>Nome do autor</span>
                                            <span className='text-primary-900 text-[0.6rem]'>
                                                {e.createdAt}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="font-bold text-[1rem]">
                                        {StringCutter(e.title, 40, '...')}
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: StringCutter(e.description, 100, '...'),
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))
                    .slice(0, limit)
                : Array.of(limit).map((e, i) => {
                    <p>carregando</p>;
                })}
        </div>
    );
}
