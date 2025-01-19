import { icons } from 'lucide-react'

export type NavigationItem = {
  label: string
  href: string
  icon: keyof typeof icons
}

export const SIDEBAR_NAVIGATION: NavigationItem[] = [
  {
    label: 'All Notes',
    href: '/',
    icon: 'House',
  },
  {
    label: 'Archived Notes',
    href: '/archived',
    icon: 'Archive',
  },
]

export const SETTINGS_NAVIGATION: NavigationItem[] = [
  {
    label: 'Color Theme',
    href: '/settings/color-theme',
    icon: 'Sun',
  },
  {
    label: 'Font Theme',
    href: '/settings/font-theme',
    icon: 'Type',
  },
]
