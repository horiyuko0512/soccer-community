'use server'

import { cookies } from 'next/headers'

export async function updateToken(newToken: string) {
  const cookieStore = await cookies()
  const cookieName = process.env.COOKIE_NAME || "";
  cookieStore.set({
    name: cookieName,
    value: newToken,
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(Date.now() + 30 * 60 * 1000),
  });
  return { success: true }
}