<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLTextareaAttributes } from "svelte/elements";
  import { cn, safeRandomId } from "../../utils/cn";
  import Field from "../field/field.svelte";
  import { normalizeFieldError, type FieldErrorMatch } from "../field";
  import {
    KUMO_INPUT_DEFAULT_VARIANTS,
    inputVariants,
    type KumoInputSize,
    type KumoInputVariant,
  } from "./variants";

  type NativeTextareaProps = Omit<HTMLTextareaAttributes, "value">;

  export interface InputAreaProps extends NativeTextareaProps {
    autoResize?: boolean;
    description?: Snippet | string;
    error?: string | { message: Snippet | string; match: FieldErrorMatch };
    label?: Snippet | string;
    labelTooltip?: Snippet;
    maxRows?: number;
    minRows?: number;
    onValueChange?: (value: string) => void;
    size?: KumoInputSize;
    value?: string | undefined;
    variant?: KumoInputVariant;
  }

  let {
    autoResize = false,
    class: className,
    description,
    error,
    id,
    label,
    labelTooltip,
    maxRows,
    minRows = 1,
    oninput,
    onValueChange,
    required,
    rows,
    size = KUMO_INPUT_DEFAULT_VARIANTS.size,
    value = $bindable(),
    variant: variantProp,
    ...restProps
  }: InputAreaProps = $props();

  let generatedId = safeRandomId();
  let inputId = $derived(id ?? (label || error || description ? generatedId : undefined));
  let fieldRequired = $derived(required === true ? true : required === false ? false : undefined);
  let variant = $derived(variantProp ?? (error ? "error" : "default"));
  let normalizedError = $derived(normalizeFieldError(error));
  let textareaClass = $derived(
    cn(
      inputVariants({ size, variant, focusIndicator: true }),
      "h-auto py-2",
      autoResize && "field-sizing-content w-full resize-none",
      className,
    ),
  );

  interface AutoResizeOptions {
    enabled: boolean;
    layout: readonly unknown[];
    maxRows?: number;
    minRows: number;
    value?: string;
  }

  function parseCssNumber(cssValue: string) {
    const value = Number.parseFloat(cssValue);
    return Number.isNaN(value) ? 0 : value;
  }

  function autoResizeTextarea(textarea: HTMLTextAreaElement, initial: AutoResizeOptions) {
    let options = initial;
    let lastWidth = textarea.clientWidth;

    function resize() {
      if (!options.enabled) return;

      const style = getComputedStyle(textarea);
      const borders = parseCssNumber(style.borderTopWidth) + parseCssNumber(style.borderBottomWidth);
      const padding = parseCssNumber(style.paddingTop) + parseCssNumber(style.paddingBottom);
      const isBorderBox = style.boxSizing === "border-box";

      textarea.style.height = "auto";

      let height = isBorderBox ? textarea.scrollHeight + borders : textarea.scrollHeight - padding;

      if (options.minRows > 0 || (options.maxRows !== undefined && options.maxRows > 0)) {
        const fontSize = parseCssNumber(style.fontSize);
        const lineHeight =
          style.lineHeight === "normal" || style.lineHeight === ""
            ? fontSize * 1.2
            : style.lineHeight.endsWith("px")
              ? parseCssNumber(style.lineHeight)
              : parseCssNumber(style.lineHeight) * fontSize;
        const boxSpacing = isBorderBox ? padding + borders : 0;

        height = Math.max(height, lineHeight * options.minRows + boxSpacing);

        if (options.maxRows !== undefined && options.maxRows > 0) {
          const maxHeight = lineHeight * options.maxRows + boxSpacing;
          textarea.style.overflowY = height > maxHeight ? "auto" : "hidden";
          height = Math.min(height, maxHeight);
        } else {
          textarea.style.overflowY = "hidden";
        }
      } else {
        textarea.style.overflowY = "hidden";
      }

      textarea.style.height = `${height}px`;
    }

    function reset() {
      textarea.style.height = "";
      textarea.style.overflowY = "";
    }

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(() => {
            if (textarea.clientWidth !== lastWidth) {
              lastWidth = textarea.clientWidth;
              resize();
            }
          });

    textarea.addEventListener("input", resize);
    if (options.enabled) {
      resizeObserver?.observe(textarea);
      resize();
    }

    return {
      update(next: AutoResizeOptions) {
        const wasEnabled = options.enabled;
        options = next;

        if (options.enabled) {
          if (!wasEnabled) {
            lastWidth = textarea.clientWidth;
            resizeObserver?.observe(textarea);
          }
          resize();
        } else if (wasEnabled) {
          resizeObserver?.unobserve(textarea);
          reset();
        }
      },
      destroy() {
        textarea.removeEventListener("input", resize);
        resizeObserver?.disconnect();
        reset();
      },
    };
  }

  function handleInput(event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }) {
    oninput?.(event);
    onValueChange?.(event.currentTarget.value);
  }
</script>

{#snippet control()}
  <textarea
    id={inputId}
    bind:value
    class={textareaClass}
    rows={autoResize ? minRows : rows}
    {required}
    oninput={handleInput}
    use:autoResizeTextarea={{
      enabled: autoResize,
      layout: [textareaClass, restProps.style, restProps.wrap],
      maxRows,
      minRows,
      value,
    }}
    {...restProps}
  ></textarea>
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
