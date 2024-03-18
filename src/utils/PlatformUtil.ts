import { Capacitor } from '@capacitor/core'

export const isIos = () => {
  return Capacitor.getPlatform() === 'ios'
}
