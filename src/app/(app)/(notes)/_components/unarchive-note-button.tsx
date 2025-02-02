import { Button } from '@/_components/button'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { RefreshCcwIcon } from 'lucide-react'
import { unarchiveNoteAction } from '../_actions'
import { toast } from 'sonner'
import Link from 'next/link'

interface UnarchiveNoteButtonProps {
  noteId: string
}

export function UnarchiveNoteButton({ noteId }: UnarchiveNoteButtonProps) {
  function handleUnarchiveNoteClick() {
    unarchiveNoteAction(noteId)
    toast.success('Note unarchived successfully!', {
      description: () => {
        return (
          <span className="text-xs text-neutral-300">
            You can find it in the{' '}
            <Link href="/" className="underline">
              All Notes
            </Link>{' '}
            section.
          </span>
        )
      },
    })
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="outline" className="max-w-[242px] justify-start">
          <RefreshCcwIcon size={20} />
          Restore Note
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50 data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show" />

        <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-neutral-600 bg-neutral-800 data-[state=closed]:animate-hide-dialog data-[state=open]:animate-show-dialog">
          <div className="flex gap-4 p-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-neutral-600">
              <RefreshCcwIcon size={22} />
            </div>

            <div className="space-y-1.5">
              <AlertDialog.Title className="font-semibold leading-none">
                Restore Note
              </AlertDialog.Title>

              <AlertDialog.Description className="text-sm text-neutral-300">
                Are you sure you want to restore this note? You can find it in
                the All Notes section.
              </AlertDialog.Description>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-t-neutral-600 px-4 py-5">
            <AlertDialog.Cancel asChild>
              <Button
                variant="secondary"
                className="max-w-fit dark:bg-neutral-600"
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button className="max-w-fit" onClick={handleUnarchiveNoteClick}>
                Restore Note
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
