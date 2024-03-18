import { setCache } from '../../../services/Cache'
import Navigation from '../../../services/Navigation'
import {
  hasHappened,
  setNomeCompeticao,
  stadiumName,
} from '../../../utils/FootballUtils'

export default function MatchCard({ match }: { match: any }) {
  //   const { name, city } = stadiumName(match);
  const name = stadiumName(match.match_stadium)
  const { navigateTo } = Navigation()
  return (
    <div
      id={match.match_id}
      className="flex flex-col px-4 sm:px-8"
      onClick={async () => {
        setCache('match', match)
        navigateTo('matchDetails')
      }}
    >
      <div className="flex w-full justify-between items-center bg-primary-700 rounded-t-[0.625rem] px-4 py-1 font-bold ">
        <p className="text-white md:text-[1.5rem]">
          {setNomeCompeticao(match.league_name)}
        </p>
        <p className="text-[0.725rem] md:text-[1rem] text-white">
          {new Date(match.match_date).toLocaleDateString()}
        </p>
      </div>
      <div className="w-full border border-t-0 p-4 md:px-20 md:py-8 rounded-b-[0.625rem] bg-primary/10">
        <div className="flex gap-4 justify-between items-center">
          <div className="flex flex-col items-center gap-4">
            <img
              className="w-16 h-16 md:w-36 md:h-36"
              src={match.team_home_badge}
              alt=""
            />
            <p className="text-[.75rem] md:text-[1.5rem] text-center">
              {match.match_hometeam_name}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-1">
              {hasHappened(match) ? (
                <>
                  <div className="flex items-center justify-center w-[4rem] h-[4rem] rounded-[0.625rem]  bg-zinc-50">
                    <p className="text-[2rem] md:text-[3rem] text-center font-semibold">
                      {match.match_hometeam_score}
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-[4rem] h-[4rem] rounded-[0.625rem]  bg-zinc-50">
                    <p className="text-[2rem] md:text-[3rem] text-center font-semibold">
                      {match.match_awayteam_score}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2 items-center">
                  <p className="text-[0.75rem] md:text-[1.75rem] md:pb-4 text-center font-semibold  leading-[0.75rem]">
                    {name}
                  </p>

                  <div className="flex items-center justify-center w-[7rem] md:w-[9rem] h-[3rem] md:h-[4rem] rounded-[0.625rem] bg-primary-700">
                    <p className="text-[2rem] text-center text-white font-semibold">
                      {match.match_time}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {match.match_live === '1' ? (
              <div className="px-4 bg-primary-700 rounded-[0.325rem]">
                <p className="text-[.6rem] py-1 text-white uppercase font-bold animate-pulse">
                  AO VIVO
                </p>
              </div>
            ) : (
              hasHappened(match) && (
                <div className="px-4 bg-primary-700 rounded-[0.325rem]">
                  <p className="text-[.6rem] md:text-[1rem] py-1 md:py-2 text-white uppercase font-bold">
                    ver mais
                  </p>
                </div>
              )
            )}
          </div>

          <div className="flex flex-col items-center gap-4">
            <img
              className="w-16 h-16 md:w-36 md:h-36"
              src={match.team_away_badge}
              alt=""
            />
            <p className="text-[.75rem] md:text-[1.5rem]">
              {match.match_awayteam_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
