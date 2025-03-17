'use client'

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
  type EditorContentProps,
} from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import { generateHTML } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import {
  BoldIcon,
  Heading1,
  Heading2,
  Heading3,
  ItalicIcon,
  List,
  StrikethroughIcon,
  Type,
} from 'lucide-react'
import { useRef, type ComponentProps } from 'react'
import { BubbleButton } from './bubble-button'
import { FloatingMenuButton } from './floating-menu-button'

type EditorProps = Partial<EditorContentProps> &
  ComponentProps<'div'> & {
    onValueChange?: (value: string) => void
    content?: string
  }

export function Editor({ onValueChange, content, ...props }: EditorProps) {
  const firstFocusableRef = useRef<HTMLButtonElement>(null)
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Untitled'
          }

          return "Type '/' to see commands"
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'size-full rounded-lg bg-transparent text-sm outline-none',
      },
    },
    onBlur: ({ editor }) => {
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

  return (
    <>
      <EditorContent
        className="prose prose-sm prose-neutral prose-sky size-full max-w-none dark:prose-invert selection:bg-blue-600/45 prose-p:my-0 prose-p:leading-loose prose-li:my-0"
        editor={editor}
        {...props}
      />

      {editor && (
        <>
          <FloatingMenu
            editor={editor}
            tippyOptions={{
              hideOnClick: 'toggle',
              placement: 'bottom-start',
              onShown: () => {
                firstFocusableRef.current?.focus()
              },
            }}
            shouldShow={({ state }) => {
              const { $from } = state.selection
              const currentLineText = $from.nodeBefore?.textContent
              const isSlash = currentLineText === '/'

              return isSlash
            }}
            className="flex min-w-[400px] flex-col gap-2 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 p-2 shadow-xl dark:border-neutral-700 dark:bg-neutral-800"
          >
            <span className="text-xs font-semibold text-neutral-300">
              Blocos básicos
            </span>

            <div className="flex flex-col gap-1 text-start">
              <FloatingMenuButton
                editor={editor}
                ref={firstFocusableRef}
                onClick={() =>
                  editor
                    .chain()
                    .deleteRange({
                      from: editor.state.selection.from - 1,
                      to: editor.state.selection.to,
                    })
                    .focus()
                    .run()
                }
              >
                <Type size={16} className="shrink-0 text-neutral-400" />
                <span className="flex-1 text-start">Texto</span>
              </FloatingMenuButton>

              <FloatingMenuButton
                editor={editor}
                onClick={() =>
                  editor
                    .chain()
                    .deleteRange({
                      from: editor.state.selection.from - 1,
                      to: editor.state.selection.to,
                    })
                    .toggleBulletList()
                    .focus()
                    .run()
                }
              >
                <List size={16} className="shrink-0 text-neutral-400" />
                <span className="flex-1 text-start">Lista com marcadores</span>
                <span className="text-neutral-400">-</span>
              </FloatingMenuButton>

              <FloatingMenuButton
                editor={editor}
                onClick={() =>
                  editor
                    .chain()
                    .deleteRange({
                      from: editor.state.selection.from - 1,
                      to: editor.state.selection.to,
                    })
                    .toggleHeading({ level: 1 })
                    .focus()
                    .run()
                }
              >
                <Heading1 size={16} className="shrink-0 text-neutral-400" />
                <span className="flex-1 text-start">Título 1</span>
                <span className="text-neutral-400">#</span>
              </FloatingMenuButton>

              <FloatingMenuButton
                editor={editor}
                onClick={() =>
                  editor
                    .chain()
                    .deleteRange({
                      from: editor.state.selection.from - 1,
                      to: editor.state.selection.to,
                    })
                    .toggleHeading({ level: 2 })
                    .focus()
                    .run()
                }
              >
                <Heading2 size={16} className="shrink-0 text-neutral-400" />
                <span className="flex-1 text-start">Título 2</span>
                <span className="text-neutral-400">##</span>
              </FloatingMenuButton>

              <FloatingMenuButton
                editor={editor}
                onClick={() =>
                  editor
                    .chain()
                    .deleteRange({
                      from: editor.state.selection.from - 1,
                      to: editor.state.selection.to,
                    })
                    .toggleHeading({ level: 3 })
                    .focus()
                    .run()
                }
              >
                <Heading3 size={16} className="shrink-0 text-neutral-400" />
                <span className="flex-1 text-start">Título 3</span>
                <span className="text-neutral-400">###</span>
              </FloatingMenuButton>
            </div>
          </FloatingMenu>

          <BubbleMenu
            editor={editor}
            className="divide-x-400 flex items-center divide-x overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 shadow-xl dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-800"
            tippyOptions={{
              placement: 'bottom-start',
            }}
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
      )}
    </>
  )
}
