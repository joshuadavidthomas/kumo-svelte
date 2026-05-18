import { json } from "@sveltejs/kit";
import pkg from "../../../../../../package.json";

export const prerender = true;

export function GET() {
  return json({ version: pkg.version });
}
