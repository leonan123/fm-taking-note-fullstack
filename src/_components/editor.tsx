'use client'

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  type EditorContentProps,
} from '@tiptap/react'
import { generateHTML } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { BoldIcon, ItalicIcon, StrikethroughIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { BubbleButton } from './bubble-button'

type EditorProps = Partial<EditorContentProps> &
  ComponentProps<'div'> & {
    onValueChange?: (value: string) => void
    content?: string
  }

export function Editor({ onValueChange, content, ...props }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: 'size-full rounded-lg bg-transparent text-sm outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onValueChange?.(JSON.stringify(editor.getJSON().content))
    },
    content: generateHTML(
      {
        type: 'doc',
        content: JSON.parse(content || '[]'),
      },
      [StarterKit],
    ),
  })

  if (!editor) {
    return null
  }

  return (
    <>
      <EditorContent
        className="prose prose-sm prose-neutral size-full max-w-none dark:prose-invert"
        editor={editor}
        {...props}
      />
      <BubbleMenu
        editor={editor}
        className="flex items-center divide-x divide-neutral-700 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 shadow-xl dark:border-neutral-700 dark:bg-neutral-800"
      >
        <BubbleButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          data-active={editor.isActive('bold')}
        >
          <BoldIcon size={16} strokeWidth={3} />
          <span className="sr-only">Bold</span>
        </BubbleButton>

        <BubbleButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          data-active={editor.isActive('italic')}
        >
          <ItalicIcon size={16} />
          <span className="sr-only">Italic</span>
        </BubbleButton>

        <BubbleButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          data-active={editor.isActive('strike')}
        >
          <StrikethroughIcon size={16} />
          <span className="sr-only">Strikethrough</span>
        </BubbleButton>
      </BubbleMenu>
    </>
  )
}
