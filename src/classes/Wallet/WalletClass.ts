import CoreClass from '../Core/CoreClass'
import useWalletHook from './useWalletHook'

export default class WalletClass extends CoreClass {
  override collection = 'wallets'
  override hook = useWalletHook()
}
