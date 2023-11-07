import CoreClass from '../Core/CoreClass';
import useUserPurchasesHook from './UseUserPurchasesHook';

export default class UserPurchaseClass extends CoreClass {
  override collection = 'users_purchases';
  override hook = useUserPurchasesHook();

  async setClassById(shouldUpdate = true, id: string) {
    const cache = this.getCache();
    if (!this.hasObject(cache) || shouldUpdate) {
      const response = await this.getHttp(id);
      this.setCache(response, shouldUpdate, this.collection);
      return response;
    } else {
      return cache;
    }
  }
}
