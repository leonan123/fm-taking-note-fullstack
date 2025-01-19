import { NavItem } from './nav-item'
import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import type { NavigationItem } from '@/_constants/navigation'

interface NavigationProps extends ComponentProps<'nav'> {
  navigationItems: NavigationItem[]
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
