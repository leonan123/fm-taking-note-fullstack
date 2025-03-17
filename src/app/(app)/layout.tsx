import { Sidebar } from '@/_components/sidebar'
import { Header } from '@/_components/header'
import { Toaster } from 'sonner'
import { Suspense } from 'react'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-full">
      <Toaster
        position="bottom-right"
        toastOptions={{
          unstyled: false,
          duration: 3000,
          closeButton: true,
          classNames: {
            toast:
              'rounded-lg py-2 px-3 flex items-center gap-2 border border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 text-sm items-start',
            success:
              '[&_svg]:fill-green-400 [&_[data-icon]]:self-start [&_[data-icon]]:mt-1',
            title: 'font-normal',
            description: 'text-xs max-w-[270px]',
            closeButton:
              'left-auto right-4 top-1/2 -translate-y-1/2 !bg-transparent border-0 [&_svg]:size-5 text-neutral-500',
          },
        }}
      />
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Suspense>
          <Header />
        </Suspense>
        {children}
      </div>
    </div>
  )
}
