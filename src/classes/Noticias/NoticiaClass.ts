import CoreClass from '../Core/CoreClass';
import useNoticiasHook from './UseNoticiasHook';

export default class NoticiasClass extends CoreClass {
  override collection = 'noticias';
  override hook = useNoticiasHook();
}
