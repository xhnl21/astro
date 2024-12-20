// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  site: 'http://stargazers.club',
  output: 'server',
  integrations: [vue(), tailwind(), sitemap(), db()]
});