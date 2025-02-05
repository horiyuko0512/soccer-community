"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import {
  useUserQuery,
  useUpdateUserMutation,
  useParticipationsByUserIdQuery,
  useMatchesByCreatorIdQuery,
  useUpdateParticipationMutation,
  ParticipationStatus,
} from "@/graphql/generated/graphql"
import { formatEventDuration } from "@/lib/utils"
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
import { toast } from "sonner"
import { Loader } from "lucide-react"

const status = {
  approved: "承認済み",
  cancelled: "キャンセル済み",
  pending: "承認待ち",
  rejected: "却下済み",
}

const My = () => {
  const router = useRouter()
  const { data: userData, loading: userLoading, error: userError } = useUserQuery()
  const {
    data: participationsData,
    error: participationsError,
    loading: participationsLoading,
  } = useParticipationsByUserIdQuery({
    skip: !userData?.user,
  })
  const {
    data: matchesData,
    error: matchesError,
    loading: matchesLoading,
  } = useMatchesByCreatorIdQuery({
    skip: !participationsData?.participationsByUserId,
  })

  const [updateUserMutation, { error: userUpdateError, loading: userUpdateLoading }] = useUpdateUserMutation({
    onCompleted: (data) => {
      if(data?.updateUser) {
        setIsEditing(false)
        toast.success("プロフィールを更新しました")
      }
    },
  })
  const [updateParticipationMutation, { error: cancelError, loading: cancelLoading }] = useUpdateParticipationMutation({
    onCompleted: (data) => {
      if(data?.updateParticipation) {
        setShowCancelDialog(false)
        toast.success("参加をキャンセルしました")
      }
    },
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState({
    nickname: userData?.user?.nickname || "",
    introduction: userData?.user?.introduction || "",
  })

  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [selectedParticipationId, setSelectedParticipationId] = useState<string | null>(null)

  useEffect(() => {
    if (userUpdateError || cancelError) {
      toast.error("再度実行してください")
    }
  }, [userUpdateError, cancelError])

  if (userLoading || participationsLoading || matchesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-gray-900">Loading...</p>
      </div>
    )
  }

  if (userError || participationsError || matchesError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-gray-900">
          エラーが生じました。再度お試しください。
        </p>
      </div>
    )
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditedProfile({
      nickname: userData?.user?.nickname || "",
      introduction: userData?.user?.introduction || "",
    })
  }

  const handleSave = async () => {
    await updateUserMutation({
      variables: {
        input: {
          nickname: editedProfile.nickname,
          introduction: editedProfile.introduction,
        },
      },
    })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedProfile({
      nickname: userData?.user?.nickname || "",
      introduction: userData?.user?.introduction || "",
    })
  }

  const handleCancelParticipation = (participationId: string) => {
    setSelectedParticipationId(participationId)
    setShowCancelDialog(true)
  }

  const confirmCancelParticipation = async () => {
    if (!selectedParticipationId) return
    await updateParticipationMutation({
      variables: {
        id: selectedParticipationId,
        input: {
          status: ParticipationStatus.Cancelled,
        },
      },
    })
  }

  return (
    <>
      <div className="container mx-auto px-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-sky-900">プロフィール</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-sky-700 mb-1">ニックネーム</h3>
                    <Input
                      value={editedProfile.nickname}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          nickname: e.target.value,
                        })
                      }
                      className="max-w-md"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-sky-700 mb-1">自己紹介</h3>
                    <Textarea
                      value={editedProfile.introduction}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          introduction: e.target.value,
                        })
                      }
                      className="max-w-md"
                      rows={4}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSave}
                      className="bg-sky-500 hover:bg-sky-600 text-white"
                      disabled={userUpdateLoading}
                    >
                      {userUpdateLoading ? (
                        <Loader className="animate-spin" />
                      ) : "保存"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                    >
                      キャンセル
                    </Button>
                    {userUpdateError && (
                      <p className="text-red-500 text-sm flex justify-center">エラーが発生して、編集に失敗しました</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-sky-700 mb-1">ニックネーム</h3>
                    <p>{userData?.user?.nickname}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-sky-700 mb-1">自己紹介</h3>
                    <p>{userData?.user?.introduction}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleEdit}
                  >
                    プロフィールを編集
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs
          defaultValue="applied"
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="applied">応募した試合</TabsTrigger>
            <TabsTrigger value="created">作成した試合</TabsTrigger>
          </TabsList>
          <TabsContent value="applied">
            <div className="space-y-4 mt-4">
              {participationsData?.participationsByUserId.map((participation) => (
                <Card key={participation.id}>
                  <CardContent
                    className="p-4"
                    onClick={() => router.push(`/matches/${participation.match.id}`)}
                  >
                    <h3 className="font-medium mb-2">{participation.match.title}</h3>
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-600">
                        {formatEventDuration(
                          participation.match.startAt,
                          participation.match.endAt,
                        )}
                      </p>
                      <p className="text-sm text-gray-600">{participation.match.location}</p>
                    </div>
                    <p className="text-sm text-sky-600 mt-2">{status[participation.status]}</p>
                    {participation.status !== "cancelled" && participation.status !== "rejected" && (
                      <Button
                        variant="outline"
                        className="mt-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCancelParticipation(participation.id)
                        }}
                      >
                        キャンセル
                      </Button>
                    )}
                    {cancelError && (
                      <p className="text-red-500 text-sm flex justify-center">エラーが発生して、キャンセルに失敗しました</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="created">
            <div className="space-y-4 mt-4">
              {matchesData?.matchesByCreatorId.map((match) => (
                <Card key={match.id}>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{match.title}</h3>
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-600">
                        {formatEventDuration(match.startAt, match.endAt)}
                      </p>
                      <p className="text-sm text-gray-600">{match.location}</p>
                      <div className="mt-2">
                        <Button
                          variant="outline"
                          className="text-sm text-white bg-sky-500 hover:bg-sky-600"
                          onClick={() => router.push(`/management/${match.id}`)}
                        >
                          管理する
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* キャンセル確認ダイアログ */}
      <AlertDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
      >
        <AlertDialogContent className="sm:max-w-[80%] w-[80%] md:max-w-[610px] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>参加をキャンセルしますか？</AlertDialogTitle>
            <AlertDialogDescription>この操作は取り消すことができません。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>戻る</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelParticipation}
              className="bg-red-500 hover:bg-red-600"
              disabled={cancelLoading}
            >
              {cancelLoading ? (
                <Loader className="animate-spin" />
              ) : "実行する"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default My
