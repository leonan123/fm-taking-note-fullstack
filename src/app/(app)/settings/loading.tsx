export default function Loading() {
  return (
    <main className="max-w-[528px] flex-1 space-y-6 p-8">
      <div>
        <div className="h-7 w-28 animate-pulse rounded-md bg-neutral-200 font-semibold dark:bg-neutral-800" />
        <div className="mt-1 h-4 w-96 animate-pulse rounded-md text-sm text-neutral-500 dark:bg-neutral-800" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="h-[76px] w-full animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-[76px] w-full animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-[76px] w-full animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-800" />

        <div className="h-10 w-32 animate-pulse self-end rounded-lg bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </main>
  )
}
