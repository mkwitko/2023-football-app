import { DialogHeader } from 'src/components/ui/dialog'
import React from 'react'

export default function ModalHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <DialogHeader className={className}>{children}</DialogHeader>
}
