import SurveysClass from 'src/classes/Surveys/SurverysClass';
import BannerClass from '../classes/Banners/BannerClass';
import EventosClass from '../classes/Eventos/EventosClass';
import FeedsClass from '../classes/Feeds/FeedsClass';
import NoticiasClass from '../classes/Noticias/NoticiaClass';
import NotificacoesClass from '../classes/Notificacoes/NotificacoesClass';
import PropagandaClass from '../classes/Propaganda/PropagandaClass';
import UserClass from '../classes/User/UserClass';
import YoutubeClass from '../classes/Youtube/YoutubeClass';
import Authentication from '../services/Auth';
import FootballApi from '../services/FootballApi/FootballApi';
import Classes from './../classes';

import React, { useEffect } from 'react';
import WalletClass from 'src/classes/Wallet/WalletClass';
import OrdersClass from 'src/classes/Orders/OrdersClass';
import { decrypt } from 'src/services/Encrypt';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

interface ContextProps {
    banner: BannerClass;
    noticias: NoticiasClass;
    notificacoes: NotificacoesClass;
    propaganda: PropagandaClass;
    user: UserClass;
    eventos: EventosClass;
    findGames: any;
    findTable: any;
    head2Head: any;
    hook: any;
    youtube: YoutubeClass;
    feeds: FeedsClass;
    orders: OrdersClass;
    surveys: SurveysClass;
    wallets: WalletClass
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
        user,
        youtube,
        feeds,
        orders,
        surveys,
        wallets,
    }: ContextProps = classes;

    const { findGames, findTable, head2Head, hook }: any = FootballApi();

    const [isLogout, setIsLogout] = React.useState(false);


    useEffect(() => {
        delete classes['user'];
        delete classes['wallets'];
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
                wallets.getHttp(res.uid).then((res: any) => {
                    if (res) {
                        const balance = +decrypt(res.balance);
                        wallets.hook.setData({
                            id: res.id,
                            balance
                        });
                    }
                })
                youtube.getLive();
            }
        });

        findGames();
    }, []);

    const login =
        useGoogleLogin({
            onSuccess: tokenResponse => {
                fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + tokenResponse.access_token).then(response => {
                    response.json().then(data => {
                        console.log(data);
                    })
                })
            },
            scope: 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl',
        });

    useEffect(() => {
        if (user.hook.data && user.hook.data.access_token) {
            fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + user.hook.data.access_token).then(response => {
                response.json().then(data => {
                    if (data.error) {
                        setIsLogout(true);
                        // login();
                    } else
                        console.log('logged gmail user - ', data);
                })
            })
        }
    }, [user.hook.data])

    return (
        <Context.Provider
            value={{
                banner,
                noticias,
                notificacoes,
                propaganda,
                user,
                eventos,
                findGames,
                findTable,
                head2Head,
                youtube,
                hook,
                feeds,
                orders,
                surveys,
                wallets
            }}
        >
            {isLogout && (
                <GoogleLogin auto_select useOneTap
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            )}

            {children}
        </Context.Provider>
    );
}
