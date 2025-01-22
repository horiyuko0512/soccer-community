"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import LoginForm from "./LoginForm"

const LoginPage = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col">
      <div className="bg-sky-500 p-4 text-white mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">ログイン</h1>
          <Button
            variant="outline"
            className="bg-white hover:bg-sky-100 text-black"
            onClick={() => router.push("/top")}
          >
            戻る
          </Button>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="container max-w-md px-4 pb-8">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
