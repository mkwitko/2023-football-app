import { z } from 'zod';

export const Schema = z.object({
  username: z.string({
    required_error: 'Nome de usuário é obrigatório',
  }),
  email: z
    .string({
      required_error: 'E-mail é obrigatório',
    })
    .email('E-mail inválido'),
  youtubeEmail: z.string({
    required_error: 'E-mail é obrigatório',
  }),
  cpf: z.string({
    required_error: 'CPF é obrigatório',
  }),
  cellphone: z.string({
    required_error: 'Celular é obrigatório',
  }),
});

export type Form = z.infer<typeof Schema>;
