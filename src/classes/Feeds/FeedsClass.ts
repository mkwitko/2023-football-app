import { onSnapshot } from 'firebase/firestore'
import CoreClass from '../Core/CoreClass'
import useFeedsHook from './useFeedsHook'

export default class FeedsClass extends CoreClass {
  override collection = 'feeds'
  override hook = useFeedsHook()
  override hasRealTime = true;

  realTime = async () => {
    const feedRealTime = await this.createRealTime({})
    onSnapshot(feedRealTime, (querySnapshot: any) => {
      if (querySnapshot.empty) {
        console.log('empty')
      }
      const cache = this.getCache()
      const current = Object.keys(cache).length > 0 ? cache : []

      const toAdd: any = []

      querySnapshot.docChanges().forEach((change: any) => {
        const data = change.doc.data()
        if (change.type === 'added') {
          const exist = current ? current.find((item: any) => item.id === data.id) : false
          if(exist) {
            this.hook.setData(current)
            return;
          }
          toAdd.push(data)
        }
        if (change.type === 'modified') {
          const findIndex = current.findIndex((item: any) => item.id === data.id)
          if (findIndex === -1) return
          this.hook.setData(() => {
            current[findIndex] = data
            this.setCache(current, true)
            return [...current]
          })
        }
        if (change.type === 'removed') {
          if(!current) return;
          const filtering = current.filter((item: any) => item.id !== data.id)
          this.setCache(filtering, true)
          this.hook.setData(filtering)
        }
      })

      if(toAdd.length > 0) {
        this.hook.setData(() => {
          this.setCache([...toAdd, ...current], true)
          return [...toAdd, ...current]
        })
      }
    })
  }
}
