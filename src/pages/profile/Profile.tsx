import { IonPage, IonContent } from '@ionic/react';
import React from 'react';
import Footer from '../../components/core/footer/Footer';
import Header from '../../components/core/header/Header';
import ProfileForm from './form/useForm';
import { AiFillEdit } from 'react-icons/ai';

export default function Profile() {
  const [edit, setEdit] = React.useState(false);
  const { register, handleSubmit, errors, isSubmitting, submit } =
    ProfileForm();
  return (
    <IonPage>
      <Header />
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
                className="text-[2.5rem]"
                onClick={() => {
                  setEdit(true);
                }}
              >
                <AiFillEdit
                  className={`${
                    edit ? 'opacity-50' : ''
                  } bg-primary-700 text-white p-2 rounded-full`}
                />
              </button>
            </div>
            <div className={`${!edit ? 'opacity-50' : ''} flex flex-col gap-8`}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white pl-2"
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
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Endereço de e-mail
                </label>
                <div className="mt-2">
                  <input
                    disabled={!edit || isSubmitting}
                    id="email"
                    {...register('email')}
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white pl-2"
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
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Endereço de e-mail do Youtube
                </label>
                <div className="mt-2">
                  <input
                    disabled={!edit || isSubmitting}
                    id="youtubeEmail"
                    {...register('youtubeEmail')}
                    type="email"
                    autoComplete="youtubeEmail"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white pl-2"
                  />
                  {errors.youtubeEmail && (
                    <p className="text-red-500 text-[0.75rem] w-full mt-1">
                      {errors.youtubeEmail?.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="cpf"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  CPF
                </label>
                <div className="mt-2">
                  <input
                    disabled={!edit || isSubmitting}
                    id="cpf"
                    {...register('cpf')}
                    type="text"
                    autoComplete="cpf"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white pl-2"
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
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Telefone
                </label>
                <div className="mt-2">
                  <input
                    disabled={!edit || isSubmitting}
                    id="cellphone"
                    {...register('cellphone')}
                    type="telephone"
                    autoComplete="cellphone"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white pl-2"
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
                  className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Salvar
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setEdit(false);
                  }}
                  className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
}
