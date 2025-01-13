'use client'

import { SearchIcon, SettingsIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Header() {
  const [pageTitle, setPageTitle] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/') {
      setPageTitle('All Notes')
      return
    }

    setPageTitle(document.title.split(' | ')[0])
  }, [pathname])

  return (
    <header
      suppressHydrationWarning
      className="flex items-center justify-between border-b border-b-neutral-200 px-8 py-[18.5px] dark:border-b-neutral-800"
    >
      <h1 className="text-2xl font-bold">{pageTitle}</h1>

      <div className="flex items-center gap-4">
        <form
          action=""
          className="group flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-3 transition-colors focus-within:border-blue-600 dark:border-neutral-800 dark:focus-within:border-blue-600"
        >
          <button type="submit">
            <span className="sr-only">Search</span>
            <SearchIcon
              size={20}
              className="text-neutral-500 transition-colors group-focus-within:text-blue-600"
            />
          </button>

          <input
            type="search"
            placeholder="Search by title, content, or tags…"
            className="w-[300px] bg-transparent text-sm outline-none placeholder:text-neutral-500"
          />
        </form>

        <Link
          href="/settings"
          className="p-2 text-neutral-500 transition-colors hover:text-neutral-400 dark:hover:text-neutral-400"
        >
          <span className="sr-only">Settings</span>
          <SettingsIcon size={24} />
        </Link>
      </div>
    </header>
  )
}
