"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader } from "lucide-react"
import { useCreateUserMutation } from "@/graphql/generated/graphql"
import { registerSchema, RegisterFormValues } from "./schema"
import Link from "next/link"
import { toast } from "sonner"
import { updateToken } from "../login/actions"

const RegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormValues>({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    introduction: "",
  })
  const [errors, setErrors] = useState<Partial<RegisterFormValues>>({})
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false)

  const [createUserMutation, { loading, error }] = useCreateUserMutation({
    onCompleted: async (data) => {
      if (data?.createUser) {
        setRegistrationSuccessful(true);
        const result = await updateToken(data.createUser)
        if (result.success) {
          toast.success("登録に成功しました")
          window.location.href = "/matches";
        } else {
          toast.error("登録に失敗しました");
        }
      }
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Zodでバリデーション
    const validationResult = registerSchema.safeParse(formData)

    if (!validationResult.success) {
      const validationErrors: Partial<RegisterFormValues> = {}
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) validationErrors[err.path[0] as keyof RegisterFormValues] = err.message
      })
      setErrors(validationErrors)
      return
    }

    setErrors({}) // バリデーションエラーをリセット

    await createUserMutation({
      variables: {
        input: {
          email: formData.email,
          passwordHash: formData.password,
          nickname: formData.nickname,
          introduction: formData.introduction,
        },
      },
    })
  }

  useEffect(() => {
    if (error) {
      toast.error("再度実行してください")
    }
  }, [error])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-sky-900">アカウント情報入力</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              type="password"
              placeholder="8文字以上で入力してください"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">パスワード（確認）</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="もう一度入力してください"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nickname">ニックネーム</Label>
            <Input
              id="nickname"
              type="text"
              placeholder="サッカー好き太郎"
              value={formData.nickname}
              onChange={handleChange}
            />
            {errors.nickname && <p className="text-red-500 text-sm">{errors.nickname}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile">自己紹介</Label>
            <Textarea
              id="introduction"
              placeholder="サッカー歴や好きなポジションなど"
              className="h-24"
              value={formData.introduction}
              onChange={handleChange}
            />
            {errors.introduction && <p className="text-red-500 text-sm">{errors.introduction}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600"
            disabled={loading || registrationSuccessful}
          >
            {loading ? (
              <Loader className="animate-spin" />
            ) : registrationSuccessful ? (
              "ページを遷移中です"
            ) : (
              "登録する"
            )}
          </Button>
          {error && (
            <p className="text-red-500 text-sm flex justify-center">エラーが発生して、登録に失敗しました</p>
          )}

          <div className="text-center text-sm text-sky-600">
            すでにアカウントをお持ちの方は
            <Link
              href="/login"
              className="text-sky-700 hover:underline ml-1"
            >
              ログイン
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default RegisterForm
