'use client'

import type { Note, Prisma } from '@prisma/client'
import { useEffect, useRef, useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Button } from '@/_components/button'
import { ArchiveIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { UpsertNoteForm } from './upsert-note-form'

interface NotesListProps {
  notes: Prisma.NoteGetPayload<{
    include: {
      tags: true
    }
  }>[]
}

export function NotesList({ notes }: NotesListProps) {
  const notesContainer = useRef<HTMLDivElement>(null)

  const [isCreatingNewNote, setIsCreatingNewNote] = useState(false)

  useEffect(() => {
    const notesContainerEl = notesContainer.current!

    if (notesContainerEl.scrollHeight > window.innerHeight) {
      const { top: topOffset } = notesContainerEl.getBoundingClientRect()

      notesContainerEl.style.maxHeight = `${window.innerHeight - (topOffset + 20)}px`
    }
  }, [])

  function handleCreateNewNote() {
    setIsCreatingNewNote(true)
  }

  return (
    <Tabs.Root className="flex w-full">
      <div className="h-full w-full max-w-[290px] border-r border-r-neutral-200 py-5 pl-8 pr-4 dark:border-r-neutral-800">
        <Button onClick={handleCreateNewNote}>
          <PlusIcon size={16} />
          Create New Note
        </Button>

        <div ref={notesContainer} className="mt-4 overflow-scroll">
          <Tabs.List>
            {isCreatingNewNote && (
              <Tabs.Trigger value="new" asChild>
                <button className="w-full space-y-3 rounded-md p-2 text-start">
                  <h3 className="font-semibold">Untitled Note</h3>
                </button>
              </Tabs.Trigger>
            )}

            {notes.map(({ tags, ...note }, i) => (
              <Tabs.Trigger key={note.id} value={note.id} asChild>
                <button
                  className="w-full space-y-3 rounded-md p-2 text-start data-[state=active]:bg-neutral-300/70 dark:data-[state=active]:bg-neutral-800"
                  onClick={() => setIsCreatingNewNote(false)}
                >
                  <h3 className="font-semibold">{note.title}</h3>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1">
                      {tags.map((tag) => (
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
                    {note.updatedAt
                      ? note.updatedAt.toDateString()
                      : note.createdAt.toDateString()}
                  </p>
                </button>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>
      </div>

      {notes.map(({ tags, ...note }, i) => (
        <Tabs.Content
          value={note.id}
          key={note.id}
          className="w-full outline-none"
        >
          <div className="flex h-full">
            <div className="h-full w-2/3 border-r border-r-neutral-200 dark:border-r-neutral-800">
              <UpsertNoteForm />
            </div>

            <div className="flex-1 space-y-3 px-4 py-5">
              <Button variant="outline" className="max-w-[242px] justify-start">
                <ArchiveIcon size={20} />
                Archive Note
              </Button>

              <Button variant="outline" className="max-w-[242px] justify-start">
                <Trash2Icon size={20} />
                Delete Note
              </Button>
            </div>
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
