import { IonContent } from '@ionic/react'
import React, { useContext } from 'react'
import ClubCard from '../../components/club/ClubCard'
import { Context } from '../../context/Context'
import NoData from '../components/NoData'

export default function Club() {
  const { eventos, userPurchases } = useContext(Context)

  const findHistoric = (id: string) => {
    if (userPurchases.hook.data && userPurchases.hook.data.length > 0) {
      const historic = userPurchases.hook.data.some((e: any) => {
        return e.event_id === id
      })
      return historic
    }
  }

  return (
    <IonContent fullscreen>
      {eventos.hook.data.length > 0 ? (
        <div className="flex flex-col items-center justify-center px-4 md:mt-4 md:px-12 py-8 gap-4 md:gap-8">
          {eventos.hook.data.map((e: any, i: number) => (
            <ClubCard data={e} key={i} disabled={findHistoric(e.id)} />
          ))}
        </div>
      ) : (
        <NoData text="eventos" />
      )}
    </IonContent>
  )
}
