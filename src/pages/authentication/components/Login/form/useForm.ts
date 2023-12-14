import React from 'react';
import { Form, Schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Auth from '../../../../../services/Auth';
import Navigation from '../../../../../services/Navigation';

export default function LoginForm() {
  const { signIn } = Auth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(Schema),
  });


  const { navigateTo } = Navigation();

  const submit = async ({ email, password }: Form) => {
      const res: any = await signIn(email, password)

      if(res.result) {
        navigateTo('/home');
      } 
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    submit,
  };
}
