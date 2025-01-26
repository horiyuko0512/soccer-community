"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import { useRouter } from "next/navigation"
import My from "./My"

const MyPage = () => {
  const router = useRouter()

  return (
    <>
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
        <div className="container mx-auto px-4 pb-8">
          <My />
        </div>
      </div>
    </>
  )
}

export default MyPage
