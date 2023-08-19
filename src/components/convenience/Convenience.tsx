import React from 'react';

export default function ConvenienceCard() {
  return (
    <>
      <div
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(79,2,2,0.8) 20%, rgba(254,215,215, 0.5) 100%), url(https://picsum.photos/200/300)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="flex flex-col w-full rounded-[0.625rem] h-[12.5rem] shadow-convenienceShadow"
      >
        <div className="flex flex-col h-full m-4 gap-2">
          <label className="text-[1.75rem] text-white font-bold">
            Moita Lanches
          </label>
          <p className="text-white w-full">10% de desconto no Xis Carne</p>
          <div className="flex items-end justify-end h-full">
            <button className="bg-primary-700 text-white p-4 rounded-[0.625rem] w-1/3 font-bold uppercase text-[0.75rem]">
              <p>Ver mais</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
