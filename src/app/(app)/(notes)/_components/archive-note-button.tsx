import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Button } from '@/_components/button'
import { ArchiveIcon } from 'lucide-react'
import { archiveNoteAction } from '@/app/(app)/(notes)/_actions'
import { toast } from 'sonner'
import Link from 'next/link'

interface ArchiveNoteButtonProps {
  noteId: string
}

export function ArchiveNoteButton({ noteId }: ArchiveNoteButtonProps) {
  function handleArchiveNoteClick() {
    archiveNoteAction(noteId)
    toast.success('Note archived successfully!', {
      description: () => {
        return (
          <span className="text-xs text-neutral-300">
            You can find it in the{' '}
            <Link href="/archived" className="underline">
              Archived Notes
            </Link>{' '}
            section and restore it anytime.
          </span>
        )
      },
    })
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="outline" className="max-w-[242px] justify-start">
          <ArchiveIcon size={20} />
          Archive Note
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-neutral-950/50 data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-black/50" />

        <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-neutral-200 bg-neutral-50 data-[state=closed]:animate-hide-dialog data-[state=open]:animate-show-dialog dark:border-neutral-600 dark:bg-neutral-800">
          <div className="flex gap-4 p-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-600">
              <ArchiveIcon size={22} />
            </div>

            <div className="space-y-1.5">
              <AlertDialog.Title className="font-semibold leading-none">
                Archive Note
              </AlertDialog.Title>

              <AlertDialog.Description className="text-sm text-neutral-700 dark:text-neutral-300">
                Are you sure you want to archive this note? You can find it in
                the Archived Notes section and restore it anytime.
              </AlertDialog.Description>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-t-neutral-200 dark:border-t-neutral-600 px-4 py-5">
            <AlertDialog.Cancel asChild>
              <Button
                variant="secondary"
                className="max-w-fit dark:bg-neutral-600"
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button className="max-w-fit" onClick={handleArchiveNoteClick}>
                Archive Note
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
