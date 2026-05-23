<script lang="ts">
  import { apiDocs, type ApiComponentDoc } from "$lib/generated/api-docs";

  interface Props {
    components?: string[];
    exclude?: string[];
    family?: string;
  }

  let { components = [], exclude = [], family }: Props = $props();

  let requestedEntries = $derived.by(() => {
    const excluded = new Set(exclude);

    if (components.length > 0) {
      return components
        .map(findComponent)
        .filter(isComponentDoc)
        .filter((entry) => !excluded.has(entry.name));
    }

    return apiDocs
      .filter((entry) => entry.family === family && !excluded.has(entry.name))
      .sort(compareComponents);
  });

  function findComponent(name: string) {
    return apiDocs.find((entry) => entry.name === name);
  }

  function isComponentDoc(entry: ApiComponentDoc | undefined): entry is ApiComponentDoc {
    return entry !== undefined;
  }

  function compareComponents(a: ApiComponentDoc, b: ApiComponentDoc) {
    const aIsRoot = a.name === a.family;
    const bIsRoot = b.name === b.family;

    if (aIsRoot && !bIsRoot) return -1;
    if (!aIsRoot && bIsRoot) return 1;
    return a.name.localeCompare(b.name);
  }

  function defaultText(defaultValue: string | undefined) {
    return defaultValue === undefined ? "—" : defaultValue;
  }

  function hasDescriptions(component: ApiComponentDoc) {
    return component.props.some((prop) => prop.description !== undefined);
  }
</script>

{#if requestedEntries.length > 0}
  <div class="not-prose space-y-8">
    {#each requestedEntries as component (component.name)}
      <section class="space-y-3" aria-labelledby={component.name}>
        <div class="space-y-1">
          <h3 id={component.name} class="scroll-mt-24 text-lg font-semibold text-kumo-strong">
            {component.name}
          </h3>
          {#if component.description}
            <p class="text-sm text-kumo-subtle">{component.description}</p>
          {/if}
        </div>

        {#if component.props.length > 0}
          <div class="overflow-x-auto rounded-lg border border-kumo-hairline">
            <table class="w-full text-left text-sm">
              <thead class="border-b border-kumo-hairline bg-kumo-surface-subtle text-kumo-strong">
                <tr>
                  <th class="px-4 py-3 font-semibold">Prop</th>
                  <th class="px-4 py-3 font-semibold">Type</th>
                  <th class="px-4 py-3 font-semibold">Default</th>
                  {#if hasDescriptions(component)}
                    <th class="px-4 py-3 font-semibold">Description</th>
                  {/if}
                </tr>
              </thead>
              <tbody>
                {#each component.props as prop (prop.name)}
                  <tr class="border-b border-kumo-hairline last:border-b-0">
                    <td class="px-4 py-3 align-top font-mono text-xs text-kumo-strong">
                      {prop.name}{#if prop.required}<span class="ml-0.5 text-kumo-danger">*</span>{/if}
                    </td>
                    <td class="max-w-sm px-4 py-3 align-top font-mono text-xs text-kumo-strong">
                      <code class="break-words whitespace-pre-wrap">{prop.type}</code>
                    </td>
                    <td class="px-4 py-3 align-top font-mono text-xs text-kumo-strong">
                      {#if prop.default === undefined}
                        —
                      {:else}
                        <code>{defaultText(prop.default)}</code>
                      {/if}
                    </td>
                    {#if hasDescriptions(component)}
                      <td class="max-w-md px-4 py-3 align-top text-xs text-kumo-subtle">
                        {prop.description ?? "—"}
                      </td>
                    {/if}
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {:else}
          <p class="rounded-lg border border-kumo-hairline px-4 py-3 text-sm text-kumo-subtle">
            No component-specific props. This component accepts child content or standard forwarded attributes.
          </p>
        {/if}
      </section>
    {/each}
  </div>
{:else}
  <p class="text-sm text-kumo-subtle">No generated API docs found.</p>
{/if}
