import { Form, Schema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function LiveForm() {

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Form>({
    resolver: zodResolver(Schema),
    defaultValues: {
      comment: ''
    },
  })

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,
    changeValue: setValue,
    watch,
  }
}
