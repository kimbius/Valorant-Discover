<script lang="ts">
  import Container from "$components/Container.svelte";
  import MainHeader from "$components/MainHeader.svelte";
  import { proxyImage } from "$lib/image";
  import type { RankingsResponse } from "$lib/types";
  import { REGIONS } from "$lib/regions";

  export let data: { region: string; rankings: RankingsResponse };
  $: currentRegion = REGIONS.find((r) => r.code === data.region) ?? REGIONS[0];
</script>

<MainHeader subtitle="RANKINGS" />
<main class="text-gray-800">
  <Container>
    <section class="py-8">
      <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold">{currentRegion.label}</h1>
          <p class="mt-1 text-sm text-gray-500">World rankings by region, refreshed from VLR.gg data.</p>
        </div>
        <span class="text-sm text-gray-500">{data.rankings.items.length} teams</span>
      </div>

      <nav class="mb-6 flex flex-wrap gap-2" aria-label="Ranking regions">
        {#each REGIONS as region, regionIndex (region.code + "-" + regionIndex)}
          <a
            class="rounded border px-3 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-vlr focus:ring-offset-2"
            class:bg-main-800={region.code === data.region}
            class:text-white={region.code === data.region}
            class:border-main-800={region.code === data.region}
            class:border-gray-300={region.code !== data.region}
            class:text-gray-700={region.code !== data.region}
            class:hover:bg-main-700={region.code === data.region}
            class:hover:bg-gray-100={region.code !== data.region}
            aria-current={region.code === data.region ? "page" : undefined}
            href={`/rankings?region=${region.code}`}
          >{region.label}</a>
        {/each}
      </nav>

      <div class="overflow-x-auto rounded border border-gray-200 bg-white">
        <table class="w-full min-w-[760px] text-left text-sm">
          <thead class="bg-gray-100 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th class="px-4 py-3">#</th>
              <th class="px-4 py-3">Team</th>
              <th class="px-3 py-3">Rating</th>
              <th class="px-3 py-3">Record</th>
              <th class="px-3 py-3">Streak</th>
              <th class="px-4 py-3">Last match</th>
            </tr>
          </thead>
          <tbody>
            {#each data.rankings.items as row, rowIndex (row.team.id + "-" + rowIndex)}
              <tr class="border-t border-gray-100 hover:bg-gray-50">
                <td class="px-4 py-3 font-bold tabular-nums">{row.rank}</td>
                <td class="px-4 py-3">
                  <a class="flex items-center gap-2.5 font-semibold hover:text-vlr" href={`/teams/${row.team.id}`}>
                    <img class="h-7 w-7 object-contain" src={proxyImage(row.team.icon)} alt="" />
                    {row.team.name}
                  </a>
                </td>
                <td class="px-3 py-3 tabular-nums">{row.rating ?? "—"}</td>
                <td class="px-3 py-3 tabular-nums">{row.record ? `${row.record.wins}W ${row.record.losses}L` : "—"}</td>
                <td class="px-3 py-3">
                  {#if row.streak?.count}
                    <span
                      class="rounded px-2 py-1 text-xs font-bold"
                      class:bg-green-100={row.streak.type === "W"}
                      class:text-green-800={row.streak.type === "W"}
                      class:bg-red-100={row.streak.type === "L"}
                      class:text-red-800={row.streak.type === "L"}
                    >{row.streak.count}{row.streak.type}</span>
                  {:else}—{/if}
                </td>
                <td class="px-4 py-3">
                  {#if row.lastMatch}
                    <a class="flex items-center gap-2 hover:text-vlr" href={`/matches/${row.lastMatch.id}`}>
                      <span class="text-gray-500">vs</span>
                      <span class="font-medium">{row.lastMatch.opponent.name}</span>
                      <span class="text-gray-400">{row.lastMatch.playedAt ?? ""}</span>
                    </a>
                  {:else}—{/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>
  </Container>
</main>
