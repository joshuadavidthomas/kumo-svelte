<script lang="ts">
  import CaretDoubleLeftIcon from "phosphor-svelte/lib/CaretDoubleLeftIcon";
  import CaretDoubleRightIcon from "phosphor-svelte/lib/CaretDoubleRightIcon";
  import CaretLeftIcon from "phosphor-svelte/lib/CaretLeftIcon";
  import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";
  import { cn } from "../../utils/cn";
  import InputGroup from "../input-group/input-group.svelte";
  import InputGroupButton from "../input-group/input-group-button.svelte";
  import InputGroupInput from "../input-group/input-group-input.svelte";
  import Select from "../select/select.svelte";
  import { getPaginationContext } from "./context";
  import {
    KUMO_PAGINATION_DEFAULT_VARIANTS,
    type KumoPaginationControls,
  } from "./variants";

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  export interface PaginationControlsProps {
    class?: string;
    controls?: KumoPaginationControls;
    pageSelector?: "input" | "dropdown";
  }

  let {
    class: className,
    controls = KUMO_PAGINATION_DEFAULT_VARIANTS.controls,
    pageSelector = "input",
  }: PaginationControlsProps = $props();

  const context = getPaginationContext("Controls");
  let pageItems = $derived(
    Array.from({ length: context.maxPage }, (_, index) => {
      const page = index + 1;
      return { label: String(page), value: String(page) };
    }),
  );

  function setPageAndDraft(page: number) {
    context.setPage(page);
    context.setEditingPage(page);
  }

  function commitEditingPage() {
    const clamped = clamp(Number.isFinite(context.editingPage) ? context.editingPage : context.page, 1, context.maxPage);
    setPageAndDraft(clamped);
  }
</script>

<div data-slot="pagination-controls" class={cn("flex grow flex-col items-end", className)}>
  <nav aria-label={context.labels.navigation}>
    <InputGroup focusMode="individual">
      {#if controls === "full"}
        <InputGroupButton
          variant="secondary"
          aria-label={context.labels.firstPage}
          disabled={context.page <= 1}
          onclick={() => setPageAndDraft(1)}
        >
          <CaretDoubleLeftIcon aria-hidden="true" size={16} />
        </InputGroupButton>
      {/if}
      <InputGroupButton
        variant="secondary"
        aria-label={context.labels.previousPage}
        disabled={context.page <= 1}
        onclick={() => setPageAndDraft(Math.max(context.page - 1, 1))}
      >
        <CaretLeftIcon aria-hidden="true" size={16} />
      </InputGroupButton>
      {#if controls === "full"}
        {#if pageSelector === "dropdown"}
          <Select
            aria-label={context.labels.pageNumber}
            class="rounded-none ring-kumo-hairline"
            value={String(context.page)}
            items={pageItems}
            onValueChange={(value) => setPageAndDraft(Number(value))}
          />
        {:else}
          <InputGroupInput
            type="number"
            inputmode="numeric"
            min={1}
            max={context.maxPage}
            style="width: 50px"
            class="text-center"
            aria-label={context.labels.pageNumber}
            value={context.editingPage}
            onValueChange={(value) => context.setEditingPage(Number(value))}
            onblur={commitEditingPage}
            onkeydown={(event) => {
              if (event.key === "Enter") {
                commitEditingPage();
              }
            }}
            autocomplete="off"
            data-1p-ignore
            data-form-type="other"
            data-lpignore="true"
          />
        {/if}
      {/if}
      <InputGroupButton
        variant="secondary"
        aria-label={context.labels.nextPage}
        disabled={context.page === context.maxPage}
        onclick={() => setPageAndDraft(Math.min(context.page + 1, context.maxPage))}
      >
        <CaretRightIcon aria-hidden="true" size={16} />
      </InputGroupButton>
      {#if controls === "full"}
        <InputGroupButton
          variant="secondary"
          aria-label={context.labels.lastPage}
          disabled={context.page === context.maxPage}
          onclick={() => setPageAndDraft(context.maxPage)}
        >
          <CaretDoubleRightIcon aria-hidden="true" size={16} />
        </InputGroupButton>
      {/if}
    </InputGroup>
  </nav>
</div>
