import React, { useEffect, useState } from 'react';
import {
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
    isPlatform,
    setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Theme variables */
import './theme/variables.css';
import './global';

import Menu from './components/core/menu/Menu';
import { ContextProvider } from './context/Context';

import Routing from './infra/Route';
import { Route, Redirect } from 'react-router';

setupIonicReact();

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import Authentication from './services/Auth';
import { getCache } from './services/Cache';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { Capacitor } from '@capacitor/core';


// register Swiper custom elements
register();

const App: React.FC = () => {
    const [isLogged, setIsLogged] = useState(
        Object.keys(getCache('user')).length > 0
    );
    const { auth } = Authentication();

    auth.onAuthStateChanged((user) => {
        setIsLogged(user !== null);
    });

    const getClientId = () => {
        if (Capacitor.getPlatform() === 'ios') return '74278825081-a2ogi16sqibq7tchq2r7f6orr1309aiq.apps.googleusercontent.com';
        if (Capacitor.getPlatform() === 'android') return '74278825081-l47g18kb7mkc8rj819nbrsaih3mllne6.apps.googleusercontent.com';
        return '74278825081-0vk8jpjve3talba3gdtgbuaot5o5f39p.apps.googleusercontent.com'
    }

    return (
        <GoogleOAuthProvider clientId={getClientId()}>
            <IonApp>
                <IonReactRouter>
                    <ContextProvider>
                        <IonSplitPane contentId="main">
                            <Menu />
                            <IonRouterOutlet id="main">
                                <Route
                                    path="/"
                                    exact={true}
                                >
                                    <Redirect to={isLogged ? '/home' : '/login'} />
                                </Route>
                                <Routing isLogged={isLogged} />
                            </IonRouterOutlet>
                        </IonSplitPane>
                    </ContextProvider>
                </IonReactRouter>

                <ToastContainer
                    autoClose={1000 * 2 /* 2 seconds */}
                    hideProgressBar
                    position="top-right"
                />
            </IonApp>
        </GoogleOAuthProvider>
    );
};

export default App;
