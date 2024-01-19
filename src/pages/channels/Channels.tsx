import { Context } from 'src/context/Context'
import { IonContent } from '@ionic/react'
import React, { useContext } from 'react'
import { Browser } from '@capacitor/browser'
import { Capacitor } from '@capacitor/core'
import NoData from '../components/NoData'

export default function Channels() {
  const { channels } = useContext(Context)
  return (
    <IonContent fullscreen>
      {channels.hook.data.length > 0 ? (
        <div className="flex flex-col px-4 sm:px-8 pt-8 gap-8">
          <div className="flex flex-col gap-4">
            <p className="uppercase text-primary-700 font-bold">Playlists</p>
            <div className="flex justif gap-4 flex-wrap">
              {channels.hook.data
                ?.filter((e: any) => e.type === 'playlist')
                .map((e: any, i: number) => (
                  <img
                    key={`each_image_${e.link}_${i}`}
                    onClick={() => {
                      if (e.link) {
                        if (Capacitor.getPlatform() === 'web')
                          window.open(e.link)
                        else Browser.open({ url: e.link })
                      }
                    }}
                    className="rounded-[0.625rem] w-[20%] aspect-square h-auto"
                    src={e.imagePath}
                    alt=""
                  />
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="uppercase text-primary-700 font-bold">
              Canais do Youtube
            </p>
            <div className="flex justif gap-4 flex-wrap">
              {channels.hook.data
                ?.filter((e: any) => e.type === 'partners')
                .map((e: any, i: number) => (
                  <img
                    key={`each_channel_${e.link}_${i}`}
                    onClick={() => {
                      if (e.link) {
                        if (Capacitor.getPlatform() === 'web')
                          window.open(e.link)
                        else Browser.open({ url: e.link })
                      }
                    }}
                    className="rounded-[0.625rem] w-[20%] aspect-square h-auto"
                    src={e.imagePath}
                    alt=""
                  />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <NoData text="canais" />
      )}
    </IonContent>
  )
}
