import type { Note, Tag } from '@prisma/client'
import { TabsTrigger } from '@radix-ui/react-tabs'
import type { ComponentProps } from 'react'

interface NoteTabProps extends ComponentProps<'button'> {
  note: Note & {
    tags: Tag[]
  }
}

export function NoteTab({ note, ...props }: NoteTabProps) {
  return (
    <TabsTrigger key={note.id} value={note.id} asChild>
      <button
        className="w-full space-y-3 rounded-md p-2 text-start data-[state=active]:bg-neutral-300/70 dark:data-[state=active]:bg-neutral-800"
        {...props}
      >
        <h3 className="font-semibold">{note.title}</h3>

        {note.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            {note.tags.map((tag) => (
              <div
                key={tag.id}
                className="inline-block rounded-[4px] bg-gray-300/75 px-1.5 py-0.5 text-xs dark:bg-neutral-700 dark:text-neutral-300"
              >
                {tag.name}
              </div>
            ))}
          </div>
        )}

        <p className="text-xs dark:text-neutral-200">
          {new Date(note.updatedAt || note.createdAt).toLocaleDateString(
            'en-US',
            {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            },
          )}
        </p>
      </button>
    </TabsTrigger>
  )
}
//
