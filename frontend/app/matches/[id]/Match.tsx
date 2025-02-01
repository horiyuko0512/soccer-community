"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Alert } from "@/components/ui/alert"
import {
  ParticipationStatus,
  useCreateParticipationMutation,
  useMatchQuery,
  useParticipationByUserIdAndMatchIdQuery,
} from "@/graphql/generated/graphql"
import { formatEventDuration } from "@/lib/utils"
import { useState } from "react"
import { useRouter } from "next/navigation"

type MatchProps = {
  id: string
}

const levels = [
  { id: "beginner", label: "初級" },
  { id: "intermediate", label: "中級" },
  { id: "advanced", label: "上級" },
]

const Match = ({ id }: MatchProps) => {
  const { data, loading, error } = useMatchQuery({
    variables: { id },
  })

  const {
    data: participationData,
    loading: participationLoading,
    error: participationError,
  } = useParticipationByUserIdAndMatchIdQuery({
    variables: { matchID: id },
    skip: !data?.match,
  })

  const [createParticipation, { error: mutationError }] = useCreateParticipationMutation()

  const router = useRouter()
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [isApplying, setIsApplying] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  if (loading || participationLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-gray-900">Loading...</p>
      </div>
    )
  }
  if (error || participationError || mutationError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-gray-900">エラーが生じました、再度お試しください</p>
      </div>
    )
  }
  if (!data?.match) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-gray-900">試合情報がありません</p>
      </div>
    )
  }

  const match = data.match
  const formattedDate = formatEventDuration(match.startAt, match.endAt)
  const isAlreadyApplied = participationData?.participationByUserIdAndMatchId

  const handleApply = () => {
    setShowApplyDialog(true)
  }

  const confirmApply = async () => {
    console.log("応募処理を実行")
    setIsApplying(true)
    setErrorMessage(null)
    try {
      await createParticipation({
        variables: {
          input: {
            matchID: match.id,
            userID: "",
            status: ParticipationStatus.Pending,
          },
        },
      })
      setShowApplyDialog(false)
    } catch (err) {
      console.error("応募エラー:", err)
      setErrorMessage("応募に失敗しました。もう一度お試しください。")
    } finally {
      setIsApplying(false)
      router.push("/my")
    }
  }

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-sky-900">{match.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-sky-700 mb-1">開催日時</h3>
              <p>{formattedDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-sky-700 mb-1">場所</h3>
              <p>{match.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-sky-700 mb-1">レベル</h3>
              <p>{levels.find((item) => item.id === match.level)?.label}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-sky-700 mb-1">募集人数</h3>
              <p>{match.participants}人</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-sky-700 mb-1">参加費</h3>
              <p>{match.fee.toLocaleString()}円</p>
            </div>
            {match.notes && (
              <div>
                <h3 className="text-sm font-medium text-sky-700 mb-1">備考</h3>
                <p>{match.notes}</p>
              </div>
            )}
            <Button
              className={`w-full ${match.isApplied || !isAlreadyApplied ? "bg-sky-500 hover:bg-sky-600" : "bg-gray-500 cursor-not-allowed"}`}
              disabled={
                isAlreadyApplied || !match.isApplied || isApplying || match.creatorID === "true"
              }
              onClick={isAlreadyApplied ? undefined : handleApply}
            >
              {match.creatorID === "true"
                ? "あなたはこの試合の作成者です"
                : isAlreadyApplied
                  ? "この試合は応募済みです"
                  : isApplying
                    ? "応募中..."
                    : match.isApplied
                      ? "この試合に応募する"
                      : "この応募は停止中です"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* エラーメッセージ表示 */}
      {errorMessage && (
        <div className="mt-4">
          <Alert
            variant="destructive"
            className="text-red-600"
          >
            {errorMessage}
          </Alert>
        </div>
      )}

      {/* 応募確認ダイアログ */}
      <AlertDialog
        open={showApplyDialog}
        onOpenChange={setShowApplyDialog}
      >
        <AlertDialogContent className="sm:max-w-[80%] w-[80%] md:max-w-[610px] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>この試合に応募しますか？</AlertDialogTitle>
            <AlertDialogDescription>応募内容を今一度確認してください</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmApply}
              className="bg-sky-500 hover:bg-sky-600"
              disabled={isApplying}
            >
              {isApplying ? "応募中..." : "応募する"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Match
