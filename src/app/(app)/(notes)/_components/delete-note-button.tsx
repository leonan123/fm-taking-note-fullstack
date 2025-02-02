import { deleteNoteAction } from '@/app/(app)/(notes)/_actions'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Button } from '../../../../_components/button'
import { Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

interface DeleteNoteButtonProps {
  noteId: string
}

export function DeleteNoteButton({ noteId }: DeleteNoteButtonProps) {
  function handleDeleteClick() {
    deleteNoteAction(noteId)
    toast.success('Note deleted successfully!')
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="outline" className="max-w-[242px] justify-start">
          <Trash2Icon size={20} />
          Delete Note
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50 data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show" />

        <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-neutral-800 data-[state=closed]:animate-hide-dialog data-[state=open]:animate-show-dialog">
          <div className="flex gap-4 p-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-neutral-600">
              <Trash2Icon size={22} />
            </div>

            <div className="space-y-1.5">
              <AlertDialog.Title className="font-semibold leading-none">
                Delete Note
              </AlertDialog.Title>

              <AlertDialog.Description className="text-sm text-neutral-300">
                Are you sure you want to permanently delete this note? This
                action cannot be undone.
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
              <Button
                variant="destructive"
                className="max-w-fit"
                onClick={handleDeleteClick}
              >
                Delete Note
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
