"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useMatchesQuery } from "@/graphql/generated/graphql"
import { formatEventDuration } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

const levels = [
  { id: "beginner", label: "初級" },
  { id: "intermediate", label: "中級" },
  { id: "advanced", label: "上級" },
]

const MatchesList = () => {
  const router = useRouter()
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [date, setDate] = useState("")
  const [startAt, setStartAt] = useState("")
  const [endAt, setEndAt] = useState("")
  const [location, setLocation] = useState("")
  const [level, setLevel] = useState("")
  const [participantsMin, setParticipantsMin] = useState("")
  const [participantsMax, setParticipantsMax] = useState("")
  const [feeMin, setFeeMin] = useState("")
  const [feeMax, setFeeMax] = useState("")
  const [isApplied, setIsApplied] = useState(false)

  const { data, loading, error } = useMatchesQuery()

  const handleSearch = () => {
    console.log({ date, location, level })
    if (isApplied) {
      console.log("応募中の試合のみ表示")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-gray-900">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-gray-900">
          エラーが生じました。再度お試しください。
        </p>
      </div>
    )
  }

  if (data!.matches!.length === 0) {
    ;<div className="flex justify-center items-center h-64">
      <p className="text-lg font-medium text-gray-900">試合がまだありません。</p>
    </div>
  }

  return (
    <>
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Basic Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">開催日</label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">開始時間</label>
                <Input
                  type="time"
                  value={startAt}
                  onChange={(e) => setStartAt(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">終了時間</label>
                <Input
                  type="time"
                  value={endAt}
                  onChange={(e) => setEndAt(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Advanced Search Toggle Button */}
            <div className="flex justify-center">
              <Button
                variant="ghost"
                className="text-sky-600 hover:text-sky-700"
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              >
                {showAdvancedSearch ? (
                  <div className="flex items-center gap-2">
                    詳細検索を閉じる
                    <ChevronUp className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    詳細検索
                    <ChevronDown className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </div>

            {/* Advanced Search Fields */}
            {showAdvancedSearch && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700">場所</label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="試合の場所を入力"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">レベル</label>
                  <div className="grid grid-cols-3 gap-2">
                    {levels.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setLevel(item.id)}
                        className={`
                          px-4 py-2 rounded-md text-sm border
                          transition-all duration-200
                          ${
                            level === item.id
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">参加者数</label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={participantsMin}
                      onChange={(e) => setParticipantsMin(e.target.value)}
                      placeholder="下限（例）3"
                      className="w-full"
                    />
                    <span className="text-gray-500">～</span>
                    <Input
                      value={participantsMax}
                      onChange={(e) => setParticipantsMax(e.target.value)}
                      placeholder="上限（例）6"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">料金 (円)</label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={feeMin}
                      onChange={(e) => setFeeMin(e.target.value)}
                      placeholder="下限（例）500"
                      className="w-full"
                    />
                    <span className="text-gray-500">～</span>
                    <Input
                      value={feeMax}
                      onChange={(e) => setFeeMax(e.target.value)}
                      placeholder="上限（例）1000"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="isApplied"
                    checked={isApplied}
                    onCheckedChange={(checked) => setIsApplied(checked === true)}
                  />
                  <label
                    htmlFor="isApplied"
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    応募中の試合のみ表示
                  </label>
                </div>
              </div>
            )}

            <Button
              onClick={handleSearch}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white"
            >
              検索する
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {data?.matches?.map((match) => (
          <Card
            key={match.id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-sky-900">{match.title}</h3>
                <span className="bg-sky-100 text-sky-800 px-2 py-1 rounded-full text-sm">
                  {match.isApplied ? "応募中" : "停止中"}
                </span>
              </div>
              <div className="space-y-2 text-sm text-sky-700">
                <p>{formatEventDuration(match.startAt, match.endAt)}</p>
                <p>{match.location}</p>
                <p>レベル: {levels.find((item) => item.id === match.level)?.label}</p>
              </div>
              <div className="mt-4">
                <Button
                  className="w-full bg-sky-500 hover:bg-sky-600"
                  onClick={() => router.push(`/matches/${match.id}`)}
                >
                  詳細を見る
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default MatchesList
