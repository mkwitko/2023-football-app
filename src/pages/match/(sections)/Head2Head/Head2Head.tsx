import React from 'react';
import RoundedMatchResult from './RoundedMatchResult';

export default function Head2Head({
  head2head,
  isHome,
  match,
}: {
  head2head: any;
  isHome: boolean;
  match: any;
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold uppercase">15 Partidas Jogadas</p>
        <p className="text-[0.75rem]">Contando todas as competições</p>
      </div>
      <div className="flex gap-4 my-2">
        <StatsSquare
          stats={7}
          name="Vitórias"
        />
        <StatsSquare
          stats={7}
          name="Empates"
        />
        <StatsSquare
          stats={7}
          name="Derrotas"
        />
      </div>
      <div className="flex flex-col divide-y">
        <StatsLine
          stats={25}
          name="Gols Pró"
        />
        <StatsLine
          stats={25}
          name="Gols Sofridos"
        />
        <StatsLine
          stats={25}
          name="Jogos sem sofrer gols"
        />
      </div>

      <div className="flex flex-col items-center justify-center mt-2">
        <p className="font-bold uppercase">Forma Atual</p>
        <p className="text-[0.75rem]">Contando todas as competições</p>
      </div>

      <div className="flex flex-1 w-full justify-between">
        <div className="flex items-center gap-4">
          {isHome ? (
            <>
              <img
                className="w-8 h-8"
                src={match.team_home_badge}
                alt=""
              />
              <p className="font-bold text-primary-900">
                {match.match_hometeam_name}
              </p>
            </>
          ) : (
            <>
              <img
                className="w-8 h-8"
                src={match.team_away_badge}
                alt=""
              />
              <p className="font-bold text-primary-900">
                {match.match_awayteam_name}
              </p>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          {isHome
            ? head2head.firstTeam_lastResults
                .map((e: any) => (
                  <RoundedMatchResult
                    key={e.match_id}
                    match={e}
                  />
                ))
                .slice(0, 5)
                .reverse()
            : head2head.secondTeam_lastResults
                .map((e: any) => (
                  <RoundedMatchResult
                    key={e.match_id}
                    match={e}
                  />
                ))
                .slice(0, 5)
                .reverse()}
        </div>
      </div>

      <div className="flex flex-1 w-full justify-between">
        <div className="flex items-center gap-4">
          {!isHome ? (
            <>
              <img
                className="w-8 h-8"
                src={match.team_home_badge}
                alt=""
              />
              <p>{match.match_hometeam_name}</p>
            </>
          ) : (
            <>
              <img
                className="w-8 h-8"
                src={match.team_away_badge}
                alt=""
              />
              <p>{match.match_awayteam_name}</p>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          {!isHome
            ? head2head.firstTeam_lastResults
                .map((e: any) => (
                  <RoundedMatchResult
                    key={e.match_id}
                    match={e}
                  />
                ))
                .slice(0, 5)
                .reverse()
            : head2head.secondTeam_lastResults
                .map((e: any) => (
                  <RoundedMatchResult
                    key={e.match_id}
                    match={e}
                  />
                ))
                .slice(0, 5)
                .reverse()}
        </div>
      </div>
    </>
  );
}

const StatsSquare = ({ stats, name }: { stats: any; name: string }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-primary-800 w-full rounded-[0.625rem] p-2 gap-1 aspect-square">
      <p className="text-[2rem] text-primary-200 font-bold">{stats}</p>
      <p className="text-white font-semibold">{name}</p>
    </div>
  );
};

const StatsLine = ({ stats, name }: { stats: any; name: string }) => {
  return (
    <div className="flex items-center justify-between w-full py-2">
      <p className="text-primary-800 font-bold uppercase text-[1rem]">{name}</p>
      <p className="text-primary-800 font-bold uppercase text-[1.25rem]">
        {stats}
      </p>
    </div>
  );
};
