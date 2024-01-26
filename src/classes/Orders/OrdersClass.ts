import CoreClass from '../Core/CoreClass'
import useOrdersHook from './useOrdersHook'

export default class OrdersClass extends CoreClass {
  override collection = 'orders'
  override hook = useOrdersHook()

  async setClassById(shouldUpdate = true, id: string) {
    const cache = this.getCache()
    if (!this.hasObject(cache) || shouldUpdate) {
      const response: any = await this.getHttp(id)

      if(!response || !response.orders) return

      const data = response.orders.sort((a: any, b: any) => {
        const data_a =
          typeof a.date === 'string'
            ? new Date(a.date).getTime()
            : a.date * 1000
        const data_b =
          typeof b.date === 'string'
            ? new Date(b.date).getTime()
            : b.date * 1000
        return data_b - data_a
      })
      this.setCache(data, shouldUpdate, this.collection)
      return data
    } else {
      return cache
    }
  }
}
