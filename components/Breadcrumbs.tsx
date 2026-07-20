// components/Breadcrumbs.tsx
// Vidljiva breadcrumb navigacija u stilu sajta.
// (BreadcrumbList schema se dodaje u [slug]/page.tsx da ne bi bila duplirana.)

import Link from 'next/link'

type Crumb = { name: string; href: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((c, i) => {
          const last = i === items.length - 1
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-gray-500 font-medium">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link
                    href={c.href}
                    className="text-[#7E8D67] font-medium hover:underline"
                  >
                    {c.name}
                  </Link>
                  <span aria-hidden="true" className="text-gray-300">›</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
