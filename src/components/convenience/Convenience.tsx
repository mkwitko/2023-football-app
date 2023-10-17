import React, { useContext } from 'react';
import { StringCutter } from '../../utils/StringUtils';
import { Context } from '../../context/Context';
import Navigation from './../../services/Navigation';

export default function ConvenienceCard({ data, index }: { data: any, index: number }) {
    const { propaganda } = useContext(Context);
    const { navigateTo } = Navigation();
    return (
        <div onClick={() => {
            propaganda.hook.handleSetCurrent(data)
            navigateTo('/convenience/details');
        }} className={`w-full flex gap-4 pt-6 ${index !== 0 && 'border-t'}`}>
            <div className='w-[50%]'>
                <img className='object-cover aspect-square w-auto h-full rounded-[1.25rem]' src={data.imagePath} alt="" />
            </div>
            <div className='w-[50%]'>
                <div className='flex flex-col justify-between h-full'>
                    <div className='flex flex-col gap-2'>
                       <div className='flex items-center justify-start'>
                       <img className='object-contain w-[8rem] h-auto' src={data.logoPath} alt="" />
                       </div>
                        <div className='text-primary-900 text-[0.75rem]'
                            dangerouslySetInnerHTML={{
                                __html: StringCutter(data.description, 60, '...'),
                            }}
                        />
                    </div>
                    {data.link && (
                        <div className='self-end rounded-[0.625rem] border py-1 px-2'>
                            <button type='button'>
                               Acessar site
                            </button>
                        </div>
                    )}
                    {data.qrCode && (
                        <div className='self-end rounded-[0.625rem] border py-1 px-2'>
                            <button type='button'>
                               Gerar QR Code
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
