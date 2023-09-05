export default function FootballApiUtils({ apiFootball }: any) {
  const gamesUrl =
    apiFootball.base +
    apiFootball.events +
    '&' +
    apiFootball.timezone +
    '&from=' +
    `${new Date().getFullYear()}-01-01` +
    '&to=' +
    `${new Date().getFullYear()}-12-30` +
    '&' +
    apiFootball.club +
    process.env.REACT_APP_FOOTBALL_API_CLUB +
    '&APIkey=' +
    process.env.REACT_APP_FOOTBALL_API_KEY;

  const tableUrl = (leagueId: string) => {
    return (
      apiFootball.base +
      apiFootball.standing +
      '&' +
      apiFootball.league +
      '=' +
      leagueId +
      '&APIkey=' +
      process.env.REACT_APP_FOOTBALL_API_KEY
    );
  };

  const eventsUrl = (leagueId: string) => {
    return (
      apiFootball.base +
      apiFootball.events +
      '&from=' +
      `${new Date().getFullYear()}-01-01` +
      '&to=' +
      `${new Date().getFullYear()}-12-30` +
      '&' +
      apiFootball.league +
      '=' +
      leagueId +
      '&' +
      apiFootball.club +
      process.env.REACT_APP_FOOTBALL_API_CLUB +
      '&APIkey=' +
      process.env.REACT_APP_FOOTBALL_API_KEY
    );
  };

  const head2headUrl = (firstTeam: string, secondTeam: string) => {
    return (
      apiFootball.base +
      'get_H2H&firstTeamId=' +
      firstTeam +
      '&secondTeamId=' +
      secondTeam +
      '&APIkey=' +
      process.env.REACT_APP_FOOTBALL_API_KEY
    );
  };

  const setNomeCompeticao = (who: string) => {
    const w = who;
    if (w.includes('Gaúcho')) who = 'Gauchão';
    if (w.includes('Libertadores')) who = 'Libertadores';
    // if (w.includes('Semi-finals')) who += ' Semi Final';
    // if (w.includes('Copa do Brasil')) who = 'Copa do Brasil';
    if (w.includes('Serie A')) who = 'Brasileiro';
    if (w.includes('Serie B')) who = 'Serie B';
    if (w.includes('Serie C')) who = 'Serie C';
    if (w.includes('Serie D')) who = 'Serie D';

    return who;
  };

  const setNomeEstadio = (who: string) => {
    who = who.replace('Estádio', '');
    who = who.slice(0, who.lastIndexOf('('));
    if (who.includes('(')) {
      who = who.substring(who.indexOf('(') + 1);
      who = who.slice(0, who.lastIndexOf(')'));
    }
    if (who.includes(',')) {
      who = who.split(',')[0];
    }
    return who;
  };

  const findCompetitions = (games: any) => {
    const aux_competitions: any = [];
    const competitions: any = [];
    games.map((game: any) => {
      if (!aux_competitions.includes(game.league_id)) {
        aux_competitions.push(game.league_id);
        competitions.push({
          id: game.league_id,
          league: setNomeCompeticao(game.league_name),
          hasKnockOut:
            game.league_name.includes('Group') ||
            game.league_name.includes('Round') ||
            game.league_name.includes('finals') ||
            game.league_name.includes('Phase'),
        });
      }
    });
    return competitions;
  };

  const filterKnockOutGames = (element: { league_name: string }) => {
    return (
      element.league_name.includes('Round') ||
      element.league_name.includes('finals')
    );
  };

  return {
    gamesUrl,
    tableUrl,
    eventsUrl,
    setNomeCompeticao,
    setNomeEstadio,
    findCompetitions,
    filterKnockOutGames,
    head2headUrl,
  };
}
