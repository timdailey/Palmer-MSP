// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages serves this repo at https://timdailey.github.io/Palmer-MSP/.
// When the site moves to its own domain, set SITE_URL=https://www.palmermotorsportspark.com
// and BASE_PATH=/ (see README → Deploy).
const site = process.env.SITE_URL ?? 'https://timdailey.github.io';
const base = process.env.BASE_PATH ?? '/Palmer-MSP';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory' },
});
