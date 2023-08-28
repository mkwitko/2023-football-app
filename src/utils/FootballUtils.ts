export const otherTeamId = (match: any) => {
  return match.match_hometeam_id === process.env.REACT_APP_FOOTBALL_API_CLUB
    ? match.match_awayteam_id
    : match.match_hometeam_id;
};
