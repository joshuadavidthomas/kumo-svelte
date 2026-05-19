<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../../utils/cn";
  import { getInputGroupContext, INPUT_GROUP_SIZE } from "./context";

  type NativeInputProps = Omit<HTMLInputAttributes, "size" | "value">;

  export interface InputGroupInputProps extends NativeInputProps {
    class?: string;
    onValueChange?: (value: string) => void;
    value?: string | number | string[] | undefined;
  }

  let {
    class: className,
    disabled,
    id,
    onValueChange,
    oninput,
    value = $bindable(),
    ...restProps
  }: InputGroupInputProps = $props();

  const group = getInputGroupContext("Input");
  let size = $derived(group?.size ?? "base");
  let tokens = $derived(INPUT_GROUP_SIZE[size]);
  let isIndividual = $derived(group?.focusMode === "individual");
  let hasError = $derived(Boolean(group?.error));
  let inputId = $derived(id ?? group?.inputId);
  let inputDisabled = $derived(group?.disabled || disabled);

  function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
    oninput?.(event);
    onValueChange?.(event.currentTarget.value);
  }
</script>

<input
  bind:value
  id={inputId}
  disabled={inputDisabled}
  aria-invalid={hasError || restProps["aria-invalid"] ? "true" : undefined}
  oninput={handleInput}
  class={cn(
    "flex h-full min-w-0 grow items-center rounded-none border-0 bg-transparent font-sans",
    tokens.inputOuter,
    "text-ellipsis",
    isIndividual
      ? [
          "relative border border-kumo-line ring-0",
          "first:rounded-l-[inherit] last:rounded-r-[inherit]",
          "not-first:border-l-0",
          "hover:z-[1] hover:border-kumo-line",
          "focus:z-[2] focus:border-kumo-line focus:-outline-offset-1 focus:outline",
        ].join(" ")
      : "relative z-[1] shadow-none ring-0! outline-none focus:ring-0! focus:outline-none",
    className,
  )}
  {...restProps}
/>
