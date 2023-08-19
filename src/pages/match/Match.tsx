import React, { useContext, useEffect, useState } from 'react';
import { getCache } from '../../services/Cache';
import {
  IonPage,
  IonContent,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import Header from '../../components/core/header/Header';
import Footer from '../../components/core/footer/Footer';
import { Context } from '../../context/Context';

export default function Match() {
  const tabs = [
    {
      title: 'Escalação',
    },
    {
      title: 'Estatísticas',
    },
    {
      title: 'Head2Head',
    },
  ];

  const { head2Head } = useContext(Context);
  const match = getCache('match');
  const other_team_cache = getCache('other_team_id');
  const [head2head, setHead2head] = useState([]);

  const other_team_id =
    match.match_hometeam_id === process.env.REACT_APP_FOOTBALL_API_CLUB
      ? match.match_awayteam_id
      : match.match_hometeam_id;

  const getHead2Head = async () => {
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

  console.log('match - ', match);
  //   console.log('head 2 head - ', head2head);

  useEffect(() => {
    getHead2Head();
  }, []);

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <div className="flex flex-col">
          <div
            id={match.match_id}
            className="flex flex-col"
          >
            <div className="flex w-full justify-between items-center bg-primary-700 px-4 py-1 font-bold text-white">
              <p>
                {match.league_name.includes('-')
                  ? match.league_name.substring(
                      0,
                      match.league_name.indexOf('-')
                    )
                  : match.league_name}
                {}
              </p>
              <p className="text-[0.725rem]">
                {new Date(match.match_date).toLocaleDateString()}
              </p>
            </div>
            <div className="w-full border-t-0 p-4 rounded-b-[0.625rem]">
              <div className="flex gap-4 justify-between items-center">
                <div className="flex flex-col items-center gap-4 w-full">
                  <img
                    className="w-16 h-16"
                    src={match.team_home_badge}
                    alt=""
                  />
                  <p className="text-[.75rem]">{match.match_hometeam_name}</p>
                </div>

                <div className="flex flex-col items-center gap-4 w-full">
                  <div className="flex items-center justify-center gap-4">
                    {match.match_status !== '' ? (
                      <>
                        <div className="flex items-center justify-center w-[3rem] h-[3rem] rounded-[0.625rem rounded-[0.625rem] bg-white ">
                          <p className="text-[2rem] text-center font-semibold">
                            {match.match_hometeam_score}
                          </p>
                        </div>
                        <div className="flex items-center justify-center w-[3rem] h-[3rem] rounded-[0.625rem] bg-white">
                          <p className="text-[2rem] text-center font-semibold">
                            {match.match_awayteam_score}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center w-[7rem] h-[3rem] rounded-[0.625rem] bg-primary-700">
                        <p className="text-[2rem] text-center text-white font-semibold">
                          {match.match_time}
                        </p>
                      </div>
                    )}
                  </div>
                  {match.match_live === '1' && (
                    <div className="px-4 bg-primary-700 rounded-[0.325rem]">
                      <p className="text-[.6rem] py-1 text-white uppercase font-bold animate-pulse">
                        AO VIVO
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center gap-4 w-full">
                  <img
                    className="w-16 h-16"
                    src={match.team_away_badge}
                    alt=""
                  />
                  <p className="text-[.75rem]">{match.match_awayteam_name}</p>
                </div>
              </div>
            </div>
          </div>

          <IonSegment
            className="bg-primary-100"
            value={tabs[0].title}
          >
            {tabs.map((e, i: number) => (
              <IonSegmentButton
                key={i}
                value={e.title}
              >
                <IonLabel className="text-primary-900">{e.title}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
}
