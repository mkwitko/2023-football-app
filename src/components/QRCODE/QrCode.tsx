import React from 'react'
import ModalProsper from '../Shadcn/Modal'
import QRCode from 'qrcode.react'

export default function QrCode({
  qrCode,
  title,
  button,
}: {
  qrCode: any
  title?: string
  button?: any
}) {
  return (
    <ModalProsper.Modal>
      <ModalProsper.ModalTrigger>{button}</ModalProsper.ModalTrigger>
      <ModalProsper.ModalContent className="w-3/5 rounded-[0.625rem] gap-0 p-0">
        {title && (
          <ModalProsper.ModalHeader className="bg-primary rounded-t-[0.625rem]">
            <p className="text-[1.5rem] text-white font-bold capitalize p-4">
              {title}
            </p>
          </ModalProsper.ModalHeader>
        )}
        <QRCode value={qrCode} size={156} />
      </ModalProsper.ModalContent>
    </ModalProsper.Modal>
  )
}
