import { Sidebar } from '@/_components/sidebar'
import { Header } from '@/_components/header'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-full">
      <Sidebar />

      <div className="flex-1">
        <Header />
        {children}
      </div>
    </div>
  )
}
