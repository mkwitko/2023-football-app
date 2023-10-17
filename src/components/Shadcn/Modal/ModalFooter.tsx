import { DialogFooter } from 'src/components/ui/dialog'
import React from 'react'

export default function ModalFooter({children, className}: {
    children: React.ReactNode,
    className?: string
}) {
  return (
    <DialogFooter className={className}>
        {children}
    </DialogFooter>
  )
}
