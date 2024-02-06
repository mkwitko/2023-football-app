import { onSnapshot } from 'firebase/firestore'
import CoreClass from '../Core/CoreClass'
import useSurveysHook from './useSurveysHook'
import Toast from 'src/services/Toast'
import FootballApi from 'src/services/FootballApi/FootballApi'

export default class SurveysClass extends CoreClass {
  override collection = 'surveys'
  override hook = useSurveysHook()

  realTime = async () => {
    const feedRealTime = await this.createRealTime({})
    onSnapshot(feedRealTime, (querySnapshot: any) => {
      if (querySnapshot.empty) {
        console.log('empty')
      }

      const toAdd: any[] = []
      querySnapshot.docChanges().forEach((change: any) => {
        const data = change.doc.data()
        if (change.type === 'added') {
          const current = this.hook.data
          const exist = current.find((item: any) => item.id !== data.id)
          if(!exist) toAdd.push(data)
        }
        if (change.type === 'removed') {
          const current = this.hook.data
          const filtering = current.filter((item: any) => item.id !== data.id)
          this.hook.setData(filtering)
        }
      })
      this.hook.setData((prev: any) => {
        return [...toAdd, ...prev]
      })

      if(toAdd.length > 0) {
        if(toAdd[0].associateFootball) {
          const match = FootballApi().findMatchById(toAdd[0].associateFootball)
          console.log('match - ', match);
          Toast().success('Nova enquete disponível para a próxima partida.')
        } else {
          Toast().success('Nova enquete geral disponível.')
        }
      }
    })
  }
}
