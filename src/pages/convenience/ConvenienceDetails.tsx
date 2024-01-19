import { IonContent } from '@ionic/react'
import React, { useContext, useEffect } from 'react'
import { Context } from './../../context/Context'
import Navigation from './../../services/Navigation'
import { StringCutter } from '../../utils/StringUtils'
import { Browser } from '@capacitor/browser'
import { Capacitor } from '@capacitor/core'
import ModalProsper from 'src/components/Shadcn/Modal'
import QRCode from 'qrcode.react'

export default function ConvenienceDetails() {
  const { propaganda } = useContext(Context)
  const { navigateTo } = Navigation()
  useEffect(() => {
    if (!propaganda.hook.current) goBack()
  }, [])

  const screenHeight: number = window.innerHeight

  const isMd = screenHeight > 768

  const goBack = () => {
    navigateTo('/convenience')
  }
  return (
    <IonContent fullscreen>
      {propaganda.hook.current && (
        <div className="flex flex-col p-8 gap-4">
          <img
            className="w-32 md:w-[24rem] md:my-8 h-auto"
            src={propaganda.hook.current.logoPath}
            alt=""
          />
          <p className="text-primary font-bold border-b pb-4 border-primary text-[1rem] md:text-[2rem]">
            {propaganda.hook.current.title}
          </p>
          <div className="flex gap-8 h-[15rem]">
            <img
              className="aspect-square object-cover w-full h-full rounded-[1rem]"
              src={propaganda.hook.current.imagePath}
              alt=""
            />
          </div>
          <div
            className="text-primary-900 text-[1rem] md:text-[1.5rem]"
            dangerouslySetInnerHTML={{
              __html: StringCutter(propaganda.hook.current.description, 9999),
            }}
          ></div>
          <div className="flex items-center justify-between w-full md:mt-8">
            <div className="text-[0.75rem] md:text-[1.5rem] bg-white border border-primary-700 text-primary-700 py-2 px-6 rounded-[0.625rem]">
              <button onClick={goBack} type="button">
                Voltar
              </button>
            </div>
            {(propaganda.hook.current.link ||
              propaganda.hook.current.qrCode) && (
              <div className="bg-primary-700 text-[0.75rem] md:text-[1.5rem] text-white py-2 px-6 rounded-[0.625rem] font-bold">
                {propaganda.hook.current.link && (
                  <button
                    onClick={() => {
                      if (Capacitor.getPlatform() === 'web')
                        window.open(propaganda.hook.current.link)
                      else Browser.open({ url: propaganda.hook.current.link })
                    }}
                    type="button"
                  >
                    Participar
                  </button>
                )}
                {propaganda.hook.current.qrCode && (
                  <ModalProsper.Modal>
                    <ModalProsper.ModalTrigger>
                      <button>Ver QR Code</button>
                    </ModalProsper.ModalTrigger>
                    <ModalProsper.ModalContent className="w-4/5 rounded-[0.625rem] gap-0 p-0">
                      <ModalProsper.ModalHeader className="bg-primary rounded-t-[0.625rem]">
                        <p className="text-[1.75rem] text-white font-bold capitalize p-4">
                          Desconto em Loja
                        </p>
                      </ModalProsper.ModalHeader>
                      <div className="flex flex-col gap-4 p-4 items-center justify-center">
                        <img
                          className="w-3/5 h-auto"
                          src={propaganda.hook.current.logoPath}
                          alt=""
                        />
                        <div
                          className="text-primary-900 text-center text-[0.75rem] md:text-[1.25rem]  md:px-16 md:mt-4 font-light"
                          dangerouslySetInnerHTML={{
                            __html: StringCutter(
                              propaganda.hook.current.description,
                              125,
                            ),
                          }}
                        ></div>
                        <div className="border-2 p-3 md:mt-4 md:mb-8 rounded-[0.625rem]">
                          <QRCode
                            value={propaganda.hook.current.qrCode}
                            size={isMd ? 240 : 180}
                          />
                        </div>
                      </div>
                    </ModalProsper.ModalContent>
                  </ModalProsper.Modal>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </IonContent>
  )
}
