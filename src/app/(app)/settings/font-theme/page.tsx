'use client'

import { THEME_FONT_OPTIONS } from '@/_constants/theme'
import * as ThemeOption from '../_components/theme-option'
import { useEffect, useState, type FormEvent } from 'react'

export default function FontThemePage() {
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
    <main className="max-w-[528px] flex-1 space-y-6 p-8">
      <div>
        <h2 className="font-semibold">Font Theme</h2>
        <p className="text-sm text-neutral-500">Choose your font theme:</p>
      </div>

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

        <button className="h-[41px] self-end rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          Apply changes
        </button>
      </form>
    </main>
  )
}
