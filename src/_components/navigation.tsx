// import { NavItem } from './nav-item'
import * as NavItem from './nav-item'
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
          <NavItem.Root key={item.href} href={item.href}>
            <NavItem.Icon name={item.icon} />
            <NavItem.Label>{item.label}</NavItem.Label>
          </NavItem.Root>
        ))}
      </ul>
    </nav>
  )
}
