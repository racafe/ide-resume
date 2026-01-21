import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import node from "@astrojs/node";

export default defineConfig({
  site: "https://rafaelcarrion.dev",
  integrations: [tailwind(), sitemap()],

  adapter: node({
    mode: "standalone",
  }),
});