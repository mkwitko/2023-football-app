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
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from 'ionicons/icons';
import './Menu.css';
import Auth from '../../../services/Auth';
import Navigation from '../../../services/Navigation';
import { menuOnOff } from '../../../services/Menu';

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
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle
                key={index}
                autoHide={false}
              >
                <IonItem
                  className={`
                  ${location.pathname === appPage.url ? 'selected' : ''}
                  ${index === 0 ? 'mt-8 border-t pt-4' : ''}
                  `}
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
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
