export const otherTeamId = (match: any) => {
  return match.match_hometeam_id === process.env.REACT_APP_FOOTBALL_API_CLUB
    ? match.match_awayteam_id
    : match.match_hometeam_id
}

export const stadiumName = (who: string) => {
  who = who.replace('Estádio', '')
  who = who.slice(0, who.lastIndexOf('('))
  if (who.includes('(')) {
    who = who.substring(who.indexOf('(') + 1)
    who = who.slice(0, who.lastIndexOf(')'))
  }
  if (who.includes(',')) {
    who = who.split(',')[0]
  }

  who = who.trim()

  if (who === 'José Pinheiro Borda') return 'Beira-Rio'
  return who
}

export const setNomeCompeticao = (who: string) => {
  const w = who
  if (w.includes('Gaúcho')) who = 'Gauchão'
  if (w.includes('Libertadores')) who = 'Libertadores'
  // if (w.includes('Semi-finals')) who += ' Semi Final';
  // if (w.includes('Copa do Brasil')) who = 'Copa do Brasil';
  if (w.includes('Serie A')) who = 'Brasileirão'
  if (w.includes('Serie B')) who = 'Serie B'
  if (w.includes('Serie C')) who = 'Serie C'
  if (w.includes('Serie D')) who = 'Serie D'

  return who
}
