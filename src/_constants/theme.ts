import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react'

export const THEME_COLOR_OPTIONS = [
  {
    label: 'Light',
    description: 'Pick a clean and classic light theme',
    value: 'light',
    icon: SunIcon,
  },
  {
    label: 'Dark',
    description: 'Select a sleek and modern dark theme',
    value: 'dark',
    icon: MoonIcon,
  },
  {
    label: 'System',
    description: 'Adapts to your device’s theme',
    value: 'system',
    icon: SunMoonIcon,
  },
]
