import React from 'react';
import { Form, Schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Auth from '../../../../../services/Auth';
import Navigation from '../../../../../services/Navigation';

export default function LoginForm() {
  const { signIn } = Auth();
  const { navigateTo } = Navigation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(Schema),
  });

  const submit = async ({ email, password }: Form) => {
    await signIn(email, password);
    navigateTo('/home');
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    submit,
  };
}
