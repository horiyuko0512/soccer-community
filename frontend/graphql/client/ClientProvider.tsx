"use client"

import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support"
import { makeClient } from "./apollo"
import { useCookie } from "@/context/CookieContext"

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const { token } = useCookie()
  return (
    <ApolloNextAppProvider makeClient={() => makeClient(token)}>{children}</ApolloNextAppProvider>
  )
}
