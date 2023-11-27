import React, { useContext } from 'react';
import { StringCutter } from '../../utils/StringUtils';
import ModalProsper from '../Shadcn/Modal';
import QRCode from 'qrcode.react';
import { Context } from 'src/context/Context';
import Navigation from 'src/services/Navigation';
import QrCode from '../QRCODE/QrCode';

export default function ConvenienceCard({ data }: { data: any }) {
    const { propaganda } = useContext(Context);
    const { navigateTo } = Navigation();

    return (
        <>
            <div onClick={() => {
                propaganda.hook.setCurrent(data);
                navigateTo('/convenience/details')
            }}
                style={{
                    backgroundImage: `linear-gradient(180deg, rgba(79,2,2,0.8) 20%, rgba(254,215,215, 0.5) 100%), url(${data.imagePath})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                className="flex flex-col w-full rounded-[0.625rem] h-[13rem] md:h-[15rem] shadow-convenienceShadow p-4"
            >
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-2">
                        <label className="text-[1.75rem] md:text-[2.5rem] text-white font-[800]">
                            {data.title}
                        </label>
                        <div
                            className="text-white text-[1rem] md:text-[1.5rem]"
                            dangerouslySetInnerHTML={{
                                __html: StringCutter(data.description, 125),
                            }}
                        ></div>
                    </div>
                    <div className="flex items-end justify-end mt-auto">
                        <button className="bg-primary-700  p-4 rounded-[0.625rem] w-1/3 font-bold uppercase text-[0.75rem] md:text-[1.25rem] mt-auto">
                            <p className="text-white">Ver mais</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}