import { SITE, absUrl } from './site';

/** Site-wide SportsActivityLocation JSON-LD. */
export function locationSchema(site: URL | undefined) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    '@id': absUrl('/#location', site),
    name: SITE.name,
    alternateName: SITE.trackName,
    description: SITE.description,
    url: absUrl('/', site),
    logo: absUrl('/logo-on-light.png', site),
    image: absUrl('/og/default.png', site),
    telephone: SITE.phone.tel,
    email: SITE.email,
    foundingDate: SITE.opened,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    publicAccess: false,
    sameAs: [SITE.social.facebook, SITE.social.instagram],
  };
  if (SITE.geo) {
    data.geo = { '@type': 'GeoCoordinates', ...SITE.geo };
  }
  if (SITE.officeDays) {
    data.openingHours = `${SITE.officeDays} 08:00-18:00`;
  }
  return data;
}

export type Crumb = { name: string; href: string };

export function breadcrumbSchema(crumbs: Crumb[], site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absUrl(c.href, site),
    })),
  };
}

export function locationRef(site: URL | undefined) {
  return {
    '@type': 'Place',
    name: SITE.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    url: absUrl('/', site),
  };
}
