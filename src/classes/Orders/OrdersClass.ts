import CoreClass from '../Core/CoreClass';
import useOrdersHook from './useOrdersHook';

export default class OrdersClass extends CoreClass {
  override collection = 'orders';
  override hook = useOrdersHook();

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
