<script lang="ts">
  interface Props {
    markdown: string;
  }

  type ChangelogBlock =
    | { type: "heading"; depth: 2 | 3; id: string; html: string }
    | { type: "list"; items: string[] }
    | { type: "paragraph"; html: string };

  let { markdown }: Props = $props();

  const blocks = $derived(parseChangelogMarkdown(markdown));

  function parseChangelogMarkdown(source: string): ChangelogBlock[] {
    const blocks: ChangelogBlock[] = [];
    const seen = new Map<string, number>();
    let paragraph: string[] = [];
    let listItems: string[] = [];

    function flushParagraph() {
      if (paragraph.length === 0) return;

      blocks.push({ type: "paragraph", html: renderInline(paragraph.join(" ")) });
      paragraph = [];
    }

    function flushList() {
      if (listItems.length === 0) return;

      blocks.push({ type: "list", items: listItems.map(renderInline) });
      listItems = [];
    }

    function headingId(text: string) {
      const baseId = slugify(stripInlineMarkdown(text));
      const count = seen.get(baseId) ?? 0;
      seen.set(baseId, count + 1);

      return count === 0 ? baseId : `${baseId}-${count}`;
    }

    for (const line of source.replace(/\r\n/g, "\n").split("\n")) {
      if (/^\s*$/.test(line)) {
        flushParagraph();
        flushList();
        continue;
      }

      const heading = line.match(/^(#{2,3})\s+(.+)$/);
      if (heading) {
        flushParagraph();
        flushList();

        const text = heading[2].trim();
        blocks.push({
          type: "heading",
          depth: heading[1].length as 2 | 3,
          id: headingId(text),
          html: renderInline(text),
        });
        continue;
      }

      const listItem = line.match(/^-\s+(.+)$/);
      if (listItem) {
        flushParagraph();
        listItems.push(listItem[1]);
        continue;
      }

      if (/^\s+/.test(line) && listItems.length > 0) {
        listItems[listItems.length - 1] += ` ${line.trim()}`;
        continue;
      }

      if (/^\[[^\]]+\]:\s+/.test(line)) continue;

      flushList();
      paragraph.push(line.trim());
    }

    flushParagraph();
    flushList();

    return blocks;
  }

  function renderInline(text: string) {
    const tokens = /(`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
    let html = "";
    let cursor = 0;

    for (const match of text.matchAll(tokens)) {
      html += escapeHtml(text.slice(cursor, match.index));

      if (match[2]) {
        html += `<code>${escapeHtml(match[2])}</code>`;
      } else if (match[3]) {
        html += `<strong>${escapeHtml(match[3])}</strong>`;
      } else {
        const label = escapeHtml(match[4]);
        const href = match[5];
        const attributes = /^https?:\/\//.test(href)
          ? ' target="_blank" rel="noopener noreferrer"'
          : "";

        html += `<a href="${escapeAttribute(href)}"${attributes}>${label}</a>`;
      }

      cursor = (match.index ?? 0) + match[0].length;
    }

    html += escapeHtml(text.slice(cursor));

    return html;
  }

  function stripInlineMarkdown(text: string) {
    return text
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\[([^\]]+)\]/g, "$1")
      .replace(/<[^>]+>/g, "")
      .trim();
  }

  function slugify(text: string) {
    return text
      .toLowerCase()
      .replace(/[^\p{Letter}\p{Mark}\p{Decimal_Number} _-]/gu, "")
      .replace(/ /g, "-");
  }

  function escapeHtml(text: string) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttribute(text: string) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
</script>

{#each blocks as block}
  {#if block.type === "heading"}
    {#if block.depth === 2}
      <h2 id={block.id}>{@html block.html}</h2>
    {:else}
      <h3 id={block.id}>{@html block.html}</h3>
    {/if}
  {:else if block.type === "paragraph"}
    <p>{@html block.html}</p>
  {:else}
    <ul>
      {#each block.items as item}
        <li>{@html item}</li>
      {/each}
    </ul>
  {/if}
{/each}
