<script lang="ts">
  import { page } from "$app/state";
  import { tick } from "svelte";
  import * as Sidebar from "kumo-svelte/components/sidebar";

  let hydrationClicks = $state(0);
  let domReport = $state("");
  let theme = $derived(page.url.searchParams.get("theme") === "dark" ? "dark" : "light");
  let navigation = $derived(page.url.searchParams.get("navigation") ?? "none");

  function observation(selector: string) {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) return null;

    return {
      text: element.textContent?.trim(),
      element: element.localName,
      href: element.getAttribute("href"),
      target: element.getAttribute("target"),
      active: element.getAttribute("data-active"),
      disabledAttribute: element.hasAttribute("disabled"),
      disabledState: element.matches(":disabled"),
      type: element.getAttribute("type"),
      ariaCurrent: element.getAttribute("aria-current"),
      dataPart: element.getAttribute("data-kumo-part"),
      dataProbe: element.getAttribute("data-probe"),
      title: element.getAttribute("title"),
    };
  }

  $effect(() => {
    const clicks = hydrationClicks;

    tick().then(() => {
      domReport = JSON.stringify(
        {
          framework: "svelte",
          navigation: new URLSearchParams(location.search).get("navigation"),
          hydrationClicks: clicks,
          cases: {
            defaultLink: observation('a[href*="navigation=default"]'),
            explicitActiveLink: observation('a[href*="navigation=explicit"]'),
            disabledButton: observation('[data-probe="disabled-button"]'),
            disabledLink: observation('a[href*="navigation=disabled-link"]'),
            hydrationButton: observation('[data-probe="hydration-button"]'),
          },
        },
        null,
        2,
      );
    });
  });
</script>

<svelte:head><title>MenuSubButton visual parity — Svelte</title></svelte:head>

<main id="parity-fixture" data-framework="svelte" data-mode={theme}>
  <div id="visual-review">
    <header class="review-header">
      <div>
        <span class="eyebrow">Kumo Svelte · persistent evidence fixture</span>
        <h1>Sidebar.MenuSubButton target parity</h1>
      </div>
      <div class="review-meta">
        <span>{theme} theme</span>
        <span id="navigation-state">navigation: {navigation}</span>
      </div>
    </header>

    <div class="review-stage">
      <section class="sidebar-card" aria-label="Rendered Svelte sidebar cases">
        <div class="card-label">
          <strong>Svelte implementation</strong>
          <span>real Sidebar context</span>
        </div>
        <div class="sidebar-frame">
          <Sidebar.Provider
            contained
            collapsible="none"
            defaultOpen
            mobileBreakpoint={1}
            class="h-full min-h-0!"
          >
            <Sidebar.Root aria-label="Target parity navigation">
              <Sidebar.Header>
                <div class="sidebar-heading">
                  <strong>Navigation</strong>
                  <span>Target behavior</span>
                </div>
              </Sidebar.Header>
              <Sidebar.Content>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Published 2.8 cases</Sidebar.GroupLabel>
                  <Sidebar.Menu>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton>External links</Sidebar.MenuButton>
                      <Sidebar.MenuSub>
                        <Sidebar.MenuSubItem data-case="default">
                          <Sidebar.MenuSubButton
                            href="/parity-menu-sub-button?navigation=default"
                            data-probe="default-link"
                            title="Default target link"
                          >
                            Default target
                          </Sidebar.MenuSubButton>
                        </Sidebar.MenuSubItem>
                        <Sidebar.MenuSubItem data-case="explicit-active">
                          <Sidebar.MenuSubButton
                            href="/parity-menu-sub-button?navigation=explicit"
                            target="_self"
                            active
                            data-probe="explicit-link"
                            title="Explicit target link"
                          >
                            Explicit _self · active
                          </Sidebar.MenuSubButton>
                        </Sidebar.MenuSubItem>
                        <Sidebar.MenuSubItem data-case="disabled-button">
                          <Sidebar.MenuSubButton
                            target="_blank"
                            disabled
                            data-probe="disabled-button"
                            title="Disabled button"
                          >
                            Disabled · no href
                          </Sidebar.MenuSubButton>
                        </Sidebar.MenuSubItem>
                        <Sidebar.MenuSubItem data-case="disabled-link">
                          <Sidebar.MenuSubButton
                            href="/parity-menu-sub-button?navigation=disabled-link"
                            target="_self"
                            disabled
                          >
                            Disabled prop + href
                          </Sidebar.MenuSubButton>
                        </Sidebar.MenuSubItem>
                        <Sidebar.MenuSubItem data-case="hydration">
                          <Sidebar.MenuSubButton
                            data-probe="hydration-button"
                            aria-label="Hydration probe"
                            onclick={() => (hydrationClicks += 1)}
                          >
                            Hydration probe · {hydrationClicks}
                          </Sidebar.MenuSubButton>
                        </Sidebar.MenuSubItem>
                      </Sidebar.MenuSub>
                    </Sidebar.MenuItem>
                  </Sidebar.Menu>
                </Sidebar.Group>
              </Sidebar.Content>
              <Sidebar.Footer>
                <span class="sidebar-footer-label">@cloudflare/kumo 2.8 contract</span>
              </Sidebar.Footer>
            </Sidebar.Root>
          </Sidebar.Provider>
        </div>
      </section>

      <aside class="review-notes" aria-label="Visual review legend">
        <span class="eyebrow">Review legend</span>
        <h2>Matched states</h2>
        <dl>
          <div><dt>Default</dt><dd>Link with omitted target; native same-tab behavior.</dd></div>
          <div><dt>Active</dt><dd>Explicit <code>_self</code> plus <code>data-active="true"</code>.</dd></div>
          <div><dt>Disabled</dt><dd>Native no-href button; supplied target is consumed.</dd></div>
          <div><dt>Interaction</dt><dd>Hover, keyboard focus, hydration click, and navigation recording.</dd></div>
        </dl>
        <output id="hydration-status">hydration-clicks:{hydrationClicks}</output>
      </aside>
    </div>
  </div>

  <details class="dom-details">
    <summary>Hydrated DOM observation</summary>
    <pre id="dom-report">{domReport}</pre>
  </details>
