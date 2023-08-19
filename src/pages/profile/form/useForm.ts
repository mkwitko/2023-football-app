import React, { useContext } from 'react';
import { Form, Schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Context } from '../../../context/Context';

export default function ProfileForm() {
  const { user } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Form>({
    resolver: zodResolver(Schema),
    defaultValues: {
      username: user?.hook?.data?.username || '',
      email: user?.hook?.data?.email || '',
      youtubeEmail: user?.hook?.data?.youtubeEmail || '',
      cpf: user?.hook?.data?.cpf || '',
      cellphone: user?.hook?.data?.cellphone || '',
    },
  });

  const submit = async ({
    username,
    email,
    youtubeEmail,
    cpf,
    cellphone,
  }: Form) => {
    console.log('submit');
    console.log(username, email, youtubeEmail, cpf, cellphone);
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,
    submit,
  };
}
