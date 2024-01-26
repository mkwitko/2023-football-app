import React, { useEffect } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import Page from '../pages/Page'
import Calendar from '../pages/calendar/Calendar'
import News from '../pages/news/News'
import Table from '../pages/table/Table'
import AuthPage from '../pages/authentication/Auth'
import NewsDetails from '../pages/news/NewsDetails'
import Match from '../pages/match/Match'
import Profile from '../pages/profile/Profile'
import Convenience from '../pages/convenience/Convenience'
import Club from '../pages/club/Club'
import Live from '../pages/live/Live'
import Feed from '../pages/feed/Feed'
import ConvenienceDetails from '../pages/convenience/ConvenienceDetails'
import Wallet from '../pages/wallet/Wallet'
import SurveysPage from 'src/pages/surveys/Surveys'
import Header from 'src/components/core/header/Header'
import { IonPage } from '@ionic/react'
import Footer from 'src/components/core/footer/Footer'
import ClubDetails from 'src/pages/club/ClubDetails'
import Purchases from 'src/pages/purchases/Purchases'
import Channels from 'src/pages/channels/Channels'

export default function Routing({ isLogged }: { isLogged: boolean }) {
  const history = useHistory()

  const [location, setLocation] = React.useState<string>('')

  useEffect(() => {
    setLocation(history.location.pathname)
  }, [history.location.pathname])

  return (
    <>
      <IonPage>
        <>
          {isLogged && (
            <Header
              className={
                location.includes('club/details')
                  ? 'opacity-0 hidden transition-all'
                  : 'opacity-100'
              }
            />
          )}
          <Switch>
            <Route path="/home" exact={true}>
              <RenderLoggedPage isLogged={isLogged}>
                <Page />
              </RenderLoggedPage>
            </Route>
            <Route path="/channels" exact={true}>
              <RenderLoggedPage isLogged={isLogged}>
                <Channels />
              </RenderLoggedPage>
            </Route>
            <Route path="/calendar" exact={true}>
              <RenderLoggedPage isLogged={isLogged}>
                <Calendar />
              </RenderLoggedPage>
            </Route>
            <Route path="/surveys" exact={true}>
              <RenderLoggedPage isLogged={isLogged}>
                <SurveysPage />
              </RenderLoggedPage>
            </Route>
            <Route path="/news" exact={true}>
              <RenderLoggedPage isLogged={isLogged}>
                <News />
              </RenderLoggedPage>
            </Route>
            <Route path="/feed" exact={true}>
              <RenderLoggedPage isLogged={isLogged}>
                <Feed />
              </RenderLoggedPage>
            </Route>
            <Route path="/newsDetails" exact={true}>
              <RenderLoggedPage isLogged={isLogged}>
                <NewsDetails />
              </RenderLoggedPage>
            </Route>
            <Route path="/table" exact={true}>
              <RenderLoggedPage isLogged={isLogged}>
                <Table />
              </RenderLoggedPage>
            </Route>
            <Route path="/matchDetails" exact={true}>
              <RenderLoggedPage isLogged={isLogged}>
                <Match />
              </RenderLoggedPage>
            </Route>
            <Route path="/profile" exact={true}>
              <RenderLoggedPage isLogged={isLogged}>
                <Profile />
              </RenderLoggedPage>
            </Route>
            <Route path="/purchases" exact={true}>
              <RenderLoggedPage isLogged={isLogged}>
                <Purchases />
              </RenderLoggedPage>
            </Route>

            <Route path="/convenience" exact={true}>
              <RenderLoggedPage isLogged={isLogged}>
                <Convenience />
              </RenderLoggedPage>
            </Route>

            <Route path="/convenience/details" exact={true}>
              <RenderLoggedPage isLogged={isLogged}>
                <ConvenienceDetails />
              </RenderLoggedPage>
            </Route>
            <Route path="/club" exact={true}>
              <RenderLoggedPage isLogged={isLogged}>
                <Club />
              </RenderLoggedPage>
            </Route>

            <Route path="/club/details" exact={true}>
              <RenderLoggedPage isLogged={isLogged}>
                <ClubDetails />
              </RenderLoggedPage>
            </Route>

            <Route path="/live" exact={true}>
              <RenderLoggedPage isLogged={isLogged}>
                <Live />
              </RenderLoggedPage>
            </Route>

            <Route path="/wallet" exact={true}>
              <RenderLoggedPage isLogged={isLogged}>
                <Wallet />
              </RenderLoggedPage>
            </Route>
            <Route path="/login" exact={true}>
              <AuthPage />
            </Route>
          </Switch>
          {isLogged && (
            <Footer />
          )}
        </>
      </IonPage>
    </>
  )
}


const RenderLoggedPage = ({ children, isLogged }: {
  children: React.ReactNode
  isLogged: boolean
}) => {
  return (
    <>
      {isLogged ? (
        children
      ) : (
        <Redirect to="/login" />
      )}
    </>
  )
}