</main>

<style>
  #parity-fixture {
    position: fixed;
    inset: 0;
    z-index: 9999;
    box-sizing: border-box;
    overflow: auto;
    background: var(--color-kumo-canvas);
    color: var(--text-color-kumo-default);
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  }

  #visual-review {
    min-height: 100vh;
    padding: 28px;
  }

  .review-header {
    display: flex;
    max-width: 920px;
    margin: 0 auto 20px;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
  }

  h1,
  h2,
  p {
    margin: 0;
  }

  h1 {
    margin-top: 4px;
    color: var(--text-color-kumo-strong);
    font-size: 24px;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  h2 {
    margin-top: 5px;
    color: var(--text-color-kumo-strong);
    font-size: 18px;
  }

  .eyebrow,
  .review-meta,
  .card-label,
  .sidebar-heading span,
  .sidebar-footer-label {
    color: var(--text-color-kumo-subtle);
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .review-meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 6px 14px;
  }

  .review-stage {
    display: grid;
    max-width: 920px;
    margin: 0 auto;
    grid-template-columns: 322px minmax(0, 1fr);
    gap: 20px;
    align-items: start;
  }

  .sidebar-card,
  .review-notes {
    overflow: hidden;
    border: 1px solid var(--color-kumo-line);
    border-radius: 14px;
    background: var(--color-kumo-base);
    box-shadow: 0 12px 32px var(--color-kumo-shadow-drop);
  }

  .card-label {
    display: flex;
    height: 42px;
    padding: 0 14px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-kumo-line);
  }

  .card-label strong {
    color: var(--text-color-kumo-default);
    font-size: 12px;
  }

  .sidebar-frame {
    height: 470px;
  }

  .sidebar-frame :global([data-sidebar-wrapper]) {
    height: 100%;
  }

  .sidebar-heading {
    display: flex;
    min-width: 0;
    flex-direction: column;
    padding: 0 2px;
  }

  .sidebar-heading strong {
    color: var(--text-color-kumo-strong);
    font-size: 14px;
  }

  .sidebar-footer-label {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .review-notes {
    padding: 24px;
  }

  dl {
    display: grid;
    margin: 22px 0 0;
    gap: 0;
  }

  dl > div {
    display: grid;
    padding: 14px 0;
    grid-template-columns: 88px 1fr;
    gap: 14px;
    border-top: 1px solid var(--color-kumo-line);
  }

  dt {
    color: var(--text-color-kumo-strong);
    font-size: 13px;
    font-weight: 600;
  }

  dd {
    margin: 0;
    color: var(--text-color-kumo-subtle);
    font-size: 13px;
    line-height: 1.5;
  }

  code {
    color: var(--text-color-kumo-default);
    font-family: ui-monospace, monospace;
    font-size: 0.9em;
  }

  #hydration-status {
    display: inline-flex;
    margin-top: 18px;
    border: 1px solid var(--color-kumo-line);
    border-radius: 999px;
    padding: 6px 10px;
    background: var(--color-kumo-tint);
    color: var(--text-color-kumo-default);
    font-family: ui-monospace, monospace;
    font-size: 11px;
  }

  .dom-details {
    max-width: 920px;
    margin: 0 auto 32px;
    padding: 12px 16px;
    color: var(--text-color-kumo-subtle);
    font-size: 12px;
  }

  .dom-details pre {
    white-space: pre-wrap;
    font-size: 11px;
  }

  @media (max-width: 640px) {
    #visual-review {
      padding: 14px;
    }

    .review-header {
      display: block;
      margin-bottom: 14px;
    }

    h1 {
      font-size: 20px;
    }

    .review-meta {
      margin-top: 10px;
      justify-content: flex-start;
    }

    .review-stage {
      display: block;
    }

    .sidebar-card {
      max-width: 322px;
      margin: 0 auto;
    }

    .sidebar-frame {
      height: 430px;
    }

    .review-notes {
      max-width: 322px;
      margin: 14px auto 0;
      padding: 18px;
    }

    dl {
      margin-top: 14px;
    }

    dl > div {
      padding: 10px 0;
      grid-template-columns: 72px 1fr;
      gap: 10px;
    }
  }
</style>
