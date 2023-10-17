import { Dialog } from 'src/components/ui/dialog'
import React from 'react'

export default function Modal({children}: {
    children: React.ReactNode
}) {
  return (
    <Dialog>
        {children}
    </Dialog>
  )
}
