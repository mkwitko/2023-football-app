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
  const findOurResult = (match: any) => {
    const isHome =
      match.match_hometeam_id === process.env.REACT_APP_FOOTBALL_API_CLUB;
    if (isHome) {
      goalsFor += +match.match_hometeam_score;
      goalsAgainst += +match.match_awayteam_score;
      if (+match.match_awayteam_score === 0) cleanSheets++;
      if (+match.match_hometeam_score > +match.match_awayteam_score) {
        return 1;
      }
      if (+match.match_hometeam_score < +match.match_awayteam_score) {
        return 2;
      }
      return 0;
    } else {
      goalsFor += +match.match_awayteam_score;
      goalsAgainst += +match.match_hometeam_score;
      if (+match.match_hometeam_score === 0) cleanSheets++;
      if (+match.match_hometeam_score > +match.match_awayteam_score) {
        return 2;
      }
      if (+match.match_hometeam_score < +match.match_awayteam_score) {
        return 1;
      }
      return 0;
    }
  };

  let wins = 0;
  let draws = 0;
  let loses = 0;
  let goalsFor = 0;
  let goalsAgainst = 0;
  let cleanSheets = 0;

  const makeHead2HeadStats = () => {
    if (head2head.length === 0) return;
    head2head.firstTeam_VS_secondTeam.forEach((element: any) => {
      const result = findOurResult(element);
      if (result === 1) wins++;
      if (result === 2) loses++;
      if (result === 0) draws++;
    });
  };

  makeHead2HeadStats();

  return head2head.length !== 0 ? (
    <>
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold uppercase text-[0.85rem] sm:text-[1rem] md:text-[1.75rem]">
          {head2head.length !== 0 && head2head.firstTeam_VS_secondTeam.length}{' '}
          Partidas Jogadas
        </p>
        <p className="text-[0.75rem] md:text-[1.5rem]">Contando todas as competições</p>
      </div>
      <div className="flex gap-4 my-2">
        <StatsSquare
          stats={wins}
          name="Vitórias"
        />
        <StatsSquare
          stats={draws}
          name="Empates"
        />
        <StatsSquare
          stats={loses}
          name="Derrotas"
        />
      </div>
      <div className="flex flex-col">
        <StatsLine
          stats={goalsFor}
          name="Gols Pró"
        />
        <StatsLine
          stats={goalsAgainst}
          name="Gols Sofridos"
        />
        <StatsLine
          stats={cleanSheets}
          name="Jogos sem sofrer gols"
        />
      </div>

      <div className="flex flex-col items-center justify-center mt-2 md:mt-8">
        <p className="font-bold uppercase text-[0.85rem] sm:text-[1rem] md:text-[2rem]">Forma Atual</p>
        <p className="text-[0.75rem] md:text-[1.5rem]">Contando todas as competições</p>
      </div>

      {head2head.length !== 0 && (
        <>
          <div className="flex flex-1 w-full justify-between">
            <div className="flex items-center gap-4">
              {isHome ? (
                <>
                  <img
                    className="w-8 h-8 md:w-16 md:h-16"
                    src={match.team_home_badge}
                    alt=""
                  />
                  <p className="font-bold text-primary-900 text-[1rem] md:text-[2rem]">
                    {match.match_hometeam_name}
                  </p>
                </>
              ) : (
                <>
                  <img
                    className="w-8 h-8 md:w-16 md:h-16"
                    src={match.team_away_badge}
                    alt=""
                  />
                  <p className="font-bold text-primary-900 text-[1rem] md:text-[2rem]">
                    {match.match_awayteam_name}
                  </p>
                </>
              )}
            </div>
            <div className="flex items-center gap-4">
              {head2head.firstTeam_lastResults
                .map((e: any) => (
                  <RoundedMatchResult
                    key={e.match_id}
                    match={e}
                    club={
                      isHome ? match.match_hometeam_id : match.match_awayteam_id
                    }
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
                    className="w-8 h-8 md:w-16 md:h-16"
                    src={match.team_home_badge}
                    alt=""
                  />
                  <p className='text-[1rem md:text-[2rem]'>{match.match_hometeam_name}</p>
                </>
              ) : (
                <>
                  <img
                    className="w-8 h-8 md:w-16 md:h-16"
                    src={match.team_away_badge}
                    alt=""
                  />
                  <p className='text-[1rem md:text-[2rem]'>{match.match_awayteam_name}</p>
                </>
              )}
            </div>
            <div className="flex items-center gap-4">
              {head2head.secondTeam_lastResults
                .map((e: any) => (
                  <RoundedMatchResult
                    key={e.match_id}
                    match={e}
                    club={
                      !isHome
                        ? match.match_hometeam_id
                        : match.match_awayteam_id
                    }
                  />
                ))
                .slice(0, 5)
                .reverse()}
            </div>
          </div>
        </>
      )}
    </>
  ) : (
    <div className="border border-borderColor/20 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-300 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-300 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatsSquare = ({ stats, name }: { stats: any; name: string }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-primary-800 w-full rounded-[0.625rem] p-2 gap-1 aspect-square">
      <p className="text-[1.5rem] sm:text-[2rem] md:text-[4rem] text-primary-200 font-bold">{stats}</p>
      <p className="text-white font-semibold text-[0.85rem] sm:text-[1rem] md:text-[2rem]">{name}</p>
    </div>
  );
};

const StatsLine = ({ stats, name }: { stats: any; name: string }) => {
  return (
    <div className="flex items-center justify-between w-full py-2 md:py-4 border-b">
      <p className="text-primary-800 font-bold uppercase text-[0.85rem] sm:text-[1rem] md:text-[1.5rem]">{name}</p>
      <p className="text-primary-800 font-bold uppercase text-[1rem] sm:text-[1.25rem] md:text-[1.5rem]">
        {stats}
      </p>
    </div>
  );
};
