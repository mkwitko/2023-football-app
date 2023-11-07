import React, { useContext } from 'react';
import {
    IonAvatar,
    IonContent,
    IonFooter,
    IonItem,
    IonMenu,
    IonMenuToggle,
    IonToolbar,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import './Menu.css';
import Auth from '../../../services/Auth';
import Navigation from '../../../services/Navigation';
import { menuOnOff } from '../../../services/Menu';
import { AiFillIdcard, AiFillSetting, AiFillTrophy, AiFillCarryOut } from "react-icons/ai";
import { BsFillHouseFill, BsPersonCircle, BsFillTicketPerforatedFill, BsYoutube } from "react-icons/bs";
import { MdWorkHistory } from "react-icons/md";
import { Context } from 'src/context/Context';

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
        url: '/club',
        icon: <AiFillIdcard />,
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
        title: 'Enquetes',
        url: '/surveys',
        icon: <BsYoutube />,
    },
    {
        title: 'Canais do Youtube',
        url: '/channels',
        icon: <BsYoutube />,
    },
    {
        title: 'Configurações',
        url: '/',
        icon: <AiFillSetting />,
    },
    {
        title: 'Histórico de Compras',
        url: '/purchases',
        icon: <MdWorkHistory />,
    },
];

const Menu: React.FC = () => {
    const { signOut } = Auth();
    const { navigateTo } = Navigation();
    const location = useLocation();

    const { user } = useContext(Context);

    return (
        <IonMenu
            contentId="main"
            type="overlay"
        >
            <IonContent>
                <div className="flex flex-col">
                    <div className="flex flex-col items-center gap-4">
                        {user.hook.data && (
                            <>
                                <img className='h-24 w-24 rounded-full mt-12 border-2 border-white' src={user.hook.data.avatar} />
                                <p className="text-white font-bold">{user.hook.data.name}</p>
                            </>
                        )}
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
