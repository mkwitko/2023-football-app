import BannerClass from '../classes/Banners/BannerClass';
import EventosClass from '../classes/Eventos/EventosClass';
import NoticiasClass from '../classes/Noticias/NoticiaClass';
import NotificacoesClass from '../classes/Notificacoes/NotificacoesClass';
import PropagandaClass from '../classes/Propaganda/PropagandaClass';
import RedirecionamentoClass from '../classes/Redirecionamentos/RedirecionamentoClass';
import UserClass from '../classes/User/UserClass';
import YoutubeClass from '../classes/Youtube/YoutubeClass';
import Authentication from '../services/Auth';
import FootballApi from '../services/FootballApi/FootballApi';
import Classes from './../classes';

import React, { useEffect } from 'react';

interface ContextProps {
  banner: BannerClass;
  noticias: NoticiasClass;
  notificacoes: NotificacoesClass;
  propaganda: PropagandaClass;
  redirecionamentos: RedirecionamentoClass;
  user: UserClass;
  eventos: EventosClass;
  findGames: any;
  findTable: any;
  head2Head: any;
  hook: any;
  youtube: YoutubeClass;
}

export const Context = React.createContext({} as ContextProps);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const classes: any = Classes();
  const { auth } = Authentication();
  const {
    banner,
    noticias,
    notificacoes,
    eventos,
    propaganda,
    redirecionamentos,
    user,
    youtube,
  }: ContextProps = classes;

  const { findGames, findTable, head2Head, hook }: any = FootballApi();

  useEffect(() => {
    delete classes['user'];
    delete classes['youtube'];
    Object.keys(classes).forEach((classe: any) => {
      classes[classe].setClass(true).then((res: any) => {
        if (res && res.length > 0) {
          classes[classe].hook.setData(res);
        }
      });
    });

    auth.onAuthStateChanged((res: any) => {
      if (res) {
        user.setClassById(true, res.uid).then((res) => {
          if (res) {
            user.hook.setData(res);
          }
        });
        youtube.getLive();
      }
    });

    findGames();
  }, []);

  return (
    <Context.Provider
      value={{
        banner,
        noticias,
        notificacoes,
        propaganda,
        redirecionamentos,
        user,
        eventos,
        findGames,
        findTable,
        head2Head,
        youtube,
        hook,
      }}
    >
      {children}
    </Context.Provider>
  );
}
