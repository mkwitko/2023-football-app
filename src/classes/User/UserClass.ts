import CoreClass from '../Core/CoreClass';
import useUserHook from './UseUserHook';

export default class UserClass extends CoreClass {
  override collection = 'users';
  override hook = useUserHook();

  async setClassById(shouldUpdate = true, id: string) {
    const cache = this.getCache();
    if (!this.hasObject(cache) || shouldUpdate) {
      console.log(id);
      const response = await this.getHttp(id);
      this.setCache(response, shouldUpdate, this.collection);
      return response;
    } else {
      return cache;
    }
  }
}
