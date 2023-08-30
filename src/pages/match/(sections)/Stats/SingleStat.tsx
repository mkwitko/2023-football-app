import React, { useState } from 'react';

export default function SingleStat({
  name,
  value1,
  value2,
  isHome,
}: {
  name: string;
  value1: number;
  value2: number;
  isHome: boolean;
}) {
  const value1Percent = (value1 / (value1 + value2)) * 100;
  const value2Percent = (value2 / (value1 + value2)) * 100;

  return (
    <div className="flex flex-col flex-1 mx-4">
      <div className="flex items-center justify-between text-primary-800">
        <p>{name === 'Posse de Bola' ? value1 + '%' : value1}</p>

        <p className="font-bold">{name}</p>
        <p>{name === 'Posse de Bola' ? value2 + '%' : value2}</p>
      </div>
      <div className="flex w-full mt-2">
        <div
          className={`${
            isHome ? 'bg-primary' : 'bg-primary-900'
          } h-3 rounded-[0.625rem] rounded-r-none`}
          style={{
            width: `${value1Percent}%`,
          }}
        ></div>
        <div
          className={`${
            isHome ? 'bg-primary-900' : 'bg-primary'
          } h-3 rounded-[0.625rem] rounded-l-none`}
          style={{
            width: `${value2Percent}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
