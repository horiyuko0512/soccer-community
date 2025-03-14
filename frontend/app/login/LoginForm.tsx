"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader } from "lucide-react"
import { useLoginMutation } from "@/graphql/generated/graphql"
import { loginSchema, LoginFormValues } from "./schema"
import Link from "next/link"
import { toast } from "sonner"
import { updateToken } from "./actions"

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormValues>({ email: "", password: "" })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [loginSuccessful, setLoginSuccessful] = useState(false)

  const [loginMutation, { loading, error }] = useLoginMutation({
    onCompleted: async (data) => {
      if (data?.login) {
        setLoginSuccessful(true)
        const result = await updateToken(data.login)
        if (result.success) {
          toast.success("ログインに成功しました")
          window.location.href = "/matches"
        } else {
          toast.error("ログインに失敗しました")
        }
      }
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Zodでバリデーション
    const validationResult = loginSchema.safeParse(formData)

    if (!validationResult.success) {
      const validationErrors: { email?: string; password?: string } = {}
      validationResult.error.errors.forEach((err) => {
        if (err.path[0] === "email") validationErrors.email = err.message
        if (err.path[0] === "password") validationErrors.password = err.message
      })
      setErrors(validationErrors)
      return
    }

    setErrors({}) // バリデーションエラーをリセット

    await loginMutation({
      variables: { email: formData.email, password: formData.password },
      context: {
        fetchOptions: {
          credentials: "include",
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
        <CardTitle className="text-xl text-sky-900">アカウントにログイン</CardTitle>
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
              placeholder="パスワードを入力"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <Button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600"
            disabled={loading || loginSuccessful}
          >
            {loading ? (
              <Loader className="animate-spin" />
            ) : loginSuccessful ? (
              "ページを遷移中です"
            ) : (
              "ログイン"
            )}
          </Button>
          {error && (
            <p className="text-red-500 text-sm flex justify-center">
              メールアドレスまたはパスワードが間違っています
            </p>
          )}
        </form>
        <div className="space-y-4 text-center mt-4">
          <div className="text-sm text-sky-600">
            アカウントをお持ちでない方は
            <Link
              href="/register"
              className="text-sky-700 hover:underline ml-1"
            >
              新規登録
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LoginForm
