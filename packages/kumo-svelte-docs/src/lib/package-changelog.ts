import packageChangelog from "../../../kumo-svelte/CHANGELOG.md?raw";

export const packageChangelogMarkdown = packageChangelog;
export const docsChangelogMarkdown = changelogBody(packageChangelog);

function changelogBody(markdown: string) {
  const withoutComments = markdown.replace(/<!--[\s\S]*?-->/g, "").trim();
  const firstVersionHeading = withoutComments.search(/^##\s+/m);

  if (firstVersionHeading === -1) return withoutComments;

  return withoutComments.slice(firstVersionHeading).trim();
}
