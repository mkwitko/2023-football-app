import CoreClass from '../Core/CoreClass';
import useEventosHook from './UseEventosHook';

export default class EventosClass extends CoreClass {
  override collection = 'events';
  override hook = useEventosHook();
}
