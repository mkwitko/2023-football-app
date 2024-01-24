import { setNomeCompeticao } from 'src/utils/FootballUtils'
import React from 'react'

export default function MatchCardFull({ match }: { match: any }) {
  return (
    <div id={match.match_id} className="flex flex-col ">
      <div className="flex w-full justify-between items-center bg-primary-700 px-4 py-1 font-bold ">
        <p className="text-white text-[1rem] md:text-[1.5rem]">
          {setNomeCompeticao(match.league_name)}
        </p>
        <p className="text-[0.725rem] md:text-[1.25rem] text-white">
          {new Date(match.match_date).toLocaleDateString()}
        </p>
      </div>
      <div className="w-full p-4 md:px-20 bg-primary/10">
        <div className="flex gap-4 justify-between items-center">
          <div className="flex flex-col items-center gap-4">
            <img
              className="w-16 h-16 md:w-36 md:h-36"
              src={match.team_home_badge}
              alt=""
            />
            <p className="text-[.75rem] md:text-[1.5rem] font-semibold">
              {match.match_hometeam_name}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-1 md:gap-4">
              {match.match_status !== '' ? (
                <>
                  <div className="flex items-center justify-center w-[6rem] h-[6rem] rounded-[0.625rem]  bg-zinc-50">
                    <p className="text-[4rem] text-center font-semibold">
                      {match.match_hometeam_score}
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-[6rem] h-[6rem] rounded-[0.625rem]  bg-zinc-50">
                    <p className="text-[4rem] text-center font-semibold">
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
              className="w-16 h-16 md:w-36 md:h-36"
              src={match.team_away_badge}
              alt=""
            />
            <p className="text-[.75rem] md:text-[1.5rem] font-semibold">
              {match.match_awayteam_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
