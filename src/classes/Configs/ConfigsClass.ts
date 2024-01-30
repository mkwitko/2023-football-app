import CoreClass from '../Core/CoreClass'
import useConfigsHook from './useConfigsHook'

export default class ConfigsClass extends CoreClass {
  override collection = 'configs'
  override hook = useConfigsHook()
}
