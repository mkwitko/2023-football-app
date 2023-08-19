import CoreClass from '../Core/CoreClass';
import useBannerHook from './UseBannerHook';

export default class BannerClass extends CoreClass {
  override collection = 'banner';
  override hook = useBannerHook();
}
