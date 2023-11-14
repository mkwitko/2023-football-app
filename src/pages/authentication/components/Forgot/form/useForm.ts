
import { Form, Schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Auth from '../../../../../services/Auth';
import Toast from 'src/services/Toast';

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
    Toast().success('Se o seu e-mail estiver no banco de dados, você receberá um e-mail com as instruções para redefinir sua senha.');
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    submit,
  };
}
