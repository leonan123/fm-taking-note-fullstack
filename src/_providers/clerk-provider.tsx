'use client'

import { ClerkProvider as Clerk } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  const { theme, systemTheme } = useTheme()

  let clerkTheme

  if (theme === 'system' && systemTheme === 'dark') {
    clerkTheme = dark
  } else {
    clerkTheme = theme === 'dark' ? dark : undefined
  }

  return (
    <Clerk
      appearance={{
        baseTheme: clerkTheme,
      }}
    >
      {children}
    </Clerk>
  )
}
