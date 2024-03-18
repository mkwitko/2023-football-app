import ModalProsper from 'src/components/Shadcn/Modal'
import { Context } from './../../context/Context'
import { IonContent } from '@ionic/react'
import React, { useContext, useEffect } from 'react'

export default function Feed() {
  const { feeds } = useContext(Context)
  const [feedsToUse, setFeedsToUse] = React.useState<any[]>([])

  useEffect(() => {
    if (feedsToUse.length > 0) return
    const data = feeds.hook.data.sort(
      (a: any, b: any) => b.timestamp - a.timestamp,
    )
    setFeedsToUse(data.filter((e: any, i: number) => i < 30))
  }, [feeds.hook.data])

  return (
    <IonContent fullscreen>
      <div className="flex flex-col gap-4 overflow-y-auto px-4 sm:px-8 my-4">
        {feedsToUse.map((e: any, i: number) => (
          <FeedCards key={i} feed={e} />
        ))}
      </div>
    </IonContent>
  )
}

const FeedCards = ({ feed }: any) => {
  const [showImage, setShowImage] = React.useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setShowImage(!showImage)
        }}
      >
        <div className="border border-primary-800 bg-transparent rounded-[0.625rem] flex flex-col">
          {feed.imagePath && (
            <img
              className=" shadow-feedShadow object-cover h-[10rem] rounded-t-[0.625rem]"
              src={feed.imagePath}
              alt={feed.title}
            />
          )}
          <div className="flex flex-col p-4 gap-4 text-primary-900">
            <div className="flex items-center gap-2">
              <img
                className="rounded-full h-8 w-8"
                src={
                  feed.author && feed.author.avatar
                    ? feed.author.avatar
                    : 'https://shorturl.at/qGJRY'
                }
                alt=""
              />
              <div className="flex flex-col">
                <span className="text-primary-900 text-[0.75rem] font-bold">
                  {feed.author && feed.author.name
                    ? feed.author.name
                    : 'Autor Desconhecido'}
                </span>
                <span className="text-primary-900 text-[0.6rem]">
                  {feed.createdAt}
                </span>
              </div>
            </div>
            <div
              className="text-[0.75rem] text-primary-900"
              dangerouslySetInnerHTML={{
                __html: feed.description,
              }}
            ></div>
          </div>
        </div>
      </button>

      <ModalProsper.Modal open={showImage} setOpen={setShowImage}>
        <ModalProsper.ModalContent className="bg-transparent border-none">
          <div className="flex justify-center items-center h-full">
            <img
              className="object-contain h-full w-full rounded-[0.625rem] border-2 border-white"
              src={feed.imagePath}
              alt={feed.title}
            />
          </div>
        </ModalProsper.ModalContent>
      </ModalProsper.Modal>
    </>
  )
}
