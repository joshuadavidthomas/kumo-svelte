import { createHighlighter } from "shiki";

const theme = "vesper";
const highlighter = createHighlighter({
  themes: [theme],
  langs: ["bash", "css", "javascript", "json", "svelte", "typescript"],
});

export async function highlightCode(code: string, lang = "svelte") {
  const instance = await highlighter;
  const loadedLang = instance.getLoadedLanguages().includes(lang) ? lang : "text";
  return instance.codeToHtml(code, { lang: loadedLang, theme });
}
