import { IonContent, useIonAlert, useIonLoading } from '@ionic/react';
import React, { useContext, useEffect } from 'react';
import ProfileForm from './form/useForm';
import { AiFillEdit } from 'react-icons/ai';
import { Avatar } from './Avatar';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import Toast from 'src/services/Toast';
import Navigation from 'src/services/Navigation';
import { Context } from 'src/context/Context';
import Auth from 'src/services/Auth';

export default function Profile() {

    const { user } = useContext(Context) ;
    const { navigateTo } = Navigation();
    const { exclude } = Auth();


    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();


    const deleteAccount = () => {
        presentAlert({
            header: 'Atenção',
            subHeader: 'Esta ação é irreversível! Se você tiver saldo na sua Wallet, o mesmo será perdido.',
            message: 'Você tem certeza que deseja excluir sua conta?',
            buttons: [{
                text: 'Cancelar',
                role: 'cancel'
            }, {
                text: 'Confirmar',
                role: 'confirm',
                handler: () => {
                    present({
                        message: 'Aguarde...',
                    });
                    // TODO implementar delete das imagens
                    user.delete(user.hook.data.id).then(() => {
                        // user.deleteFile(user.hook.data.id + '/*').then(() => {
                            exclude().then(() => {
                                dismiss();
                                navigateTo('/login');
                            // });
                        })
                    })
                }
            }],
        })
    }


    const [edit, setEdit] = React.useState(false);
    const { register, handleSubmit, errors, isSubmitting, submit, setValue, watch } =
        ProfileForm({ setEdit });

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            fetch(`${process.env.REACT_APP_ENVIRONMENT === 'production' ? process.env.REACT_APP_BACKEND + '/google-oauth' : process.env.REACT_APP_BACKEND_DEV + '/google-oauth'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: tokenResponse.code,
                })
            }).then(response => {
                response.json().then(data => {
                    fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + data.access_token).then(response => {
                        response.json().then(data => {
                            if (data.email) {
                                fetch(`${process.env.REACT_APP_ENVIRONMENT === 'production' ? process.env.REACT_APP_BACKEND + '/query' : process.env.REACT_APP_BACKEND_DEV + '/query'}`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        collection: 'users',
                                        fieldToSearch: 'youtubeEmail',
                                        valueToSearch: data.email
                                    })
                                }).then(response => {
                                    response.json().then(res => {
                                        if (res.status) {
                                            Toast().error('Conta do Youtube já sincronizada com outro usuário!');
                                            return;
                                        }
                                        setValue('youtubeEmail', data.email);
                                        setValue('access_token', data.access_token);
                                        setValue('refresh_token', data.refresh_token);
                                        Toast().info('Conta do Youtube sincronizada com sucesso! Salve as informações para concluir o processo.');
                                    })
                                })

                            }
                        })
                    })
                })
            })
        },
        onError: error => {
            console.log('error - ', error);
        },
        scope: 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.channel-memberships.creator',
        flow: 'auth-code',
    });

    return (
        <IonContent fullscreen>
            <div className="flex flex-col gap-8 p-8">
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(submit)}
                >
                    <div className="flex items-center justify-end w-full">
                        <button
                            type="button"
                            disabled={edit}
                            className="text-[2.5rem] md:text-[3.5rem]"
                            onClick={() => {
                                setEdit(true);
                            }}
                        >
                            <AiFillEdit
                                className={`${edit ? 'opacity-50' : ''
                                    } bg-primary-700 text-white p-2 rounded-full`}
                            />
                        </button>
                    </div>
                    <div className={`${!edit ? 'opacity-50' : ''} flex flex-col gap-8`}>
                        <div>
                            <Avatar
                                disabled={!edit || isSubmitting}
                                setImagePreview={(previewUrl) => setValue('avatar', previewUrl)}
                                imagePreview={watch('avatar')}
                                errorMessage={errors.avatar?.message as string}
                                setValue={setValue}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900 text-[1rem] md:text-[1.5rem]"
                            >
                                Nome completo
                            </label>
                            <div className="mt-2">
                                <input
                                    disabled={!edit || isSubmitting}
                                    id="username"
                                    {...register('username')}
                                    type="text"
                                    autoComplete="username"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 md:text-[1.25rem] md:leading[1.25rem] md:py-[0.75rem] bg-white pl-2"
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-[0.75rem] w-full mt-1">
                                        {errors.username?.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900 text-[1rem] md:text-[1.5rem]"
                            >
                                Endereço de e-mail
                            </label>
                            <div className="mt-2">
                                <input
                                    disabled={true}
                                    id="email"
                                    {...register('email')}
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 md:text-[1.25rem] md:leading[1.25rem] md:py-[0.75rem] bg-zinc-200 pl-2"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-[0.75rem] w-full mt-1">
                                        {errors.email?.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="youtubeEmail"
                                className="block text-sm font-medium leading-6 text-gray-900 text-[1rem] md:text-[1.5rem]"
                            >
                                Sincronizar conta do Youtube
                            </label>
                            {!watch('youtubeEmail') ? (
                                <button className="mt-2 text-start w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 md:text-[1.25rem] md:leading[1.25rem] md:py-[0.75rem] bg-white pl-3 flex items-center gap-2" type='button' onClick={() => {
                                    login()
                                }}>
                                    <FcGoogle />
                                    <p>
                                        Fazer Login com a Google</p>
                                </button>
                            ) : (
                                <div className="mt-2">
                                    <div className='flex relative gap-2'>
                                    <input
                                        disabled={true}
                                        id="youtubeEmail"
                                        {...register('youtubeEmail')}
                                        type="email"
                                        autoComplete="youtubeEmail"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 md:text-[1.25rem] md:leading[1.25rem] md:py-[0.75rem] bg-zinc-200 pl-2"
                                    />
                                    <button onClick={() => {
                                        if(!edit) return;
                                        setValue('youtubeEmail', '');
                                        setValue('access_token', '');
                                        setValue('refresh_token', '');
                                        Toast().info('Conta do Youtube desconectada com sucesso! Salve as informações para concluir o processo.');
                                    }} className='font-bold text-[0.75rem] md:text-[1.5rem] absolute right-2 h-full' type='button'>
                                        Desconectar 
                                    </button>
                                    </div>
                                    {errors.youtubeEmail && (
                                        <p className="text-red-500 text-[0.75rem] w-full mt-1">
                                            {errors.youtubeEmail?.message}
                                        </p>
                                    )}
                                </div>
                            )}

                        </div>

                        <div>
                            <label
                                htmlFor="cpf"
                                className="block text-sm font-medium leading-6 text-gray-900 text-[1rem] md:text-[1.5rem]"
                            >
                                CPF
                            </label>
                            <div className="mt-2">
                                <input
                                    disabled={!edit || isSubmitting}
                                    id="cpf"
                                    maxLength={14}
                                    {...register('cpf')}
                                    type="text"
                                    autoComplete="cpf"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 md:text-[1.25rem] md:leading[1.25rem] md:py-[0.75rem] bg-white pl-2"
                                />
                                {errors.cpf && (
                                    <p className="text-red-500 text-[0.75rem] w-full mt-1">
                                        {errors.cpf?.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="cellphone"
                                className="block text-sm font-medium leading-6 text-gray-900 text-[1rem] md:text-[1.5rem]"
                            >
                                Telefone
                            </label>
                            <div className="mt-2">
                                <input
                                    disabled={!edit || isSubmitting}
                                    id="cellphone"
                                    maxLength={15}
                                    {...register('cellphone')}
                                    type="telephone"
                                    autoComplete="cellphone"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 md:text-[1.25rem] md:leading[1.25rem] md:py-[0.75rem] bg-white pl-2"
                                />
                                {errors.cellphone && (
                                    <p className="text-red-500 text-[0.75rem] w-full mt-1">
                                        {errors.cellphone?.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 md:text-[1.5rem] md:py-[0.75rem] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                            >
                                Salvar
                            </button>

                            <button
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => {
                                    setEdit(false);
                                    navigateTo('/home');
                                }}
                                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 md:text-[1.5rem] md:py-[0.75rem] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => {
                                   deleteAccount();
                                }}
                                className="flex w-full justify-center rounded-md bg-primary-900 px-3 py-1.5 md:text-[1.5rem] md:py-[0.75rem] text-sm font-semibold leading-6 text-white shadow-sm "
                            >
                                Excluir Conta
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </IonContent>
    );
}
