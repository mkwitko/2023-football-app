import {
    IonContent,
    IonTextarea,
} from '@ionic/react';
import React, { useContext, useState } from 'react';
import Iframe from '../../components/youtube/Iframe';
import { Context } from '../../context/Context';
import { BiSolidMegaphone } from 'react-icons/bi';
import { AiTwotoneStar } from 'react-icons/ai';
import ModalProsper from 'src/components/Shadcn/Modal/index';
import Toast from 'src/services/Toast';
import Authentication from 'src/services/Auth';
import Chat from './Chat';

export default function Live() {
    const { youtube, user, wallets } = useContext(Context);
    const [value, setValue] = React.useState(5.00);
    const id = youtube.hook.live?.id?.videoId;

    const [comment, setComment] = useState('');

    const [comments, setComments] = useState<any>([]);

    const [open, setOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const {auth} = Authentication()

    const handleComment = async (isPaid = false) => {
        await youtube.insert({
            comment,
            value: isPaid ? value : 0,
            isPaid,
            user: user.hook.data,
            date: new Date(),
            liveId: id
        })
        setComment('');
        if (isPaid) {
            const token = await auth.currentUser?.getIdToken()
            setIsSending(true);
            fetch(`${process.env.REACT_APP_ENVIRONMENT === 'production' ? process.env.REACT_APP_BACKEND + '/payments/pay' : process.env.REACT_APP_BACKEND_DEV + '/payments/pay'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    user_id: user.hook.data.id,
                    user: user.hook.data,
                    amount: -value,
                    purchase: {
                        date: new Date(),
                        type: 'live',
                        comment,
                        isPaid,
                        value,
                    }
                })
            }).then((res) => {
                res.json().then(() => {
                    setOpen(false);
                    setIsSending(false);
                })
            }).catch(() => {
                setOpen(false);
                setIsSending(false);
            })
        }
        if (user.hook.data.access_token && youtube.hook.liveChatId)
            youtube.sendComment(comment, user.hook.data.access_token, youtube.hook.liveChatId);
    };



    return (
        <IonContent fullscreen>
            <div className="flex flex-col h-full items-center justify-between pb-2 relative">
                <Iframe videoId={id} />
                <Chat comments={comments} setComments={setComments} id={id}/>
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
                        <ModalProsper.Modal open={open} setOpen={setOpen}>
                            <ModalProsper.ModalTrigger>
                                <button
                                    disabled={!comment || !wallets.hook.data || wallets.hook.data.balance === 0}
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
                                        <button disabled={isSending} onClick={() => {
                                            if (wallets.hook.data.balance < value) {
                                                Toast().error('Saldo insuficiente');
                                            } else
                                                handleComment(true);
                                        }} className='disabled:opacity-50 flex-1 bg-primary text-white p-4 rounded-ee-[0.625rem] font-bold' type='button'>
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


