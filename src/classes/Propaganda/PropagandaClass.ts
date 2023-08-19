import CoreClass from '../Core/CoreClass';
import usePropagandaHook from './UsePropagandaHook';

export default class PropagandaClass extends CoreClass {
  override collection = 'propaganda';
  override hook = usePropagandaHook();
}
