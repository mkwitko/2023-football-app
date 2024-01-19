import CoreClass from '../Core/CoreClass'
import useNotificacoesHook from './UseNotificacoesHook'

export default class NotificacoesClass extends CoreClass {
  override collection = 'notifications'
  override hook = useNotificacoesHook()
}
