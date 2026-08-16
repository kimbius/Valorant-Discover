import { getPlayer } from "$lib/API";

export const load = async ({ params, fetch }: { params: { id: string }; fetch: typeof globalThis.fetch }) => ({
  player: await getPlayer(params.id, fetch),
});
