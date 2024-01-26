import { IonContent } from '@ionic/react'
import React, { useContext } from 'react'
import { Context } from '../../context/Context'
import { StringCutter } from '../../utils/StringUtils'
import VirtualScrollChild from '../../components/core/VirtualScroll'
import { useHistory } from 'react-router'
import { setCache } from '../../services/Cache'
import NoData from '../components/NoData'

export default function News() {
  const history = useHistory()
  const { noticias } = useContext(Context)

  const screenWidth: number = window.innerWidth

  const isMd = screenWidth > 768

  console.log(noticias.hook.data);

  return (
    <IonContent fullscreen>
      {noticias.hook.data.length > 0 && (
        <div className="flex flex-col p-8 md:gap-8">
          {noticias.hook.data.map((e: any, i: number) => (
            <VirtualScrollChild height={isMd ? 725 : 450} key={i}>
              <div
                onClick={() => {
                  setCache('newsDetails', e)
                  history.push('newsDetails')
                }}
                className="max-w-sm md:max-w-full h-[26rem] md:h-[45rem] rounded-[0.625rem] border border-borderColor/20 mb-4  overflow-hidden shadow-convenienceShadow"
              >
                <img
                  className="w-full rounded-t-[0.625rem] h-1/2 object-cover object-center"
                  src={e.imagePath}
                  alt={e.title}
                />
                <div className="px-6 py-4 ">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      className="rounded-full h-8 w-8 md:h-12 md:w-12"
                      src={
                        e.author && e.author.avatar
                          ? e.author.avatar
                          : 'https://shorturl.at/qGJRY'
                      }
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span className="text-primary-900 text-[0.75rem] md:text-[1.25rem] font-bold">
                        {e.author && e.author.name
                          ? e.author.name
                          : 'Autor Desconhecido'}
                      </span>
                      <span className="text-primary-900 text-[0.6rem] md:text-[0.85rem]">
                        {e.createdAt}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between font-bold text-primary-900">
                    <div className="font-bold mb-2 text-[0.75rem] md:text-[1.25rem]">
                      <p>{StringCutter(e.title, 75, '...')}</p>
                    </div>
                  </div>
                  <div
                    className="text-[0.75rem] md:text-[1.25rem]"
                    dangerouslySetInnerHTML={{
                      __html: StringCutter(
                        e.description,
                        isMd ? 250 : 150,
                        '...',
                      ),
                    }}
                  ></div>
                </div>
              </div>
            </VirtualScrollChild>
          ))}
        </div>
      )}
      {Object.keys(noticias).length === 0 || noticias.hook.data.length === 0 && <NoData text="notícias" />}
    </IonContent>
  )
}
