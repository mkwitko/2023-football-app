import {
  IonContent,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react'
import React, { useContext } from 'react'
import { Context } from '../../context/Context'
import LeagueTable from '../../components/leagueTable/LeagueTable'

export default function Table() {
  // TODO - dinamicamente encontrar a liga para iniciar
  // TODO remover competições que não tem table
  const { hook } = useContext(Context)
  const [league, setLeague] = React.useState<any>(hook.events[0][0].table)
  const [selected, setSelected] = React.useState<any>(0)

  return (
    <IonContent fullscreen>
      <IonSegment
        scrollable={true}
        mode="ios"
        value={hook.competitions ? hook.competitions[selected].id : 0}
        className="mx-2 my-4"
        onIonChange={(e) => {
          const selected = e.detail.value
          const league = hook.events
            .find((e: any, index: number) => {
              setSelected(index)
              return e[0].league.id === selected
            })
            .find((e: any) => {
              return Object.hasOwnProperty.call(e, 'table')
            })
          setLeague(league.table)
        }}
      >
        {/* FIXME - gambiarra dos guri */}
        {hook.competitions &&
          hook.competitions
            .filter((e: any) => {
              if (!e.league.includes('Copa')) return e
            })
            .map((e: any, i: number) => (
              <IonSegmentButton key={i} value={e.id}>
                <IonLabel className="text-[1rem] md:text-[1.5rem] md:py-4">
                  {e.league}
                </IonLabel>
              </IonSegmentButton>
            ))}
      </IonSegment>
      <div className="flex flex-col">
        <LeagueTable league={league} />
      </div>
    </IonContent>
  )
}
