'use client'

import { Command } from 'cmdk'
import { useRef, type KeyboardEvent } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { SearchIcon, XCircleIcon } from 'lucide-react'
import { useTagInput, type Tag } from '../_hooks/use-tag-input'

interface TagInputProps {
  propSelectedTags: Tag[]
  onValueChange: (value: Tag[]) => void
}

export function TagInput({ onValueChange, propSelectedTags }: TagInputProps) {
  const btnCreateTag = useRef<HTMLButtonElement>(null)
  
  const {
    tags,
    isOpen,
    selectedTags,
    isResultEmpty,
    searchInputValue,
    handleSearchTag,
    handleOpenChange,
    handleSelectTag,
    handleDeleteTag,
    handleCreateTag,
  } = useTagInput({ selectedTags: propSelectedTags, onValueChange })

  function handleSearchKeyDown(ev: KeyboardEvent<HTMLInputElement>) {
    if (ev.key === 'Enter' && isResultEmpty) {
      btnCreateTag.current?.click()
    }
  }

  return (
    <Popover.Root open={isOpen} onOpenChange={handleOpenChange}>
      <div className="relative">
        <Popover.Trigger
          className="min-h-4 w-full text-start text-sm outline-none"
          aria-label="Add tags"
        >
          {selectedTags.length === 0 && (
            <span className="text-neutral-400">
              Add tags separated by commas (e.g. Work, Planning)
            </span>
          )}
        </Popover.Trigger>

        <div className="absolute left-0 top-1/2 flex -translate-y-1/2 flex-wrap gap-1">
          {selectedTags.map((tag) => (
            <span
              key={tag.id}
              className="flex items-center gap-1 rounded-md bg-gray-300/75 px-1.5 py-0.5 text-xs dark:bg-neutral-700 dark:text-neutral-300"
            >
              {tag.name}

              <div
                role="button"
                aria-label="Remove tag"
                onClick={() => handleDeleteTag(tag.id)}
              >
                <XCircleIcon size={14} />
              </div>
            </span>
          ))}
        </div>
      </div>

      <Popover.Content align="start" sideOffset={5} className="z-10">
        <Command
          className="z-10 rounded-md border border-neutral-300 bg-neutral-50 text-sm font-medium shadow-md dark:border-neutral-700 dark:bg-neutral-800"
          id="command-tag"
        >
          <div className="flex items-center gap-2 border-b border-b-neutral-300 px-3 py-2 dark:border-b-neutral-700">
            <SearchIcon size={16} className="text-neutral-400" />
            <Command.Input
              placeholder="Search..."
              className="bg-transparent text-sm outline-none"
              value={searchInputValue}
              onValueChange={handleSearchTag}
              onKeyDown={handleSearchKeyDown}
            />
          </div>

          <Command.List className="px-1 py-2">
            <Command.Empty className="mx-auto py-6 text-center">
              <button
                type="button"
                ref={btnCreateTag}
                onClick={() => handleCreateTag(searchInputValue)}
              >
                Create:
                <span className="ml-1 rounded-md bg-blue-500/60 p-1 text-white">
                  {searchInputValue}
                </span>
              </button>
            </Command.Empty>

            {tags.map((tag) => (
              <Command.Item
                key={tag.id}
                className="cursor-pointer rounded-md bg-transparent px-3 py-1.5 transition-colors hover:bg-neutral-300 dark:hover:bg-neutral-700 dark:data-[selected=true]:bg-neutral-700"
                onSelect={() => handleSelectTag(tag)}
              >
                {tag.name}
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      </Popover.Content>
    </Popover.Root>
  )
}
