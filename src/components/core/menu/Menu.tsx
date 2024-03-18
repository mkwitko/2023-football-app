import React, { useContext, useEffect } from 'react'
import {
  IonContent,
  IonFooter,
  IonItem,
  IonMenu,
  IonMenuToggle,
  IonToolbar,
} from '@ionic/react'

import { useLocation } from 'react-router-dom'
import './Menu.css'
import Auth from '../../../services/Auth'
import Navigation from '../../../services/Navigation'
import { menuOnOff } from '../../../services/Menu'
import { AiFillIdcard, AiFillTrophy, AiFillCarryOut } from 'react-icons/ai'
import {
  BsFillHouseFill,
  BsPersonCircle,
  BsFillTicketPerforatedFill,
  BsYoutube,
} from 'react-icons/bs'
import { MdWorkHistory } from 'react-icons/md'
import { Context } from 'src/context/Context'

interface AppPage {
  url: string
  icon: any
  title: string
  showAnon: boolean
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/',
    icon: <BsFillHouseFill />,
    showAnon: true,
  },
  {
    title: 'Perfil',
    url: '/profile',
    icon: <BsPersonCircle />,
    showAnon: false,
  },
  {
    title: 'Clube VDG',
    url: '/club',
    icon: <AiFillIdcard />,
    showAnon: false,
  },
  {
    title: 'Convênios',
    url: '/convenience',
    icon: <BsFillTicketPerforatedFill />,
    showAnon: false,
  },
  {
    title: 'Tabela',
    url: '/table',
    icon: <AiFillTrophy />,
    showAnon: true,
  },
  {
    title: 'Calendário',
    url: '/calendar',
    icon: <AiFillCarryOut />,
    showAnon: true,
  },
  {
    title: 'Enquetes',
    url: '/surveys',
    icon: <BsYoutube />,
    showAnon: true,
  },
  {
    title: 'Canais do Youtube',
    url: '/channels',
    icon: <BsYoutube />,
    showAnon: true,
  },
  {
    title: 'Histórico de Compras',
    url: '/purchases',
    icon: <MdWorkHistory />,
    showAnon: false,
  },
]

export default function Menu({ isLogged }: any) {
  const { auth, signOut } = Auth()
  const { navigateTo } = Navigation()
  const location = useLocation()

  const { user } = useContext(Context)

  useEffect(() => {
    console.log(isLogged)
  }, [])

  return (
    <IonMenu disabled={!isLogged} contentId="main" type="overlay">
      <IonContent>
        <div className="flex flex-col">
          <div className="flex flex-col items-center gap-4">
            {user.hook.data && (
              <>
                <img
                  className="h-24 w-24 object-cover md:h-48 md:w-48 rounded-full mt-12 border-2 border-white"
                  src={user.hook.data.avatar}
                />
                <p className="text-white font-bold">{user.hook.data.name}</p>
              </>
            )}
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto mt-8 md:gap-8">
            {appPages.map((appPage, index) => {
              if (!user.hook.data && !appPage.showAnon) return
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
                      <div className="text-[1.25rem] md:text-[1.75rem] text-white/90">
                        {appPage.icon}
                      </div>
                      <p className="text-white/90 text-[1rem] md:text-[1.5rem]">
                        {appPage.title}
                      </p>
                    </div>
                  </IonItem>
                </IonMenuToggle>
              )
            })}
          </div>
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar
          className="border-t border-white "
          onClick={() => {
            signOut().then((res) => {
              menuOnOff(false)
              navigateTo('/login')
              localStorage.clear()
            })
          }}
        >
          <div className="flex items-center justify-center">
            <p className="text-white font-bold uppercase text-[1rem] md:text-[1.5rem]">
              Sair
            </p>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonMenu>
  )
}
