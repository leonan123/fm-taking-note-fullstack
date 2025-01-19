import { Button } from '@/_components/button'
import { ClockIcon, TagIcon } from 'lucide-react'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { upsertNoteAction } from '../_actions'
import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'
import { TagInput } from './tag-input'

const upsertNoteSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: 'Title is required' }),
  tags: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .optional(),
  content: z.string().nullable(),
  updatedAt: z.string().optional(),
})

type UpsertNoteData = z.infer<typeof upsertNoteSchema>

interface UpsertNoteFormProps {
  defaultValues?: UpsertNoteData & {
    userId: string
  }
  onTitleChange?: (title: string) => void
}

export function UpsertNoteForm({
  defaultValues,
  onTitleChange,
}: UpsertNoteFormProps) {
  const { userId } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, ...form },
  } = useForm<UpsertNoteData>({
    resolver: zodResolver(upsertNoteSchema),
    defaultValues: defaultValues ?? {
      id: '',
      title: '',
      tags: [],
      content: '',
    },
  })

  function onSubmit(data: UpsertNoteData) {
    upsertNoteAction({ ...data, userId: userId! })
  }

  const title = watch('title')

  useEffect(() => {
    if (title.length === 0) {
      onTitleChange?.('Untitled Note')
      return
    }

    onTitleChange?.(title)
  }, [title])

  return (
    <form
      className="flex size-full flex-col px-6 py-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" value={defaultValues?.id} {...register('id')} />

      <div aria-invalid={!!errors.title} className="group">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter a title..."
          className="w-full bg-transparent text-2xl font-bold outline-none"
          {...register('title')}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
        )}
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
            <Controller
              name="tags"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <TagInput
                  {...field}
                  selectedTags={value ?? []}
                  onValueChange={onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <label
            htmlFor="updatedAt"
            className="flex w-full max-w-[115px] items-center gap-1.5 text-sm dark:text-neutral-300"
          >
            <ClockIcon size={16} />
            Last edited
          </label>
          <div className="flex-1">
            <input
              id="updatedAt"
              type="text"
              className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
              placeholder="Not yet saved"
              disabled={true}
              {...register('updatedAt')}
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
          id="content"
          className="size-full rounded-lg bg-transparent text-sm outline-none placeholder:text-neutral-400"
          placeholder="Start typing your note here…"
          {...register('content')}
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
