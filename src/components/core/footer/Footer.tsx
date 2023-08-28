import { IonFooter } from '@ionic/react';

import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { IoNewspaper } from 'react-icons/io5';
import { FaShoppingBag } from 'react-icons/fa';
import { AiOutlineYoutube } from 'react-icons/ai';
import { FaMoneyCheck } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

export default function Footer() {
  const footer = [
    {
      title: 'Home',
      path: '/home',
      icon: <AiFillHome />,
    },
    {
      title: 'Notícias',
      path: '/news',
      icon: <IoNewspaper />,
    },
    {
      link: process.env.REACT_APP_YOUTUBE,
      icon: <AiOutlineYoutube />,
      highlight: true,
    },
    {
      title: 'Loja',
      path: 'https://www.google.com.br',
      icon: <FaShoppingBag />,
    },
    {
      title: 'Clube',
      path: '/club',
      icon: <FaMoneyCheck />,
    },
  ];

  const location = useLocation();
  const history = useHistory();

  return (
    <IonFooter className="h-[7%] bg-primary-500">
      <div className="flex items-center justify-evenly h-full ">
        {footer.map((e: any, i: number) => (
          <div
            key={i}
            onClick={() => {
              if (e.path) {
                history.push(e.path);
              }
              if (e.link) {
                if (Capacitor.getPlatform() === 'web') window.open(e.link);
                else Browser.open({ url: e.link });
              }
            }}
            className={`flex flex-col items-center justify-center
              ${
                e.highlight
                  ? 'mt-[-3.5rem] bg-white shadow-box rounded-full p-2'
                  : 'px-4 py-6   max-w-[4rem]'
              }
              ${
                e.path === location.pathname
                  ? 'bg-white shadow-convenienceShadow rounded-[0.625rem]'
                  : ''
              }
              `}
          >
            <div
              className={`text-[1.25rem]     
                ${e.path === location.pathname ? 'text-primary' : 'text-white'}
                ${
                  e.highlight
                    ? 'bg-primary rounded-full p-3 text-white text-[2rem]'
                    : ''
                }
               `}
            >
              {e.icon}
            </div>
            {e.title && (
              <p
                className={`text-[0.75rem] text-cente
              ${
                e.path === location.pathname
                  ? 'text-primary '
                  : 'text-white font-bold'
              }`}
              >
                {e.title}
              </p>
            )}
          </div>
        ))}
      </div>
    </IonFooter>
  );
}
