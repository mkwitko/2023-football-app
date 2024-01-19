import MercadoPago from './../../services/MercadoPago';
import { IonContent, useIonModal } from '@ionic/react'
import React, { useContext, useEffect } from 'react'
import { Context } from '../../context/Context';
import { moneyMask } from 'src/utils/MaskUtils';
import { decrypt } from 'src/services/Encrypt';
import { query, collection, where, onSnapshot, getFirestore } from 'firebase/firestore';
import firebase_app from 'src/infra/Firebase';
import Toast from 'src/services/Toast';


export default function Wallet() {

    const { user, wallets } = useContext(Context);
    const [value, setValue] = React.useState('R$10.00');

    const [present, dismiss] = useIonModal(MercadoPago, {
        componentProps: {
            id: user.hook.data ? user.hook.data.id : '',
            user: user.hook.data,
            tokenId: user.hook.tokenId,
            close: () => handleCloseModal(),
            value: parseInt(value.replace('R$', '').replace(/\./g, ""), 10) / 100
        },
        onDismiss: () => dismiss(),
    });

    const handleCloseModal = () => {
        dismiss();
    };


    function openModal() {
        present({
            onDidDismiss: () => {
                wallets.getHttp(user.hook.data.id).then((res: any) => {
                    if (res) {
                        const balance = +decrypt(res.balance ?? 0);
                        wallets.hook.setData({
                            id: res.id,
                            balance
                        });
                    }
                })
            },
        });
    }

    const db = getFirestore(firebase_app);

    useEffect(() => {
        if (user.hook.data && user.hook.data.id) {
            const q = query(collection(db, "wallets"),
                where('id', '==', user.hook.data.id || ''));
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.docChanges().forEach((change) => {
                    const data = change.doc.data();
                    if (change.type === "modified" || change.type === 'added') {
                        const balance = +decrypt(data.balance);
                        wallets.hook.setData({
                            id: user.hook.data.id,
                            balance
                        });
                        Toast().success('Saldo atualizado');
                        dismiss();
                    }
                })
            });
        }
    }, [user.hook.data])

    return (
        <IonContent fullscreen>
            <div className='flex flex-col p-8 gap-8'>
                <div className='flex flex-col'>
                    <p className='text-primary font-bold text-[1rem] md:text-[1.5rem]'>Carteira</p>
                    <p className='text-[0.75rem] md:text-[1.5rem]'>Nossas diretrizes respondem todas as dúvidas, antes de fazer pagamentos pelo aplicativo por favor, <a href='https://www.google.com.br' className='text-[0.75rem] md:text-[1.5rem] text-primary'>leia elas aqui.</a></p>
                </div>
                <div className='flex items-center w-full justify-between'>
                    <p className='text-primary font-bold text-[1rem] md:text-[1.5rem]'>Saldo em conta</p>
                    <p className='text-primary font-bold text-[1rem] md:text-[1.5rem]'>R${wallets.hook.data?.balance ? (+wallets.hook.data.balance).toFixed(2) : 0}</p>
                </div>
                <div className='flex flex-col gap-8'>
                    <div>
                        <p className='text-primary font-bold text-[1rem] md:text-[1.5rem]'>Adicionar Saldo</p>
                        <div className='flex items-center w-full justify-between'>
                            <p className='text-primary-900 text-[0.75rem] md:text-[1.5rem] font-bold w-full'>Quantia a ser adicionada</p>
                            <input step="0.5" className='p-2 pb-0 w-[45%] text-end bg-transparent font-bold text-primary-900 text-[1rem] md:text-[1.5rem]' type="text" value={value} onChange={(e) => {
                                const mask = moneyMask(e.target.value);
                                setValue(mask);
                            }} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-8'>
                        <div onClick={() => {
                            openModal();
                        }} className='flex items-center justify-center border bg-primary border-primary rounded-[0.625rem] px-6 py-3 md:py-[1.25rem]  md:mt-8 cursor-pointer'>
                            <button type='button' className='text-white font-bold h-full w-full text-[1rem] md:text-[1.5rem]'>
                                Ir para o pagamento
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </IonContent>
    )
}
