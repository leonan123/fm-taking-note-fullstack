import type { Editor } from '@tiptap/core'
import type { ComponentProps, KeyboardEvent } from 'react'

type FloatingMenuButtonProps = ComponentProps<'button'> & {
  editor?: Editor
}

export function FloatingMenuButton({
  editor,
  ...props
}: FloatingMenuButtonProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case 'ArrowUp':
        const previousSibling = event.currentTarget
          .previousElementSibling as HTMLElement
        previousSibling?.focus()
        break

      case 'ArrowDown':
        const nextSibling = event.currentTarget
          .nextElementSibling as HTMLElement
        nextSibling?.focus()
        break

      case 'Esc':
      case 'Escape':
        if (editor) {
          editor.commands.focus()
        }
        break
    }
  }

  return (
    <button
      onKeyDown={handleKeyDown}
      type="button"
      className="flex h-8 items-center gap-2 rounded-md px-1.5 text-sm outline-none hover:bg-neutral-700 focus:bg-neutral-700"
      {...props}
    />
  )
}
