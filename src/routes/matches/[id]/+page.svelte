<script lang="ts">
  import Container from "$components/Container.svelte";
  import MainHeader from "$components/MainHeader.svelte";
  import PlayerPreview from "$components/PlayerPreview.svelte";
  import type { Match, MatchOverviewMap } from "$lib/types";
  import { proxyImage } from "$lib/image";

  const roundWinsOne = (map: MatchOverviewMap, teamName: string) =>
    map.timeline.filter((r) => r.winner?.name === teamName).length;
  const roundWinsTwo = (map: MatchOverviewMap, teamName: string) =>
    map.timeline.filter((r) => r.winner?.name !== teamName && r.winner !== null).length;

  export let data: {
    match: Match;
    maps: Array<{ index: number | string; name: string }> | null;
    overview: MatchOverviewMap[] | null;
  };

  $: match = data.match;
  $: overviewMaps = data.overview ?? [];
  $: tabs = overviewMaps.map((m) => ({ id: m.index, name: m.info.name, rounds: m.timeline?.length ?? 0 }));
  let selectedMap: number | string | null = null;
  $: firstPlayableMap = overviewMaps.find((m) => (m.timeline?.length ?? 0) > 0)?.index ?? overviewMaps[0]?.index ?? null;
  // Before the user picks anything, land on the first map that has rounds.
  // Once selectedMap is set (including back to "All"), respect the user's choice.
  $: if (selectedMap === null) selectedMap = firstPlayableMap;
  $: selected = overviewMaps.find((m) => m.index === selectedMap) ?? overviewMaps.find((m) => m.index === firstPlayableMap) ?? null;
  $: teamOneStats = selected?.stats.filter((s) => s.team.name === match.team_one.name) ?? [];
  $: teamTwoStats = selected?.stats.filter((s) => s.team.name === match.team_two.name) ?? [];
  $: date = match.timestamp ? new Date(match.timestamp).toLocaleString() : "Time to be announced";
</script>

