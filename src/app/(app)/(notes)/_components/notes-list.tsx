'use client'

import type { Prisma } from '@prisma/client'
import { useEffect, useRef, useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Button } from '@/_components/button'
import { ArchiveIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { UpsertNoteForm } from './upsert-note-form'
import { NoteTab } from './notes-tab'
import { useNotesList } from '../_hooks/use-notes-list'

export interface NotesListProps {
  notes: Prisma.NoteGetPayload<{
    include: {
      tags: true
    }
  }>[]
}

export function NotesList({ notes }: NotesListProps) {
  const notesContainer = useRef<HTMLDivElement>(null)

  const {
    tabValue,
    notesState,
    creatingNoteTitle,
    isCreatingNewNote,
    handleCreateNewNote,
    handleTitleChange,
    handleTabChange,
  } = useNotesList({ notes })

  useEffect(() => {
    const notesContainerEl = notesContainer.current!

    if (notesContainerEl.scrollHeight > window.innerHeight) {
      const { top: topOffset } = notesContainerEl.getBoundingClientRect()

      notesContainerEl.style.maxHeight = `${window.innerHeight - (topOffset + 20)}px`
    }
  }, [])

  return (
    <Tabs.Root
      className="flex w-full"
      value={tabValue}
      onValueChange={handleTabChange}
    >
      <div className="h-full w-full max-w-[290px] border-r border-r-neutral-200 py-5 pl-8 pr-4 dark:border-r-neutral-800">
        <Button onClick={handleCreateNewNote}>
          <PlusIcon size={16} />
          Create New Note
        </Button>

        <div ref={notesContainer} className="mt-4 overflow-auto">
          <Tabs.List>
            {isCreatingNewNote && (
              <Tabs.Trigger value="new" asChild>
                <button className="w-full space-y-3 rounded-md p-2 text-start data-[state=active]:bg-neutral-300/70 dark:data-[state=active]:bg-neutral-800">
                  <h3 className="font-semibold">{creatingNoteTitle}</h3>
                </button>
              </Tabs.Trigger>
            )}

            {notesState.map((note) => (
              <NoteTab key={note.id} note={note} />
            ))}
          </Tabs.List>
        </div>
      </div>

      {isCreatingNewNote && (
        <Tabs.Content value="new" className="w-full outline-none">
          <div className="flex h-full">
            <div className="h-full w-2/3 border-r border-r-neutral-200 dark:border-r-neutral-800">
              <UpsertNoteForm
                onTitleChange={(title: string) =>
                  handleTitleChange('', title, true)
                }
              />
            </div>

            <div className="flex-1 space-y-3 px-4 py-5">
              <Button
                variant="outline"
                className="max-w-[242px] justify-start"
                disabled
                aria-disabled
              >
                <ArchiveIcon size={20} />
                Archive Note
              </Button>

              <Button
                variant="outline"
                className="max-w-[242px] justify-start"
                disabled
                aria-disabled
              >
                <Trash2Icon size={20} />
                Delete Note
              </Button>
            </div>
          </div>
        </Tabs.Content>
      )}

      {notesState.map(({ tags, ...note }, i) => (
        <Tabs.Content
          value={note.id}
          key={note.id}
          className="w-full outline-none"
        >
          <div className="flex h-full">
            <div className="h-full w-2/3 border-r border-r-neutral-200 dark:border-r-neutral-800">
              <UpsertNoteForm
                defaultValues={{
                  ...note,
                  tags,
                  updatedAt: note.updatedAt?.toDateString(),
                }}
                onTitleChange={(title: string) =>
                  handleTitleChange(note.id, title, false)
                }
              />
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
