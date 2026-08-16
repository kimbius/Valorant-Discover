import { getEvents } from "$lib/API";

export const load = async ({ fetch }: { fetch: typeof globalThis.fetch }) => ({
  events: await getEvents(undefined, fetch),
});
