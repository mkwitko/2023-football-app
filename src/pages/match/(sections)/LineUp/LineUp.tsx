import React, { useState } from 'react';
import Player from './Player';
import { IonSegment, IonSegmentButton } from '@ionic/react';

export default function LineUp({
  match,
  isHome,
}: {
  match: any;
  isHome: boolean;
}) {
  const ourTeam = {
    formation: isHome
      ? match.match_hometeam_system.split('-').map((e: any) => +e)
      : match.match_awayteam_system.split('-').map((e: any) => +e),
    lineup: isHome ? match.lineup.home : match.lineup.away,
    name: isHome ? match.match_hometeam_name : match.match_awayteam_name,
  };
  const otherTeam = {
    formation: isHome
      ? match.match_awayteam_system.split('-').map((e: any) => +e)
      : match.match_hometeam_system.split('-').map((e: any) => +e),
    lineup: isHome ? match.lineup.away : match.lineup.home,
    name: isHome ? match.match_awayteam_name : match.match_hometeam_name,
  };

  const tabs = [
    {
      title: isHome ? ourTeam.name : otherTeam.name,
    },
    {
      title: !isHome ? ourTeam.name : otherTeam.name,
    },
  ];

  const [currentView, setCurrentView] = useState<string>(tabs[0].title);

  return (
    <div className="flex flex-col gap-4">
      <IonSegment
        value={currentView}
        className="match-segment rounded-none bg-transparent"
        onIonChange={(e: any) => {
          const title: string = e.detail.value;
          setCurrentView(title);
        }}
      >
        {tabs.map((e) => (
          <IonSegmentButton
          mode='ios'
            value={e.title}
            key={e.title}
            className="rounded-none"
          >
            <p
              className={`${
                e.title === currentView ? 'text-white' : 'text-primary-900'
              } text-[1rem] md:text-[1.5rem] md:py-4`}
            >
              {e.title}
            </p>
          </IonSegmentButton>
        ))}
      </IonSegment>

      <div className="flex flex-col justify-evenly bg-green-900 gap-8 rounded-[0.625rem] w-full py-8 h-[41rem] md:h-[45rem] bg-cover bg-no-repeat bg-field">
        {currentView === ourTeam.name && eachTeam(ourTeam, true)}
        {currentView === otherTeam.name && eachTeam(otherTeam, false)}
      </div>
    </div>
  );
}

const eachTeam = (team: any, isHome: boolean) => {
  let count = 0;
  return (
    <>
      <div className="flex items-start justify-center">
        <Player
          team={team}
          isHome={isHome}
          index={0}
        />
      </div>
      {team.formation.map((each: any, index: number) => (
        <div
          key={`Formation_${index}`}
          className="flex items-start justify-evenly"
        >
          {Array(each)
            .fill(0)
            .map(() => {
              count++;
              return (
                <Player
                  key={`Player_${index}_${team.lineup.starting_lineups[count].lineup_player}`}
                  team={team}
                  isHome={isHome}
                  index={count}
                  lineHas={each}
                />
              );
            })}
        </div>
      ))}
    </>
  );
};
