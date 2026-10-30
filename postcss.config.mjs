// Tailwind 3 via PostCSS. Replaces @astrojs/tailwind, which does not support Astro 6+;
// it registered exactly these two plugins. Moving to Tailwind 4 is a separate migration.
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [tailwindcss(), autoprefixer()],
};
