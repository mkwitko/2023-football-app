import CoreClass from '../Core/CoreClass';
import useRedirecionamentoHook from './UseRedirecionamentoHook';

export default class RedirecionamentoClass extends CoreClass {
  override collection = 'redirecionamento';
  override hook = useRedirecionamentoHook();
}
