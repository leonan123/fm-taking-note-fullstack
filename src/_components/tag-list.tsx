import type { NavigationItem } from '@/_constants/navigation'
import { db } from '@/_lib/prisma'
import { auth } from '@clerk/nextjs/server'
import * as NavItem from './nav-item'
import { DeleteTagButton } from './delete-tag-button'

export async function TagList() {
  const { userId } = await auth()

  const tags = await db.tag.findMany({
    where: {
      userId: userId!,
    },
  })

  const TAGS: NavigationItem[] = tags.map((tag) => ({
    label: tag.name,
    href: `/tag/${tag.name}`,
    icon: 'Tag',
    id: tag.id,
  }))

  return (
    <nav className="mt-2">
      <ul className="space-y-1">
        {TAGS.map((tag) => (
          <div key={tag.href} className="group relative">
            <NavItem.Root href={tag.href}>
              <NavItem.Icon name={tag.icon} />
              <NavItem.Label>{tag.label}</NavItem.Label>
            </NavItem.Root>

            <DeleteTagButton tagId={tag.id!} tagName={tag.label} />
          </div>
        ))}
      </ul>
    </nav>
  )
}
