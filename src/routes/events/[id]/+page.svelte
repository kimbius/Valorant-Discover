<script lang="ts">
  import { page } from "$app/stores";
  import Container from "$components/Container.svelte";
  import MainHeader from "$components/MainHeader.svelte";
  import Match from "$components/Match.svelte";
  import TournamentBracket from "$components/TournamentBracket.svelte";
  import { proxyImage } from "$lib/image";
  import type { EventDetail, MatchesResponse } from "$lib/types";

  export let data: { event: EventDetail; matches: MatchesResponse };
  $: event = data.event;
  $: activeStage = event.stages.find((stage) => stage.isActive);
  $: currentStatus = $page.url.searchParams.get("status");
  $: tab = $page.url.searchParams.get("tab") ?? "matches";

  $: hasTeams = event.teams.length > 0;
  $: hasBracket = event.stages.some((stage) => stage.brackets.some((b) => b.upper.length + b.lower.length > 0));
  $: hasPrizes = event.prizeDistribution.length > 0;

  $: tabs = [
    { key: "matches", label: "Matches", enabled: true },
    { key: "bracket", label: "Bracket", enabled: hasBracket },
    { key: "teams", label: "Teams", enabled: hasTeams },
    { key: "prizes", label: "Prizes", enabled: hasPrizes },
  ].filter((item) => item.enabled);

  $: activeTab = tabs.some((item) => item.key === tab) ? tab : "matches";

  const tabHref = (key: string) => {
    const params = new URLSearchParams();
    if (key !== "matches") params.set("tab", key);
    if (currentStatus) params.set("status", currentStatus);
    const qs = params.toString();
    return `/events/${event.id}${qs ? `?${qs}` : ""}`;
  };

  const filterHref = (status: string | null) => {
    const params = new URLSearchParams();
    if (activeTab !== "matches") params.set("tab", activeTab);
    if (status) params.set("status", status);
    const qs = params.toString();
    return `/events/${event.id}${qs ? `?${qs}` : ""}`;
  };
</script>

