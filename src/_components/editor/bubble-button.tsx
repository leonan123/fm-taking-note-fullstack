import type { ComponentProps } from 'react'

type BubbleButtonProps = ComponentProps<'button'>

export function BubbleButton({ ...props }: BubbleButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 p-2 text-sm font-medium leading-none text-neutral-100 outline-none hover:bg-neutral-700 hover:text-neutral-50 focus:bg-neutral-700 data-[active=true]:text-blue-600"
      {...props}
    />
  )
}
