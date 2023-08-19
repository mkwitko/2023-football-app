import React from 'react';
import LoginForm from './form/useForm';

export default function Register({ set }: { set: (value: number) => void }) {
  const { register, handleSubmit, errors, isSubmitting, submit } = LoginForm();
  return (
    <>
      <form
        className="space-y-6"
        onSubmit={handleSubmit(submit)}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Endereço de e-mail
          </label>
          <div className="mt-2">
            <input
              id="email"
              {...register('email')}
              type="email"
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white"
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
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Senha
            </label>
          </div>
          <div className="mt-2">
            <input
              {...register('password')}
              type="password"
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white"
            />
            {errors.password && (
              <p className="text-red-500 text-[0.75rem] w-full mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirme sua senha
            </label>
          </div>
          <div className="mt-2">
            <input
              {...register('confirmPassword')}
              type="password"
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-[0.75rem] w-full mt-1">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Cadastrar
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Ja é membro?
        <button
          type="button"
          onClick={() => {
            set(0);
          }}
          disabled={isSubmitting}
          className="font-semibold leading-6 text-primary-600 hover:text-primary-500 ml-2"
        >
          Voltar para Login
        </button>
      </p>
    </>
  );
}
