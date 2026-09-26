// Facts about the park that appear site-wide. Only verified facts from the
// current site live here; anything unconfirmed is marked TODO.

export const SITE = {
  name: 'Palmer Motorsports Park',
  trackName: 'Whiskey Hill Raceway',
  tagline: 'A passion for racing',
  description:
    'Palmer Motorsports Park (Whiskey Hill Raceway) is a private club road course in Palmer, Massachusetts: 2.3 miles, 14 corners and 509 feet of climb.',
  address: {
    street: '58 West Ware Road',
    locality: 'Palmer',
    region: 'MA',
    postalCode: '01069',
    country: 'US',
  },
  mailing: 'P.O. Box 465, Palmer, MA 01069',
  phone: { display: '(413) 967-3560', tel: '+14139673560' },
  tollFree: { display: '(888) 556-7085', tel: '+18885567085' },
  email: 'info@palmermotorsportspark.com',
  officeHours: '8 AM–6 PM',
  // TODO: confirm which days the office is open, then add openingHoursSpecification to JSON-LD.
  officeDays: null as string | null,
  // TODO: add verified latitude/longitude for the gate (used in JSON-LD `geo`).
  geo: null as { latitude: number; longitude: number } | null,
  opened: '2015-05-08',
  social: {
    instagram: 'https://www.instagram.com/palmermotorsportsparkofficial/',
    facebook: 'https://www.facebook.com/PalmerMotorsportsParkOfficial',
  },
  // Utility links point at the existing ASP.NET site until the store and accounts migrate.
  // TODO: confirm exact login / cart / shop URLs on the current site.
  external: {
    login: 'https://www.palmermotorsportspark.com/',
    cart: 'https://www.palmermotorsportspark.com/',
    shop: 'https://www.palmermotorsportspark.com/',
    booking: 'https://www.palmermotorsportspark.com/',
  },
  cartCount: 0,
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=58+West+Ware+Road+Palmer+MA+01069',
} as const;

export const NAV = [
  { label: 'Programs', href: '/programs/' },
  { label: 'Schedule', href: '/schedule/' },
  { label: 'Membership', href: '/membership/' },
  { label: 'Track', href: '/track/' },
  { label: 'Rentals & Corporate', href: '/rentals/' },
  { label: 'Visit', href: '/visit/' },
] as const;

/** Prefix an internal path with the configured base (e.g. /Palmer-MSP). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const [p, rest] = splitSuffix(path);
  const withSlash = p === '' || p.endsWith('/') || /\.[a-z0-9]+$/i.test(p) ? p : `${p}/`;
  return `${base}${withSlash.startsWith('/') ? '' : '/'}${withSlash}${rest}`;
}

function splitSuffix(path: string): [string, string] {
  const i = path.search(/[?#]/);
  return i === -1 ? [path, ''] : [path.slice(0, i), path.slice(i)];
}

/** Absolute URL (for canonical, OG, JSON-LD). */
export function absUrl(path: string, site: URL | undefined): string {
  return new URL(url(path), site ?? 'https://timdailey.github.io').toString();
}
