import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

export const LEVELS = ['first-time', 'some-track-days', 'signed-off'] as const;
export const EVENT_TYPES = ['club', 'open', 'hpde', 'member', 'lapping', 'ot', 'test', 'rental'] as const;

/** Driving programs: one Markdown file per program in src/content/programs/. */
const programs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    whoFor: z.string(),
    youDrive: z.string(),
    /** Display price. Use "[PRICE]" until the real number is confirmed. */
    price: z.string(),
    /** Numeric price in USD, only when confirmed. Enables Product/Offer JSON-LD. */
    priceValue: z.number().optional(),
    /** Short card line for mobile, e.g. "First-timers · your car + instructor". */
    cardLine: z.string(),
    levels: z.array(z.enum(LEVELS)),
    /** Show in the "Find your session" table on the homepage. */
    showInFinder: z.boolean().default(true),
    /** Event type used to list upcoming dates on the program page. */
    eventType: z.enum(EVENT_TYPES).optional(),
  }),
});

/** Calendar: one Markdown file per event in src/content/events/. The file name is the URL. */
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(EVENT_TYPES),
    /** First day (YYYY-MM-DD). Omit and set dateTBD: true when not yet scheduled. */
    start: z.coerce.date().optional(),
    /** Last day for multi-day events (YYYY-MM-DD). */
    end: z.coerce.date().optional(),
    dateTBD: z.boolean().default(false),
    /** Short line under the title, e.g. "Club event" or "Members only". */
    subtitle: z.string(),
    organizer: z.string().optional(),
    /** Gate time shown in the live status bar when the event is on today. */
    gate: z.string().default('Gate opens 7 AM'),
    /** Buster's (on-site food) note for the status bar. */
    food: z.string().optional(),
    /** Registration link. Omit for club events run by an outside organizer. */
    registerUrl: z.string().optional(),
    registerLabel: z.string().default('Register'),
    program: z.string().optional(),
    description: z.string(),
  }),
});

/** Evergreen pages (policies, requirements, legal) in src/content/pages/. */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

/** Membership types in src/content/membership.yaml. */
const membership = defineCollection({
  loader: file('./src/content/membership.yaml'),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    summary: z.string(),
    price: z.string(),
    priceValue: z.number().optional(),
  }),
});

export const collections = { programs, events, pages, membership };
