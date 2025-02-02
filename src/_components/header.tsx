'use client'

import { SettingsIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SearchForm } from './search-form'

export function Header() {
  const [pageTitle, setPageTitle] = useState('')
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (document.title.startsWith('Search')) {
      const query = searchParams.get('q')

      if (query) {
        setPageTitle(`Showing results for: ${query}`)
        return
      }
    }

    setPageTitle(document.title.split(' | ')[0])
  }, [pathname, searchParams])

  return (
    <header className="flex items-center justify-between border-b border-b-neutral-200 px-8 py-[18.5px] dark:border-b-neutral-800">
      <h1 className="text-2xl font-bold">{pageTitle}</h1>

      <div className="flex items-center gap-4">
        <SearchForm />

        <Link
          href="/settings/color-theme"
          data-active={pathname.startsWith('/settings')}
          className="rounded-lg p-2 text-neutral-500 transition-colors hover:text-neutral-400 data-[active=true]:bg-neutral-300/70 data-[active=true]:text-blue-600 dark:hover:text-neutral-400 dark:data-[active=true]:bg-neutral-800 dark:data-[active=true]:text-blue-600"
        >
          <span className="sr-only">Settings</span>
          <SettingsIcon size={24} />
        </Link>
      </div>
    </header>
  )
}
