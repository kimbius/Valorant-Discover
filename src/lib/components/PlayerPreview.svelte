<script lang="ts">
  import { getPlayer } from "$lib/API";
  import { proxyImage } from "$lib/image";
  import type { PlayerDetail } from "$lib/types";

  export let id: string;
  export let name: string;
  export let className = "font-semibold hover:text-vlr";

  let player: PlayerDetail | null = null;
  let loading = false;
  let failed = false;
  let open = false;
  let requestId = 0;
  let anchorElement: HTMLElement | null = null;
  let cardX = 0;
  let cardY = 0;
  let flipUp = false;

  function positionCard() {
    if (!anchorElement) return;
    const rect = anchorElement.getBoundingClientRect();
    const cardWidth = Math.min(288, window.innerWidth - 32);
    const cardHeight = 190;

    cardX = Math.min(Math.max(8, rect.left), window.innerWidth - cardWidth - 8);
    const below = rect.bottom + 8;
    flipUp = below + cardHeight > window.innerHeight - 8;
    cardY = flipUp ? Math.max(8, rect.top - cardHeight - 8) : below;
  }

  async function showPreview() {
    open = true;
    positionCard();
    if (player || loading) return;

    loading = true;
    failed = false;
    const currentRequest = ++requestId;
    try {
      player = await getPlayer(id);
    } catch {
      if (currentRequest === requestId) failed = true;
    } finally {
      if (currentRequest === requestId) loading = false;
    }
  }

  function hidePreview() {
    open = false;
  }
</script>

<span class="preview-anchor" bind:this={anchorElement} on:mouseenter={showPreview} on:mouseleave={hidePreview} on:focusin={showPreview} on:focusout={hidePreview}>
  <a class={className} href={`/players/${id}`} aria-describedby={open ? `player-preview-${id}` : undefined}>{name}</a>
</span>

{#if open}
  <div class="preview-portal" style:left="{cardX}px" style:top="{cardY}px" aria-hidden="true">
    <span id={`player-preview-${id}`} class="preview-card" role="status">
      {#if loading}
        <span class="text-sm text-gray-500">Loading player info…</span>
      {:else if failed || !player}
        <span class="text-sm text-gray-500">Player info unavailable.</span>
      {:else}
        <span class="flex items-start gap-3">
          <img class="h-12 w-12 rounded object-cover" src={proxyImage(player.icon)} alt="" />
          <span class="min-w-0 flex-1">
            <strong class="block truncate text-base text-gray-900">{player.alias}</strong>
            {#if player.realName}<span class="block truncate text-xs text-gray-500">{player.realName}</span>{/if}
            <span class="mt-2 block text-xs font-semibold uppercase tracking-wide text-gray-400">{player.country ?? "Country unknown"}</span>
          </span>
        </span>
        {#if player.currentTeams.length}
          <span class="mt-3 block border-t border-gray-200 pt-3 text-xs text-gray-600">
            Current: <strong class="text-gray-900">{player.currentTeams.map((team) => team.name).join(", ")}</strong>
          </span>
        {/if}
        <span class="mt-3 block text-xs font-semibold text-main-800">Open full profile →</span>
      {/if}
    </span>
  </div>
{/if}

<style>
  .preview-anchor {
    display: inline-block;
  }

  .preview-portal {
    position: fixed;
    z-index: 50;
    pointer-events: none;
  }

  .preview-card {
    display: block;
    width: min(18rem, calc(100vw - 2rem));
    padding: 0.875rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background: #ffffff;
    box-shadow: 0 12px 30px rgba(31, 41, 55, 0.16);
  }
</style>
