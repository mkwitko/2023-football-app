import { onSnapshot } from 'firebase/firestore'
import CoreClass from '../Core/CoreClass'
import useFeedsHook from './useFeedsHook'
import Toast from 'src/services/Toast'

export default class FeedsClass extends CoreClass {
  override collection = 'feeds'
  override hook = useFeedsHook()


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
        Toast().success('Novo Feed disponível!')
      }
    })
  }
}
