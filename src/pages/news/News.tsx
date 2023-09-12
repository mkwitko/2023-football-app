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
        <div className="flex flex-col p-8">
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
                className="max-w-sm h-[25rem] rounded-[0.625rem] border border-borderColor/20 shadow-md"
              >
                <img
                  className="w-full rounded-t-[0.625rem]"
                  src={e.url}
                  alt={e.title}
                />
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between font-bold text-primary-900">
                    <div className="font-bold mb-2 text-[0.75rem]">
                      <p>{StringCutter(e.title, 75, '...')}</p>
                    </div>
                    <button
                      type="button"
                      className="bg-primary text-white p-2 rounded-full mt-[-4rem] shadow-md"
                    >
                      <AiOutlineShareAlt className="text-[1.5rem]" />
                    </button>
                  </div>
                  <div
                    className="text-[0.75rem]"
                    dangerouslySetInnerHTML={{
                      __html: StringCutter(e.text, 200, '...'),
                    }}
                  ></div>
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
