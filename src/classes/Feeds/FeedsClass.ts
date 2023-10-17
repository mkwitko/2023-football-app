import CoreClass from '../Core/CoreClass';
import useFeedsHook from './useFeedsHook';

export default class FeedsClass extends CoreClass {
    override collection = 'feeds';
    override hook = useFeedsHook();
}