<MainHeader subtitle="EVENT DETAIL" compact />
<main class="text-gray-800">
  <Container>
    <div class="mx-auto max-w-6xl py-8">
      <a href="/events" class="text-sm font-semibold text-main-800 hover:underline">← Back to events</a>
      <section class="mt-4 rounded border border-gray-200 bg-white p-5 sm:p-7">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-start">
          <img class="h-24 w-24 object-contain" src={proxyImage(event.icon)} alt="" />
          <div class="min-w-0 flex-1">
            <h1 class="text-3xl font-black tracking-tight">{event.name}</h1>
            <p class="mt-2 max-w-3xl text-gray-600">{event.description ?? "Tournament details and match schedule."}</p>
            <dl class="mt-5 grid gap-4 text-sm sm:grid-cols-3">
              <div><dt class="font-bold uppercase tracking-wide text-gray-400">Dates</dt><dd class="mt-1">{event.dates ?? "TBA"}</dd></div>
              <div><dt class="font-bold uppercase tracking-wide text-gray-400">Prize pool</dt><dd class="mt-1">{event.prizePool ?? "TBA"}</dd></div>
              <div><dt class="font-bold uppercase tracking-wide text-gray-400">Location</dt><dd class="mt-1">{event.location ?? "Online"}</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <div class="mt-6 flex flex-wrap gap-2 border-b border-gray-200" role="tablist" aria-label="Event sections">
        {#each tabs as item, itemIndex (item.key + "-" + itemIndex)}
          <a
            role="tab"
            aria-selected={activeTab === item.key}
            class="-mb-px rounded-t border border-b-0 px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-vlr focus:ring-offset-2"
            class:bg-white={activeTab === item.key}
            class:border-gray-200={activeTab === item.key}
            class:text-main-800={activeTab === item.key}
            class:bg-gray-100={activeTab !== item.key}
            class:border-transparent={activeTab !== item.key}
            class:text-gray-600={activeTab !== item.key}
            class:hover:text-gray-900={activeTab !== item.key}
            href={tabHref(item.key)}
          >{item.label}</a>
        {/each}
      </div>

      {#if activeTab === "matches"}
        <section class="py-6">
          <div class="flex flex-wrap items-end justify-between gap-3">
            <div><h2 class="text-xl font-bold">Event matches</h2><p class="mt-1 text-sm text-gray-500">{activeStage ? `Active stage: ${activeStage.name}` : "All stages"}</p></div>
            <div class="flex flex-wrap gap-2 text-sm">
              {#each [{ label: "All", key: "all" }, { label: "Upcoming", key: "upcoming" }, { label: "Completed", key: "completed" }] as filter, filterIndex (filter.key + "-" + filterIndex)}
                <a
                  class="rounded border px-3 py-2 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-vlr focus:ring-offset-2"
                  class:bg-main-800={currentStatus === filter.key || (filter.key === "all" && !currentStatus)}
                  class:text-white={currentStatus === filter.key || (filter.key === "all" && !currentStatus)}
                  class:border-main-800={currentStatus === filter.key || (filter.key === "all" && !currentStatus)}
                  class:border-gray-300={!(currentStatus === filter.key || (filter.key === "all" && !currentStatus))}
                  class:text-gray-700={!(currentStatus === filter.key || (filter.key === "all" && !currentStatus))}
                  class:hover:bg-main-700={currentStatus === filter.key || (filter.key === "all" && !currentStatus)}
                  class:hover:bg-gray-100={!(currentStatus === filter.key || (filter.key === "all" && !currentStatus))}
                  aria-current={currentStatus === filter.key || (filter.key === "all" && !currentStatus) ? "true" : undefined}
                  href={filterHref(filter.key === "all" ? null : filter.key)}
                >{filter.label}</a>
              {/each}
            </div>
          </div>
          {#if data.matches.items.length === 0}
            <p class="mt-4 rounded bg-gray-100 p-6 text-center text-gray-500">No matches found for this filter.</p>
          {:else}
            <ul class="mt-4 grid gap-3 md:grid-cols-2">
              {#each data.matches.items as match, matchIndex (match.id + "-" + matchIndex)}
                <li><Match segment={match} /></li>
              {/each}
            </ul>
          {/if}
        </section>
      {:else if activeTab === "bracket"}
        <section class="py-6">
          <h2 class="text-xl font-bold">Tournament bracket</h2>
          <p class="mt-1 text-sm text-gray-500">Round progression shown as an interactive bracket, one canvas per stage. Some connectors may be omitted when the data source does not define them.</p>
          <div class="mt-3">
            <TournamentBracket stages={event.stages} />
          </div>
        </section>
      {:else if activeTab === "teams"}
        <section class="py-6">
          <h2 class="text-xl font-bold">Participating teams</h2>
          <ul class="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {#each event.teams as team, teamIndex (team.id + "-" + teamIndex)}
              <li class="flex items-center gap-3 rounded border border-gray-200 bg-gray-50 p-3">
                <img class="h-10 w-10 object-contain" src={proxyImage(team.icon)} alt="" />
                <a class="font-semibold hover:text-vlr" href={`/teams/${team.id}`}>{team.name}</a>
              </li>
            {/each}
          </ul>
        </section>
      {:else if activeTab === "prizes"}
        <section class="py-6">
          <h2 class="text-xl font-bold">Prize distribution</h2>
          <div class="mt-3 overflow-hidden rounded border border-gray-200">
            <table class="w-full text-left text-sm"><thead class="bg-gray-100"><tr><th class="px-4 py-3">Place</th><th class="px-4 py-3">Team</th><th class="px-4 py-3">Prize</th></tr></thead><tbody>
              {#each event.prizeDistribution as row, rowIndex (row.place + "-" + rowIndex)}
                <tr class="border-t border-gray-200"><td class="px-4 py-3 font-bold">{row.place}</td><td class="px-4 py-3">{#if row.team}<a class="font-semibold hover:text-vlr" href={`/teams/${row.team.id}`}>{row.team.name}</a>{:else}TBD{/if}</td><td class="px-4 py-3">{row.prize ?? "—"}</td></tr>
              {/each}
            </tbody></table>
          </div>
        </section>
      {/if}
    </div>
  </Container>
</main>
