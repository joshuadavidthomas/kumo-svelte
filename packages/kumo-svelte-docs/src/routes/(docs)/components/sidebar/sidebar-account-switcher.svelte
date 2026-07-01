<script lang="ts">
  import CaretUpDownIcon from "phosphor-svelte/lib/CaretUpDownIcon";
  import CubeIcon from "phosphor-svelte/lib/CubeIcon";
  import StackIcon from "phosphor-svelte/lib/StackIcon";
  import StackSimpleIcon from "phosphor-svelte/lib/StackSimpleIcon";
  import * as DropdownMenu from "kumo-svelte/components/dropdown";

  type AccountId = "company" | "personal" | "staging";

  interface Account {
    icon: typeof CubeIcon;
    id: AccountId;
    name: string;
  }

  const accounts: Account[] = [
    { id: "company", name: "Company", icon: CubeIcon },
    { id: "personal", name: "Personal", icon: StackIcon },
    { id: "staging", name: "Staging", icon: StackSimpleIcon },
  ];

  let active = $state<AccountId>("company");
  let activeAccount = $derived(accounts.find((account) => account.id === active) ?? accounts[0]);
  let ActiveIcon = $derived(activeAccount.icon);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <button
        {...props}
        type="button"
        class="flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-kumo-default outline-none transition-[padding,background-color] duration-250 ease-[cubic-bezier(0.77,0,0.175,1)] hover:bg-kumo-tint focus-visible:ring-1 focus-visible:ring-kumo-line group-data-[state=collapsed]/sidebar:px-2"
      >
        <ActiveIcon class="size-4 text-kumo-brand" weight="duotone" />
        <span class="min-w-0 flex-1 truncate group-data-[state=collapsed]/sidebar:hidden">
          {activeAccount.name}
        </span>
        <span
          class="shrink-0 overflow-hidden transition-[width] duration-250 ease-[cubic-bezier(0.77,0,0.175,1)] group-data-[state=collapsed]/sidebar:w-0"
        >
          <CaretUpDownIcon class="size-4 text-kumo-subtle" />
        </span>
      </button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-(--bits-dropdown-menu-anchor-width)">
    {#each accounts as account (account.id)}
      {@const Icon = account.icon}
      <DropdownMenu.Item class="gap-2" selected={account.id === active} onclick={() => (active = account.id)}>
        {#snippet icon()}
          <Icon class="size-4 text-kumo-brand" weight="duotone" />
        {/snippet}
        {account.name}
      </DropdownMenu.Item>
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>
