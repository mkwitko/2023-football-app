import { z } from 'zod'

export const Schema = z
  .object({
    comment: z.string({
      required_error: 'Comentário é obrigatório',
    }),
    
  })

export type Form = z.infer<typeof Schema>
