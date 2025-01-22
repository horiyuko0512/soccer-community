"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import Header from "@/components/Header"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

const MyPage = () => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    nickname: "サッカー好き太郎",
    introduction: "週末はよくサッカーをしています！",
  })
  const [editedProfile, setEditedProfile] = useState(profile)

  const handleEdit = () => {
    setIsEditing(true)
    setEditedProfile(profile)
  }

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    // ここで実際のAPI呼び出しを行う
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedProfile(profile)
  }

  return (
    <div className="pb-8">
      <Header />
      <div className="flex justify-between items-center mb-4 mt-6 px-4">
        <h1 className="text-2xl font-bold text-gray-900">MyPage</h1>
        <Button
          className="bg-sky-500 hover:bg-sky-600 text-white"
          onClick={() => router.back()}
        >
          戻る
        </Button>
      </div>
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
                    >
                      保存
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                    >
                      キャンセル
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-sky-700 mb-1">ニックネーム</h3>
                    <p>{profile.nickname}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-sky-700 mb-1">自己紹介</h3>
                    <p>{profile.introduction}</p>
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
              {[1, 2].map((match) => (
                <Card key={match}>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">エンジョイフットサル</h3>
                    <p className="text-sm text-gray-600">12月31日 15:00～17:00</p>
                    <p className="text-sm text-sky-600 mt-2">承認待ち</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="created">
            <div className="space-y-4 mt-4">
              {[1, 2].map((match) => (
                <Card key={match}>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">エンジョイフットサル</h3>
                    <p className="text-sm text-gray-600">12月31日 15:00～17:00</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-sky-600">応募者: 3人</p>
                      <Button
                        variant="outline"
                        className="text-sm"
                        onClick={() => router.push(`/management/${match}`)}
                      >
                        管理する
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default MyPage
