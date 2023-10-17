import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Page from '../pages/Page';
import About from '../pages/about/About';
import Calendar from '../pages/calendar/Calendar';
import News from '../pages/news/News';
import Table from '../pages/table/Table';
import Team from '../pages/team/Team';
import AuthPage from '../pages/authentication/Auth';
import NewsDetails from '../pages/news/NewsDetails';
import Match from '../pages/match/Match';
import Profile from '../pages/profile/Profile';
import Convenience from '../pages/convenience/Convenience';
import Club from '../pages/club/Club';
import Live from '../pages/live/Live';
import Feed from '../pages/feed/Feed';
import ConvenienceDetails from '../pages/convenience/ConvenienceDetails';
import Wallet from '../pages/wallet/Wallet';
import SurveysPage from 'src/pages/surveys/Surveys';
import Header from 'src/components/core/header/Header';
import { IonPage } from '@ionic/react';
import Footer from 'src/components/core/footer/Footer';

export default function Routing({ isLogged }: { isLogged: boolean }) {
    return (
        <>
            <IonPage>
                {!isLogged ? <Redirect to="/login" /> : (
                    <>
                        <Header />
                        <Switch>
                            <Route
                                path="/home"
                                exact={true}
                            >
                                <Page />
                            </Route>
                            <Route
                                path="/about"
                                exact={true}
                            >
                                <About />
                            </Route>
                            <Route
                                path="/calendar"
                                exact={true}
                            >
                                <Calendar />
                            </Route>
                            <Route
                                path="/surveys"
                                exact={true}
                            >
                                <SurveysPage />
                            </Route>
                            <Route
                                path="/news"
                                exact={true}
                            >
                                <News />
                            </Route>
                            <Route
                                path="/feed"
                                exact={true}
                            >
                                <Feed />
                            </Route>
                            <Route
                                path="/newsDetails"
                                exact={true}
                            >
                                <NewsDetails />
                            </Route>
                            <Route
                                path="/table"
                                exact={true}
                            >
                                <Table />
                            </Route>
                            <Route
                                path="/team"
                                exact={true}
                            >
                                <Team />
                            </Route>
                            <Route
                                path="/matchDetails"
                                exact={true}
                            >
                                <Match />
                            </Route>
                            <Route
                                path="/profile"
                                exact={true}
                            >
                                <Profile />
                            </Route>

                            <Route
                                path="/convenience"
                                exact={true}
                            >
                                <Convenience />
                            </Route>

                            <Route
                                path="/convenience/details"
                                exact={true}
                            >
                                <ConvenienceDetails />
                            </Route>
                            <Route
                                path="/club"
                                exact={true}
                            >
                                <Club />
                            </Route>

                            <Route
                                path="/live"
                                exact={true}
                            >
                                <Live />
                            </Route>

                            <Route
                                path="/wallet"
                                exact={true}
                            >
                                <Wallet />
                            </Route>
                        </Switch>
                        <Footer />
                    </>
                )}

                <Route
                    path="/login"
                    exact={true}
                >
                    {isLogged ? <Redirect to="/home" /> : <AuthPage />}
                </Route>
            </IonPage>
        </>
    );
}
