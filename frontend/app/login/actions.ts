"use server"

import { cookies } from "next/headers"

export async function updateToken(newToken: string) {
  const cookieStore = await cookies()
  const cookieName = process.env.ACCESS_COOKIE_NAME || ""
  cookieStore.set({
    name: cookieName,
    value: newToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(Date.now() + 15 * 60 * 1000),
  })
  return { success: true }
}

export async function removeToken() {
  const cookieStore = await cookies()
  const accessTokenName = process.env.ACCESS_COOKIE_NAME || ""
  const refreshTokenName = process.env.REFRESH_COOKIE_NAME || ""
  cookieStore.delete(accessTokenName)
  cookieStore.delete(refreshTokenName)
  return { success: true }
}
