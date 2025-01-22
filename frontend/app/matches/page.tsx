"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import MatchesList from "./MatchesList"
import { useRouter } from "next/navigation"

const MatchListPage = () => {
  const router = useRouter()

  return (
    <>
      <Header />
      <div className="flex justify-between items-center mb-4 mt-6 px-4">
        <h1 className="text-2xl font-bold text-gray-900">試合一覧</h1>
        <Button
          className="bg-sky-500 hover:bg-sky-600 text-white"
          onClick={() => router.push("/create")}
        >
          試合を作成
        </Button>
      </div>
      <div className="container mx-auto px-4 pb-8">
        <MatchesList />
      </div>
    </>
  )
}

export default MatchListPage
