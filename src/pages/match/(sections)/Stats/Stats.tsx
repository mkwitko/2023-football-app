import React, { useEffect } from 'react'
import SingleStat from './SingleStat'

interface StatsInterface {
  type: string
  home: string
  away: string
}

interface StatsToUseInterface {
  type: string
  type2?: string
  translate: string
  home: number
  away: number
}

export default function Stats({
  stats,
  isHome,
}: {
  stats: StatsInterface[]
  isHome: boolean
}) {
  const statsToUse: StatsToUseInterface[] = [
    {
      type: 'Shots Total',
      type2: 'Total Shots',
      translate: 'Chutes',
      home: 0,
      away: 0,
    },
    {
      type: 'Shots On Goal',
      type2: 'On Target',
      translate: 'Chutes no gol',
      home: 0,
      away: 0,
    },
    {
      type: 'Shots Off Goal',
      type2: 'Off Target',
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
  ]

  if (
    stats.find((e) => e.type === 'On Target') &&
    !stats.find((e) => e.type === 'Total Shots')
  ) {
    stats.push({
      type: 'Total Shots',
      home: (
        parseInt(stats.find((e) => e.type === 'On Target')?.home || '0') +
        parseInt(stats.find((e) => e.type === 'Off Target')?.home || '0')
      ).toString(),
      away: (
        parseInt(stats.find((e) => e.type === 'On Target')?.away || '0') +
        parseInt(stats.find((e) => e.type === 'Off Target')?.away || '0')
      ).toString(),
    })
  }

  stats
    .filter((e: StatsInterface) => {
      return statsToUse.some(
        (stat) => stat.type === e.type || stat.type2 === e.type,
      )
    })
    .forEach((stat: any) => {
      const index = statsToUse.findIndex(
        (e) => e.type === stat.type || e.type2 === stat.type,
      )
      if (stat.home.includes('%')) {
        statsToUse[index].home = parseFloat(stat.home.replace('%', ''))
        statsToUse[index].away = parseFloat(stat.away.replace('%', ''))
      } else {
        statsToUse[index].home = +stat.home
        statsToUse[index].away = +stat.away
      }
    })

  return (
    <>
      {statsToUse
        .filter((e) => e.home && e.away)
        .map((e: StatsToUseInterface) => (
          <SingleStat
            key={e.type}
            name={e.translate}
            value1={e.home}
            value2={e.away}
            isHome={isHome}
          />
        ))}
    </>
  )
}
