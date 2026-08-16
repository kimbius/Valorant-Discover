import { getRankings } from "$lib/API";
import type { RankingsResponse } from "$lib/types";

export const load = async ({
  fetch,
  url,
}: {
  fetch: typeof globalThis.fetch;
  url: URL;
}): Promise<{ region: string; rankings: RankingsResponse }> => {
  const region = url.searchParams.get("region") ?? "north-america";
  return { region, rankings: await getRankings(region, fetch) };
};
