<script lang="ts">
  import { Button } from "kumo-svelte";
  import * as DropdownMenu from "kumo-svelte/components/dropdown";
  import CreditCardIcon from "phosphor-svelte/lib/CreditCardIcon";
  import MoonIcon from "phosphor-svelte/lib/MoonIcon";
  import SignOutIcon from "phosphor-svelte/lib/SignOutIcon";
  import UserIcon from "phosphor-svelte/lib/UserIcon";

  const languages = [
    { code: "de", label: "Deutsch" },
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "fr", label: "Français" },
    { code: "it", label: "Italiano" },
    { code: "pt", label: "Português" },
    { code: "ko", label: "한국어" },
    { code: "ja", label: "日本語" },
    { code: "zh-CN", label: "简体中文" },
    { code: "zh-TW", label: "繁體中文" },
  ];
  const timezones = [
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
  ];
  let language = $state("en");
  let timezone = $state("America/Los_Angeles");
</script>

{#snippet userIcon()}
  <UserIcon size={16} />
{/snippet}

{#snippet cardIcon()}
  <CreditCardIcon size={16} />
{/snippet}

{#snippet moonIcon()}
  <MoonIcon size={16} />
{/snippet}

{#snippet signOutIcon()}
  <SignOutIcon size={16} />
{/snippet}

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} icon={UserIcon}>Account</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item icon={userIcon}>Profile</DropdownMenu.Item>
    <DropdownMenu.Item icon={cardIcon}>Billing</DropdownMenu.Item>
    <DropdownMenu.Item icon={moonIcon}>Dark mode</DropdownMenu.Item>
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger>Language</DropdownMenu.SubTrigger>
      <DropdownMenu.SubContent>
        <DropdownMenu.Group>
          <DropdownMenu.RadioGroup bind:value={language}>
            {#each languages as item}
              <DropdownMenu.RadioItem value={item.code}>{item.label}</DropdownMenu.RadioItem>
            {/each}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Group>
      </DropdownMenu.SubContent>
    </DropdownMenu.Sub>
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger>Set Timezone</DropdownMenu.SubTrigger>
      <DropdownMenu.SubContent>
        <DropdownMenu.Group>
          <DropdownMenu.RadioGroup bind:value={timezone}>
            {#each timezones as item}
              <DropdownMenu.RadioItem value={item.value}>{item.label}</DropdownMenu.RadioItem>
            {/each}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Group>
      </DropdownMenu.SubContent>
    </DropdownMenu.Sub>
    <DropdownMenu.Separator />
    <DropdownMenu.Item icon={signOutIcon} variant="danger">Log out</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
