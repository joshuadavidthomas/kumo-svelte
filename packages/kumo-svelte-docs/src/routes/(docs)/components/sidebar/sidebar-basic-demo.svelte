<script lang="ts">
  import ChartBarIcon from "phosphor-svelte/lib/ChartBarIcon";
  import CodeIcon from "phosphor-svelte/lib/CodeIcon";
  import DatabaseIcon from "phosphor-svelte/lib/DatabaseIcon";
  import GlobeIcon from "phosphor-svelte/lib/GlobeIcon";
  import HouseIcon from "phosphor-svelte/lib/HouseIcon";
  import type { Component } from "svelte";
  import * as Sidebar from "kumo-svelte/components/sidebar";
  import DemoShell from "./sidebar-demo-shell.svelte";
  import DemoMain from "./sidebar-main.svelte";

  interface MenuItem {
    active?: boolean;
    icon: Component;
    label: string;
  }

  const overviewItems: MenuItem[] = [
    { label: "Home", icon: HouseIcon, active: true },
    { label: "Analytics", icon: ChartBarIcon },
    { label: "Domains", icon: GlobeIcon },
  ];

  const computeItem = { label: "Compute", icon: CodeIcon } satisfies MenuItem;
  const buildItems: MenuItem[] = [{ label: "Storage", icon: DatabaseIcon }];
  const workersPagesItems = ["Overview", "Workers", "Pages"];
  const computeItems = ["Durable Objects"];
</script>

<DemoShell>
  <Sidebar.Provider contained defaultOpen class="h-full min-h-0!">
    <Sidebar.Root>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Overview</Sidebar.GroupLabel>
          <Sidebar.Menu>
            {#each overviewItems as item (item.label)}
              {@const Icon = item.icon}
              <Sidebar.MenuButton active={item.active}>
                {#snippet icon()}<Icon />{/snippet}
                {item.label}
              </Sidebar.MenuButton>
            {/each}
          </Sidebar.Menu>
        </Sidebar.Group>

        <Sidebar.Group>
          <Sidebar.GroupLabel>Build</Sidebar.GroupLabel>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.Collapsible open>
                <Sidebar.CollapsibleTrigger>
                  {#snippet child({ props })}
                    {@const Icon = computeItem.icon}
                    <Sidebar.MenuButton {...props}>
                      {#snippet icon()}<Icon />{/snippet}
                      {computeItem.label} <Sidebar.MenuChevron />
                    </Sidebar.MenuButton>
                  {/snippet}
                </Sidebar.CollapsibleTrigger>
                <Sidebar.CollapsibleContent>
                  <Sidebar.MenuSub>
                    <Sidebar.MenuSubItem>
                      <Sidebar.Collapsible>
                        <Sidebar.CollapsibleTrigger>
                          {#snippet child({ props })}
                            <Sidebar.MenuSubButton {...props}>
                              Workers & Pages <Sidebar.MenuChevron />
                            </Sidebar.MenuSubButton>
                          {/snippet}
                        </Sidebar.CollapsibleTrigger>
                        <Sidebar.CollapsibleContent>
                          <Sidebar.MenuSub>
                            {#each workersPagesItems as label (label)}
                              <Sidebar.MenuSubButton>{label}</Sidebar.MenuSubButton>
                            {/each}
                          </Sidebar.MenuSub>
                        </Sidebar.CollapsibleContent>
                      </Sidebar.Collapsible>
                    </Sidebar.MenuSubItem>
                    {#each computeItems as label (label)}
                      <Sidebar.MenuSubButton>{label}</Sidebar.MenuSubButton>
                    {/each}
                  </Sidebar.MenuSub>
                </Sidebar.CollapsibleContent>
              </Sidebar.Collapsible>
            </Sidebar.MenuItem>

            {#each buildItems as item (item.label)}
              {@const Icon = item.icon}
              <Sidebar.MenuButton active={item.active}>
                {#snippet icon()}<Icon />{/snippet}
                {item.label}
              </Sidebar.MenuButton>
            {/each}
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Root>
    <DemoMain />
  </Sidebar.Provider>
</DemoShell>
