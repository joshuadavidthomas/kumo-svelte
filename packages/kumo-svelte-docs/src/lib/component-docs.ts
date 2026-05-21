import * as v from "valibot";

export interface DocsNavItem {
  href: string;
  label: string;
}

export interface ComponentDocsNavItem extends DocsNavItem {
  description: string;
  slug: string;
}

export const componentMetadataSchema = v.object({
  description: v.pipe(v.string(), v.nonEmpty()),
  primitive: v.optional(v.string()),
  sourceFile: v.optional(v.string()),
  title: v.pipe(v.string(), v.nonEmpty()),
});

export type ComponentPageMetadata = v.InferOutput<typeof componentMetadataSchema>;

const metadataModules = import.meta.glob<ComponentPageMetadata>(
  "../routes/**/components/*/+page.svx",
  {
    eager: true,
    import: "metadata",
  },
);

const navLabelOverrides: Record<string, string> = {
  "cloudflare-logo": "Cloudflare Logo",
  "command-palette": "Command Palette",
  "date-picker": "Date Picker",
  dropdown: "Dropdown",
};

export const componentItems: ComponentDocsNavItem[] = Object.entries(metadataModules)
  .map(([path, metadata]) => {
    const slug = slugFromPagePath(path);
    const page = parseComponentMetadata(slug, metadata);
    return {
      description: page.description,
      href: `/components/${slug}`,
      label: navLabelOverrides[slug] ?? page.title,
      slug,
    };
  })
  .sort((a, b) => a.label.localeCompare(b.label));

export function slugFromPagePath(path: string) {
  const slug = path.match(/\/components\/([^/]+)\/\+page\.svx$/)?.[1];
  if (!slug) {
    throw new Error(`Could not derive component slug from ${path}`);
  }
  return slug;
}

export function parseComponentMetadata(slug: string, metadata: unknown) {
  const result = v.safeParse(componentMetadataSchema, metadata);
  if (result.success) {
    return result.output;
  }

  throw new Error(
    `Invalid frontmatter for component docs page "${slug}": ${v.summarize(result.issues)}`,
  );
}
