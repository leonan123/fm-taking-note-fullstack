'use client'

import { LoaderIcon, Trash2Icon } from 'lucide-react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Button } from './button'
import { useTransition } from 'react'
import { deleteTagAction } from '@/_actions/tag'

interface DeleteTagButtonProps {
  tagId: number
  tagName: string
}

export function DeleteTagButton({ tagId, tagName }: DeleteTagButtonProps) {
  const [isPending, startTransition] = useTransition()

  function handleDeleteTagClick() {
    startTransition(() => {
      deleteTagAction(tagId)
    })
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
          <Trash2Icon size={16} />
          <span className="sr-only">Delete note</span>
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-neutral-950/50 data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-black/50" />

        <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-neutral-200 bg-neutral-50 data-[state=closed]:animate-hide-dialog data-[state=open]:animate-show-dialog dark:border-neutral-600 dark:bg-neutral-800">
          <div className="flex gap-4 p-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-600">
              <Trash2Icon size={22} />
            </div>

            <div className="space-y-1.5">
              <AlertDialog.Title className="font-semibold leading-none">
                Delete Tag
              </AlertDialog.Title>

              <AlertDialog.Description className="text-sm text-neutral-700 dark:text-neutral-300">
                Are you sure you want to permanently delete this tag{' '}
                <strong>{tagName}</strong> ? This action cannot be undone.
              </AlertDialog.Description>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-t-neutral-200 px-4 py-5 dark:border-t-neutral-600">
            <AlertDialog.Cancel asChild>
              <Button
                variant="secondary"
                className="max-w-fit dark:bg-neutral-600"
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                variant="destructive"
                className="max-w-fit"
                disabled={isPending}
                onClick={handleDeleteTagClick}
              >
                {isPending && (
                  <LoaderIcon size={20} className="mr-2 animate-spin" />
                )}
                Delete Tag
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
