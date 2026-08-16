<script lang="ts">
  import Container from "$components/Container.svelte";
  import MainHeader from "$components/MainHeader.svelte";
  import Match from "$components/Match.svelte";
  import type { MatchesResponse } from "$lib/types";

  export let data: { matches: MatchesResponse };
  $: items = data.matches.items;
</script>

<MainHeader subtitle="MATCH RESULTS" />
<div class="text-gray-800">
  <Container>
    <div class="py-8">
      {#if items.length === 0}
        <p class="rounded bg-gray-100 p-6 text-center text-gray-500">No match results found.</p>
      {:else}
        <ul class="grid md:grid-cols-2 gap-2">
          {#each items as item, itemIndex (item.id + "-" + itemIndex)}
            <li><Match segment={item} /></li>
          {/each}
        </ul>
      {/if}
    </div>
  </Container>
</div>
