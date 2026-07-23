<script lang="ts">
  import Button from "../../src/components/button/button.svelte";
  import {
    CollapsiblePanel,
    CollapsibleRoot,
    CollapsibleTrigger,
  } from "../../src/components/collapsible";
  import Input from "../../src/components/input/input.svelte";
  import type { ObservableComponent } from "./contracts";

  interface FixtureProps {
    component: ObservableComponent;
    fixtureCase: string;
    record: (event: string) => void;
  }

  let { component, fixtureCase, record }: FixtureProps = $props();
  let inputValue = $state("");
</script>

{#if component === "button" && fixtureCase === "enabled-primary"}
  <Button variant="primary" onclick={() => record("click")}>Save changes</Button>
{:else if component === "button" && fixtureCase === "loading"}
  <Button loading onclick={() => record("click")}>Save changes</Button>
{:else if component === "input" && fixtureCase === "labeled"}
  <Input
    id="contract-email"
    type="email"
    name="email"
    label="Email address"
    description="Used for account alerts."
    required
  />
{:else if component === "input" && fixtureCase === "interactive"}
  <Input
    aria-label="Search query"
    name="query"
    bind:value={inputValue}
    oninput={(event) => record(`input:${event.currentTarget.value}`)}
  />
{:else if component === "collapsible" && fixtureCase === "default"}
  <CollapsibleRoot onOpenChange={(open) => record(`open:${open}`)}>
    <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
    <CollapsiblePanel forceMount>Retention: 30 days</CollapsiblePanel>
  </CollapsibleRoot>
{/if}
