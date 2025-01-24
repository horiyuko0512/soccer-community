"use client"

import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import Match from "./Match"

const MatchPage = () => {
  const params = useParams<{ id: string }>()
  const id = params.id
  const router = useRouter()
  return (
    <>
      <Header />
      <div className="flex justify-between items-center mb-4 mt-6 px-4">
        <h1 className="text-2xl font-bold text-gray-900">試合詳細</h1>
        <Button
          className="bg-sky-500 hover:bg-sky-600 text-white"
          onClick={() => router.back()}
        >
          戻る
        </Button>
      </div>

      <div className="container mx-auto px-4">
        <Match id={id} />
      </div>
    </>
  )
}

export default MatchPage
