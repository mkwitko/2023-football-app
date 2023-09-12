import React from 'react';
import { StringCutter } from '../../utils/StringUtils';

export default function ConvenienceCard({ data }: { data: any }) {
  console.log(data);
  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(79,2,2,0.8) 20%, rgba(254,215,215, 0.5) 100%), url(${data.url})`,
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
                __html: StringCutter(data.text, 125),
              }}
            ></div>
          </div>
          <div className="flex items-end justify-end mt-auto">
            {data.url && (
              <button className="bg-primary-700  p-4 rounded-[0.625rem] w-1/3 font-bold uppercase text-[0.75rem] mt-auto">
                <p className="text-white">Ver mais</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
