<script lang="ts">
  import { Handle, Position } from "@xyflow/svelte";
  import { proxyImage } from "$lib/image";
  import type { BracketNodeData } from "$lib/bracketGraph";

  export let data: BracketNodeData;

  $: match = data.match;
  $: kickoff = match.timestamp
    ? new Date(match.timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric" })
    : "Date TBA";
</script>

<div class="w-[260px] rounded border border-gray-200 bg-white shadow-sm">
  <Handle type="target" position={Position.Left} class="bracket-handle" />
  <div class="flex items-center justify-between gap-2 border-b border-gray-100 px-3 py-2">
    <a class="nodrag text-xs font-bold uppercase tracking-wide text-main-800 hover:underline" href={`/matches/${match.id}`}>{match.round}</a>
    <span class="text-xs text-gray-500">{kickoff}</span>
  </div>
  <ul class="grid gap-1 p-1.5">
    {#each match.teams as team, teamIndex (team.id + "-" + teamIndex)}
      <li
        class="flex items-center justify-between gap-2 rounded px-1.5 py-1"
        class:bg-green-50={team.isWinner}
        class:text-gray-400={team.isTBD}
      >
        {#if team.isTBD || !team.id}
          <span class="flex min-w-0 items-center gap-1.5">
            <img class="h-[18px] w-[18px] shrink-0 object-contain" src="/vlr.png" alt="" />
            <span class="truncate">TBD</span>
          </span>
        {:else}
          <a class="nodrag flex min-w-0 items-center gap-1.5 truncate hover:text-vlr" href={`/teams/${team.id}`}>
            <img class="h-[18px] w-[18px] shrink-0 object-contain" src="/vlr.png" alt="" />
            <span class="truncate">{team.name}</span>
          </a>
        {/if}
        <span class="shrink-0 font-bold tabular-nums" class:text-green-700={team.isWinner}>{team.score ?? "—"}</span>
      </li>
    {/each}
  </ul>
  <Handle type="source" position={Position.Right} class="bracket-handle" />
</div>

<style type="postcss">
  :global(.bracket-handle) {
    @apply h-2 w-2 border-2 border-white bg-gray-400;
  }
</style>
