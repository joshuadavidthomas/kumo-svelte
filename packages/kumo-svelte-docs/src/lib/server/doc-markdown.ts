export function markdownFromSource(source: string) {
  return source
    .replace(/^---[\s\S]*?---\s*/, "")
    .replace(/^<script[\s\S]*?<\/script>\s*/, "")
    .trim();
}
