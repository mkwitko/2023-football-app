import { IonContent } from '@ionic/react';
import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import { StringCutter } from '../../utils/StringUtils';
import VirtualScrollChild from '../../components/core/VirtualScroll';
import { useHistory } from 'react-router';
import { setCache } from '../../services/Cache';

export default function News() {
    const history = useHistory();
    const { noticias } = useContext(Context);
    return (
        <IonContent fullscreen>
            <div className="flex flex-col p-8">
                {noticias.hook.data.map((e: any, i: number) => (
                    <VirtualScrollChild
                        height={450}
                        key={i}
                    >
                        <div
                            onClick={() => {
                                setCache('newsDetails', e);
                                history.push('newsDetails');
                            }}
                            className="max-w-sm h-[26rem] rounded-[0.625rem] border border-borderColor/20 overflow-hidden"
                        >
                            <img
                                className="w-full rounded-t-[0.625rem]"
                                src={e.imagePath}
                                alt={e.title}
                            />
                            <div className="px-6 py-4">
                                <div className='flex items-center gap-2 mb-2'>
                                    <img className='rounded-full h-8 w-8' src="https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.600.jpg" alt="" />
                                    <div className='flex flex-col'>
                                        <span className='text-primary-900 text-[0.75rem] font-bold'>Nome do autor</span>
                                        <span className='text-primary-900 text-[0.6rem]'>
                                            {e.createdAt}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between font-bold text-primary-900">
                                    <div className="font-bold mb-2 text-[0.75rem]">
                                        <p>{StringCutter(e.title, 75, '...')}</p>
                                    </div>
                                    {/* <button
              type="button"
              className="bg-primary text-white p-2 rounded-full mt-[-4rem] shadow-md"
            >
              <AiOutlineShareAlt className="text-[1.5rem]" />
            </button> */}
                                </div>
                                <div
                                    className="text-[0.75rem]"
                                    dangerouslySetInnerHTML={{
                                        __html: StringCutter(e.description, 150, '...'),
                                    }}
                                ></div>
                            </div>
                        </div>
                    </VirtualScrollChild>
                ))}
            </div>
        </IonContent>
    );
}
