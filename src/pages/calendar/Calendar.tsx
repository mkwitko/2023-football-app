import { IonContent } from '@ionic/react';
import React from 'react';
import useFootballApiHook from '../../services/FootballApi/useFootballApiHook';
import MatchCard from '../../components/home/cards/MatchCard';
import Navigation from '../../services/Navigation';

export default function Calendar() {
  const { games } = useFootballApiHook();
  const { navigateTo } = Navigation();

  const findNextGame = () => {
    const nextGame = games.findIndex((e: any) => {
      return e.match_status === '';
    });
    setTimeout(() => {
      document?.getElementById(games[nextGame].match_id)?.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center',
      });
    }, 1);
  };

  if (Object.keys(games).length === 0) navigateTo('/home');
  else findNextGame();

  return (
    <IonContent fullscreen>
    <div className="flex flex-col gap-8 py-8">
      {Object.keys(games).length > 0 &&
        games.map((e: any) => (
          <MatchCard
            key={e.match_id}
            match={e}
          />
        ))}
    </div>
  </IonContent>
  );
}
