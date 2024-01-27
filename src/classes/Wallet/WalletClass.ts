import CoreClass from '../Core/CoreClass'
import useWalletHook from './useWalletHook'

export default class WalletClass extends CoreClass {
  override collection = 'wallets'
  override hook = useWalletHook()

  async setClassById(shouldUpdate = true, id: string) {
    const cache = this.getCache()
    if (!this.hasObject(cache) || shouldUpdate) {
      const response = await this.getHttp(id)
      this.setCache(response, shouldUpdate, this.collection)
      return response
    } else {
      return cache
    }
  }
}
