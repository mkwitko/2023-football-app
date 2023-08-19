import React from 'react';
import { BsFillPersonVcardFill, BsFillCalendarCheckFill } from 'react-icons/bs';
import { FaNewspaper } from 'react-icons/fa';
import { GiPodium } from 'react-icons/gi';
import { useHistory } from 'react-router-dom';

export default function Categories() {
  const history = useHistory();
  const categories = [
    {
      title: 'Loja',
      url: '/store',
      icon: <FaNewspaper />,
    },
    {
      title: 'Convênios',
      url: '/convenience',
      icon: <BsFillPersonVcardFill />,
    },
    {
      title: 'Tabela',
      url: '/table',
      icon: <GiPodium />,
    },
    {
      title: 'Calendário',
      url: '/calendar',
      icon: <BsFillCalendarCheckFill />,
    },
  ];
  return (
    <div className="flex overflow-x-auto gap-4 py-2">
      {categories.map((e, i) => (
        <div
          key={i}
          onClick={(click) => {
            click.preventDefault();
            history.push(e.url);
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
