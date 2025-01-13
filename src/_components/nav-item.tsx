'use client'

import { ChevronRightIcon, HouseIcon, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItemProps {
  label: string
  icon: LucideIcon
  href: string
}

export function NavItem({ label, href, icon: Icon }: NavItemProps) {
  const isActive = usePathname().endsWith(href)

  return (
    <li
      data-active={isActive}
      className="group rounded-lg text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-950 data-[active=true]:text-neutral-950 dark:text-neutral-200 dark:data-[active=true]:bg-neutral-800 dark:data-[active=true]:text-neutral-50 dark:data-[active=false]:hover:bg-neutral-800/50"
    >
      <Link href={href} className="flex items-center gap-2 p-3">
        <Icon size={18} className="group-data-[active=true]:stroke-blue-600" />
        <span className="flex-1">{label}</span>
        <ChevronRightIcon
          size={16}
          className="hidden group-data-[active=true]:block"
        />
      </Link>
    </li>
  )
}
