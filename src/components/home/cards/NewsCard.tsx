import React from 'react';
import { StringCutter } from '../../../utils/StringUtils';
import { useHistory } from 'react-router';
import { setCache } from '../../../services/Cache';

export default function NewsCard({ noticias }: { noticias: any }) {
  const history = useHistory();
  const limit = 2;
  return (
    <div className="flex overflow-x-auto gap-4">
      {noticias.hook.data.length > 0
        ? noticias.hook.data
            .map((e: any, i: number) => (
              <div
                key={i}
                className="flex flex-col "
                onClick={() => {
                  setCache('newsDetails', e);
                  history.push('newsDetails');
                }}
              >
                <div className="h-[20rem] w-[55vw] rounded-[0.625rem] overflow-hidden border border-borderColor/20 shadow-lg">
                  <img
                    className="w-full"
                    src={e.url}
                    alt="Sunset in the mountains"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold mb-2 text-[0.75rem]">
                      {StringCutter(e.title, 75, '...')}
                    </div>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: StringCutter(e.text, 100, '...'),
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
            .slice(0, limit)
        : Array.of(limit).map((e, i) => {
            <p>carregando</p>;
          })}
    </div>
  );
}
