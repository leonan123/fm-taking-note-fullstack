import { SearchIcon } from 'lucide-react'
import Form from 'next/form'
import { useSearchParams } from 'next/navigation'

export function SearchForm() {
  const searchParams = useSearchParams()

  return (
    <Form
      action="/search"
      className="group flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-3 transition-colors focus-within:border-blue-600 dark:border-neutral-800 dark:focus-within:border-blue-600"
    >
      <button type="submit">
        <span className="sr-only">Search</span>
        <SearchIcon
          size={20}
          className="text-neutral-500 transition-colors group-focus-within:text-blue-600"
        />
      </button>

      <input
        type="search"
        name="q"
        required
        minLength={2}
        defaultValue={searchParams.get('q') || ''}
        placeholder="Search by title, content, or tags…"
        className="w-[300px] bg-transparent text-sm outline-none placeholder:text-neutral-500"
      />
    </Form>
  )
}
