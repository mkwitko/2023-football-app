import { IonFooter } from '@ionic/react';

import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { IoNewspaper } from 'react-icons/io5';
import { AiFillIdcard, AiOutlineYoutube, AiFillShop } from 'react-icons/ai';
import { useHistory, useLocation } from 'react-router';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { Context } from '../../../context/Context';

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
      link: 'https://loja.vozesdogigante.com.br/',
      icon: <AiFillShop />,
    },
    {
      title: 'Eventos',
      path: '/club',
      icon: <AiFillIdcard />,
    },
  ];

  const location = useLocation();
  const history = useHistory();

  const { youtube } = React.useContext(Context);

  const isLive =
    youtube.hook.live &&
    youtube.hook.live.snippet &&
    youtube.hook.live.snippet.liveBroadcastContent === 'live';

  return (
    <IonFooter className="h-[7%] bg-primary-500">
      <div className="flex items-center justify-evenly h-full ">
        {footer.map((e: any, i: number) => (
          <div
            key={i}
            onClick={() => {
              if (e.highlight && isLive) {
                history.push('/live');
              } else {
                if (e.path) {
                  history.push(e.path);
                }
                if (e.link) {
                  if (Capacitor.getPlatform() === 'web') window.open(e.link);
                  else Browser.open({ url: e.link });
                }
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
              className={`text-[1.25rem]   relative   
                ${e.path === location.pathname ? 'text-primary' : 'text-white'}
                ${
                  e.highlight
                    ? 'bg-primary rounded-full p-3 text-white text-[2rem]'
                    : ''
                }
               `}
            >
              {e.highlight && isLive && (
                <div>
                  <div className="absolute top-0 right-0 rounded-full p-2 bg-primary-700 animate-ping"></div>
                  <div className="absolute top-0 right-0 rounded-full p-2 bg-primary-700"></div>
                </div>
              )}
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
