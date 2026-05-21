<script lang="ts">
  import { onDestroy, tick, type Snippet } from "svelte";
  import EyeIcon from "phosphor-svelte/lib/EyeIcon";
  import EyeSlashIcon from "phosphor-svelte/lib/EyeSlashIcon";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn, safeRandomId } from "../../utils/cn";
  import Field from "../field/field.svelte";
  import { normalizeFieldError, type FieldErrorMatch } from "../field";
  import { inputVariants } from "../input";
  import {
    KUMO_SENSITIVE_INPUT_DEFAULT_VARIANTS,
    type KumoSensitiveInputSize,
    type KumoSensitiveInputVariant,
  } from "./variants";

  type NativeInputProps = Omit<
    HTMLInputAttributes,
    "class" | "children" | "defaultValue" | "readonly" | "size" | "type" | "value"
  >;

  type VisibilityMode = "masked" | "revealed";
  type DisplayMode = VisibilityMode | "empty";

  export interface SensitiveInputProps extends NativeInputProps {
    class?: string;
    defaultValue?: string;
    description?: Snippet | string;
    error?: string | { message: Snippet | string; match: FieldErrorMatch };
    label?: Snippet | string;
    labelTooltip?: Snippet;
    onCopy?: () => void;
    onValueChange?: (value: string) => void;
    readonly?: boolean | null;
    size?: KumoSensitiveInputSize;
    value?: string;
    variant?: KumoSensitiveInputVariant;
  }

  let {
    autocomplete = "off",
    class: className,
    defaultValue = "",
    description,
    disabled = false,
    error,
    id,
    label,
    labelTooltip,
    onCopy,
    onValueChange,
    oninput,
    readonly: readonlyProp = false,
    required,
    size = KUMO_SENSITIVE_INPUT_DEFAULT_VARIANTS.size,
    value = $bindable(defaultValue),
    variant: variantProp,
    ...restProps
  }: SensitiveInputProps = $props();

  let copied = $state(false);
  let inputElement = $state<HTMLInputElement>();
  let containerElement = $state<HTMLDivElement>();
  let resetTimeout: ReturnType<typeof setTimeout> | undefined;
  let visibilityMode = $state<VisibilityMode>((value ?? "").length > 0 ? "masked" : "revealed");

  let generatedId = safeRandomId();
  let liveRegionId = `${generatedId}-status`;
  let maskedInstructionId = `${generatedId}-masked-instructions`;
  let inputId = $derived(id ?? (label || error || description ? generatedId : undefined));
  let normalizedValue = $derived(value ?? "");
  let hasValue = $derived(normalizedValue.length > 0);
  let displayMode: DisplayMode = $derived(hasValue ? visibilityMode : "empty");
  let isMaskedWithValue = $derived(displayMode === "masked" && hasValue);
  let showEyeButton = $derived(!disabled && (displayMode === "revealed" || (displayMode === "empty" && hasValue)));
  let effectiveReadonly = $derived(Boolean(readonlyProp));
  let ariaLabelFallback = $derived(typeof label === "string" ? label : "Sensitive value");
  let fieldRequired = $derived(required === true ? true : required === false ? false : undefined);
  let variant = $derived(variantProp ?? (error ? "error" : "default"));
  let normalizedError = $derived(normalizeFieldError(error));
  let iconSize = $derived(size === "xs" || size === "sm" ? "size-3" : "size-4");
  let containerClass = $derived(
    cn(
      inputVariants({ size, variant, parentFocusIndicator: true }),
      "group/container relative flex w-full items-center",
      "focus-within:outline focus-within:outline-2 focus-within:outline-kumo-focus",
      isMaskedWithValue && !disabled && "cursor-pointer",
      disabled && "cursor-not-allowed",
      className,
    ),
  );
  let inputClass = $derived(
    cn(
      "w-full border-0 bg-transparent p-0 text-kumo-default ring-0 outline-none kumo-input-placeholder disabled:cursor-not-allowed disabled:text-kumo-subtle",
      size === "xs" && "pr-5",
      size === "sm" && "pr-6",
      size === "base" && "pr-8",
      size === "lg" && "pr-10",
      isMaskedWithValue && "pointer-events-none text-transparent",
    ),
  );
  let maskClass = $derived(
    cn(
      "pointer-events-none absolute inset-y-0 left-0 flex items-center overflow-hidden select-none",
      size === "xs" && "right-5 px-1.5",
      size === "sm" && "right-6 px-2",
      size === "base" && "right-8 px-3",
      size === "lg" && "right-10 px-4",
      !isMaskedWithValue && "invisible",
      isMaskedWithValue && "pointer-events-auto",
      "text-kumo-default group/mask",
    ),
  );
  let eyeButtonClass = $derived(
    cn(
      "absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer text-kumo-subtle hover:text-kumo-default focus:text-kumo-default focus:ring-kumo-focus/50 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-kumo-brand",
      "m-0 inline-flex h-auto min-h-0 items-center justify-center border-none bg-transparent p-0 shadow-none",
      size === "xs" && "right-1.5",
      size === "sm" && "right-2",
      size === "base" && "right-3",
      size === "lg" && "right-4",
      iconSize,
      !showEyeButton && "pointer-events-none opacity-0",
    ),
  );

  onDestroy(() => {
    if (resetTimeout) {
      clearTimeout(resetTimeout);
    }
  });

  function resetCopiedSoon() {
    if (resetTimeout) {
      clearTimeout(resetTimeout);
    }

    resetTimeout = setTimeout(() => {
      copied = false;
    }, 2000);
  }

  async function writeToClipboard(text: string) {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      await navigator.clipboard.writeText(text);
      return;
    }

    if (typeof document === "undefined") {
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);

    const selection = document.getSelection();
    const previousRange = selection?.rangeCount ? selection.getRangeAt(0) : null;
    textarea.select();

    try {
      document.execCommand("copy");
    } finally {
      document.body.removeChild(textarea);
      if (previousRange) {
        selection?.removeAllRanges();
        selection?.addRange(previousRange);
      }
    }
  }

  async function copyToClipboard(event: MouseEvent) {
    event.stopPropagation();

    try {
      await writeToClipboard(normalizedValue);
      copied = true;
      resetCopiedSoon();
      onCopy?.();
    } catch (error) {
      console.warn("Clipboard copy failed", error);
    }
  }

  async function revealAndFocus() {
    visibilityMode = "revealed";
    if (!effectiveReadonly) {
      await tick();
      inputElement?.focus();
    }
  }

  function handleContainerClick() {
    if (disabled || !isMaskedWithValue) return;
    void revealAndFocus();
  }

  function handleContainerKeydown(event: KeyboardEvent) {
    if (disabled || !isMaskedWithValue) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      void revealAndFocus();
    }
  }

  function handleToggleVisibility(event: MouseEvent) {
    event.stopPropagation();
    visibilityMode = displayMode === "revealed" ? "masked" : "revealed";
  }

  function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
    value = event.currentTarget.value;
    if (displayMode === "empty" && event.currentTarget.value.length > 0) {
      visibilityMode = "revealed";
    }
    oninput?.(event);
    onValueChange?.(event.currentTarget.value);
  }

  function handleBlur(event: FocusEvent) {
    if (
      containerElement &&
      event.relatedTarget instanceof Node &&
      containerElement.contains(event.relatedTarget)
    ) {
      return;
    }

    if (hasValue) {
      visibilityMode = "masked";
    }
  }

  function handleInputKeydown(event: KeyboardEvent) {
    if (displayMode === "revealed" && event.key === "Escape") {
      visibilityMode = "masked";
      void tick().then(() => containerElement?.focus());
    }
  }
