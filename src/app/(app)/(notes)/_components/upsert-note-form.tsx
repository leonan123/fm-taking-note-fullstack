'use client'

import { Button } from '@/_components/button'
import { ClockIcon, TagIcon } from 'lucide-react'
import { z } from 'zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { upsertNoteAction } from '../_actions'
import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'
import { TagInput } from './tag-input'
import { toast } from 'sonner'
import { Editor } from '@/_components/editor'

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
  onCancelClick?: () => void
}

export function UpsertNoteForm({
  defaultValues,
  onTitleChange,
  onCancelClick,
}: UpsertNoteFormProps) {
  const { userId } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
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
    try {
      upsertNoteAction({ ...data, userId: userId! })
      toast.success('Note saved successfully!')
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  const title = watch('title')

  useEffect(() => {
    onTitleChange?.(title ?? 'Untitled Note')
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
              render={({ field: { onChange, value, ...field } }) => {
                return (
                  <TagInput
                    propSelectedTags={value ?? []}
                    onValueChange={onChange}
                    {...field}
                  />
                )
              }}
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

        <Controller
          name="content"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <Editor onValueChange={onChange} content={value ?? ''} {...field} />
          )}
        />
      </div>

      <div className="my-4 h-px bg-neutral-200 dark:bg-neutral-800" />

      <div className="flex w-fit items-center gap-4">
        <Button type="submit" className="text-nowrap">
          Save Note
        </Button>
        <Button type="button" variant="secondary" onClick={onCancelClick}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
