import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React, { useState } from 'react'

/* Theme variables */
import './global'
import './theme/variables.css'

import Menu from './components/core/menu/Menu'
import { ContextProvider } from './context/Context'

import { Redirect, Route } from 'react-router'
import Routing from './infra/Route'

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import Authentication from './services/Auth'
import { getCache } from './services/Cache'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  GoogleAuthInitializer,
  GoogleAuthMetaTags,
} from './assets/GoogleAuthInitializer'

setupIonicReact()

// register Swiper custom elements
register()

const App: React.FC = () => {
  const [isLogged, setIsLogged] = useState(
    Object.keys(getCache('user')).length > 0,
  )
  const { auth } = Authentication()

  auth.onAuthStateChanged((user) => {
    setIsLogged(user !== null)

    if (user === null) {
      localStorage.clear()
    }
  })

  GoogleAuthInitializer()

  return (
    <IonApp>
      <IonReactRouter>
        <ContextProvider>
          <IonSplitPane contentId="main">
            <Menu isLogged={isLogged} />
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to={isLogged ? '/home' : '/login'} />
              </Route>
              <Routing isLogged={isLogged} />
            </IonRouterOutlet>
          </IonSplitPane>
        </ContextProvider>
      </IonReactRouter>

      <GoogleAuthMetaTags />

      <ToastContainer
        limit={1}
        autoClose={1000 * 2 /* 2 seconds */}
        hideProgressBar
        position="top-right"
      />
    </IonApp>
  )
}

export default App
