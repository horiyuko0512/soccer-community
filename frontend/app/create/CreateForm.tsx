"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MatchLevel, useCreateMatchMutation } from "@/graphql/generated/graphql"
import { createMatchSchema, CreateMatchFormValues } from "./schema"
import { useRouter } from "next/navigation"
import { formatDateTimeToISO } from "@/lib/utils"
import { Loader } from "lucide-react"

type FormErrors = {
  [K in keyof CreateMatchFormValues]?: string
}

const CreateForm = () => {
  const [formData, setFormData] = useState<CreateMatchFormValues>({
    title: "",
    date: "",
    startAt: "",
    endAt: "",
    location: "",
    level: MatchLevel.Beginner,
    participants: "",
    fee: "",
    notes: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [createSuccessful, setCreateSuccessful] = useState(false)
  const [createMatchMutation, { loading, error }] = useCreateMatchMutation({
    onCompleted: (data) => {
      if (data?.createMatch) {
        console.log("試合作成成功:", data.createMatch)
        setCreateSuccessful(true)
      }
    },
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleLevelChange = (level: MatchLevel) => {
    setFormData((prev) => ({ ...prev, level }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationResult = createMatchSchema.safeParse(formData)
    if (!validationResult.success) {
      const validationErrors: FormErrors = {}
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) validationErrors[err.path[0] as keyof CreateMatchFormValues] = err.message
      })
      setErrors(validationErrors)
      return
    }

    setErrors({})

    try {
      const { date, ...formDataWithoutDate } = formData
      const formattedStartAt = formatDateTimeToISO(date, formData.startAt)
      const formattedEndAt = formatDateTimeToISO(date, formData.endAt)


      await createMatchMutation({
        variables: {
          input: {
            ...formDataWithoutDate,
            startAt: formattedStartAt,
            endAt: formattedEndAt,
            participants: parseInt(formData.participants, 10),
            fee: parseInt(formData.fee, 10),
            creatorID: "",
          },
        },
      })
      router.push("/matches")
    } catch (err) {
      console.error("試合作成エラー:", err)
    }
  }

  const levelOptions = [
    { id: MatchLevel.Beginner, label: "初級" },
    { id: MatchLevel.Intermediate, label: "中級" },
    { id: MatchLevel.Advanced, label: "上級" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-sky-900">試合情報入力</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <Label htmlFor="title">タイトル</Label>
            <Input
              id="title"
              placeholder="例：エンジョイフットサル"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">開催日</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="startAt">開始時間</Label>
            <Input
              id="startAt"
              type="time"
              value={formData.startAt}
              onChange={handleChange}
            />
            {errors.startAt && <p className="text-red-500 text-sm">{errors.startAt}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="endAt">終了時間</Label>
            <Input
              id="endAt"
              type="time"
              value={formData.endAt}
              onChange={handleChange}
            />
            {errors.endAt && <p className="text-red-500 text-sm">{errors.endAt}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">場所</Label>
            <Input
              id="location"
              placeholder="例：渋谷区スポーツセンター"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>

          <div className="space-y-2">
            <Label>レベル</Label>
            <div className="grid grid-cols-3 gap-2">
              {levelOptions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLevelChange(item.id)}
                  className={`
                    px-4 py-2 rounded-md text-sm border
                    transition-all duration-200
                    ${
                      formData.level === item.id
                        ? "border-sky-500 bg-sky-50 text-sky-700"
                        : "border-gray-300 bg-white hover:bg-gray-50"
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {errors.level && <p className="text-red-500 text-sm">{errors.level}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="participants">募集人数</Label>
            <Input
              id="participants"
              type="number"
              value={formData.participants}
              onChange={handleChange}
              placeholder="例：4"
            />
            {errors.participants && <p className="text-red-500 text-sm">{errors.participants}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fee">参加費 (円)</Label>
            <Input
              id="fee"
              type="number"
              value={formData.fee}
              onChange={handleChange}
              placeholder="例：1000"
            />
            {errors.fee && <p className="text-red-500 text-sm">{errors.fee}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">備考</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="持ち物や注意事項など"
            />
            {errors.notes && <p className="text-red-500 text-sm">{errors.notes}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600"
            disabled={loading || createSuccessful}
          >
            {loading ? (
              <Loader className="animate-spin" />
            ) : createSuccessful ? (
              "作成完了"
            ) : (
              "試合を作成する"
            )}
          </Button>
          {error && (
            <p className="text-red-500 text-sm">エラーが発生しました。もう一度お試しください。</p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateForm
