import { getEvent, getEventMatches } from "$lib/API";

export const load = async ({ params, fetch, url }: { params: { id: string }; fetch: typeof globalThis.fetch; url: URL }) => {
  const status = url.searchParams.get("status") as "upcoming" | "completed" | null;
  const stage = url.searchParams.get("stage") ?? undefined;
  const [event, matches] = await Promise.all([
    getEvent(params.id, fetch),
    getEventMatches(params.id, { stage, status: status ?? undefined }, fetch),
  ]);
  return { event, matches };
};
