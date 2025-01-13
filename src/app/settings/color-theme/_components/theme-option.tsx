import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface ThemeOptionProps extends ComponentProps<'input'> {}

function Root({ className, ...props }: ComponentProps<'label'>) {
  return (
    <label
      className={twMerge(
        'group flex cursor-pointer items-center gap-4 rounded-xl border border-neutral-200 p-4 transition-colors focus-within:bg-slate-950 dark:border-neutral-700 dark:has-[:checked]:bg-neutral-800',
        className,
      )}
      {...props}
    />
  )
}

function Icon({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={twMerge(
        'rounded-xl border border-neutral-200 bg-transparent p-2 dark:border-neutral-700 dark:bg-neutral-900',
        className,
      )}
      {...props}
    />
  )
}

interface LabelProps {
  title: string
  description?: string
}

function Label({ title, description }: LabelProps) {
  return (
    <div className="flex-1 space-y-0.5">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-neutral-700 dark:text-neutral-300">
        {description}
      </p>
    </div>
  )
}

function Input({ className, ...props }: ComponentProps<'input'>) {
  return (
    <>
      <div
        className={twMerge(
          'size-4 rounded-full border-2 border-neutral-200 transition-colors group-has-[:checked]:border-4 group-has-[:checked]:border-blue-600 dark:border-neutral-700',
          className,
        )}
      ></div>

      <input type="radio" className="hidden" {...props} />
    </>
  )
}

export { Root, Icon, Label, Input }
