import React from 'react';
import { BsFillTicketPerforatedFill } from 'react-icons/bs';
import { AiFillShop, AiFillTrophy, AiFillCarryOut } from 'react-icons/ai';
import { BiSolidWallet } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

export default function Categories() {
  const history = useHistory();
  const categories = [
    {
      title: 'Loja',
      link: 'https://loja.vozesdogigante.com.br/',
      icon: <AiFillShop />,
    },
    {
      title: 'Convênios',
      url: '/convenience',
      icon: <BsFillTicketPerforatedFill />,
    },
    {
      title: 'Tabela',
      url: '/table',
      icon: <AiFillTrophy />,
    },
    {
      title: 'Calendário',
      url: '/calendar',
      icon: <AiFillCarryOut />,
    },
    {
        title: 'Carteira',
        url: '/wallet',
        icon: <BiSolidWallet />,
      },
  ];
  return (
    <div className="flex overflow-x-auto gap-4 py-2">
      {categories.map((e, i) => (
        <div
          key={i}
          onClick={(click) => {
            click.preventDefault();
            if (e.url) history.push(e.url);
            if (e.link) {
                if (Capacitor.getPlatform() === 'web') window.open(e.link);
                else Browser.open({ url: e.link });
            }
          }}
          className={`flex flex-col items-center justify-center rounded-[0.625rem] gap-2 w-[5rem] h-[5rem] aspect-square shadow-md border border-white/50`}
        >
          <div className="text-[1.25rem] text-primary-700">{e.icon}</div>
          <p className="text-[0.75rem] text-center text-primary-700">
            {e.title}
          </p>
        </div>
      ))}
    </div>
  );
}
