import React from 'react';
import LoginForm from './form/useForm';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export default function Login({ set }: { set: (value: number) => void }) {
    const { register, handleSubmit, errors, isSubmitting, submit } = LoginForm();

    const [type, setType] = React.useState('password');
    return (
        <>
            <form
                className="space-y-6"
                onSubmit={handleSubmit(submit)}
            >
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900 md:text-[1.5rem] md:leading-[1.5rem]"
                    >
                        Endereço de e-mail
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            {...register('email')}
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white pl-2 md:text-[1.5rem]"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-[0.75rem] w-full mt-1">
                                {errors.email?.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900 md:text-[1.5rem] md:leading-[1.5rem]"
                        >
                            Senha
                        </label>
                        <div className="text-sm">
                            <button
                                onClick={() => {
                                    set(2);
                                }}
                                type="button"
                                disabled={isSubmitting}
                                className="font-semibold text-primary-600 hover:text-primary-500 text-[1rem] md:text-[1.25rem]"
                            >
                                Esqueceu sua senha?
                            </button>
                        </div>
                    </div>
                    <div className="flex mt-2 relative">
                        <input
                            id="password"
                            {...register('password')}
                            type={type}
                            autoComplete="current-password"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm md:text-[1.5rem] sm:leading-6 bg-white pl-2"
                        />
                        <button onClick={() => {
                            setType(type !== 'password' ? 'password' : 'text');
                        }} className='ml-[-2rem] text-[1.5rem]' type='button'>
                            {type !== 'password' ? <AiFillEyeInvisible /> :
                                <AiFillEye />}
                        </button>
                        {errors.password && (
                            <p className="text-red-500 text-[0.75rem] w-full mt-1">
                                {errors.password?.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 md:text-[1.25rem] md:py-[0.75rem]"
                    >
                        Entrar
                    </button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm md:text-[1rem] text-gray-500">
                Ainda não é membro?
                <button
                    onClick={() => {
                        set(1);
                    }}
                    type="button"
                    disabled={isSubmitting}
                    className="font-semibold text-[1rem] md:text-[1.25rem] leading-6 text-primary-600 hover:text-primary-500 ml-2"
                >
                    Cadastre-se
                </button>
            </p>
        </>
    );
}
