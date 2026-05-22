<script lang="ts">
  import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
  import QuestionIcon from "phosphor-svelte/lib/QuestionIcon";
  import * as InputGroup from "kumo-svelte/components/input-group";
  const sizes = [
    ["xs", "Extra Small", "Extra small input"],
    ["sm", "Small", "Small input"],
    ["base", "Base (default)", "Base input"],
    ["lg", "Large", "Large input"],
  ] as const;
</script>

<div class="flex w-full max-w-3xs flex-col gap-4">
  {#each sizes as [size, label, placeholder]}
    <InputGroup.Root {size} {label}>
      <InputGroup.Addon>
        <MagnifyingGlassIcon />
      </InputGroup.Addon>
      <InputGroup.Input {placeholder} />
      <InputGroup.Addon align="end" containsButton>
        <InputGroup.Button class="text-kumo-subtle" shape="square" aria-label="Help">
          <QuestionIcon />
        </InputGroup.Button>
      </InputGroup.Addon>
    </InputGroup.Root>
  {/each}
</div>
