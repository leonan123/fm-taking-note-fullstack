import { Button } from '@/_components/button'
import { ClockIcon, TagIcon } from 'lucide-react'

export function UpsertNoteForm() {
  return (
    <form action="" className="flex size-full flex-col px-6 py-5">
      <div>
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter a title..."
          className="w-full bg-transparent text-2xl font-bold outline-none"
        />
      </div>

      <div className="mt-5 space-y-2">
        <div className="flex items-center gap-2">
          <label
            htmlFor="tags"
            className="flex w-full max-w-[115px] items-center gap-1.5 text-sm dark:text-neutral-300"
          >
            <TagIcon size={16} />
            Tags
          </label>
          <div className="flex-1">
            <input
              name="tags"
              type="text"
              className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
              placeholder="Add tags separated by commas (e.g. Work, Planning)"
              spellCheck={false}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <label
            htmlFor="tags"
            className="flex w-full max-w-[115px] items-center gap-1.5 text-sm dark:text-neutral-300"
          >
            <ClockIcon size={16} />
            Last edited
          </label>
          <div className="flex-1">
            <input
              name="tags"
              type="text"
              className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
              placeholder="Not yet saved"
              value=""
              disabled={true}
            />
          </div>
        </div>
      </div>

      <div className="my-4 h-px bg-neutral-200 dark:bg-neutral-800" />

      <div className="flex-1">
        <label htmlFor="content" className="sr-only">
          Content
        </label>

        <textarea
          name="content"
          id="content"
          className="size-full rounded-lg bg-transparent text-sm outline-none placeholder:text-neutral-400"
          placeholder="Start typing your note here…"
        />
      </div>

      <div className="my-4 h-px bg-neutral-200 dark:bg-neutral-800" />

      <div className="flex w-fit items-center gap-4">
        <Button type="submit" className="text-nowrap">
          Save Note
        </Button>
        <Button type="button" variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  )
}
