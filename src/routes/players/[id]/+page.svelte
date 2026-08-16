<script lang="ts">
  import Container from "$components/Container.svelte";
  import MainHeader from "$components/MainHeader.svelte";
  import { proxyImage } from "$lib/image";
  import type { PlayerDetail } from "$lib/types";

  export let data: { player: PlayerDetail };
  $: player = data.player;
</script>

<MainHeader subtitle="PLAYER PROFILE" compact />
<main class="text-gray-800">
  <Container>
    <div class="mx-auto max-w-5xl py-8">
      <a href="/" class="text-sm font-semibold text-main-800 hover:underline">← Back to discovery</a>
      <section class="mt-4 rounded border border-gray-200 bg-white p-5 sm:p-7">
        <div class="flex flex-col gap-5 sm:flex-row sm:items-center">
          <img class="h-28 w-28 rounded object-cover" src={proxyImage(player.icon)} alt="" />
          <div class="min-w-0 flex-1">
            <h1 class="text-3xl font-black">{player.alias}</h1>
            {#if player.realName}<p class="mt-1 text-gray-500">{player.realName}</p>{/if}
            <p class="mt-2 text-sm font-semibold uppercase tracking-wide text-gray-400">{player.country ?? "Country unknown"}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              {#if player.twitter}<a class="rounded border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-vlr focus:ring-offset-2" href={player.twitter} target="_blank" rel="noreferrer">X / Twitter</a>{/if}
              {#if player.twitch}<a class="rounded border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-vlr focus:ring-offset-2" href={player.twitch} target="_blank" rel="noreferrer">Twitch</a>{/if}
            </div>
          </div>
        </div>
      </section>

      {#if player.currentTeams.length}
        <section class="mt-8">
          <h2 class="text-xl font-bold">Current teams</h2>
          <ul class="mt-3 grid gap-3 sm:grid-cols-2">
            {#each player.currentTeams as team, teamIndex (team.id + "-" + teamIndex)}
              <li class="flex items-center gap-3 rounded border border-gray-200 bg-gray-50 p-4">
                <img class="h-12 w-12 object-contain" src={proxyImage(team.icon)} alt="" />
                <div><a class="font-bold hover:text-vlr" href={`/teams/${team.id}`}>{team.name}</a><p class="text-sm text-gray-500">{team.period ?? "Current roster"}</p></div>
              </li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if player.agents.length}
        <section class="mt-8">
          <div class="flex items-end justify-between gap-3"><div><h2 class="text-xl font-bold">Agent performance</h2><p class="mt-1 text-sm text-gray-500">Stats from the API’s available sample.</p></div><span class="text-sm text-gray-500">{player.agents.length} agents</span></div>
          <div class="mt-3 overflow-x-auto rounded border border-gray-200 bg-white">
            <table class="w-full min-w-[700px] text-left text-sm"><thead class="bg-gray-100 text-xs uppercase tracking-wide text-gray-500"><tr><th class="px-4 py-3">Agent</th><th class="px-3 py-3">Maps</th><th class="px-3 py-3">Pick rate</th><th class="px-3 py-3">Rating</th><th class="px-3 py-3">ACS</th><th class="px-3 py-3">K/D</th><th class="px-3 py-3">KAST</th><th class="px-4 py-3">ADR</th></tr></thead><tbody>
              {#each player.agents as agent, agentIndex (agent.agent + "-" + agentIndex)}
                <tr class="border-t border-gray-100"><td class="px-4 py-3"><div class="flex items-center gap-2 font-semibold"><img class="h-7 w-7 rounded-full" src={proxyImage(agent.icon)} alt="" />{agent.agent}</div></td><td class="px-3 py-3 tabular-nums">{agent.maps ?? "—"}</td><td class="px-3 py-3 tabular-nums">{agent.pickRate ?? "—"}%</td><td class="px-3 py-3 font-bold tabular-nums">{agent.rating?.toFixed(2) ?? "—"}</td><td class="px-3 py-3 tabular-nums">{agent.acs ?? "—"}</td><td class="px-3 py-3 tabular-nums">{agent.kd ?? "—"}</td><td class="px-3 py-3 tabular-nums">{agent.kast ?? "—"}%</td><td class="px-4 py-3 tabular-nums">{agent.adr ?? "—"}</td></tr>
              {/each}
            </tbody></table>
          </div>
        </section>
      {/if}

      {#if player.pastTeams.length}
        <section class="mt-8"><h2 class="text-xl font-bold">Team history</h2><ul class="mt-3 divide-y divide-gray-200 rounded border border-gray-200 bg-white">{#each player.pastTeams as team, teamIndex (team.id + "-" + team.period + "-" + teamIndex)}<li class="flex items-center justify-between gap-4 px-4 py-3"><a class="font-semibold hover:text-vlr" href={`/teams/${team.id}`}>{team.name}</a><span class="text-right text-sm text-gray-500">{team.period ?? "Period unavailable"}</span></li>{/each}</ul></section>
      {/if}
    </div>
  </Container>
</main>
