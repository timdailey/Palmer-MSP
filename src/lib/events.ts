import { getCollection, type CollectionEntry } from 'astro:content';

export type EventEntry = CollectionEntry<'events'>;

export const EVENT_TYPE_LABELS: Record<EventEntry['data']['type'], string> = {
  club: 'Club event',
  open: 'Open event',
  hpde: 'Driving school',
  member: 'Member day',
  lapping: 'Open lapping',
  ot: 'OT Laps',
  test: 'Test / tune',
  rental: 'Private rental',
};

const TZ = 'America/New_York';

/** YYYY-MM-DD for a date stored as UTC midnight (how YAML dates load). */
export const isoDay = (d: Date) => d.toISOString().slice(0, 10);

/**
 * "Today" at the track, in Eastern time. The site is static, so this is the
 * build date; the deploy workflow rebuilds daily and a small script in
 * StatusBar hides stale "on track now" notices between builds.
 */
export function todayAtTrack(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

export const startDay = (e: EventEntry) => (e.data.start ? isoDay(e.data.start) : null);
export const endDay = (e: EventEntry) => (e.data.end ? isoDay(e.data.end) : startDay(e));

export function isOn(e: EventEntry, today = todayAtTrack()): boolean {
  const s = startDay(e);
  const end = endDay(e);
  return !!s && !!end && s <= today && today <= end;
}

export function isPast(e: EventEntry, today = todayAtTrack()): boolean {
  const end = endDay(e);
  return !!end && end < today;
}

/** All events, dated ones chronologically first, TBD ones after. */
export async function getEvents(): Promise<EventEntry[]> {
  const all = await getCollection('events');
  return all.sort((a, b) => {
    const sa = startDay(a);
    const sb = startDay(b);
    if (sa && sb) return sa.localeCompare(sb);
    if (sa) return -1;
    if (sb) return 1;
    return a.data.title.localeCompare(b.data.title);
  });
}

/** Events that are on today or later (including TBD dates). */
export async function getUpcoming(limit?: number): Promise<EventEntry[]> {
  const today = todayAtTrack();
  const list = (await getEvents()).filter((e) => !isPast(e, today));
  return limit ? list.slice(0, limit) : list;
}

export async function getToday(): Promise<EventEntry | undefined> {
  const today = todayAtTrack();
  return (await getEvents()).find((e) => isOn(e, today));
}

const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...opts }).format(d);

/** Compact label for lists: "SEP 25–27", "OCT 18 · SUN", "[DATE]". */
export function shortDate(e: EventEntry): string {
  const { start, end } = e.data;
  if (!start) return '[DATE]';
  const mon = fmt(start, { month: 'short' }).toUpperCase();
  const day = fmt(start, { day: 'numeric' });
  if (end && isoDay(end) !== isoDay(start)) {
    const sameMonth = fmt(end, { month: 'short' }) === fmt(start, { month: 'short' });
    const endLabel = sameMonth ? fmt(end, { day: 'numeric' }) : `${fmt(end, { month: 'short' }).toUpperCase()} ${fmt(end, { day: 'numeric' })}`;
    return `${mon} ${day}–${endLabel}`;
  }
  return `${mon} ${day} · ${fmt(start, { weekday: 'short' }).toUpperCase()}`;
}

/** Sentence-case range: "Sep 25–27", "Sun Oct 18". */
export function humanDate(e: EventEntry): string {
  const { start, end } = e.data;
  if (!start) return 'Date to be announced';
  if (end && isoDay(end) !== isoDay(start)) {
    const sameMonth = fmt(end, { month: 'short' }) === fmt(start, { month: 'short' });
    return `${fmt(start, { month: 'short', day: 'numeric' })}–${sameMonth ? fmt(end, { day: 'numeric' }) : fmt(end, { month: 'short', day: 'numeric' })}`;
  }
  return fmt(start, { weekday: 'short', month: 'short', day: 'numeric' });
}

/** Full date for detail pages: "Friday, September 25 – Sunday, September 27, 2026". */
export function longDate(e: EventEntry): string {
  const { start, end } = e.data;
  if (!start) return 'Date to be announced';
  const o: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  if (end && isoDay(end) !== isoDay(start)) {
    return `${fmt(start, o)} – ${fmt(end, { ...o, year: 'numeric' })}`;
  }
  return fmt(start, { ...o, year: 'numeric' });
}
