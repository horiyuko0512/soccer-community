"use client"

import React, { useState, useEffect } from "react"
import {
  useMatchQuery,
  useUpdateMatchMutation,
  useParticipationsByMatchIdQuery,
  useUpdateParticipationMutation,
  MatchLevel,
  ParticipationStatus,
} from "@/graphql/generated/graphql"
import { updateMatchSchema, UpdateMatchFormValues } from "./schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { formatDateToISO, formatToJapaneseDateTime } from "@/lib/utils"

type MatchProps = {
  id: string
}

type FormErrors = {
  [K in keyof UpdateMatchFormValues]?: string
}

const levels = [
  { id: MatchLevel.Beginner, label: "初級" },
  { id: MatchLevel.Intermediate, label: "中級" },
  { id: MatchLevel.Advanced, label: "上級" },
]

const status = {
  approved: "承認済み",
  cancelled: "キャンセル済み",
  pending: "承認待ち",
  rejected: "拒否済み",
}

const Management = ({ id }: MatchProps) => {
  const {
    data: matchData,
    loading: matchLoading,
    error: matchError,
  } = useMatchQuery({ variables: { id } })
  const {
    data: participationsData,
    loading: participationsLoading,
    error: participationsError,
  } = useParticipationsByMatchIdQuery({
    variables: { matchID: id },
    skip: !matchData?.matche,
  })
  const [updateMatchMutation, { error: matchMutationError }] = useUpdateMatchMutation()
  const [updateParticipationMutation, { error: participationMutationError }] =
    useUpdateParticipationMutation()

  const [formData, setFormData] = useState<UpdateMatchFormValues>({
    title: "",
    date: "",
    location: "",
    level: MatchLevel.Beginner,
    participants: "",
    fee: "",
    notes: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isEditing, setIsEditing] = useState(false)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [selectedParticipationId, setSelectedParticipationId] = useState<string | null>(null)

  useEffect(() => {
    if (matchData?.matche) {
      const match = matchData.matche
      setFormData({
        title: match.title,
        date: match.date,
        location: match.location,
        level: match.level,
        participants: match.participants.toString(),
        fee: match.fee.toString(),
        notes: match.notes,
      })
    }
  }, [matchData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleLevelChange = (level: MatchLevel) => {
    setFormData((prev) => ({ ...prev, level }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationResult = updateMatchSchema.safeParse(formData)
    if (!validationResult.success) {
      const validationErrors: FormErrors = {}
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) validationErrors[err.path[0] as keyof UpdateMatchFormValues] = err.message
      })
      setErrors(validationErrors)
      return
    }

    setErrors({})

    try {
      await updateMatchMutation({
        variables: {
          id,
          input: {
            ...formData,
            participants: parseInt(formData.participants, 10),
            fee: parseInt(formData.fee, 10),
          },
        },
      })
      setIsEditing(false)
    } catch (err) {
      console.error("試合更新エラー:", err)
    }
  }

  const handleApprove = (participationId: string) => {
    setSelectedParticipationId(participationId)
    setShowApproveDialog(true)
  }

  const handleReject = (participationId: string) => {
    setSelectedParticipationId(participationId)
    setShowRejectDialog(true)
  }

  const confirmApprove = async () => {
    if (!selectedParticipationId) return
    try {
      await updateParticipationMutation({
        variables: {
          id: selectedParticipationId,
          input: {
            status: ParticipationStatus.Approved,
          },
        },
      })
      setShowApproveDialog(false)
    } catch (err) {
      console.error("承認エラー:", err)
    }
  }

  const confirmReject = async () => {
    if (!selectedParticipationId) return
    try {
      await updateParticipationMutation({
        variables: {
          id: selectedParticipationId,
          input: {
            status: ParticipationStatus.Rejected,
          },
        },
      })
      setShowRejectDialog(false)
    } catch (err) {
      console.error("却下エラー:", err)
    }
  }

  if (matchLoading || participationsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-gray-900">Loading...</p>
      </div>
    )
  }

  if (matchError || participationsError || matchMutationError || participationMutationError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-gray-900">エラーが生じました、再度お試しください</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <Card className="mb-6">
        {isEditing ? (
          <>
            <CardHeader>
              <CardTitle className="text-xl text-sky-900">試合情報編集</CardTitle>
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
                    value={formData.title}
                    onChange={handleChange}
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">開催日時</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={formatDateToISO(formData.date)}
                    onChange={handleChange}
                  />
                  {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">場所</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                </div>

                <div className="space-y-2">
                  <Label>レベル</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {levels.map((level) => (
                      <button
                        key={level.id}
                        type="button"
                        onClick={() => handleLevelChange(level.id)}
                        className={`
                        px-4 py-2 rounded-md text-sm border
                        transition-all duration-200
                        ${formData.level === level.id ? "border-sky-500 bg-sky-50 text-sky-700" : "border-gray-300 bg-white hover:bg-gray-50"}
                      `}
                      >
                        {levels.find((item) => item.id === level.id)?.label}
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
                  />
                  {errors.participants && (
                    <p className="text-red-500 text-sm">{errors.participants}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fee">参加費</Label>
                  <Input
                    id="fee"
                    type="number"
                    value={formData.fee}
                    onChange={handleChange}
                  />
                  {errors.fee && <p className="text-red-500 text-sm">{errors.fee}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">備考</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                  {errors.notes && <p className="text-red-500 text-sm">{errors.notes}</p>}
                </div>

                <div className="flex space-x-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-sky-500 hover:bg-sky-600"
                  >
                    保存
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="flex-1"
                  >
                    キャンセル
                  </Button>
                </div>
              </form>
            </CardContent>
          </>
        ) : (
          <>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-bold text-sky-900">{matchData?.matche.title}</h2>
                  <p className="text-sm text-sky-700 mt-1">
                    {formatToJapaneseDateTime(matchData?.matche.date)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{matchData?.matche.location}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    レベル: {levels.find((item) => item.id === matchData?.matche.level)?.label}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">募集人数: {formData.participants}人</p>
                  <p className="text-sm text-gray-600">参加費: {formData.fee}円</p>
                  <p className="text-sm text-gray-600 mt-1">{formData.notes}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="ml-4"
                >
                  編集
                </Button>
              </div>
            </CardContent>
          </>
        )}
      </Card>

      <div className="space-y-4 mt-8">
        {participationsData?.participationsByMatchId.map((participation) => (
          <Card key={participation.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{participation.user.nickname}</h3>
                  <p className="text-sm text-gray-600">
                    ステータス: {status[participation.status]}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-red-50 text-red-600 border-red-200"
                    onClick={() => handleReject(participation.id)}
                    disabled={participation.status !== "pending"}
                  >
                    却下
                  </Button>
                  <Button
                    className="bg-sky-500 hover:bg-sky-600"
                    onClick={() => handleApprove(participation.id)}
                    disabled={participation.status !== "pending"}
                  >
                    承認
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 承認確認ダイアログ */}
      <AlertDialog
        open={showApproveDialog}
        onOpenChange={setShowApproveDialog}
      >
        <AlertDialogContent className="sm:max-w-[80%] w-[80%] md:max-w-[610px] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>参加を承認しますか？</AlertDialogTitle>
            <AlertDialogDescription>この操作は取り消すことができません。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmApprove}
              className="bg-sky-500 hover:bg-sky-600"
            >
              承認する
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 却下確認ダイアログ */}
      <AlertDialog
        open={showRejectDialog}
        onOpenChange={setShowRejectDialog}
      >
        <AlertDialogContent className="sm:max-w-[80%] w-[80%] md:max-w-[610px] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>参加を却下しますか？</AlertDialogTitle>
            <AlertDialogDescription>この操作は取り消すことができません。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmReject}
              className="bg-red-500 hover:bg-red-600"
            >
              却下する
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Management
