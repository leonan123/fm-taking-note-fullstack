import { getTags } from '@/http/get-tags'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { createTagAction } from '../_actions'

export type Tag = {
  id: number
  name: string
}

export type TagInputProps = {
  selectedTags: Tag[]
  onValueChange: (value: Tag[]) => void
}

export function useTagInput({
  selectedTags: propSelectedTags,
  onValueChange,
}: TagInputProps) {
  const { userId } = useAuth()
  const [tags, setTags] = useState<Tag[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    propSelectedTags || [],
  )
  const [isResultEmpty, setIsResultEmpty] = useState(false)
  const [searchInputValue, setSearchInputValue] = useState('')

  function handleDeleteTag(tagId: number) {
    return setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId))
  }

  async function handleCreateTag(tagName: string) {
    const { newTag } = await createTagAction(tagName, userId!)

    setTags((prevTags) => [...prevTags, newTag])
    setSelectedTags((prevSelectedTags) => [...prevSelectedTags, newTag])
    setIsOpen(false)
    setSearchInputValue('')
  }

  function handleSelectTag(tag: Tag) {
    setSelectedTags((prev) => {
      const isTagAlreadySelected = prev.some((prevTag) => prevTag.id === tag.id)

      if (isTagAlreadySelected) {
        return prev
      }

      return [...prev, tag]
    })

    setSearchInputValue('')
    setIsOpen(false)
  }

  useEffect(() => {
    const command = document.getElementById('command-tag')

    if (command?.querySelector('[cmdk-empty]')) {
      setIsResultEmpty(true)
      return
    }

    setIsResultEmpty(false)
  }, [searchInputValue])

  useEffect(() => {
    onValueChange(selectedTags)
  }, [selectedTags])

  useEffect(() => {
    const fetchTags = async () => {
      const { tags } = await getTags()

      setTags(tags)
    }

    fetchTags()
  }, [])

  return {
    tags,
    isOpen,
    setIsOpen,
    searchInputValue,
    setSearchInputValue,
    selectedTags,
    isResultEmpty,
    handleDeleteTag,
    handleCreateTag,
    handleSelectTag,
  }
}
