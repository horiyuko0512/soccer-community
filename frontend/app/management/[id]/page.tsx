"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/Header"
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
import { useRouter } from "next/navigation"

const ManagementPage = () => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [match, setMatch] = useState<{
    title: string
    date: string
    startTime: string
    endTime: string
    location: string
    level: "beginner" | "intermediate" | "advanced"
    capacity: number
    fee: number
    description: string
  }>({
    title: "エンジョイフットサル",
    date: "2023-12-31",
    startTime: "15:00",
    endTime: "17:00",
    location: "渋谷区スポーツセンター",
    level: "intermediate",
    capacity: 4,
    fee: 1000,
    description: "持ち物：運動靴、動きやすい服装",
  })

  const levelLabels = {
    beginner: "初級",
    intermediate: "中級",
    advanced: "上級",
  }

  const handleSave = () => {
    // ここでAPIを呼び出して保存処理を実行
    setIsEditing(false)
  }

  const handleApprove = () => {
    setShowApproveDialog(true)
  }

  const handleReject = () => {
    setShowRejectDialog(true)
  }

  const confirmApprove = () => {
    // ここでAPIを呼び出して承認処理を実行
    setShowApproveDialog(false)
  }

  const confirmReject = () => {
    // ここでAPIを呼び出して却下処理を実行
    setShowRejectDialog(false)
  }

  function setLevel(id: string) {
    setMatch((prevMatch) => ({
      ...prevMatch,
      level: id as "beginner" | "intermediate" | "advanced",
    }))
  }
  return (
    <div className="min-h-screen bg-sky-50 pb-8">
      <Header />
      <div className="flex justify-between items-center mb-4 mt-6 px-4">
        <h1 className="text-2xl font-bold text-gray-900">試合管理</h1>
        <Button
          className="bg-sky-500 hover:bg-sky-600 text-white"
          onClick={() => router.back()}
        >
          戻る
        </Button>
      </div>
      <div className="container mx-auto px-4">
        <Card className="mb-6">
          {isEditing ? (
            <>
              <CardHeader>
                <CardTitle className="text-xl text-sky-900">試合情報編集</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">タイトル</Label>
                    <Input
                      id="title"
                      value={match.title}
                      onChange={(e) => setMatch({ ...match, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">開催日</Label>
                    <Input
                      id="date"
                      type="date"
                      value={match.date}
                      onChange={(e) => setMatch({ ...match, date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">開始時間</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={match.startTime}
                        onChange={(e) => setMatch({ ...match, startTime: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">終了時間</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={match.endTime}
                        onChange={(e) => setMatch({ ...match, endTime: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">場所</Label>
                    <Input
                      id="location"
                      value={match.location}
                      onChange={(e) => setMatch({ ...match, location: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">レベル</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "beginner", label: "初級" },
                        { id: "intermediate", label: "中級" },
                        { id: "advanced", label: "上級" },
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => {
                            setMatch({
                              ...match,
                              level: item.id as "beginner" | "intermediate" | "advanced",
                            })
                            setLevel(item.id)
                          }}
                          className={`
                            px-4 py-2 rounded-md text-sm border
                            transition-all duration-200
                            ${
                              match.level === item.id
                                ? "border-sky-500 bg-sky-50 text-sky-700"
                                : "border-gray-300 bg-white hover:bg-gray-50"
                            }
                          `}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">募集人数</Label>
                    <Input
                      id="capacity"
                      type="number"
                      min="1"
                      value={match.capacity}
                      onChange={(e) => setMatch({ ...match, capacity: parseInt(e.target.value) })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fee">参加費</Label>
                    <Input
                      id="fee"
                      type="number"
                      min="0"
                      value={match.fee}
                      onChange={(e) => setMatch({ ...match, fee: parseInt(e.target.value) })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">備考</Label>
                    <Textarea
                      id="description"
                      value={match.description}
                      onChange={(e) => setMatch({ ...match, description: e.target.value })}
                      className="h-24"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      onClick={handleSave}
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
                    <h2 className="text-lg font-bold text-sky-900">{match.title}</h2>
                    <p className="text-sm text-sky-700 mt-1">
                      {match.date.replace(/-/g, "/")} {match.startTime}～{match.endTime}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">{match.location}</p>
                    <p className="text-sm text-gray-600 mt-1">レベル: {levelLabels[match.level]}</p>
                    <p className="text-sm text-gray-600 mt-1">募集人数: {match.capacity}人</p>
                    <p className="text-sm text-gray-600">参加費: {match.fee}円</p>
                    <p className="text-sm text-gray-600 mt-1">{match.description}</p>
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

        <div className="space-y-4">
          {[1, 2, 3].map((user) => (
            <Card key={user}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">山田太郎</h3>
                    <p className="text-sm text-gray-600">サッカー歴：5年</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="bg-white hover:bg-red-50 text-red-600 border-red-200"
                      onClick={() => handleReject()}
                    >
                      却下
                    </Button>
                    <Button
                      className="bg-sky-500 hover:bg-sky-600"
                      onClick={() => handleApprove()}
                    >
                      承認
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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

export default ManagementPage
