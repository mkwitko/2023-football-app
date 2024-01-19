import React from 'react'
import { Form, Schema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Auth from '../../../../../services/Auth'
import Classes from '../../../../../classes'
import Navigation from '../../../../../services/Navigation'
import { createDateFromNow } from 'src/utils/DateUtils'

export default function RegisterForm() {
  const { signUp } = Auth()
  const { user } = Classes()
  const { navigateTo } = Navigation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(Schema),
  })

  const submit = async ({ email, password, confirmPassword }: Form) => {
    const res = await signUp(email, password, confirmPassword)
    if (res?.result) {
      await user.insert(
        {
          id: res?.result?.user.uid,
          email,
          createdAt: createDateFromNow(),
        },
        user.collection,
        res?.result?.user.uid,
      )
      navigateTo('/home')
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    submit,
  }
}
