import { getTeam } from "$lib/API";

export const load = async ({ params, fetch }: { params: { id: string }; fetch: typeof globalThis.fetch }) => ({
  team: await getTeam(params.id, fetch),
});
