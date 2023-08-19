import Header from './../../components/core/header/Header';
import { IonPage, IonContent, IonList } from '@ionic/react';
import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import { StringCutter } from '../../utils/StringUtils';
import VirtualScrollChild from '../../components/core/VirtualScroll';
import { useHistory } from 'react-router';
import { setCache } from '../../services/Cache';
import Footer from '../../components/core/footer/Footer';
import { AiOutlineShareAlt } from 'react-icons/ai';

export default function News() {
  const history = useHistory();
  const { noticias } = useContext(Context);
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <div className="flex flex-col gap-8 p-8">
          {noticias.hook.data.map((e: any, i: number) => (
            <VirtualScrollChild
              height={450}
              key={i}
            >
              <div
                onClick={() => {
                  setCache('newsDetails', e);
                  history.push('newsDetails');
                }}
                className="max-w-sm rounded-[0.625rem] border border-borderColor/20 shadow-md"
              >
                <img
                  className="w-full rounded-t-[0.625rem]"
                  src={e.url}
                  alt={e.title}
                />
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between font-bold text-xl text-primary-900">
                    <p>{e.title}</p>
                    <button
                      type="button"
                      className="bg-primary text-white p-2 rounded-full mt-[-4rem] shadow-md"
                    >
                      <AiOutlineShareAlt className="text-[1.5rem]" />
                    </button>
                  </div>
                  <p className="text-gray-700 text-base">
                    {StringCutter(e.text, 100)}
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-primary/80 bg-primary/10 mr-2 mb-2">
                    #photography
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-primary/80 bg-primary/10 mr-2 mb-2">
                    #travel
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-primary/80 bg-primary/10 mr-2 mb-2">
                    #winter
                  </span>
                </div>
              </div>
            </VirtualScrollChild>
          ))}
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
}
