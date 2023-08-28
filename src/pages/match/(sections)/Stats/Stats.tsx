import React from 'react';
import SingleStat from './SingleStat';

interface StatsInterface {
  type: string;
  home: string;
  away: string;
}

interface StatsToUseInterface {
  type: string;
  translate: string;
  home: number;
  away: number;
}

export default function Stats({
  stats,
  isHome,
}: {
  stats: StatsInterface[];
  isHome: boolean;
}) {
  const statsToUse: StatsToUseInterface[] = [
    {
      type: 'Shots Total',
      translate: 'Chutes',
      home: 0,
      away: 0,
    },
    {
      type: 'Shots On Goal',
      translate: 'Chutes no gol',
      home: 0,
      away: 0,
    },
    {
      type: 'Shots Off Goal',
      translate: 'Chutes pra fora',
      home: 0,
      away: 0,
    },
    {
      type: 'Shots Blocked',
      translate: 'Chutes bloqueados',
      home: 0,
      away: 0,
    },
    {
      type: 'Shots Inside Box',
      translate: 'Chutes dentro da área',
      home: 0,
      away: 0,
    },
    {
      type: 'Shots Outside Box',
      translate: 'Chutes fora da área',
      home: 0,
      away: 0,
    },
    {
      type: 'Fouls',
      translate: 'Faltas',
      home: 0,
      away: 0,
    },
    {
      type: 'Corners',
      translate: 'Escanteios',
      home: 0,
      away: 0,
    },
    {
      type: 'Offsides',
      translate: 'Impedimentos',
      home: 0,
      away: 0,
    },
    {
      type: 'Passes Total',
      translate: 'Passes totais',
      home: 0,
      away: 0,
    },
    {
      type: 'Passes Accurate',
      translate: 'Passes precisos',
      home: 0,
      away: 0,
    },
    {
      type: 'Ball Possession',
      translate: 'Posse de Bola',
      home: 0,
      away: 0,
    },
    {
      type: 'Yellow Cards',
      translate: 'Cartões amarelos',
      home: 0,
      away: 0,
    },
  ];

  const useableStats = stats
    .filter((e: StatsInterface) => {
      return statsToUse.some((stat) => stat.type === e.type);
    })
    .forEach((stat: any) => {
      const index = statsToUse.findIndex((e) => e.type === stat.type);
      if (stat.home.includes('%')) {
        statsToUse[index].home = parseFloat(stat.home.replace('%', ''));
        statsToUse[index].away = parseFloat(stat.away.replace('%', ''));
      } else {
        statsToUse[index].home = +stat.home;
        statsToUse[index].away = +stat.away;
      }
    });

  return (
    <>
      {statsToUse.map((e: StatsToUseInterface) => (
        <SingleStat
          key={e.type}
          name={e.translate}
          value1={e.home}
          value2={e.away}
          isHome={isHome}
        />
      ))}
    </>
  );
}
