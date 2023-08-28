import React from 'react';

export default function RoundedMatchResult({ match }: any) {
  const findWinner = () => {
    if (+match.match_hometeam_score > +match.match_awayteam_score) {
      return match.match_hometeam_id;
    } else if (+match.match_hometeam_score < +match.match_awayteam_score) {
      return match.match_awayteam_id;
    } else {
      return '0';
    }
  };

  const winner = findWinner();
  return (
    <div
      key={match.match_id}
      className="rounded-full"
    >
      {winner === process.env.REACT_APP_FOOTBALL_API_CLUB && (
        <div className="flex items-center justify-center w-[1.25rem] h-[1.25rem] rounded-full bg-green-500">
          <p className="text-[0.75rem] text-center text-white font-semibold">
            V
          </p>
        </div>
      )}
      {winner === '0' && (
        <div className="flex items-center justify-center w-[1.25rem] h-[1.25rem] rounded-full bg-gray-500">
          <p className="text-[0.75rem] text-center text-white font-semibold">
            E
          </p>
        </div>
      )}

      {winner !== process.env.REACT_APP_FOOTBALL_API_CLUB && winner !== '0' && (
        <div className="flex items-center justify-center w-[1.25rem] h-[1.25rem] rounded-full bg-red-500">
          <p className="text-[0.75rem] text-center text-white font-semibold">
            D
          </p>
        </div>
      )}
    </div>
  );
}
