import { createHighlighter } from "shiki";

const themes = {
  light: "github-light",
  dark: "vesper",
};
const highlighter = createHighlighter({
  themes: [themes.light, themes.dark],
  langs: ["bash", "css", "javascript", "json", "svelte", "typescript"],
});

export async function highlightCode(code: string, lang = "svelte") {
  const instance = await highlighter;
  const loadedLang = instance.getLoadedLanguages().includes(lang) ? lang : "text";
  return instance.codeToHtml(code, { lang: loadedLang, themes, defaultColor: false });
}
