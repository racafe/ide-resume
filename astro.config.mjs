import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import node from "@astrojs/node";

// Tailwind 3 runs through PostCSS (postcss.config.mjs).
export default defineConfig({
  site: "https://rafaelcarrion.dev",
  integrations: [sitemap()],
  // Astro 7 changed the default to "jsx"; keep the Astro 5 whitespace handling.
  compressHTML: true,

  adapter: node({
    mode: "standalone",
  }),
});
