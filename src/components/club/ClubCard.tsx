import React, { useContext } from 'react';
import { StringCutter } from '../../utils/StringUtils';
import { Context } from 'src/context/Context';
import Navigation from 'src/services/Navigation';

export default function ClubCard({ data, disabled }: { data: any, disabled: boolean }) {
    const { eventos } = useContext(Context);
    const { navigateTo } = Navigation();

    return (
        <div className='flex gap-4 w-full'>
            <div className='h-36 w-36 aspect-square'>
                <img src={data.imagePath} alt="" className='rounded-[0.625rem] h-36 w-36 aspect-square' />
            </div>
            <div className='flex flex-col gap-4'>
               <div className='flex flex-col gap-2'>
               <p className='text-primary-700 font-bold'>{data.title}</p>
                <div
                className='text-[0.85rem] font-light'
                  dangerouslySetInnerHTML={{
                    __html: StringCutter(data.description, 60),
                  }}
                ></div>
               </div>
               <div className='flex justify-end items-end flex-1'>
                <button disabled={false} onClick={() => {
                    eventos.hook.setCurrentEvent(data);
                    navigateTo('/club/details')
                    eventos.setCache(data, true, 'currentEvent');
                }} type='button' className='disabled:opacity-50 text-white text-[0.75rem] bg-primary-700 py-2 px-6 rounded-[0.625rem]'>
                    {!disabled ? 'Participar' : 'Você já está participando!'}
                </button>
               </div>
            </div>
        </div>
    );
}
