import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { StringCutter } from 'src/utils/StringUtils'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import firebase_app from 'src/infra/Firebase'
import { setCache } from 'src/services/Cache'
import { Context } from 'src/context/Context'

export default function Chat({
  id,
}: {
  id: string
}) {
  const listRef = useRef<any>(null)

  const { youtube } = useContext(Context)
  const { hook: { comments, setComments } } = youtube

  const sortComments = (currentComments: any) => {
    const joining = [...currentComments]
    return joining.sort((a: any, b: any) => {
      return a.date.seconds * 1000 - b.date.seconds * 1000
    })
  }

  const db = getFirestore(firebase_app)
  useEffect(() => {
    if (id) {
      const currentComments: any = []
      const q = query(collection(db, 'youtube'), where('liveId', '==', id))
      onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.empty) {
          setCache('youtube', [])
          setComments([])
        }
        querySnapshot.docChanges().forEach((change) => {
          const data = change.doc.data()
          if (change.type === 'added') {
            currentComments.push(data)
          }
        })
        setComments(sortComments(currentComments))
        listRef.current?.scrollToItem(currentComments.length - 1, 'end')
      })
    }
  }, [id])

  return (
    <div className="h-full w-full">
      <AutoSizer>
        {({ height, width }: any) => (
          <List
            ref={listRef}
            itemKey={(index) => {
              return `each_comment_${index}`
            }}
            className="List"
            height={height}
            itemCount={comments ? comments.length : 0}
            itemSize={100}
            width={width}
          >
            {({ index, style }) => {
              if (!comments || comments.length === 0) return null
              const e: any = comments[index]
              return (
                <div key={`each_comment_${index}`}>
                  {e.isPaid ? (
                    <SuperComment comment={e} style={style} />
                  ) : (
                    <Comment comment={e} style={style} index={index} />
                  )}
                </div>
              )
            }}
          </List>
        )}
      </AutoSizer>
    </div>
  )
}

const Comment = ({
  comment,
  style,
  index,
}: {
  comment: any
  style: any
  index: number
}) => {
  return (
    <div
      style={style}
      className={`flex items-start justify-between gap-4 w-full p-4 pb-0 index-${index + 1}`}
    >
      <div className="relative h-auto w-[15%]">
        <img
          className="w-full h-12 object-fill rounded-[0.625rem] aspect-square"
          src={comment.user && comment.user.avatar ? comment.user.avatar : 'https://shorturl.at/qGJRY'}
          alt=""
        />
        <div className="absolute -top-2 -left-2 bg-primary rounded-full h-5 w-5 shadow-md border border-white"></div>
      </div>
      <div className="flex flex-col items-start w-full">
        <p className="font-bold">{comment.user.username}</p>
        <p className="w-full rounded-[0.625rem]">
          {StringCutter(comment.comment, 100, '...')}
        </p>
      </div>
    </div>
  )
}

const SuperComment = ({ comment, style }: { comment: any; style: any }) => {
  return (
    <div style={style}>
      <div className="flex items-start justify-between gap-4 w-full p-4 pb-2 bg-bgClub bg-opacity-20 bg-center bg-125% bg-blend-soft-light">
        <div className="relative h-[4rem] w-[15%]">
          <img
            className="w-full h-[3rem] object-cover border-2 shadow-2xl border-white rounded-[0.625rem]"
            src="https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.600.jpg"
            alt=""
          />
          <div className="absolute -top-2 -left-2 bg-primary rounded-full h-5 w-5 shadow-md border border-white"></div>
        </div>
        <div className="flex flex-col items-start w-full">
          <p className="font-[900] text-white text-[1.35rem]">
            {comment.user.username}
          </p>
          <p className="text-white w-full rounded-[0.625rem]">
            {StringCutter(comment.comment, 100, '...')}
          </p>
        </div>
      </div>
    </div>
  )
}
