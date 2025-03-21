'use client'

import type { NavigationItem } from '@/_constants/navigation'
import { ChevronRightIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DynamicIcon, type IconProps } from './dynamic-icon'
import { twMerge } from 'tailwind-merge'
import type { ComponentProps } from 'react'

// type NavItemProps = NavigationItem

// export function NavItem({ label, href, icon }: NavItemProps) {
//   const isActive = usePathname().endsWith(href)

//   return (
//     <li
//       data-active={isActive}
//       className="group relative rounded-lg text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-950 data-[active=true]:text-neutral-950 dark:text-neutral-200 dark:data-[active=true]:bg-neutral-800 dark:data-[active=true]:text-neutral-50 dark:data-[active=false]:hover:bg-neutral-800/50"
//     >
//       <Link href={href} className="flex items-center gap-2 p-3">
//         <DynamicIcon
//           name={icon}
//           size={18}
//           className="group-data-[active=true]:stroke-blue-600"
//         />

//         <span className="flex-1">{label}</span>

//         <ChevronRightIcon
//           size={16}
//           className="hidden group-data-[active=true]:block"
//         />
//       </Link>
//     </li>
//   )
// }

interface RootProps extends ComponentProps<'li'> {
  href: string
}

function Root({ className, href, children, ...props }: RootProps) {
  const isActive = usePathname().endsWith(href)

  return (
    <li
      data-active={isActive}
      className={twMerge(
        'group relative rounded-lg text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-950 data-[active=true]:text-neutral-950 dark:text-neutral-200 dark:data-[active=true]:bg-neutral-800 dark:data-[active=true]:text-neutral-50 dark:data-[active=false]:hover:bg-neutral-800/50',
        className,
      )}
      {...props}
    >
      <Link href={href} className="flex items-center gap-2 p-3">
        {children}

        <ChevronRightIcon
          size={16}
          className="hidden group-data-[active=true]:block"
        />
      </Link>
    </li>
  )
}

function Icon({ name, size = 18, className, ...props }: IconProps) {
  return (
    <DynamicIcon
      name={name}
      size={size}
      className={twMerge('group-data-[active=true]:stroke-blue-600', className)}
      {...props}
    />
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="flex-1">{children}</span>
}

export { Root, Icon, Label }
