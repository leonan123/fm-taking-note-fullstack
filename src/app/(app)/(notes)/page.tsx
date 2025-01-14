import { Button } from '@/_components/button'
import { PlusIcon } from 'lucide-react'

export const metadata = {
  title: 'All Notes',
}

export default function Home() {
  return (
    <div className="flex h-full">
      <div className="w-full max-w-[290px] border-r border-r-neutral-200 py-5 pl-8 pr-4 dark:border-r-neutral-800">
        <Button>
          <PlusIcon size={16} />
          Create New Note
        </Button>
      </div>
    </div>
  )
}
