import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { escapeSvelte, mdsvex } from "mdsvex";
import rehypeSlug from "rehype-slug";
import { createHighlighter } from "shiki";

const theme = "vesper";
const highlighter = await createHighlighter({
  themes: [theme],
  langs: ["bash", "css", "javascript", "json", "svelte", "typescript"],
});

/** @type {import("@sveltejs/kit").Config} */
const config = {
  extensions: [".svelte", ".svx", ".md"],
  kit: {
    adapter: adapter(),
  },
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: [".svx", ".md"],
      highlight: {
        highlighter: async (code, lang = "text") => {
          const loadedLang = highlighter.getLoadedLanguages().includes(lang) ? lang : "text";
          const html = escapeSvelte(highlighter.codeToHtml(code, { lang: loadedLang, theme }));
          return `{@html \`${html}\`}`;
        },
      },
      rehypePlugins: [rehypeSlug],
    }),
  ],
};

export default config;