</script>

{#snippet controlContent()}
  <input
    bind:this={inputElement}
    id={inputId}
    type={displayMode === "revealed" ? "text" : "password"}
    value={normalizedValue}
    oninput={handleInput}
    onblur={handleBlur}
    onkeydown={handleInputKeydown}
    {disabled}
    readonly={effectiveReadonly || isMaskedWithValue}
    {autocomplete}
    tabindex={isMaskedWithValue ? -1 : 0}
    class={inputClass}
    aria-hidden={isMaskedWithValue ? "true" : undefined}
    {required}
    {...restProps}
  />

  <span class={maskClass} aria-hidden="true">
    <span class="relative">
      <span
        class={cn(
          isMaskedWithValue &&
            !disabled &&
            "group-focus-within/container:invisible group-hover/mask:invisible",
        )}
      >
        ••••••••
      </span>
      {#if isMaskedWithValue && !disabled}
        <span class="invisible absolute top-0 left-0 whitespace-nowrap text-kumo-subtle group-focus-within/container:visible group-hover/mask:visible">
          Click to reveal
        </span>
      {/if}
    </span>
  </span>

  <button
    type="button"
    onclick={handleToggleVisibility}
    onkeydown={(event) => event.stopPropagation()}
    aria-label={displayMode === "revealed" ? "Hide value" : "Reveal value"}
    tabindex={showEyeButton ? 0 : -1}
    class={eyeButtonClass}
  >
    {#if displayMode === "revealed"}
      <EyeSlashIcon aria-hidden="true" class="size-full" />
    {:else}
      <EyeIcon aria-hidden="true" class="size-full" />
    {/if}
  </button>

  {#if hasValue && !disabled}
    <button
      type="button"
      onclick={copyToClipboard}
      onkeydown={(event) => event.stopPropagation()}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      class={cn(
        "absolute -top-px right-2 -translate-y-full cursor-pointer rounded-t-md bg-kumo-brand px-2 py-0.5 text-xs text-white opacity-0 transition-opacity group-focus-within/container:opacity-100 group-hover/container:opacity-100 hover:brightness-120 focus:ring-kumo-focus/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-kumo-brand",
        "m-0 h-auto min-h-0 border-none shadow-none",
      )}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  {/if}
{/snippet}

{#snippet control()}
  <div>
    {#if isMaskedWithValue}
      <!-- This wrapper behaves like a reveal button but contains real buttons, so it cannot be a button element. -->
      <!-- oxlint-disable-next-line prefer-tag-over-role -->
      <div
        bind:this={containerElement}
        role="button"
        tabindex={disabled ? -1 : 0}
        class={containerClass}
        onclick={handleContainerClick}
        onkeydown={handleContainerKeydown}
        aria-label={`${ariaLabelFallback}, masked.`}
        aria-describedby={`${maskedInstructionId} ${liveRegionId}`}
        aria-disabled={disabled}
      >
        {@render controlContent()}
      </div>
    {:else}
      <div bind:this={containerElement} class={containerClass}>
        {@render controlContent()}
      </div>
    {/if}
    {#if isMaskedWithValue}
      <span id={maskedInstructionId} class="sr-only">
        Click or press Enter to reveal.
      </span>
    {/if}
    <span id={liveRegionId} class="sr-only" aria-live="polite">
      {displayMode === "masked" && hasValue ? "Value hidden" : ""}
      {copied ? "Copied to clipboard" : ""}
    </span>
  </div>
{/snippet}

{#if label || error || description}
  <Field
    label={label ?? ""}
    for={inputId}
    required={fieldRequired}
    {labelTooltip}
    description={description}
    error={normalizedError}
  >
    {@render control()}
  </Field>
{:else}
  {@render control()}
{/if}
