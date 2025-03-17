import type { ComponentProps } from 'react'

type BubbleButtonProps = ComponentProps<'button'>

export function BubbleButton({ ...props }: BubbleButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 p-2 text-sm font-medium leading-none text-neutral-400 outline-none transition-colors hover:bg-neutral-200 focus:bg-neutral-200 data-[active=true]:text-blue-600 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
      {...props}
    />
  )
}
