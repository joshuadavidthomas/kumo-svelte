import type { ComponentProps } from "svelte";
import InputGroupComponent from "./input-group.svelte";
import InputGroupAddonComponent from "./input-group-addon.svelte";
import InputGroupButtonComponent from "./input-group-button.svelte";
import InputGroupInputComponent from "./input-group-input.svelte";
import InputGroupSuffixComponent from "./input-group-suffix.svelte";

export { default as InputGroup } from "./input-group.svelte";
export { default as InputGroupRoot } from "./input-group.svelte";
export { default as InputGroupAddon } from "./input-group-addon.svelte";
export { default as InputGroupButton } from "./input-group-button.svelte";
export { default as InputGroupInput } from "./input-group-input.svelte";
export { default as InputGroupSuffix } from "./input-group-suffix.svelte";
export { default as InputGroupLabel } from "./input-group-addon.svelte";
export { default as InputGroupDescription } from "./input-group-suffix.svelte";

export type InputGroupRootProps = ComponentProps<typeof InputGroupComponent>;
export type InputGroupProps = InputGroupRootProps;
export type InputGroupAddonProps = ComponentProps<typeof InputGroupAddonComponent>;
export type InputGroupButtonProps = ComponentProps<typeof InputGroupButtonComponent>;
export type InputGroupInputProps = ComponentProps<typeof InputGroupInputComponent>;
export type InputGroupSuffixProps = ComponentProps<typeof InputGroupSuffixComponent>;

export {
  KUMO_INPUT_GROUP_DEFAULT_VARIANTS,
  KUMO_INPUT_GROUP_VARIANTS,
  inputGroupVariants,
  type KumoInputGroupSize,
  type KumoInputGroupVariantsProps,
} from "./variants";
export {
  INPUT_GROUP_HAS_CLASSES,
  INPUT_GROUP_SIZE,
  type InputGroupFocusMode,
  type InputGroupSizeTokens,
} from "./context";
