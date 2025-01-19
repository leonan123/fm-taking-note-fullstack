import type { Prisma } from '@prisma/client'
import { useEffect, useState } from 'react'

interface UseNotesListProps {
  notes: Prisma.NoteGetPayload<{
    include: {
      tags: true
    }
  }>[]
}

export function useNotesList({ notes }: UseNotesListProps) {
  const [tabValue, setTabValue] = useState('')
  const [isCreatingNewNote, setIsCreatingNewNote] = useState(false)
  const [creatingNoteTitle, setCreatingNoteTitle] = useState('Untitled Note')
  const [notesState, setNotesState] = useState<typeof notes>(notes)

  function handleCreateNewNote() {
    setIsCreatingNewNote(true)
    setTabValue('new')
  }

  function handleTabChange(tabName: string) {
    if (tabName !== 'new') {
      setIsCreatingNewNote(false)
    }

    setTabValue(tabName)
  }

  function handleTitleChange(
    noteId: string,
    title: string,
    isCreating: boolean,
  ) {
    if (isCreating) {
      setCreatingNoteTitle(title)
      return
    }

    setNotesState((prev) =>
      prev.map((n) => {
        if (n.id === noteId) {
          return {
            ...n,
            title,
          }
        }

        return n
      }),
    )
  }

  useEffect(() => {
    setNotesState(notes)
    setIsCreatingNewNote(false)
  }, [notes])

  return {
    tabValue,
    isCreatingNewNote,
    creatingNoteTitle,
    notesState,
    handleTabChange,
    handleCreateNewNote,
    handleTitleChange,
  }
}
