import React from 'react';
import { StringCutter } from '../../utils/StringUtils';

export default function ClubCard({ data }: { data: any }) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-full bg-white rounded-b-[0.625rem] shadow-convenienceShadow sm:w-3/4 md:w-1/2 lg:w-3/5">
        <div
          className="w-full h-40 bg-top bg-cover rounded-t-[0.625rem]"
          style={{
            backgroundImage: `url(${data.url})`,
          }}
        ></div>
        <div className="flex flex-col w-full md:flex-row">
          <div className="flex flex-row justify-start p-4 font-bold leading-none capitalize bg-primary-700 md:flex-col md:items-center md:justify-center md:w-1/4 mt-[-1rem] rounded-t-[0.625rem]">
            <p className="text-white text-[1.25rem]">{data.title}</p>
          </div>
          <div className="flex flex-col gap-4 p-4 font-norma md:w-3/4">
            <p className="leading-normal text-justify">
              {StringCutter(data.text, 265)}
            </p>

            <div className="flex flex-col">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-[0.75rem] font-bold text-primary-700">
                    {/* TODO adicionar o dia */}
                    {data.date} - Segunda Feira - {data.hour}
                  </p>
                  <p className="text-[0.75rem] font-bold text-primary-900">
                    {/* TODO adicionar endereço que vem do back ( ainda nao tem ) */}
                    Av. Ipiranga, 6681 - Partenon, Porto Alegre - PUCRS
                  </p>
                </div>
                <button className="bg-primary-700  p-4 rounded-[0.625rem] w-1/3 font-bold uppercase text-[0.75rem]">
                  <p className="text-white">Acessar</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}