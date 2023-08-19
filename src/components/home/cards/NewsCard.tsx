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
                className="flex flex-col"
                onClick={() => {
                  setCache('newsDetails', e);
                  history.push('newsDetails');
                }}
              >
                <div className="w-[55vw] rounded-[0.625rem] overflow-hidden border border-borderColor/20 shadow-lg">
                  <img
                    className="w-full"
                    src={e.url}
                    alt="Sunset in the mountains"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{e.title}</div>
                    <p className="text-base">{StringCutter(e.text, 50)}</p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-primary-100 rounded-full px-3 py-1 text-sm font-semibold text-primary-700 mr-2 mb-2">
                      #photography
                    </span>
                    <span className="inline-block bg-primary-100 rounded-full px-3 py-1 text-sm font-semibold text-primary-700 mr-2 mb-2">
                      #travel
                    </span>
                    <span className="inline-block bg-primary-100 rounded-full px-3 py-1 text-sm font-semibold text-primary-700 mr-2 mb-2">
                      #winter
                    </span>
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
