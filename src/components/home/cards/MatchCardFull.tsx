import React from 'react';

export default function MatchCardFull({ match }: { match: any }) {
  return (
    <div
      id={match.match_id}
      className="flex flex-col"
    >
      <div className="flex w-full justify-between items-center bg-primary-700 px-4 py-1 font-bold ">
        <p className="text-white">
          {match.league_name.includes('-')
            ? match.league_name.substring(0, match.league_name.indexOf('-'))
            : match.league_name}
          {}
        </p>
        <p className="text-[0.725rem] text-white">
          {new Date(match.match_date).toLocaleDateString()}
        </p>
      </div>
      <div className="w-full p-4 bg-primary/10">
        <div className="flex gap-4 justify-between items-center">
          <div className="flex flex-col items-center gap-4">
            <img
              className="w-16 h-16"
              src={match.team_home_badge}
              alt=""
            />
            <p className="text-[.75rem] font-semibold">
              {match.match_hometeam_name}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-1">
              {match.match_status !== '' ? (
                <>
                  <div className="flex items-center justify-center w-[3rem] h-[3rem] rounded-[0.625rem]  bg-zinc-50">
                    <p className="text-[2rem] text-center font-semibold">
                      {match.match_hometeam_score}
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-[3rem] h-[3rem] rounded-[0.625rem]  bg-zinc-50">
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

          <div className="flex flex-col items-center gap-4">
            <img
              className="w-16 h-16"
              src={match.team_away_badge}
              alt=""
            />
            <p className="text-[.75rem] font-semibold">
              {match.match_awayteam_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
