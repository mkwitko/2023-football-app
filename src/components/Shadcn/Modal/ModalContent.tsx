import { DialogContent } from 'src/components/ui/dialog'
import React from 'react'

export default function ModalContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <DialogContent className={className}>{children}</DialogContent>
}
