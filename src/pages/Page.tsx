import { IonContent } from '@ionic/react'
import Cookies from 'js-cookie'
import React, { useContext, useEffect } from 'react'
import Navigation from 'src/services/Navigation'
import Toast from 'src/services/Toast'
import Categories from '../components/core/categories/Categories'
import NewsCard from '../components/home/cards/NewsCard'
import { Context } from '../context/Context'
import Feed from './components/Feed'
import HomeMatchCardSwiper from './components/HomeMatchCardSwiper'

const Page: React.FC = () => {
  const { user, noticias, hook, feeds } = useContext(Context)

  const findMatches = () => {
    const nextGame = hook.games.findIndex((e: any) => {
      return e.match_status === '' || e.match_live === '1'
    })
    const pastGamesToShow = hook.games.slice(nextGame - 2, nextGame)
    const postGamesToShow = hook.games.slice(nextGame, nextGame + 3)
    return [...pastGamesToShow, ...postGamesToShow]
  }

  const [gamesToShow, setGamesToShow] = React.useState<any[]>([])

  useEffect(() => {
    if (hook.games && hook.games.length > 0) {
      const matches = findMatches()
      setGamesToShow(matches)
    }
  }, [hook.games])

  const { navigateTo } = Navigation()

  useEffect(() => {
    if (
      user.hook.data &&
      !user.hook.data.youtubeEmail && user.hook.configs.enableGoogleOAuth && 
      Cookies.get('showProfileToast') !== 'true'
    ) {
      Toast().info(
        'Preencha o seu perfil e sincronize sua conta do Youtube para aproveitar todas funcionalidades da aplicação.',
      )
      navigateTo('/profile')
      Cookies.set('showProfileToast', 'true', { expires: 1 })
    }
  }, [user.hook.data])

  return (
    <IonContent fullscreen>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col px-4 sm:px-8 pt-8 gap-6">
          <Categories />
        </div>

       {gamesToShow.length > 0 && (
         <div className="mt-[-.5rem]">
         <HomeMatchCardSwiper gamesToShow={gamesToShow} />
       </div>
       )}

        <div className="flex gap-6 px-4 sm:px-8">
          <Feed feeds={feeds.hook.data} />
        </div>

        <div className="flex gap-6 px-4 sm:px-8 mb-8">
          <NewsCard noticias={noticias} />
        </div>
      </div>
    </IonContent>
  )
}

export default Page
