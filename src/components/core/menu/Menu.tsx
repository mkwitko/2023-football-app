import React from 'react';
import {
  IonAvatar,
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { mailOutline, mailSharp } from 'ionicons/icons';
import './Menu.css';
import Auth from '../../../services/Auth';
import Navigation from '../../../services/Navigation';
import { menuOnOff } from '../../../services/Menu';
import { AiFillIdcard, AiFillSetting } from "react-icons/ai";
import { BsFillHouseFill, BsPersonCircle, BsYoutube } from "react-icons/bs";
import { MdOutlinePayment, MdWorkHistory } from "react-icons/md";

interface AppPage {
  url: string;
  icon: any;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/',
    icon: <BsFillHouseFill />,
  },
  {
    title: 'Perfil',
    url: '/profile',
    icon: <BsPersonCircle />,
  },
  {
    title: 'Clube VDG',
    url: '/profile',
    icon: <AiFillIdcard />,
  },
  {
    title: 'Canal Vozes do Gigante',
    url: '/profile',
    icon: <BsYoutube />,
  },
  {
    title: 'Configurações',
    url: '/profile',
    icon: <AiFillSetting />,
  },
  {
    title: 'Métodos de Pagamento',
    url: '/profile',
    icon: <MdOutlinePayment />,
  },
  {
    title: 'Histórico de Compras',
    url: '/profile',
    icon: <MdWorkHistory />,
  },
];

const Menu: React.FC = () => {
  const { signOut } = Auth();
  const { navigateTo } = Navigation();
  const location = useLocation();

  return (
    <IonMenu
      contentId="main"
      type="overlay"
    >
      <IonContent>
        <div className="flex flex-col">
          <div className="flex flex-col items-center gap-4">
            <IonAvatar>
              <img src="https://www.gravatar.com/avatar?d=mp" />
            </IonAvatar>
            <p className="text-white font-bold">Nome do Usuário aqui</p>
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto mt-8">
            {appPages.map((appPage, index) => {
              return (
                <IonMenuToggle
                  className="bg-transparent"
                  key={index}
                  autoHide={false}
                >
                  <IonItem
                    color="transparent"
                    className={`
                  ${location.pathname === appPage.url ? 'selected' : ''}
                  ${index === 0 ? 'mt-4' : ''}
                  flex bg-transparent`}
                    routerLink={appPage.url}
                    routerDirection="none"
                    lines="none"
                    detail={false}
                  >
                    <div className="flex gap-6 items-center font-semibold">
                      <div className="text-[1.25rem] text-white/90">
                        {appPage.icon}
                      </div>
                      <p className="text-white/90">{appPage.title}</p>
                    </div>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
          </div>
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar
          className="border-t border-white "
          onClick={() => {
            signOut().then((res) => {
              menuOnOff(false);
              console.log('sign out - ', res);
              navigateTo('/login');
            });
          }}
        >
          <div className="flex items-center justify-center">
            <p className="text-white font-bold uppercase">Sair</p>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
