import React from 'react';
import {
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
import { BsFillCalendarCheckFill } from 'react-icons/bs';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Perfil',
    url: '/profile',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: 'Configurações',
    url: '/profile',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: 'Métodos de Pagamento',
    url: '/profile',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: 'Histórico de Compras',
    url: '/profile',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
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
          <div className="p-4 py-12 bg-primary">
            <p className="text-[1.5rem] font-bold text-white">
              Renanzinho maravila
            </p>
            <p className="text-[0.75rem] text-white">bananinha137@gmail.com</p>
          </div>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle
                key={index}
                autoHide={false}
              >
                <IonItem
                  className={`
                  ${location.pathname === appPage.url ? 'selected' : ''}
                  ${index === 0 ? 'mt-4' : ''}
                  flex`}
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <div className="text-[1.25rem] text-primary-700 mr-4">
                    <BsFillCalendarCheckFill />
                  </div>
                  <p>{appPage.title}</p>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar
          onClick={() => {
            signOut().then((res) => {
              menuOnOff(false);
              console.log('sign out - ', res);
              navigateTo('/login');
            });
          }}
          color="primary"
        >
          <IonTitle>Sair</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
