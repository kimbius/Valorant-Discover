import { getMatches } from "$lib/API";

export const load = async ({ fetch }: { fetch: typeof globalThis.fetch }) => ({
  matches: await getMatches("schedule", undefined, fetch),
});
