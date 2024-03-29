import React from 'react'
import LoginForm from './form/useForm'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function Forgot({ set }: { set: (value: number) => void }) {
  const { register, handleSubmit, errors, isSubmitting, submit } = LoginForm()
  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(submit)}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 md:text-[1.5rem]"
          >
            Endereço de e-mail
          </label>
          <div className="mt-2">
            <input
              id="email"
              {...register('email')}
              type="email"
              autoComplete="email"
              className="pl-2 block w-full rounded-md border-0 py-1.5 md:py-[0.75rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 md:text-[1.5rem] bg-white"
            />
            {errors.email && (
              <p className="text-red-500 text-[0.75rem] w-full mt-1">
                {errors.email?.message}
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
            {isSubmitting ? 'Aguarde' : 'Enviar E-mail de recuperação'}
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm md:text-[1rem] text-gray-500">
        Lembrei da minha senha
        <button
          onClick={() => {
            set(0)
          }}
          type="button"
          disabled={isSubmitting}
          className="font-semibold leading-6 text-[1rem] md:text-[1.25rem] text-primary-600 hover:text-primary-500 ml-2"
        >
          Voltar para Login
        </button>
      </p>
    </>
  )
}
