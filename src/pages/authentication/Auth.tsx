import { IonPage, IonContent } from '@ionic/react'
import React, { useState } from 'react'
import Logo from './../../assets/logo/logo.png'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Forgot from './components/Forgot/Forgot'

export default function AuthPage() {
  const [page, setPage] = useState(0)
  return (
    <IonContent fullscreen>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-16 md:h-36 w-auto"
            src={Logo}
            alt="Your Company"
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {page === 0 && <Login set={setPage} />}
          {page === 1 && <Register set={setPage} />}
          {page === 2 && <Forgot set={setPage} />}
        </div>
      </div>
    </IonContent>
  )
}
