import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import ClientProvider from "@/graphql/client/ClientProvider"
import { Toaster } from "@/components/ui/sonner"
import { CookieProvider } from "@/context/CookieContext"
import { cookies } from "next/headers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Soccer Community",
  description: "Soccer Community",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const token = cookieStore.get("jwt-token")?.value || null

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-sky-50`}
      >
        <CookieProvider token={token}>
          <ClientProvider>{children}</ClientProvider>
          <Toaster richColors />
        </CookieProvider>
      </body>
    </html>
  )
}
