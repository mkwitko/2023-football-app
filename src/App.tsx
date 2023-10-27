import React, { useState } from 'react';
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

import { GoogleOAuthProvider } from '@react-oauth/google';


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

    return (
        <GoogleOAuthProvider clientId={'74278825081-0vk8jpjve3talba3gdtgbuaot5o5f39p.apps.googleusercontent.com'}>
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
