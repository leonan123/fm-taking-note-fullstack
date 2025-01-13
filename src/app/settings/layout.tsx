import { Navigation } from '@/_components/navigation'
import { SETTINGS_NAVIGATION } from '@/_constants/navigation'

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
      <Navigation
        navigationItems={SETTINGS_NAVIGATION}
        className="mt-0 h-full w-full max-w-[258px] border-r border-r-neutral-200 py-5 pl-8 pr-4 dark:border-r-neutral-800"
      />

      {children}
    </div>
  )
}
