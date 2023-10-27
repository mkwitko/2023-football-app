import { z } from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
]

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
  avatar: z.any(),
  avatarChanged: z.boolean(),
  access_token: z.string()
}).superRefine((data, ctx) => {
    if (data.avatar && data.avatar !== '') {
      if (data.avatar && typeof data.avatar !== 'string') {
        if (data.avatar && data.avatar.size > MAX_FILE_SIZE) {
          ctx.addIssue({
            code: 'custom',
            message: 'Imagem muito grande',
            path: ['imagem'],
          })
        }

        if (data.avatar && !ALLOWED_FILE_TYPES.includes(data.avatar.type)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Tipo de arquivo não permitido',
            path: ['imagem'],
          })
        }
      }
    }
  })

export type Form = z.infer<typeof Schema>;
