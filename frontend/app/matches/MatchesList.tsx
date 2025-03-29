"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { MatchLevel, useMatchesQuery, useSearchMatchesLazyQuery } from "@/graphql/generated/graphql"
import { formatDateTimeToISO, formatEventDuration } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { SearchMatchFormValues, searchMatchSchema } from "./schema"

const levels = [
  { id: MatchLevel.Beginner, label: "初級" },
  { id: MatchLevel.Intermediate, label: "中級" },
  { id: MatchLevel.Advanced, label: "上級" },
]

type FormErrors = {
  [K in keyof SearchMatchFormValues]?: string
}

const MatchesList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)

  const [formData, setFormData] = useState<SearchMatchFormValues>({
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    level: "",
    participantsMin: "",
    participantsMax: "",
    feeMin: "",
    feeMax: "",
    isApplied: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const { data: initialData, loading: initialLoading, error: initialError } = useMatchesQuery()
  const [searchMatches, { data: searchData, loading: searchLoading, error: searchError }] =
    useSearchMatchesLazyQuery()
  const [searchResults, setSearchResults] = useState(false)

  useEffect(() => {
    if (searchParams.size > 0) {
      const levelParam = searchParams.get("level") || ""
      let levelValue: "" | MatchLevel = ""
      if (
        levelParam === MatchLevel.Beginner ||
        levelParam === MatchLevel.Intermediate ||
        levelParam === MatchLevel.Advanced
      ) {
        levelValue = levelParam
      }
      const newFormData = {
        date: searchParams.get("date") || "",
        startTime: searchParams.get("startTime") || "",
        endTime: searchParams.get("endTime") || "",
        location: searchParams.get("location") || "",
        level: levelValue,
        participantsMin: searchParams.get("participantsMin") || "",
        participantsMax: searchParams.get("participantsMax") || "",
        feeMin: searchParams.get("feeMin") || "",
        feeMax: searchParams.get("feeMax") || "",
        isApplied: searchParams.get("isApplied") === "true",
      }
      setFormData(newFormData)
      if (
        newFormData.location ||
        newFormData.level ||
        newFormData.participantsMin ||
        newFormData.participantsMax ||
        newFormData.feeMin ||
        newFormData.feeMax ||
        newFormData.isApplied
      ) {
        setShowAdvancedSearch(true)
      }
      searchMatches({
        variables: {
          input: {
            date:
              newFormData.date !== "" ? formatDateTimeToISO(newFormData.date, "00:00") : undefined,
            startTime:
              newFormData.startTime !== ""
                ? formatDateTimeToISO("2000-01-01", newFormData.startTime)
                : undefined,
            endTime:
              newFormData.endTime !== ""
                ? formatDateTimeToISO("2000-01-01", newFormData.endTime)
                : undefined,
            location: newFormData.location !== "" ? newFormData.location : undefined,
            level: newFormData.level !== "" ? newFormData.level : undefined,
            participantsMax:
              newFormData.participantsMax !== ""
                ? parseInt(newFormData.participantsMax, 10)
                : undefined,
            participantsMin:
              newFormData.participantsMin !== ""
                ? parseInt(newFormData.participantsMin, 10)
                : undefined,
            feeMax: newFormData.feeMax !== "" ? parseInt(newFormData.feeMax, 10) : undefined,
            feeMin: newFormData.feeMin !== "" ? parseInt(newFormData.feeMin, 10) : undefined,
            isApplied: newFormData.isApplied,
          },
        },
      })
      setSearchResults(true)
    }
  }, [searchMatches, searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleLevelChange = (level: MatchLevel) => {
    setFormData((prev) => ({ ...prev, level }))
  }

  const handleSearch = async () => {
    const validationResult = searchMatchSchema.safeParse(formData)
    if (!validationResult.success) {
      const validationErrors: FormErrors = {}
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) validationErrors[err.path[0] as keyof SearchMatchFormValues] = err.message
      })
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setSearchResults(true)

    const params = new URLSearchParams()
    if (formData.date) params.set("date", formData.date)
    if (formData.startTime) params.set("startTime", formData.startTime)
    if (formData.endTime) params.set("endTime", formData.endTime)
    if (formData.location) params.set("location", formData.location)
    if (formData.level) params.set("level", formData.level)
    if (formData.participantsMin) params.set("participantsMin", formData.participantsMin)
    if (formData.participantsMax) params.set("participantsMax", formData.participantsMax)
    if (formData.feeMin) params.set("feeMin", formData.feeMin)
    if (formData.feeMax) params.set("feeMax", formData.feeMax)
    if (formData.isApplied) params.set("isApplied", "true")

    const url = `${window.location.pathname}?${params.toString()}`
    router.push(url, { scroll: false })

    await searchMatches({
      variables: {
        input: {
          date: formData.date !== "" ? formatDateTimeToISO(formData.date, "00:00") : undefined,
          startTime:
            formData.startTime !== ""
              ? formatDateTimeToISO("2000-01-01", formData.startTime)
              : undefined,
          endTime:
            formData.endTime !== ""
              ? formatDateTimeToISO("2000-01-01", formData.endTime)
              : undefined,
          location: formData.location !== "" ? formData.location : undefined,
          level: formData.level !== "" ? formData.level : undefined,
          participantsMax:
            formData.participantsMax !== "" ? parseInt(formData.participantsMax, 10) : undefined,
          participantsMin:
            formData.participantsMin !== "" ? parseInt(formData.participantsMin, 10) : undefined,
          feeMax: formData.feeMax !== "" ? parseInt(formData.feeMax, 10) : undefined,
          feeMin: formData.feeMin !== "" ? parseInt(formData.feeMin, 10) : undefined,
          isApplied: formData.isApplied,
        },
      },
    })
  }

  const handleReset = () => {
    setFormData({
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      level: "",
      participantsMin: "",
      participantsMax: "",
      feeMin: "",
      feeMax: "",
      isApplied: false,
    })
    setErrors({})
    setSearchResults(false)

    router.push(window.location.pathname, { scroll: false })
  }

  if (initialLoading || searchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-gray-900">Loading...</p>
      </div>
    )
  }

  if (initialError || searchError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-gray-900">
          エラーが生じました。再度お試しください。
        </p>
      </div>
    )
  }

  if (initialData!.matches!.length === 0) {
    ;<div className="flex justify-center items-center h-64">
      <p className="text-lg font-medium text-gray-900">試合がまだありません。</p>
    </div>
  }

  const matches = searchResults ? searchData?.searchMatches : initialData?.matches

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
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">開始時間</label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">終了時間</label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
              {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
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
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">参加者数</label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="participantsMin"
                      type="number"
                      value={formData.participantsMin}
                      onChange={handleChange}
                      placeholder="下限（例）3"
                      className="w-full"
                    />
                    <span className="text-gray-500">～</span>
                    <Input
                      id="participantsMax"
                      type="number"
                      value={formData.participantsMax}
                      onChange={handleChange}
                      placeholder="上限（例）6"
                      className="w-full"
                    />
                  </div>
                  {errors?.participantsMin && (
                    <p className="text-red-500 text-sm">{errors.participantsMin}</p>
                  )}
                  {errors?.participantsMax && (
                    <p className="text-red-500 text-sm">{errors.participantsMax}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">料金 (円)</label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="feeMin"
                      type="number"
                      value={formData.feeMin}
                      onChange={handleChange}
                      placeholder="下限（例）500"
                      className="w-full"
                    />
                    <span className="text-gray-500">～</span>
                    <Input
                      id="feeMax"
                      type="number"
                      value={formData.feeMax}
                      onChange={handleChange}
                      placeholder="上限（例）1000"
                      className="w-full"
                    />
                  </div>
                  {errors?.feeMin && <p className="text-red-500 text-sm">{errors.feeMin}</p>}
                  {errors?.feeMax && <p className="text-red-500 text-sm">{errors.feeMax}</p>}
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="isApplied"
                    checked={formData.isApplied}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, isApplied: checked === true }))
                    }
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

            <Button
              onClick={handleReset}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 mt-2"
            >
              リセット
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {searchResults && matches?.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg font-medium text-gray-900">検索条件に合う試合がありません。</p>
          </div>
        ) : (
          matches?.map((match) => (
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
          ))
        )}
      </div>
    </>
  )
}

export default MatchesList
