import { z } from 'zod'

export const Schema = z.object({
  email: z
    .string({
      required_error: 'E-mail é obrigatório',
    })
    .email('E-mail inválido'),
})

export type Form = z.infer<typeof Schema>
