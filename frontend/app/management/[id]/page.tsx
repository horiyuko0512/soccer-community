"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import Management from "./Management"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"

const ManagementPage = () => {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params.id

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
        <Management id={id} />
      </div>
    </div>
  )
}

export default ManagementPage
