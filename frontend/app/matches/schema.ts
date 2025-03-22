import { MatchLevel } from "@/graphql/generated/graphql"
import { z } from "zod"

export const searchMatchSchema = z
  .object({
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    location: z.string(),
    level: z.union([z.nativeEnum(MatchLevel), z.literal("")]),
    participantsMin: z.union([
      z.string().regex(/^\d+$/, "参加者数は数値で入力してください"),
      z.literal(""),
    ]),
    participantsMax: z.union([
      z.string().regex(/^\d+$/, "参加者数は数値で入力してください"),
      z.literal(""),
    ]),
    feeMin: z.union([z.string().regex(/^\d+$/, "参加費は数値で入力してください"), z.literal("")]),
    feeMax: z.union([z.string().regex(/^\d+$/, "参加費は数値で入力してください"), z.literal("")]),
    isApplied: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.startTime && !data.endTime) return false
      if (data.endTime && !data.startTime) return false
      return true
    },
    {
      message: "開始時間と終了時間は両方入力するか、両方入力しないでください",
      path: ["startTime", "endTime"],
    },
  )

export type SearchMatchFormValues = z.infer<typeof searchMatchSchema>
