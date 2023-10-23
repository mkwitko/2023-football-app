import {
    IonContent,
    IonTextarea,
} from '@ionic/react';
import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import Iframe from '../../components/youtube/Iframe';
import { Context } from '../../context/Context';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import firebase_app from './../../infra/Firebase';
import { BiSolidMegaphone } from 'react-icons/bi';
import { AiTwotoneStar } from 'react-icons/ai';
import ModalProsper from 'src/components/Shadcn/Modal/index';
import Toast from 'src/services/Toast';

export default function Live() {
    const { youtube, user, wallets } = useContext(Context);
    const [value, setValue] = React.useState(5.00);
    const id = youtube.hook.live?.id?.videoId;

    const [comment, setComment] = useState('');

    const [comments, setComments] = useState(youtube.hook.data);

    const scrollRef = useRef<any>(null);

    const scrollToBottom = () => {
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleComment = async (isPaid = false) => {
        await youtube.insert({
            comment,
            value: isPaid ? value : 0,
            isPaid,
            user: user.hook.data,
        });
        setComment('');
        if (isPaid) {
            fetch(`${process.env.REACT_APP_BACKEND_DEV}/pay`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user.hook.data.id,
                    amount: value
                })
            })
        }
    };

    const db = getFirestore(firebase_app);
    useEffect(() => {
        const q = query(collection(db, "youtube"));
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
                const data = change.doc.data();
                if (change.type === "modified") {
                    setComments((prev: any) => {
                        const index = prev.findIndex((e: any) => e.id === data.id);
                        if (index === -1) {
                            return [...prev, data];
                        }
                        return prev;
                    })
                    setTimeout(() => {
                        scrollToBottom();
                    }, 1500);
                }
            })
        });
    }, [])


    return (
        <IonContent fullscreen>
            <div className="flex flex-col h-full items-center justify-between pb-2 relative">
                <Iframe videoId={id} />
                <div id='comments-div' className='flex flex-col overflow-y-auto w-full gap-2'>
                    {comments.map((e: any, i: number) => {
                        return (
                            e.isPaid ? <SuperComment comment={e} key={i} /> :
                                <Comment comment={e} key={i} />
                        )
                    })}
                    <div ref={scrollRef}></div>
                </div>
                <div className="w-[95%] flex items-end gap-2 border-t-2 pt-4">
                    <IonTextarea
                        className="w-full rounded-[0.625rem] border border-borderColor p-2"
                        rows={2}
                        label="Enviar comentário"
                        labelPlacement="stacked"
                        placeholder="Entre o seu comentário aqui"
                        value={comment}
                        onIonChange={(e: any) => {
                            setComment(e.detail.value);
                        }}
                    ></IonTextarea>
                    <div className='flex flex-col h-full justify-between gap-4'>
                        <ModalProsper.Modal>
                            <ModalProsper.ModalTrigger>
                                <button
                                    disabled={!comment || !wallets.hook.data || wallets.hook.data.balance < 1}
                                    className="h-full flex gap-1 items-center bg-primary rounded-[0.625rem] py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                    type="button"
                                >
                                    <BiSolidMegaphone className='h-6 w-auto text-white' />
                                    <AiTwotoneStar className='text-white h-4 w-auto' />
                                </button>
                            </ModalProsper.ModalTrigger>
                            <ModalProsper.ModalContent className='w-[80%] p-0 rounded-[0.625rem] gap-0'>
                                <ModalProsper.ModalHeader className='bg-primary rounded-t-[0.625rem]'>
                                    <div className='flex flex-col px-2 py-4'>
                                        <span className='text-white text-[1.5rem] font-bold'>Grito colorado!</span>
                                        <span className='text-white text-[0.75rem]'>
                                            Ajude nossa transmissão a ficar cada vez mais forte!
                                        </span>
                                    </div>
                                </ModalProsper.ModalHeader>
                                <div className='flex items-end justify-center w-full p-4'>
                                    <p className='text-[1.5rem] leading-[3.5rem] text-primary font-[900]'>R$</p>
                                    <input step="0.5" className='w-full leading-8 text-center  text-[5rem] bg-transparent font-bold text-primary-900' type="number" value={+Number(value).toFixed(2)} onChange={(e) => {
                                        setValue(+Number(e.target.value).toFixed(2));
                                    }} />
                                </div>
                                <ModalProsper.ModalFooter>
                                    <div className='flex items-center justify-between'>
                                        <button onClick={() => {
                                            if (wallets.hook.data.balance < value) {
                                                Toast().error('Saldo insuficiente');
                                            } else
                                                handleComment(true);
                                        }} className='flex-1 bg-primary text-white p-4 rounded-ee-[0.625rem] font-bold' type='button'>
                                            Confirmar
                                        </button>
                                    </div>
                                </ModalProsper.ModalFooter>
                            </ModalProsper.ModalContent>
                        </ModalProsper.Modal>

                        <button onClick={() => {
                            handleComment();
                        }}
                            disabled={!comment}
                            id="present-alert"
                            className="bg-white shadow-sendShadow rounded-[0.625rem] h-full py-2 px-4 
                        disabled:opacity-50 disabled:cursor-not-allowed"
                            type="button"
                        >
                            <p className='text-primary'>Enviar</p>
                        </button>
                    </div>
                </div>
            </div>
        </IonContent>
    );
}


const Comment = ({ comment }: {
    comment: any
}) => {
    return (
        <div className='flex items-start justify-between gap-4 w-full p-4 pb-0'>
            <div className='relative h-auto w-[15%]'>
                <img className='w-full h-12 object-cover rounded-[0.625rem] aspect-square' src="https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.600.jpg" alt="" />
                <div className='absolute -top-2 -left-2 bg-primary rounded-full h-5 w-5 shadow-md border border-white'></div>
            </div>
            <div className='flex flex-col items-start w-full'>
                <p className='font-bold'>{comment.user.username}</p>
                <p className='w-full rounded-[0.625rem]'>{comment.comment}</p>
            </div>
        </div>
    )
}

const SuperComment = ({ comment }: {
    comment: any
}) => {
    return (
        <div>
            <div className='flex items-start justify-between gap-4 w-full p-4 pb-2 bg-bgClub bg-opacity-20 bg-center bg-125% bg-blend-soft-light'>
                <div className='relative h-[4rem] w-[15%]'>
                    <img className='w-full h-[3rem] object-cover border-2 shadow-2xl border-white rounded-[0.625rem]' src="https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.600.jpg" alt="" />
                    <div className='absolute -top-2 -left-2 bg-primary rounded-full h-5 w-5 shadow-md border border-white'></div>
                </div>
                <div className='flex flex-col items-start w-full'>
                    <p className='font-[900] text-white text-[1.35rem]'>{comment.user.username}</p>
                    <p className='w-full rounded-[0.625rem] text-white'>{comment.comment}</p>
                </div>
            </div>
        </div>
    )
}