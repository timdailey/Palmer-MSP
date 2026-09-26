import { getCollection, type CollectionEntry } from 'astro:content';

export type ProgramEntry = CollectionEntry<'programs'>;

export const LEVEL_FILTERS = [
  { value: 'first-time', label: 'Never been on track', short: 'First time' },
  { value: 'some-track-days', label: 'Some track days', short: 'Some track days' },
  { value: 'signed-off', label: 'Signed-off / racing', short: 'Signed-off / racing' },
] as const;

export async function getPrograms(): Promise<ProgramEntry[]> {
  return (await getCollection('programs')).sort((a, b) => a.data.order - b.data.order);
}

export const isPlaceholder = (s: string) => /\[[A-Z ]+\]/i.test(s);
