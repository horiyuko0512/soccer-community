"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { User, LogOut } from "lucide-react"
import { useLogoutMutation } from "@/graphql/generated/graphql"
import { removeToken } from "@/app/login/actions"
import { toast } from "sonner"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const [logoutMutation, { error }] = useLogoutMutation({
    onCompleted: async (data) => {
      if (data?.logout) {
        const result = await removeToken()
        if (result.success) {
          toast.success("ログアウトしました")
          setTimeout(() => {
            window.location.href = "/login"
          }, 1000)
        } else {
          toast.error("ログアウト処理中にエラーが発生しました")
          setIsLoggingOut(false)
        }
      } else {
        toast.error("ログアウトに失敗しました")
        setIsLoggingOut(false)
      }
    },
  })

  const handleLogout = async () => {
    setIsLoggingOut(true)
    setIsOpen(false)

    await logoutMutation()
  }

  useEffect(() => {
    if (error) {
      toast.error("再度実行してください")
      setIsLoggingOut(false)
    }
  }, [error])

  return (
    <div className="bg-sky-500 p-4 text-white mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/matches"
          className="text-xl font-bold"
        >
          Soccer Community
        </Link>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 focus:outline-none"
            aria-expanded={isOpen}
            aria-haspopup="true"
            disabled={isLoggingOut}
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sky-500">
              <User size={20} />
            </div>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10">
              <Link
                href="/my"
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <User size={16} />
                マイページ
              </Link>
              <button
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                ログアウト
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
