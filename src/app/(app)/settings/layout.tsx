import { Navigation } from '@/_components/navigation'
import { SETTINGS_NAVIGATION } from '@/_constants/navigation'
import { SignOutButton } from '@clerk/nextjs'
import { LogOutIcon } from 'lucide-react'

export const metadata = {
  title: 'Settings',
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full">
      <div className="w-full max-w-[258px] border-r border-r-neutral-200 py-5 pl-8 pr-4 dark:border-r-neutral-800">
        <Navigation
          navigationItems={SETTINGS_NAVIGATION}
          className="mt-0 w-full"
        />

        <div className="my-2 h-px bg-neutral-200 dark:bg-neutral-800" />

        <SignOutButton>
          <button className="group flex w-full items-center gap-2 rounded-lg p-3 text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-950 data-[active=true]:text-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-800/50">
            <LogOutIcon size={20} />
            <span>Logout</span>
          </button>
        </SignOutButton>
      </div>

      {children}
    </div>
  )
}
