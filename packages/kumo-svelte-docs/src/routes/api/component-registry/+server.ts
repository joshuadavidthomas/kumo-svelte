import componentRegistry from "../../../../../kumo-svelte/src/ai/component-registry.json";

export function GET() {
  return new Response(JSON.stringify(componentRegistry), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
