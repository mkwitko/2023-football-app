import React from 'react';

export default function Player({
  team,
  isHome,
  index,
  lineHas = 1,
}: {
  team: any;
  isHome: boolean;
  index: number;
  lineHas?: number;
}) {
  console.log(lineHas);
  return (
    <div
      className="flex flex-col justify-center items-center gap-2"
      style={{
        width: `${100 / lineHas}%`,
      }}
    >
      <div
        className={`${
          isHome ? 'bg-primary-700' : 'bg-gray-700'
        } flex items-center justify-center rounded-full w-[2.75rem] h-[2.75rem] border `}
      >
        <p className="text-white font-bold text-[1.25rem]">
          {team.lineup.starting_lineups[index].lineup_number}
        </p>
      </div>
      <p className="text-center text-white font-bold text-[0.75rem] max-w-[90%] ">
        {team.lineup.starting_lineups[index].lineup_player}
      </p>
    </div>
  );
}
