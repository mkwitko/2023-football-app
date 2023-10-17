import CoreClass from '../Core/CoreClass';
import useOrdersHook from './useOrdersHook';

export default class OrdersClass extends CoreClass {
  override collection = 'orders';
  override hook = useOrdersHook();
}
