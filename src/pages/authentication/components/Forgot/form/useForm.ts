import React from 'react';
import { Form, Schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Auth from '../../../../../services/Auth';

export default function ForgotForm() {
  const { forgotPassword } = Auth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(Schema),
  });

  const submit = async ({ email }: Form) => {
    await forgotPassword(email);
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    submit,
  };
}
