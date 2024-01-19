import React from 'react'
import { menuController } from '@ionic/core/components'

export const menuOnOff = (bool: boolean) => {
  bool ? menuController.open() : menuController.close()
}
