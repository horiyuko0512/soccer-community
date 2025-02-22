"use client"

import React, { createContext, useContext } from "react"

interface CookieContextType {
  token: string | null
}

const CookieContext = createContext<CookieContextType | undefined>(undefined)

export const CookieProvider: React.FC<{ children: React.ReactNode; token: string | null }> = ({
  children,
  token,
}) => {
  return <CookieContext.Provider value={{ token }}>{children}</CookieContext.Provider>
}

export const useCookie = (): CookieContextType => {
  const context = useContext(CookieContext)
  if (!context) {
    throw new Error("useCookie must be used within a CookieProvider")
  }
  return context
}
