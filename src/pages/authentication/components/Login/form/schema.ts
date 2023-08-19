import { z } from 'zod';

export const Schema = z.object({
  email: z
    .string({
      required_error: 'E-mail é obrigatório',
    })
    .email('E-mail inválido'),
  password: z.string({
    required_error: 'Insira uma senha',
  }),
});

export type Form = z.infer<typeof Schema>;
