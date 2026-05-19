import docsPackage from "../../../../package.json";
import kumoPackage from "../../../../../kumo-svelte/package.json";

export function GET() {
  return new Response(
    JSON.stringify({
      kumoVersion: kumoPackage.version,
      docsVersion: docsPackage.version,
      buildDate: new Date().toISOString(),
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
