// schema.ts
import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .email("正しいメールアドレスを入力してください")
    .nonempty("メールアドレスは必須です"),
  password: z
    .string()
    .min(6, "パスワードは6文字以上である必要があります")
    .nonempty("パスワードは必須です"),
})

export type LoginFormValues = z.infer<typeof loginSchema>
