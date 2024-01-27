import CoreClass from '../Core/CoreClass'
import useBannerHook from './UseBannerHook'

export default class BannersClass extends CoreClass {
  override collection = 'banners'
  override hook = useBannerHook()
}
