import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: undefined,
      pages: "build",
      strict: true,
    }),
    alias: {
      "$docs/*": "./src/lib/*",
    },
  },
  preprocess: vitePreprocess(),
};

export default config;
