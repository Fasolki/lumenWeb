import { Plus } from 'lucide-react'

/**
 * Built on <details>/<summary> so it is keyboard accessible, screen-reader
 * correct and fully functional before any JavaScript loads.
 */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-[color:var(--color-line)] border-y border-line">
      {items.map((item) => (
        <details key={item.q} data-reveal className="group" name="faq">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left transition [&::-webkit-details-marker]:hidden">
            <span className="font-display text-xl font-bold tracking-tight transition group-hover:text-lumen sm:text-2xl">
              {item.q}
            </span>
            <span
              aria-hidden
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-haze transition duration-300 group-open:rotate-45 group-open:border-lumen group-open:text-lumen"
            >
              <Plus size={16} />
            </span>
          </summary>
          <p className="max-w-3xl pb-7 leading-relaxed text-haze">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
