'use client'

import { Button } from '@/_components/button'
import { THEME_FONT_OPTIONS } from '@/_constants/theme'
import { useEffect, useState, type FormEvent } from 'react'
import * as ThemeOption from './theme-option'

export function FontSettingsForm() {
  const [mounted, setMounted] = useState(false)
  const [font, setFont] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.dataset.font!
    }

    return ''
  })

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  function handleFormSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    document.documentElement.dataset.font = font
    localStorage.setItem('taking-note@font', font)
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
      {/* JUST FOR TAILWINDCSS LOAD THE FONTS CLASSES */}
      <div className="hidden font-mono" />
      <div className="hidden font-sans" />
      <div className="hidden font-serif" />

      {THEME_FONT_OPTIONS.map((option) => (
        <ThemeOption.Root key={option.value}>
          <ThemeOption.Icon>
            <span className={`font-${option.value}`}>Aa</span>
          </ThemeOption.Icon>

          <ThemeOption.Label
            title={option.label}
            description={option.description}
          />

          <ThemeOption.Input
            name="font"
            id={option.value}
            value={option.value}
            checked={font === option.value}
            onChange={(event) => setFont(event.target.value)}
          />
        </ThemeOption.Root>
      ))}

      <Button className="w-auto self-end">Apply changes</Button>
    </form>
  )
}
