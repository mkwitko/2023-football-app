import Navigation from './../../services/Navigation'
import { StringCutter } from '../../utils/StringUtils'
import React from 'react'

export default function Feed({ feeds }: { feeds: any }) {
  const { navigateTo } = Navigation()
  return (
    <div className="flex overflow-x-auto gap-4">
      {feeds.length > 0
        ? feeds
            .sort((a: any, b: any) => b.timestamp - a.timestamp)
            .map((feed: any, i: number) => (
              <div key={`feed_${i}`}>
                <div
                  onClick={() => {
                    navigateTo('feed')
                  }}
                  className="border border-primary-800 rounded-[0.625rem] bg-transparent flex flex-col p-4 h-[10rem] w-[75vw] md:w-[45vw]  md:h-[13rem] gap-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      className="rounded-full h-8 w-8 md:h-12 md:w-12"
                      src={
                        feed.author && feed.author.avatar
                          ? feed.author.avatar
                          : 'https://shorturl.at/qGJRY'
                      }
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span className="text-primary-900 text-[0.75rem] md:text-[1.25rem] font-bold">
                        {feed.author && feed.author.name
                          ? feed.author.name
                          : 'Autor Desconhecido'}
                      </span>
                      <span className="text-primary-900 text-[0.6rem] md:text-[0.85rem]">
                        {feed.createdAt}
                      </span>
                    </div>
                  </div>
                  <div
                    className="text-[0.75rem] md:text-[1rem] "
                    dangerouslySetInnerHTML={{
                      __html: StringCutter(feed.description, 150, '...'),
                    }}
                  ></div>
                </div>
              </div>
            ))
        : Array.of(2).map((e, i) => {
            <p>carregando</p>
          })}
    </div>
  )
}
