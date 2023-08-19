import React from 'react';
import { StringCutter } from '../../utils/StringUtils';

export default function LeagueTable({ league }: any) {
  let group = '';
  const findGroup = () => {
    if (league[0].league_round.includes('Group')) {
      const team = league.find((e: any) => {
        return e.team_id === process.env.REACT_APP_FOOTBALL_API_CLUB;
      });
      group = team.league_round;
    }
  };
  findGroup();

  return (
    <div className="flex flex-col w-full gap-4 mb-8">
      <div className="grid grid-cols-12 gap-2 bg-primary-700 text-white font-bold capitalize py-1 items-center justify-center mb-[-.5rem] px-6">
        <p className="col-span-1"></p>
        <p className="col-span-6">Time</p>
        <p className="col-span-1">PG</p>
        <p className="col-span-1">PJ</p>
        <p className="col-span-1">V</p>
        <p className="col-span-1">E</p>
        <p className="col-span-1">D</p>
      </div>
      {league &&
        league.length > 0 &&
        league
          .filter((e: any) => {
            if (group.length > 0) {
              if (e.league_round === group) return e;
            } else {
              return e;
            }
          })
          .map((e: any, i: number) => (
            <div
              className={`${
                e.team_id === process.env.REACT_APP_FOOTBALL_API_CLUB
                  ? 'bg-primary-100 text-primary-900 font-semibold py-2'
                  : ''
              } 
              ${
                i === 0 && e.team_id === process.env.REACT_APP_FOOTBALL_API_CLUB
                  ? 'mt-[-0.5rem] border-t'
                  : ''
              }
              grid grid-cols-12 gap-2 px-6
            `}
              key={i}
            >
              <p className="col-span-1">{e.overall_league_position}</p>
              <p className="col-span-1">
                <img
                  src={e.team_badge}
                  alt=""
                />
              </p>
              <p className="col-span-5">{StringCutter(e.team_name)}</p>
              <p className="col-span-1">{e.overall_league_PTS}</p>
              <p className="col-span-1">{e.overall_league_payed}</p>
              <p className="col-span-1">{e.overall_league_W}</p>
              <p className="col-span-1">{e.overall_league_D}</p>
              <p className="col-span-1">{e.overall_league_L}</p>
            </div>
          ))}
    </div>
  );
}
