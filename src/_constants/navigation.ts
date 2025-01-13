'use client'

import { ArchiveIcon, HouseIcon, SunIcon, TypeIcon } from 'lucide-react'

export const SIDEBAR_NAVIGATION = [
  {
    label: 'All Notes',
    href: '/',
    icon: HouseIcon,
  },
  {
    label: 'Archived Notes',
    href: '/archived',
    icon: ArchiveIcon,
  },
]

export const SETTINGS_NAVIGATION = [
  {
    label: 'Color Theme',
    href: '/color-theme',
    icon: SunIcon,
  },
  {
    label: 'Font Theme',
    href: '/font-theme',
    icon: TypeIcon,
  },
]
