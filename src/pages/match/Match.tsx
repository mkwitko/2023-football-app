import React, { useContext, useEffect, useState } from 'react';
import { getCache } from '../../services/Cache';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import Footer from '../../components/core/footer/Footer';
import { Context } from '../../context/Context';
import MatchCardFull from '../../components/home/cards/MatchCardFull';
import Stats from './(sections)/Stats/Stats';
import { otherTeamId } from '../../utils/FootballUtils';
import Head2Head from './(sections)/Head2Head/Head2Head';
import LineUp from './(sections)/LineUp/LineUp';

export default function Match() {
  const tabs = [
    {
      title: 'Estatísticas',
    },
    {
      title: 'Confronto',
    },
    {
      title: 'Escalação',
    },
    {
      title: 'Enquete',
    },
  ];

  const { head2Head } = useContext(Context);
  const match = getCache('match');
  const other_team_cache = getCache('other_team_id');

  const [currentView, setCurrentView] = useState<string>(tabs[0].title);
  const [head2head, setHead2head] = useState([]);

  const other_team_id = otherTeamId(match);

  const getHead2Head = async () => {
    console.log(other_team_cache, other_team_id);
    if (other_team_cache !== other_team_id) {
      await head2Head(
        process.env.REACT_APP_FOOTBALL_API_CLUB,
        other_team_id
      ).then((res: any) => {
        setHead2head(res);
      });
    } else {
      setHead2head(getCache('head2head'));
    }
  };

  console.log(match);

  const isHome =
    match.match_hometeam_id === process.env.REACT_APP_FOOTBALL_API_CLUB;

  useEffect(() => {
    getHead2Head();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-primary-700">
          <IonButtons slot="start">
            <IonMenuButton className="text-white bg-primary-700 shadow-md rounded-full h-12 w-12 my-1 ml-1" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <MatchCardFull match={match} />
        <IonSegment
          value={currentView}
          className="match-segment rounded-none divide-x bg-primary-300"
          onIonChange={(e: any) => {
            const title: string = e.detail.value;
            setCurrentView(title);
          }}
        >
          {tabs.map((e) => (
            <IonSegmentButton
              value={e.title}
              key={e.title}
              className="rounded-none"
            >
              <p className="text-white">{e.title}</p>
            </IonSegmentButton>
          ))}
        </IonSegment>

        <div className="m-4">
          {currentView === tabs[0].title && (
            <div className="flex flex-col gap-4 p-4 bg-white rounded-[0.625rem] w-full">
              <Stats
                stats={match.statistics}
                isHome={isHome}
              />
            </div>
          )}
          {currentView === tabs[1].title && (
            <div className="flex flex-col gap-4 p-4 bg-white rounded-[0.625rem] w-full">
              <Head2Head
                head2head={head2head}
                isHome={isHome}
                match={match}
              />
            </div>
          )}
          {currentView === tabs[2].title && (
            <div className="flex flex-col">
              <LineUp
                match={match}
                isHome={isHome}
              />
            </div>
          )}
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
}
