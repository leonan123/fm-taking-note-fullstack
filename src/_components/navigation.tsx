'use client'

import { ArchiveIcon, HouseIcon, TagIcon } from 'lucide-react'
import { NavItem } from './nav-item'

export function Navigation() {
  return (
    <nav>
      <ul className="mt-4 space-y-1">
        <NavItem label="All Notes" icon={HouseIcon} href="/" />
        <NavItem label="Archived Notes" icon={ArchiveIcon} href="/archived" />
      </ul>

      <div className="my-2 h-px bg-neutral-200 dark:bg-neutral-800" />

      <div className="space-y-2">
        <p className="px-3 text-sm font-medium text-neutral-500">Tags</p>

        <ul className="space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <NavItem
              key={i}
              label={`Tag ${i + 1}`}
              icon={TagIcon}
              href={`/tag/${i + 1}`}
            />
          ))}
        </ul>
      </div>
    </nav>
  )
}