<MainHeader subtitle="MATCH DETAIL" compact />
<main class="text-gray-800">
  <Container>
    <div class="mx-auto max-w-6xl py-8">
      <a href="/matches" class="text-sm font-semibold text-main-800 hover:underline">← Back to matches</a>

      <section class="mt-4 overflow-hidden rounded border border-gray-200 bg-white">
        <div class="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-5 py-4">
          <div>
            {#if match.event.id}
              <a class="text-xs font-bold uppercase tracking-wide text-main-800 hover:text-vlr hover:underline" href={`/events/${match.event.id}`}>{match.event.name}</a>
            {:else}
              <p class="text-xs font-bold uppercase tracking-wide text-gray-500">{match.event.name}</p>
            {/if}
            <h1 class="mt-1 text-lg font-bold">{match.event.round}</h1>
          </div>
          <span
            class="rounded px-3 py-1 text-xs font-bold uppercase"
            class:bg-vlr={match.status === "live"}
            class:text-white={match.status === "live"}
            class:bg-yellow-100={match.status === "upcoming"}
            class:bg-green-100={match.status === "completed"}
          >{match.status}</span>
        </div>
        <div class="grid gap-8 px-5 py-10 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div class="flex flex-col items-center gap-3 text-center sm:items-end sm:text-right">
            <img class="h-16 w-16 object-contain" src={proxyImage(match.team_one.icon)} alt="" />
            {#if match.team_one.id}<a class="text-xl font-bold hover:text-vlr" href={`/teams/${match.team_one.id}`}>{match.team_one.name}</a>{:else}<h2 class="text-xl font-bold">{match.team_one.name}</h2>{/if}
            <p class="text-6xl font-black tabular-nums">{match.team_one.score || "—"}</p>
          </div>
          <div class="text-center">
            <p class="text-xs font-bold uppercase tracking-wide text-gray-400">{date}</p>
            <p class="mt-2 text-sm font-semibold text-gray-500">VS</p>
          </div>
          <div class="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
            <img class="h-16 w-16 object-contain" src={proxyImage(match.team_two.icon)} alt="" />
            {#if match.team_two.id}<a class="text-xl font-bold hover:text-vlr" href={`/teams/${match.team_two.id}`}>{match.team_two.name}</a>{:else}<h2 class="text-xl font-bold">{match.team_two.name}</h2>{/if}
            <p class="text-6xl font-black tabular-nums">{match.team_two.score || "—"}</p>
          </div>
        </div>
        {#if data.maps?.length}
          <div class="flex flex-wrap gap-2 border-t border-gray-200 px-5 py-4">
            {#each data.maps as map, mapIndex (map.index + "-" + mapIndex)}
              <span class="rounded bg-gray-100 px-3 py-1 text-xs font-semibold">Map {map.index} · {map.name}</span>
            {/each}
          </div>
        {/if}
      </section>

      {#if overviewMaps.length}
        <section class="mt-8">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div><h2 class="text-xl font-bold">Performance by map</h2><p class="mt-1 text-sm text-gray-500">Choose a map to inspect player stats and round-by-round results.</p></div>
            <div class="flex flex-wrap gap-2">
              {#each tabs as tab, tabIndex (tab.id + "-" + tabIndex)}
                <button
                  class="rounded border px-3 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-vlr focus:ring-offset-2"
                  class:bg-main-800={selectedMap === tab.id}
                  class:text-white={selectedMap === tab.id}
                  class:border-main-800={selectedMap === tab.id}
                  class:border-gray-300={selectedMap !== tab.id}
                  class:hover:bg-main-700={selectedMap === tab.id}
                  class:hover:bg-gray-100={selectedMap !== tab.id}
                  aria-pressed={selectedMap === tab.id}
                  on:click={() => (selectedMap = tab.id)}
                >{tab.name}{tab.rounds ? ` (${tab.rounds})` : ""}</button>
              {/each}
            </div>
          </div>

          {#if selected && selected.stats.length}
            <div class="mt-4 grid gap-4 lg:grid-cols-2">
              {#each [{ team: match.team_one, stats: teamOneStats }, { team: match.team_two, stats: teamTwoStats }] as side, sideIndex (side.team.name + "-" + sideIndex)}
                <div class="overflow-hidden rounded border border-gray-200 bg-white">
                  <div class="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3">
                    <img class="h-6 w-6 object-contain" src={proxyImage(side.team.icon)} alt="" />
                    <h3 class="font-bold">{side.team.name}</h3>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm">
                      <thead class="text-xs uppercase tracking-wide text-gray-400">
                        <tr><th class="px-4 py-2">Player</th><th class="px-2 py-2">Rating</th><th class="px-2 py-2">ACS</th><th class="px-2 py-2">K/D/A</th><th class="px-2 py-2">ADR</th><th class="px-4 py-2">KAST</th></tr>
                      </thead>
                      <tbody>
                        {#each side.stats as stat, statIndex (stat.player_id + "-" + statIndex)}
                          <tr class="border-t border-gray-100">
                            <td class="px-4 py-2">
                              <div class="flex items-center gap-1.5">
                                {#each stat.agents.slice(0, 2) as agent, agentIndex (agent.name + "-" + agentIndex)}
                                  <img class="h-5 w-5 rounded-full object-cover" src={proxyImage(agent.icon)} title={agent.name} alt="" />
                                {/each}
                                <PlayerPreview id={stat.player_id} name={stat.player_name} />
                              </div>
                            </td>
                            <td class="px-2 py-2 font-bold tabular-nums">{stat.rating.overall?.toFixed(2)}</td>
                            <td class="px-2 py-2 tabular-nums">{stat.acs.overall}</td>
                            <td class="px-2 py-2 tabular-nums">{stat.kills.overall}/{stat.deaths.overall}/{stat.assists.overall}</td>
                            <td class="px-2 py-2 tabular-nums">{stat.adr.overall}</td>
                            <td class="px-4 py-2 tabular-nums">{stat.kast.overall}%</td>
                          </tr>
                        {/each}
                      </tbody>
                    </table>
                  </div>
                </div>
              {/each}
            </div>
          {:else}
            <p class="mt-4 rounded bg-gray-100 p-6 text-center text-gray-500">No statistics recorded for this map yet.</p>
          {/if}

          {#if selected && selected.timeline.length}
            <div class="mt-6 rounded border border-gray-200 bg-white p-5">
              <h3 class="font-bold">Round timeline · {selected.info.name}</h3>
              <div class="mt-3 flex flex-wrap items-center gap-1">
                {#each selected.timeline as round, roundIndex (round.index + "-" + roundIndex)}
                  {@const isTeamOne = round.winner?.name === match.team_one.name}
                  {@const isTeamTwo = round.winner?.name === match.team_two.name}
                  <span
                    class="flex h-12 w-12 flex-col items-center justify-center gap-0.5 rounded text-xs font-bold tabular-nums"
                    class:bg-sky-700={isTeamOne}
                    class:text-white={isTeamOne}
                    class:bg-amber-400={isTeamTwo}
                    class:text-gray-900={isTeamTwo}
                    class:bg-gray-200={!isTeamOne && !isTeamTwo}
                    class:text-gray-500={!isTeamOne && !isTeamTwo}
                    title={`Round ${round.index} · ${round.type} · ${round.winner?.name ?? "unknown winner"}`}
                  >
                    <img class="h-5 w-5 object-contain" src={proxyImage(round.icon)} alt={round.type} />
                    <span>{round.index}</span>
                  </span>
                {/each}
              </div>
              <div class="mt-4 flex flex-wrap gap-5 text-sm">
                <span class="flex items-center gap-2"><span class="inline-block h-3 w-3 rounded bg-sky-700"></span>{match.team_one.name}</span>
                <span class="flex items-center gap-2"><span class="inline-block h-3 w-3 rounded bg-amber-400"></span>{match.team_two.name}</span>
                <span class="flex items-center gap-2 text-gray-400">{roundWinsOne(selected, match.team_one.name)} : {roundWinsTwo(selected, match.team_one.name)} rounds</span>
              </div>
            </div>
          {/if}
        </section>
      {:else}
        <section class="mt-6 rounded border border-gray-200 bg-gray-50 p-5">
          <h2 class="text-lg font-bold">Match overview</h2>
          {#if data.maps?.length}
            <ul class="mt-4 grid gap-2 sm:grid-cols-2">
              {#each data.maps as map, mapIndex (map.index + "-" + mapIndex)}
                <li class="flex items-center justify-between rounded bg-white px-4 py-3">
                  <span class="font-semibold">Map {map.index}</span><span class="text-gray-600">{map.name}</span>
                </li>
              {/each}
            </ul>
          {:else}
            <p class="mt-2 text-sm text-gray-500">Map information and statistics are not available for this match yet.</p>
          {/if}
        </section>
      {/if}
    </div>
  </Container>
</main>
