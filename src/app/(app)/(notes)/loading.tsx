export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      {/* <div className="flex animate-spin items-center gap-2">
        <Loader2Icon />
      </div> */}
      <div className="size-full animate-pulse bg-neutral-200 dark:bg-neutral-800"></div>
    </div>
  )
}
