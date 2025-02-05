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
import {
  ParticipationStatus,
  useCreateParticipationMutation,
  useMatchQuery,
  useParticipationByUserIdAndMatchIdQuery,
} from "@/graphql/generated/graphql"
import { formatEventDuration } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader } from "lucide-react"

type MatchProps = {
  id: string
}

const levels = [
  { id: "beginner", label: "初級" },
  { id: "intermediate", label: "中級" },
  { id: "advanced", label: "上級" },
]

const Match = ({ id }: MatchProps) => {
  const router = useRouter()
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [participationSuccessful, setParticipationSuccessful] = useState(false)

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

  const [createParticipation, { error: createParticipationError, loading: createParticipationLoading }] = useCreateParticipationMutation({
    onCompleted: (data) => {
      if (data?.createParticipation){
        setShowApplyDialog(false)
        toast.success("応募に成功しました")
        setParticipationSuccessful(true)
        router.push("/my")
      }
    },
  })

  useEffect(() => {
    if (createParticipationError) {
      toast.error("再度実行してください")
    }
  }, [createParticipationError])

  if (loading || participationLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-gray-900">Loading...</p>
      </div>
    )
  }
  if (error || participationError) {
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
    await createParticipation({
      variables: {
        input: {
          matchID: match.id,
          userID: "",
          status: ParticipationStatus.Pending,
        },
      },
    })
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
                isAlreadyApplied || !match.isApplied || participationSuccessful || match.creatorID === "true"
              }
              onClick={isAlreadyApplied ? undefined : handleApply}
            >
              {match.creatorID === "true"
                ? "あなたはこの試合の作成者です"
                : isAlreadyApplied
                  ? "この試合は応募済みです"
                  : participationSuccessful
                    ? "ページを遷移中です"
                    : match.isApplied
                      ? "この試合に応募する"
                      : "この応募は停止中です"}
            </Button>
            {createParticipationError && (
              <p className="text-red-500 text-sm flex justify-center">エラーが発生して、応募に失敗しました</p>
            )}
          </div>
        </CardContent>
      </Card>

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
              disabled={createParticipationLoading}
            >
              {createParticipationLoading ? (
                <Loader className="animate-spin" />
              ) : "応募する"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Match
