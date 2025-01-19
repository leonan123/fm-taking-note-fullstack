'use client'

import { type LucideIcon } from 'lucide-react'
import { NavItem } from './nav-item'
import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface NavigationProps extends ComponentProps<'nav'> {
  navigationItems: {
    label: string
    href: string
    icon: LucideIcon
  }[]
}

export function Navigation({ navigationItems, className }: NavigationProps) {
  return (
    <nav className={twMerge('mt-4', className)}>
      <ul className="space-y-1">
        {navigationItems.map((item) => (
          <NavItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </ul>
    </nav>
  )
}
