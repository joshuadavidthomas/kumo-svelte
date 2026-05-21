import { getContext, setContext } from "svelte";
import { KUMO_DIALOG_DEFAULT_VARIANTS, type KumoDialogRole } from "./variants";

const DIALOG_ROLE_CONTEXT = Symbol("kumo-dialog-role");

export interface DialogRoleContextValue {
  readonly role: KumoDialogRole;
  readonly disablePointerDismissal: boolean;
}

export function setDialogRoleContext(value: DialogRoleContextValue) {
  setContext(DIALOG_ROLE_CONTEXT, value);
}

export function getDialogContext() {
  return (
    getContext<DialogRoleContextValue | undefined>(DIALOG_ROLE_CONTEXT) ?? {
      role: KUMO_DIALOG_DEFAULT_VARIANTS.role,
      disablePointerDismissal: false,
    }
  );
}

export function getDialogRoleContext() {
  return getDialogContext().role;
}
