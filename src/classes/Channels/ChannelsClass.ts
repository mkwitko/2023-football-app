import CoreClass from '../Core/CoreClass';
import useChannelsHook from './UseChannelsHook';

export default class ChannelsClass extends CoreClass {
  override collection = 'channels';
  override hook = useChannelsHook();
}
