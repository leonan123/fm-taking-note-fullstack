'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState, type FormEvent } from 'react'
import * as ThemeOption from '../_components/theme-option'
import { THEME_COLOR_OPTIONS } from '@/_constants/theme'

export default function ColorThemePage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [formTheme, setFormTheme] = useState(theme ?? 'dark')

  function handleThemeChange(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    setTheme(formTheme)
  }

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return (
    <main className="max-w-[528px] flex-1 space-y-6 p-8">
      <div>
        <h2 className="font-semibold">Color Theme</h2>
        <p className="text-sm text-neutral-500">Choose your color theme:</p>
      </div>

      <form onSubmit={handleThemeChange} className="flex flex-col gap-4">
        {THEME_COLOR_OPTIONS.map((option) => (
          <ThemeOption.Root key={option.value}>
            <ThemeOption.Icon children={<option.icon size={24} />} />

            <ThemeOption.Label
              title={option.label}
              description={option.description}
            />

            <ThemeOption.Input
              name="theme"
              id={option.value}
              value={option.value}
              checked={formTheme === option.value}
              onChange={(event) => setFormTheme(event.target.value)}
            />
          </ThemeOption.Root>
        ))}

        <button className="h-[41px] self-end rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          Apply changes
        </button>
      </form>
    </main>
  )
}
