import { Eyebrow } from '@/components/ui'

/** Consistent page header: sits under the fixed nav on every inner page. */
export function PageIntro({
  eyebrow,
  title,
  subtitle,
  tone = 'lumen',
  children,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  tone?: 'lumen' | 'ember'
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bloom absolute inset-0" />
      <div className="relative mx-auto w-full max-w-[88rem] px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h1 className="mt-6 text-[clamp(2.75rem,9vw,6.5rem)]">
          <span className={tone === 'ember' ? 'text-gradient-sunset' : 'text-gradient-lumen'}>
            {title}
          </span>
        </h1>
        {subtitle ? (
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-haze">{subtitle}</p>
        ) : null}
        {children}
      </div>
    </section>
  )
}
