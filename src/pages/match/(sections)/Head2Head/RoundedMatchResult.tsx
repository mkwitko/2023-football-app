import React from 'react';

export default function RoundedMatchResult({ match, club }: any) {
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
      {winner === club && (
        <div className="flex items-center justify-center w-4 h-4 sm:w-[1.25rem] sm:h-[1.25rem] md:h-8 md:w-8 rounded-full bg-green-500">
          <p className="text-[0.6rem] sm:text-[0.75rem] text-center text-white font-semibold">
            V
          </p>
        </div>
      )}
      {winner === '0' && (
        <div className="flex items-center justify-center w-4 h-4 sm:w-[1.25rem] sm:h-[1.25rem] md:h-8 md:w-8 rounded-full bg-gray-500">
          <p className="text-[0.6rem] sm:text-[0.75rem] text-center text-white font-semibold">
            E
          </p>
        </div>
      )}

      {winner !== club && winner !== '0' && (
        <div className="flex items-center justify-center w-4 h-4 sm:w-[1.25rem] sm:h-[1.25rem] md:h-8 md:w-8 rounded-full bg-red-500">
          <p className="text-[0.6rem] sm:text-[0.75rem] text-center text-white font-semibold">
            D
          </p>
        </div>
      )}
    </div>
  );
}
