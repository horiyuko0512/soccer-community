import { MatchLevel } from "@/graphql/generated/graphql"
import { z } from "zod"

export const createMatchSchema = z.object({
  title: z.string().nonempty("タイトルは必須です"),
  date: z.string().nonempty("開催日は必須です"),
  startAt: z.string().nonempty("開始時間は必須です"),
  endAt: z.string().nonempty("終了時間は必須です"),
  location: z.string().nonempty("場所は必須です"),
  level: z.nativeEnum(MatchLevel, { errorMap: () => ({ message: "レベルを選択してください" }) }),
  participants: z
    .string()
    .regex(/^\d+$/, "募集人数は数値で入力してください")
    .nonempty("募集人数は必須です"),
  fee: z.string().regex(/^\d+$/, "参加費は数値で入力してください").nonempty("参加費は必須です"),
  notes: z.string().max(500, "備考は500文字以内で入力してください").nonempty("備考は必須です"),
})

export type CreateMatchFormValues = z.infer<typeof createMatchSchema>
