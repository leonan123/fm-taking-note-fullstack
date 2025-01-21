import type { Note, Tag } from '@prisma/client'
import { useEffect, useState } from 'react'
import { deleteNoteAction } from '../_actions'

interface UseNotesListProps {
  notes: Array<
    Note & {
      tags: Tag[]
    }
  >
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

  async function handleDeleteClick(noteId: string) {
    await deleteNoteAction(noteId)
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
    handleDeleteClick,
  }
}
