import React, { useEffect, useState } from 'react';
import {
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
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

import { Capacitor } from '@capacitor/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';


// register Swiper custom elements
register();

const App: React.FC = () => {
    const [isLogged, setIsLogged] = useState(
        Object.keys(getCache('user')).length > 0
    );
    const { auth } = Authentication();

    useEffect(() => {
        console.log('is logged - ', isLogged);
    }, [isLogged])

    auth.onAuthStateChanged((user) => {
        console.log('change user - ', user);
        setIsLogged(user !== null);
    });

    GoogleAuth.initialize({
        clientId: '976746971009-db916m71jq3u7ogtbbbuab85uv94k47j.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
    });

    return (
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

            <meta name='google-signin-client-id' content='976746971009-09fhl5selrn61v7lpqmqf1rf5qbm0pns.apps.googleusercontent.com' />
            <meta name="google-signin-scope" content="profile email" />

            <ToastContainer
                autoClose={1000 * 2 /* 2 seconds */}
                hideProgressBar
                position="top-right"
            />
        </IonApp>
    );
};

export default App;
