<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, safeRandomId } from "../../utils/cn";
  import Field from "../field/field.svelte";
  import type { FieldErrorMatch } from "../field";
  import { normalizeFieldError } from "../field";
  import { inputVariants, type KumoInputSize } from "../input";
  import {
    INPUT_GROUP_HAS_CLASSES,
    setInputGroupContext,
    type InputGroupFocusMode,
  } from "./context";
  import { KUMO_INPUT_GROUP_DEFAULT_VARIANTS } from "./variants";

  export interface InputGroupProps extends Omit<HTMLAttributes<HTMLElement>, "class" | "children"> {
    children: Snippet;
    class?: string;
    description?: Snippet | string;
    disabled?: boolean;
    error?: string | { message: Snippet | string; match: FieldErrorMatch };
    focusMode?: InputGroupFocusMode;
    label?: Snippet | string;
    labelTooltip?: Snippet;
    required?: boolean;
    size?: KumoInputSize;
  }

  let {
    children,
    class: className,
    description,
    disabled = false,
    error,
    focusMode = "container",
    label,
    labelTooltip,
    required,
    size = KUMO_INPUT_GROUP_DEFAULT_VARIANTS.size,
    ...restProps
  }: InputGroupProps = $props();

  let generatedId = safeRandomId();
  let inputId = $derived(generatedId);
  let normalizedError = $derived(normalizeFieldError(error));
  let fieldRequired = $derived(required === true ? true : required === false ? false : undefined);
  let useLabelContainer = $derived(!label && focusMode === "container");
  let containerClass = $derived(
    cn(
      "relative w-full cursor-text",
      inputVariants({ size }),
      "flex items-center gap-0 px-0 shadow-xs",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      focusMode === "container"
        ? "overflow-hidden focus-within:ring-kumo-focus"
        : "isolate overflow-visible ring-0 shadow-none",
      "has-[input[aria-invalid=true]]:ring-kumo-danger",
      "has-[[data-slot=input-group-suffix]]:[&_input]:[field-sizing:content]",
      "has-[[data-slot=input-group-suffix]]:[&_input]:max-w-full",
      "has-[[data-slot=input-group-suffix]]:[&_input]:grow-0",
      "has-[[data-slot=input-group-suffix]]:[&_input]:pr-0",
      INPUT_GROUP_HAS_CLASSES[size],
      "!mb-0",
      className,
    ),
  );

  setInputGroupContext({
    get disabled() {
      return disabled;
    },
    get error() {
      return normalizedError;
    },
    get focusMode() {
      return focusMode;
    },
    get inputId() {
      return inputId;
    },
    get size() {
      return size;
    },
  });
</script>

{#snippet container()}
  {#if label}
    <div
      data-slot="input-group"
      data-focus-mode={focusMode}
      data-disabled={disabled ? "" : undefined}
      class={containerClass}
      {...restProps}
    >
      <label for={inputId} class="absolute inset-0 z-0 !mb-0 cursor-text" aria-hidden="true"></label>
      {@render children()}
    </div>
  {:else if useLabelContainer}
    <label
      data-slot="input-group"
      data-focus-mode={focusMode}
      data-disabled={disabled ? "" : undefined}
      class={containerClass}
      {...restProps}
    >
      {@render children()}
    </label>
  {:else}
    <div
      data-slot="input-group"
      data-focus-mode={focusMode}
      data-disabled={disabled ? "" : undefined}
      class={containerClass}
      {...restProps}
    >
      {@render children()}
    </div>
  {/if}
{/snippet}

{#if label}
  <Field
    {label}
    for={inputId}
    required={fieldRequired}
    {labelTooltip}
    {description}
    error={normalizedError}
  >
    {@render container()}
  </Field>
{:else}
  {@render container()}
{/if}

