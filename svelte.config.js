import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-cloudflare-workers";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  checkOrigin: true,
  kit: {
    alias: { $lib: "./src/lib/", $components: "./src/lib/components/" },
    adapter: adapter(),
  },

  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;
