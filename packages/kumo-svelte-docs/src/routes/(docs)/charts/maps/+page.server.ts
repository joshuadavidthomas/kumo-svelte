import type { MapGeoJson } from "kumo-svelte/components/chart";
import type { PageServerLoad } from "./$types";

const WORLD_GEO_JSON_URL =
  "https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries.geo.json";

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const response = await fetch(WORLD_GEO_JSON_URL);

    if (!response.ok) {
      console.warn(
        `Failed to fetch BubbleMap GeoJSON: ${response.status} ${response.statusText}`,
      );
      return { geoJson: null };
    }

    return { geoJson: (await response.json()) as MapGeoJson };
  } catch (error) {
    console.warn("Failed to fetch BubbleMap GeoJSON", error);
    return { geoJson: null };
  }
};
