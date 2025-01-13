import type { Metadata } from 'next'
import { inter, notoSerif, sourceCodePro } from '../_layout/theme'
import './globals.css'
import { Sidebar } from '@/_components/sidebar'
import { Header } from '@/_components/header'
import { ThemeProvider } from 'next-themes'
import { FontPreferenceInitializer } from '@/_components/font-preference-initializer'

export const metadata: Metadata = {
  title: {
    default: 'Taking Note',
    template: '%s | Taking Note',
  },
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light" data-font="sans" suppressHydrationWarning>
      <FontPreferenceInitializer />

      <body
        className={`${inter.variable} ${notoSerif.variable} ${sourceCodePro.variable} h-screen overflow-hidden antialiased`}
      >
        <ThemeProvider
          storageKey="taking-note@theme"
          defaultTheme="system"
          attribute="class"
        >
          <div className="flex h-full">
            <Sidebar />

            <div className="flex-1">
              <Header />
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
