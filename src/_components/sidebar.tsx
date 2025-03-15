import Link from 'next/link'
import { Logo } from './logo'
import { Navigation } from './navigation'
import { SIDEBAR_NAVIGATION } from '@/_constants/navigation'
import { TagList } from './tag-list'

export async function Sidebar() {
  return (
    <div className="w-[272px] border-r border-r-neutral-200 px-4 py-3 dark:border-r-neutral-800">
      <div className="py-3">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <Navigation navigationItems={SIDEBAR_NAVIGATION} />

      <div className="my-2 h-px bg-neutral-200 dark:bg-neutral-800" />

      <div className="space-y-2">
        <p className="px-3 text-sm font-medium text-neutral-500">Tags</p>

        <TagList />
      </div>
    </div>
  )
}
