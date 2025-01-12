import Link from 'next/link'
import { Logo } from './logo'
import { Navigation } from './navigation'

export function Sidebar() {
  return (
    <div className="w-[272px] border-r border-r-neutral-200 px-4 py-3 dark:border-r-neutral-800">
      <div className="py-3">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <Navigation />
    </div>
  )
}
