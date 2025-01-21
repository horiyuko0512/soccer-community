import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("正しいメールアドレスを入力してください").nonempty("メールアドレスは必須です"),
  password: z.string().min(8, "パスワードは8文字以上である必要があります").nonempty("パスワードは必須です"),
  confirmPassword: z.string().min(8, "パスワード（確認）は8文字以上である必要があります").nonempty("パスワード（確認）は必須です"),
  nickname: z.string().max(20, "ニックネームは20文字以内で入力してください").nonempty("ニックネームは必須です"),
  introduction: z.string().max(500, "自己紹介は500文字以内で入力してください").nonempty("自己紹介は必須です"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "パスワードが一致しません",
  path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;