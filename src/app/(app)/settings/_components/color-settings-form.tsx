'use client'

import { Button } from '@/_components/button'
import { THEME_COLOR_OPTIONS } from '@/_constants/theme'
import * as ThemeOption from './theme-option'
import { useTheme } from 'next-themes'
import { useEffect, useState, type FormEvent } from 'react'

export function ColorSettingsForm() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [formTheme, setFormTheme] = useState(theme ?? 'dark')

  function handleThemeChange(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    setTheme(formTheme)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
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

      <Button className="w-auto self-end">Apply changes</Button>
    </form>
  )
}
