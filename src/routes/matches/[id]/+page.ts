import { getMatch, getMatchOverview } from "$lib/API";

export const load = async ({ params, fetch }: { params: { id: string }; fetch: typeof globalThis.fetch }) => {
  const [{ match, maps }, overview] = await Promise.all([
    getMatch(params.id, fetch),
    getMatchOverview(params.id, fetch).catch(() => null),
  ]);

  return { match, maps, overview };
};
