import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'flex w-full items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors',

  variants: {
    variant: {
      primary: 'bg-blue-600 hover:bg-blue-700',
    },

    size: {
      md: 'h-10 px-4',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

type ButtonProps = VariantProps<typeof button> & ComponentProps<'button'>

export function Button({ children, className, variant, size }: ButtonProps) {
  return (
    <button className={twMerge(button({ variant, size }), className)}>
      {children}
    </button>
  )
}
