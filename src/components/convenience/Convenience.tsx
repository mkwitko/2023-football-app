import React, { useContext } from 'react';
import { StringCutter } from '../../utils/StringUtils';
import ModalProsper from '../Shadcn/Modal';
import QRCode from 'qrcode.react';
import { Context } from 'src/context/Context';
import Navigation from 'src/services/Navigation';
import QrCode from '../QRCODE/QrCode';

export default function ConvenienceCard({ data }: { data: any }) {
    console.log(data);
    const { propaganda } = useContext(Context);
    const { navigateTo } = Navigation();

    return (
        <>
            <div onClick={() => {
                if (data.qrCode) return;
                propaganda.hook.setCurrent(data);
                navigateTo('/convenience/details')
            }}
                style={{
                    backgroundImage: `linear-gradient(180deg, rgba(79,2,2,0.8) 20%, rgba(254,215,215, 0.5) 100%), url(${data.imagePath})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                className="flex flex-col w-full rounded-[0.625rem] h-[13rem] shadow-convenienceShadow p-4"
            >
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-2">
                        <label className="text-[1.75rem] text-white font-bold">
                            {data.title}
                        </label>
                        <div
                            className="text-white"
                            dangerouslySetInnerHTML={{
                                __html: StringCutter(data.description, 125),
                            }}
                        ></div>
                    </div>
                    <div className="flex items-end justify-end mt-auto">
                        {data.link && (
                            <button className="bg-primary-700  p-4 rounded-[0.625rem] w-1/3 font-bold uppercase text-[0.75rem] mt-auto">
                                <p className="text-white">Ver mais</p>
                            </button>
                        )}
                        {data.qrCode && (
                            <ModalProsper.Modal>
                                <ModalProsper.ModalTrigger>   <button className="bg-primary-700  p-4 rounded-[0.625rem] w-full font-bold uppercase text-[0.75rem] mt-auto">
                                    <p className="text-white">QR Code</p>
                                </button>
                                </ModalProsper.ModalTrigger>
                                <ModalProsper.ModalContent className='w-4/5 rounded-[0.625rem] gap-0 p-0'>
                                    <ModalProsper.ModalHeader className='bg-primary rounded-t-[0.625rem]'>
                                        <p className='text-[1.75rem] text-white font-bold capitalize p-4'>Desconto em Loja</p>
                                    </ModalProsper.ModalHeader>
                                    <div className='flex flex-col gap-4 p-4 items-center justify-center'>
                                        <img className='w-3/5 h-auto' src={data.logoPath} alt="" />
                                        <div
                                            className="text-primary-900 text-center text-[0.75rem] font-light"
                                            dangerouslySetInnerHTML={{
                                                __html: StringCutter(data.description, 125),
                                            }}
                                        ></div>
                                        <div className='border-2 p-3 rounded-[0.625rem]'>
                                            <QRCode value={data.qrCode} size={180} />
                                        </div>
                                    </div>
                                </ModalProsper.ModalContent>
                            </ModalProsper.Modal>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}