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
import UserPurchaseClass from '@/classes/UserPurchase/UserPurchasesClass';

interface ContextProps {
    banner: BannerClass;
    noticias: NoticiasClass;
    notificacoes: NotificacoesClass;
    propaganda: PropagandaClass;
    user: UserClass;
    userPurchases: UserPurchaseClass;
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
        userPurchases,
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
        delete classes['userPurchases'];
        delete classes['orders'];
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
                orders.setClassById(true, res.uid).then((res) => {
                    if (res) orders.hook.setData(res);
                })
                userPurchases.setClassById(true, res.uid).then((res) => {
                    if (res) userPurchases.hook.setData(res.historic);
                })
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

    useEffect(() => {
        if (user.hook.data && user.hook.data.access_token) {
            fetch('https://www.googleapis.com/youtube/v3/members', {
                headers: {
                    Authorization: 'Bearer ' + user.hook.data.access_token
                }
            }).then(response => {
                response.json().then(data => {
                    console.log('members - ', data);
                })
            })
            fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + user.hook.data.access_token).then(response => {
                response.json().then(data => {
                    if (data.error) {
                        fetch('https://accounts.google.com/o/oauth2/token', {
                            method: 'POST',
                            body: JSON.stringify({
                                client_id: '74278825081-0vk8jpjve3talba3gdtgbuaot5o5f39p.apps.googleusercontent.com',
                                client_secret: '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',
                                refresh_token: user.hook.data.refresh_token,
                                grant_type: 'refresh_token',
                            })
                        }).then(response => {
                            response.json().then(data => {
                                user.update({
                                    access_token: data.access_token
                                })
                                user.hook.setData((prevData: any) => {
                                    return {
                                        ...prevData,
                                        access_token: data.access_token
                                    }
                                })
                            })
                        })
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
                userPurchases,
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
