import React from 'react';
import { getCache } from '../Cache';

export default function useFootballApiHook() {
  const [games, setGames] = React.useState(getCache('games') || []);
  const [events, setEvents] = React.useState(getCache('events') || []);
  const [competitions, setCompetitions] = React.useState(
    getCache('competitions') || []
  );

  return {
    games,
    setGames,
    events,
    setEvents,
    competitions,
    setCompetitions,
  };
}
