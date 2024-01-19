import CoreClass from '../Core/CoreClass'
import useSurveysHook from './useSurveysHook'

export default class SurveysClass extends CoreClass {
  override collection = 'surveys'
  override hook = useSurveysHook()
}
