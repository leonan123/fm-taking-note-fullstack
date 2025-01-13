import type { Metadata } from 'next'
import { inter, notoSerif, sourceCodePro } from '../_layout/theme'
import './globals.css'
import { Sidebar } from '@/_components/sidebar'
import { Header } from '@/_components/header'

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
    <html lang="en" className="dark" data-font="sans">
      <body
        className={`${inter.variable} ${notoSerif.variable} ${sourceCodePro.variable} h-screen antialiased`}
      >
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
