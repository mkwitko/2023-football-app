import axios from 'axios'
import { useContext } from 'react'
import { Context } from 'src/context/Context'
import { CompareObjects } from '../../utils/CompareObjects'
import { getCache, setCache } from '../Cache'
import FootballApiUtils from './FootballApiUtils'
import useFootballApiHook from './useFootballApiHook'

export default function FootballApi() {
  const { hook } = useContext(Context)

  const apiFootball = {
    base: 'https://apiv3.apifootball.com/?action=',
    events: 'get_events',
    standing: 'get_standings',
    league: 'league_id',
    timezone: 'timezone=America/Sao_Paulo',
    club: 'team_id=',
  }

  const footballHook = useFootballApiHook()

  let competitions: any = []

  const {
    gamesUrl,
    tableUrl,
    head2headUrl,
    filterKnockOutGames,
    findCompetitions,
  } = FootballApiUtils({
    apiFootball,
  })

  const findMatchById = (id: string) => {
    return hook && hook.games && hook.games.find((e: any) => e.match_id === id)
  }

  const findGames = async () => {
    const response = await axios(gamesUrl)
    if (response) {
      competitions = []
      competitions = findCompetitions(response.data)

      const hasToUpdate = !CompareObjects(
        getCache('competitions'),
        competitions,
      )
      if (hasToUpdate) {
        footballHook.setCompetitions(competitions)
        setCache('competitions', competitions)
      }
      Promise.all(
        competitions.map(
          async (element: {
            id: string
            league: string
            hasKnockOut: boolean
          }) => {
            let knockout
            const table = await findTable(element)
            if (element.hasKnockOut) {
              knockout = await findKnockOut(element, response.data)
            }
            const returner: any = []
            if (table)
              returner.push({
                league: element,
                table,
              })
            if (knockout)
              returner.push({
                league: element,
                knockout,
              })
            return returner
          },
        ),
      ).then((res: any) => {
        setCache('football_events', res)
        footballHook.setEvents(res)
      })
      footballHook.setGames(response.data)
      setCache('games', response.data)
    }
    return response
  }

  const findTable = async (league: { id: string; league: string }) => {
    const response = await axios(tableUrl(league.id))
    if (response.data && response.data.length > 0) {
      return response.data
    }
  }

  const findKnockOut = async (
    league: { id: string; league: string },
    games: any,
  ) => {
    const findKnockOutMatches = games.filter((e: any) => {
      if (e.league_id === league.id && filterKnockOutGames(e)) return e
      return null
    })
    return findKnockOutMatches
  }

  const head2Head = async (team1: string, team2: string) => {
    setCache('head2head')
    setCache('other_team_id', team2)
    const response = await axios(head2headUrl(team1, team2))
    if (response.data) {
      setCache('head2head', response.data)
      return response.data
    }
  }

  return {
    findGames,
    findTable,
    head2Head,
    hook: footballHook,
    findMatchById,
  }
}
