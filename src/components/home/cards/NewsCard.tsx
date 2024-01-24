import React from 'react'
import { StringCutter } from '../../../utils/StringUtils'
import { useHistory } from 'react-router'
import { setCache } from '../../../services/Cache'

export default function NewsCard({ noticias }: { noticias: any }) {
  const history = useHistory()
  const limit = 2

  return (
    <div className="flex overflow-x-auto gap-4">
      {noticias.hook.data.length > 0
        ? noticias.hook.data
            .sort((a: any, b: any) => b.timestamp - a.timestamp)
            .map((e: any, i: number) => (
              <div
                key={i}
                className="flex flex-col "
                onClick={() => {
                  setCache('newsDetails', e)
                  history.push('newsDetails')
                }}
              >
                <div className="h-[22.5rem] md:h-[30rem] md:w-[45vw] w-[55vw] rounded-[0.625rem] overflow-hidden mb-2 shadow-convenienceShadow">
                  <img
                    className="w-full"
                    src={e.imagePath}
                    alt="Sunset in the mountains"
                  />
                  <div className="flex flex-col gap-2 p-4">
                    <div className="flex items-center gap-2">
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
                    <div className="font-bold text-[1rem] md:text-[1.25rem]">
                      {StringCutter(e.title, 40, '...')}
                    </div>
                    <div
                      className="text-[1rem] md:text-[1.25rem]"
                      dangerouslySetInnerHTML={{
                        __html: StringCutter(e.description, 100, '...'),
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
            .slice(0, limit)
        : Array.of(limit).map((e, i) => {
            <p>carregando</p>
          })}
    </div>
  )
}
