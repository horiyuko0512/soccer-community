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
import { formatDateTimeToISO, formatEventDetails, formatEventDuration } from "@/lib/utils"
import { toast } from "sonner"
import { Loader } from "lucide-react"

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
  rejected: "却下済み",
}

const Management = ({ id }: MatchProps) => {
  const [errors, setErrors] = useState<FormErrors>({})
  const [isEditing, setIsEditing] = useState(false)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [selectedParticipationId, setSelectedParticipationId] = useState<string | null>(null)

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
    skip: !matchData?.match,
  })
  const [updateMatchMutation, { error: matchUpdateError, loading: matchUpdateLoading }] =
    useUpdateMatchMutation({
      onCompleted: (data) => {
        if (data?.updateMatch) {
          setIsEditing(false)
          toast.success("試合情報を更新しました")
        }
      },
    })
  const [
    updateParticipationMutation,
    { error: participationUpdateError, loading: participationUpdateLoading },
  ] = useUpdateParticipationMutation({
    onCompleted: (data) => {
      if (data?.updateParticipation) {
        setShowApproveDialog(false)
        setShowRejectDialog(false)
        toast.success("承認却下に成功しました")
      }
    },
  })

  const [formData, setFormData] = useState<UpdateMatchFormValues>({
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

  useEffect(() => {
    if (matchData?.match) {
      const match = matchData.match
      const eventDetails = formatEventDetails(match.startAt, match.endAt)
      setFormData({
        title: match.title,
        date: eventDetails.date,
        startAt: eventDetails.startTime,
        endAt: eventDetails.endTime,
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

    const { date, ...formDataWithoutDate } = formData
    const formattedStartAt = formatDateTimeToISO(date, formData.startAt)
    const formattedEndAt = formatDateTimeToISO(date, formData.endAt)

    await updateMatchMutation({
      variables: {
        id,
        input: {
          ...formDataWithoutDate,
          startAt: formattedStartAt,
          endAt: formattedEndAt,
          participants: parseInt(formData.participants, 10),
          fee: parseInt(formData.fee, 10),
        },
      },
    })
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
    await updateParticipationMutation({
      variables: {
        id: selectedParticipationId,
        input: {
          status: ParticipationStatus.Approved,
        },
      },
    })
  }

  const confirmReject = async () => {
    if (!selectedParticipationId) return
    await updateParticipationMutation({
      variables: {
        id: selectedParticipationId,
        input: {
          status: ParticipationStatus.Rejected,
        },
      },
    })
  }

  useEffect(() => {
    if (matchUpdateError || participationUpdateError) {
      toast.error("再度実行してください")
    }
  }, [matchUpdateError, participationUpdateError])

  if (matchLoading || participationsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-gray-900">Loading...</p>
      </div>
    )
  }

  if (matchError || participationsError) {
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
                    {matchUpdateLoading ? <Loader className="animate-spin" /> : "保存"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="flex-1"
                  >
                    キャンセル
                  </Button>
                  {matchUpdateError && (
                    <p className="text-red-500 text-sm flex justify-center">
                      エラーが発生して、編集に失敗しました
                    </p>
                  )}
                </div>
              </form>
            </CardContent>
          </>
        ) : (
          <>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-bold text-sky-900">{matchData?.match.title}</h2>
                  <p className="text-sm text-sky-700 mt-1">
                    {formatEventDuration(matchData?.match.startAt, matchData?.match.endAt)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{matchData?.match.location}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    レベル: {levels.find((item) => item.id === matchData?.match.level)?.label}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">募集人数: {formData.participants}人</p>
                  <p className="text-sm text-gray-600">参加費: {formData.fee}円</p>
                  <p className="text-sm text-gray-600 mt-1">{formData.notes}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-red-50 text-red-600 border-red-200"
                    onClick={() => {}}
                  >
                    停止
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="ml-4"
                  >
                    編集
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>

      <div className="space-y-4 mt-8">
        {participationsData?.participationsByMatchId.length === 0 ? (
          <p className="text-center text-gray-600 pt-3">まだ申請がありません</p>
        ) : (
          participationsData?.participationsByMatchId.map((participation) => (
            <Card key={participation.id}>
              <CardContent className="p-6">
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
                  {participationUpdateError && (
                    <p className="text-red-500 text-sm flex justify-center">
                      エラーが発生して、承認却下に失敗しました
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
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
              {participationUpdateLoading ? <Loader className="animate-spin" /> : "承認する"}
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
              {participationUpdateLoading ? <Loader className="animate-spin" /> : "却下する"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Management
