// @ts-check
import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: "https://astro-myblog.netlify.app",
  // integrations: [preact(),react()],
  integrations: [
    preact({
      include: ['**/preact/*'],
    }),
    react({
      include: ['**/react/*'],
      // experimentalReactChildren: true,
      // experimentalDisableStreaming: true,
    }),
    // solid({
    //   include: ['**/solid/*'],
    // }),
  ],
  devToolbar: {
    enabled: false
  },
  
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ["es", "en", "pt-br"],
    defaultLocale: "en",
  },
  
});