import React from 'react';
import { Redirect, Route } from 'react-router-dom';
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

export default function Routing({ isLogged }: { isLogged: boolean }) {
  return (
    <>
      <Route
        path="/home"
        exact={true}
      >
        {!isLogged ? <Redirect to="/login" /> : <Page />}
      </Route>
      <Route
        path="/about"
        exact={true}
      >
        {!isLogged ? <Redirect to="/login" /> : <About />}
      </Route>
      <Route
        path="/calendar"
        exact={true}
      >
        {!isLogged ? <Redirect to="/login" /> : <Calendar />}
      </Route>
      <Route
        path="/news"
        exact={true}
      >
        {!isLogged ? <Redirect to="/login" /> : <News />}
      </Route>
      <Route
        path="/newsDetails"
        exact={true}
      >
        {!isLogged ? <Redirect to="/login" /> : <NewsDetails />}
      </Route>
      <Route
        path="/table"
        exact={true}
      >
        {!isLogged ? <Redirect to="/login" /> : <Table />}
      </Route>
      <Route
        path="/team"
        exact={true}
      >
        {!isLogged ? <Redirect to="/login" /> : <Team />}
      </Route>
      <Route
        path="/matchDetails"
        exact={true}
      >
        {!isLogged ? <Redirect to="/login" /> : <Match />}
      </Route>
      <Route
        path="/profile"
        exact={true}
      >
        {!isLogged ? <Redirect to="/login" /> : <Profile />}
      </Route>

      <Route
        path="/convenience"
        exact={true}
      >
        {!isLogged ? <Redirect to="/login" /> : <Convenience />}
      </Route>

      <Route
        path="/club"
        exact={true}
      >
        {!isLogged ? <Redirect to="/login" /> : <Club />}
      </Route>

      <Route
        path="/login"
        exact={true}
      >
        {isLogged ? <Redirect to="/home" /> : <AuthPage />}
      </Route>
    </>
  );
}
