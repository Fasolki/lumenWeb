export type Gig = {
  /** ISO date, e.g. '2026-09-12'. Used for sorting and for the dateline. */
  date: string
  venue: string
  city: string
  country: string
  /** Optional ticket or event link. Omit for private bookings. */
  url?: string
  /** Marks the booking as private so it can be listed without a ticket link. */
  private?: boolean
}

/**
 * Upcoming dates. Add newest-first or in any order — the site sorts by date.
 * Anything already in the past is filtered out of the "upcoming" list
 * automatically, so old entries are safe to leave here as a track record.
 *
 * Example:
 *   { date: '2026-09-12', venue: 'Icon', city: 'Madrid', country: 'Spain' },
 */
export const gigs: Gig[] = []

export function upcomingGigs(now = new Date()): Gig[] {
  const today = now.toISOString().slice(0, 10)
  return gigs
    .filter((g) => g.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function pastGigs(now = new Date()): Gig[] {
  const today = now.toISOString().slice(0, 10)
  return gigs
    .filter((g) => g.date < today)
    .sort((a, b) => b.date.localeCompare(a.date))
}
