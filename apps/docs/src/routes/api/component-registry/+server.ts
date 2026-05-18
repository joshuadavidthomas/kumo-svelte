import { json } from "@sveltejs/kit";
import registry from "../../../../../../src/registry/component-registry.json";

export const prerender = true;

export function GET() {
  return json(registry);
}
