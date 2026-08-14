'use client'

import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'

import { buttonClass } from '@/components/ui'

export function CopyButton({
  text,
  label,
  copiedLabel,
}: {
  text: string
  label: string
  copiedLabel: string
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 2200)
    return () => clearTimeout(id)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      // Clipboard access can be blocked (insecure origin, permissions).
      // The text is selectable on the page, so failing quietly is fine.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={buttonClass({ variant: 'outline', size: 'sm' })}
      aria-live="polite"
    >
      {copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
      {copied ? copiedLabel : label}
    </button>
  )
}
