<script lang="ts">
  import Container from "$components/Container.svelte";
  import MainHeader from "$components/MainHeader.svelte";
  import PlayerPreview from "$components/PlayerPreview.svelte";
  import { proxyImage } from "$lib/image";
  import type { TeamDetail } from "$lib/types";

  export let data: { team: TeamDetail };
  $: team = data.team;
</script>

<MainHeader subtitle="TEAM PROFILE" compact />
<main class="text-gray-800">
  <Container>
    <div class="mx-auto max-w-5xl py-8">
      <a href="/" class="text-sm font-semibold text-main-800 hover:underline">← Back to discovery</a>
      <section class="mt-4 rounded border border-gray-200 bg-white p-5 sm:p-7">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-center">
          <img class="h-24 w-24 object-contain" src={proxyImage(team.icon)} alt="" />
          <div class="min-w-0 flex-1">
            <h1 class="text-3xl font-black">{team.name}</h1>
            <p class="mt-1 text-sm font-semibold uppercase tracking-wide text-gray-400">{team.country ?? "Country unknown"}{team.tag ? ` · ${team.tag}` : ""}</p>
            {#if team.ranking}
              <div class="mt-4 flex flex-wrap gap-3">
                <span class="rounded bg-gray-100 px-3 py-1.5 text-sm"><span class="font-bold">#{team.ranking.rank}</span> in {team.ranking.region}</span>
                <span class="rounded bg-gray-100 px-3 py-1.5 text-sm"><span class="font-bold">{team.ranking.rating}</span> rating</span>
                <span class="rounded bg-gray-100 px-3 py-1.5 text-sm"><span class="font-bold">{team.ranking.record}</span></span>
              </div>
            {/if}
            <div class="mt-4 flex flex-wrap gap-2">
              {#if team.website}<a class="rounded border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-vlr focus:ring-offset-2" href={team.website} target="_blank" rel="noreferrer">Website</a>{/if}
              {#if team.twitter}<a class="rounded border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-vlr focus:ring-offset-2" href={team.twitter} target="_blank" rel="noreferrer">X / Twitter</a>{/if}
            </div>
          </div>
        </div>
      </section>

      {#if team.roster.length}
        <section class="mt-8"><h2 class="text-xl font-bold">Roster</h2><ul class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{#each team.roster as member, memberIndex (member.id + "-" + memberIndex)}<li class="flex items-center gap-3 rounded border border-gray-200 bg-gray-50 p-4"><img class="h-12 w-12 rounded-full object-cover" src={proxyImage(member.icon)} alt="" /><div class="min-w-0"><PlayerPreview id={member.id} name={`${member.alias}${member.isCaptain ? " (C)" : ""}`} className="block truncate font-bold hover:text-vlr" /><p class="truncate text-sm text-gray-500">{member.realName ?? member.countryCode ?? ""}</p></div></li>{/each}</ul></section>
      {/if}

      {#if team.recentResults.length}
        <section class="mt-8"><h2 class="text-xl font-bold">Recent results</h2><ul class="mt-3 divide-y divide-gray-200 rounded border border-gray-200 bg-white">{#each team.recentResults as match, matchIndex (match.id + "-" + matchIndex)}<li><a class="flex items-center justify-between gap-4 px-4 py-3 hover:bg-gray-50 hover:text-gray-900" href={`/matches/${match.id}`}><span class="min-w-0"><span class="block truncate font-semibold">{match.opponent ?? "Opponent TBA"}</span><span class="block truncate text-sm text-gray-500">{match.eventName} · {match.eventRound ?? ""}</span></span><span class="shrink-0 text-right"><span class="font-bold tabular-nums">{match.result ?? "—"}</span><span class="block text-sm text-gray-500">{match.date ?? ""}</span></span></a></li>{/each}</ul></section>
      {/if}

      {#if team.upcomingMatches.length}
        <section class="mt-8"><h2 class="text-xl font-bold">Upcoming matches</h2><ul class="mt-3 divide-y divide-gray-200 rounded border border-gray-200 bg-white">{#each team.upcomingMatches as match, matchIndex (match.id + "-" + matchIndex)}<li><a class="flex items-center justify-between gap-4 px-4 py-3 hover:bg-gray-50 hover:text-gray-900" href={`/matches/${match.id}`}><span class="min-w-0"><span class="block truncate font-semibold">{match.opponent ?? "Opponent TBA"}</span><span class="block truncate text-sm text-gray-500">{match.eventName} · {match.eventRound ?? ""}</span></span><span class="shrink-0 text-right"><span class="font-bold">{match.result ?? "—"}</span><span class="block text-sm text-gray-500">{match.date ?? ""}</span></span></a></li>{/each}</ul></section>
      {/if}

      {#if team.staff.length}
        <section class="mt-8"><h2 class="text-xl font-bold">Staff</h2><ul class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{#each team.staff as member, memberIndex (member.id + "-" + memberIndex)}<li class="flex items-center gap-3 rounded border border-gray-200 bg-gray-50 p-4"><img class="h-10 w-10 rounded-full object-cover" src={proxyImage(member.icon)} alt="" /><div class="min-w-0"><PlayerPreview id={member.id} name={member.alias} className="block truncate font-bold hover:text-vlr" /><p class="truncate text-sm text-gray-500">{member.realName ?? ""}</p></div></li>{/each}</ul></section>
      {/if}
    </div>
  </Container>
</main>
