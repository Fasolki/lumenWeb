import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/* -------------------------------------------------------------------------- */

const BUTTON_BASE =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 disabled:opacity-50'

const BUTTON_VARIANTS = {
  primary:
    'bg-lumen text-ink hover:bg-lumen-soft hover:shadow-[0_0_44px_-8px_var(--color-lumen)] active:scale-[0.98]',
  ember:
    'bg-ember text-bone hover:brightness-110 hover:shadow-[0_0_44px_-8px_var(--color-ember)] active:scale-[0.98]',
  outline:
    'border border-line-strong text-bone hover:border-lumen hover:text-lumen active:scale-[0.98]',
  ghost: 'text-haze hover:text-bone',
  dark: 'bg-ink text-bone hover:bg-ink-3 active:scale-[0.98]',
} as const

const BUTTON_SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm tracking-wide',
  lg: 'px-8 py-4 text-base',
} as const

type ButtonStyleProps = {
  variant?: keyof typeof BUTTON_VARIANTS
  size?: keyof typeof BUTTON_SIZES
}

export function buttonClass({ variant = 'primary', size = 'md' }: ButtonStyleProps = {}) {
  return cn(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size])
}

export function CTA({
  href,
  variant,
  size,
  className,
  children,
  external,
  ...rest
}: ButtonStyleProps & {
  href: string
  className?: string
  children: ReactNode
  external?: boolean
} & Omit<ComponentProps<'a'>, 'href'>) {
  const classes = cn(buttonClass({ variant, size }), className)

  // mailto:, tel: and wa.me links must not go through the client router.
  const isExternal =
    external ?? (/^(https?:|mailto:|tel:)/.test(href) || href.startsWith('//'))

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith('http')
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  )
}

/* -------------------------------------------------------------------------- */

export function Eyebrow({
  children,
  className,
  tone = 'lumen',
}: {
  children: ReactNode
  className?: string
  tone?: 'lumen' | 'ember' | 'ink'
}) {
  const tones = {
    lumen: 'text-lumen',
    ember: 'text-ember',
    ink: 'text-ink/60',
  }

  return (
    <p
      className={cn(
        'flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em]',
        tones[tone],
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-current opacity-50" />
      {children}
    </p>
  )
}

export function Section({
  children,
  className,
  id,
  width = 'default',
}: {
  children: ReactNode
  className?: string
  id?: string
  width?: 'default' | 'wide' | 'narrow' | 'full'
}) {
  const widths = {
    narrow: 'max-w-3xl',
    default: 'max-w-6xl',
    wide: 'max-w-[88rem]',
    full: 'max-w-none',
  }

  return (
    <section id={id} className={cn('relative px-5 py-24 sm:px-8 md:py-32', className)}>
      <div className={cn('mx-auto w-full', widths[width])}>{children}</div>
    </section>
  )
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  tone = 'lumen',
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  tone?: 'lumen' | 'ember' | 'ink'
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      data-reveal
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2 className="text-[clamp(2.25rem,6vw,4.25rem)]">{title}</h2>
      {subtitle ? (
        <p
          className={cn(
            'text-lg leading-relaxed text-haze',
            align === 'center' ? 'max-w-2xl' : 'max-w-2xl',
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

export function Beam({ className }: { className?: string }) {
  return <div aria-hidden className={cn('beam w-full', className)} />
}
