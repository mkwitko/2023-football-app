import { Dialog } from 'src/components/ui/dialog'
import React from 'react'

export default function Modal({children, open, setOpen}: {
    children: React.ReactNode,
    open?: boolean;
    setOpen?: any;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        {children}
    </Dialog>
  )
}
