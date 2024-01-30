import SurveysClass from 'src/classes/Surveys/SurverysClass'
import BannerClass from '../classes/Banners/BannerClass'
import EventosClass from '../classes/Eventos/EventosClass'
import FeedsClass from '../classes/Feeds/FeedsClass'
import NoticiasClass from '../classes/Noticias/NoticiaClass'
import NotificacoesClass from '../classes/Notificacoes/NotificacoesClass'
import PropagandaClass from '../classes/Propaganda/PropagandaClass'
import UserClass from '../classes/User/UserClass'
import YoutubeClass from '../classes/Youtube/YoutubeClass'
import Authentication from '../services/Auth'
import FootballApi from '../services/FootballApi/FootballApi'
import Classes from './../classes'

import React, { useEffect } from 'react'
import WalletClass from 'src/classes/Wallet/WalletClass'
import OrdersClass from 'src/classes/Orders/OrdersClass'
import { decrypt } from 'src/services/Encrypt'
import UserPurchaseClass from '@/classes/UserPurchase/UserPurchasesClass'
import ChannelsClass from '@/classes/Channels/ChannelsClass'
import { setCache } from 'src/services/Cache'
import Toast from 'src/services/Toast'
import ConfigsClass from 'src/classes/Configs/ConfigsClass'

interface ContextProps {
  banners: BannerClass
  channels: ChannelsClass
  noticias: NoticiasClass
  notificacoes: NotificacoesClass
  propaganda: PropagandaClass
  user: UserClass
  userPurchases: UserPurchaseClass
  eventos: EventosClass
  findGames: any
  findTable: any
  head2Head: any
  hook: any
  youtube: YoutubeClass
  feeds: FeedsClass
  orders: OrdersClass
  surveys: SurveysClass
  wallets: WalletClass
  configs: ConfigsClass
}

export const Context = React.createContext({} as ContextProps)

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const classes: any = Classes()
  const { auth } = Authentication()
  const {
    banners,
    channels,
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
    configs,
  }: ContextProps = classes

  const { findGames, findTable, head2Head, hook }: any = FootballApi()

  const shouldUpdate = (key: string, configs: any) => {
    const configsCache: any = localStorage.getItem('configs')
    const configsCacheJson = JSON.parse(configsCache);

    if(!configsCache || Object.keys(configsCacheJson).length === 0 || !configsCacheJson[key]) {
      setCache('configs', {
        ...configsCacheJson,
        [key]: new Date().getTime()
      })
      return true
    }

    const currentState = configsCacheJson[key]

    if(!currentState) return true

    const newState = configs[key]

    if(!newState) return true

    const shouldUpdate = newState > currentState

    if(shouldUpdate) {
      setCache('configs', {
        ...configsCacheJson,
        [key]: newState
      })
    }

    return shouldUpdate
  }

  const get = ({res, data}: {
    res: any,
    data: any
  }) => {
    Object.keys(classes).forEach((classe: any) => {
      const should = shouldUpdate(classe, data)
      console.log('should update - ', should, 'class - ', classe);
      classes[classe].setClass(should).then((res: any) => {
        if (res && res.length > 0) {
          classes[classe].hook.setData(res)
        }
      })
    })

    if (!res.isAnonymous) {
      orders.setClassById(shouldUpdate('orders', data), res.uid).then((res) => {
        orders.hook.setData(res)
      })
      userPurchases.setClassById(shouldUpdate('userPurchases', data), res.uid).then((res) => {
        userPurchases.hook.setData(
          res && res.historic ? res.historic : null,
        )
      })
      wallets.setClassById(shouldUpdate('wallets', data), res.uid).then((res: any) => {
        if (res) {
          const balance = +decrypt(res.balance ?? 0)
          wallets.hook.setData({
            id: res.id,
            balance,
          })
        } else {
          wallets.hook.setData(null)
        }
      })
    }
  }

  useEffect(() => {
    delete classes.user
    delete classes.userPurchases
    delete classes.orders
    delete classes.wallets
    delete classes.youtube
    delete classes.notifications
    delete classes.configs

    auth.onAuthStateChanged(async (res: any) => {
      if (res) {
        const tokenId = await auth.currentUser?.getIdToken()
        configs.getHttp(process.env.REACT_APP_FIREBASE_CONFIG_ID ?? '').then((configRes) => {
          const data: any = configRes
          const key = decrypt(data.public)
          delete data.public
          delete data.access
          user.hook.setConfigs(data)
          user.hook.setKey(key)
          get({res, data})
        })
        user.setClassById(true, res.uid).then(async (res) => {
          user.hook.setTokenId(tokenId || '')
          user.hook.setData(res)
        })

        youtube.getLive()
      }
    })

    findGames()
  }, [])

  useEffect(() => {
    if (
      user.hook.data &&
      user.hook.data.access_token &&
      user.hook.data.youtubeEmail
    ) {
      fetch(
        'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' +
          user.hook.data.access_token,
      ).then((response) => {
        response.json().then((data) => {
          if (data.error) {
            fetch('https://accounts.google.com/o/oauth2/token', {
              method: 'POST',
              body: JSON.stringify({
                client_id:
                  process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
                client_secret: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET,
                refresh_token: user.hook.data.refresh_token,
                grant_type: 'refresh_token',
              }),
            }).then((response) => {
              response.json().then((data) => {
                user.update({
                  access_token: data.access_token,
                })
                user.hook.setData((prevData: any) => {
                  return {
                    ...prevData,
                    access_token: data.access_token,
                  }
                })
              })
            })
          } else console.log('logged gmail user - ', data)
        })
      })
    }
  }, [user.hook.data])

  return (
    <Context.Provider
      value={{
        banners,
        channels,
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
        wallets,
        configs
      }}
    >
      {children}
    </Context.Provider>
  )
}
