<script lang="ts">
  import Container from "$components/Container.svelte";
  import Event from "$components/Event.svelte";
  import MainHeader from "$components/MainHeader.svelte";
  import type { EventsResponse } from "$lib/types";

  export let data: { events: EventsResponse };
</script>

<MainHeader subtitle="EVENTS" />
<main class="text-gray-800">
  <Container>
    <section class="py-8">
      <div class="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold">Competition archive</h1>
          <p class="mt-1 text-sm text-gray-500">Browse tournaments, stages, teams, and results.</p>
        </div>
        <span class="text-sm text-gray-500">{data.events.meta.itemCount} events</span>
      </div>
      {#if data.events.items.length === 0}
        <p class="rounded bg-gray-100 p-6 text-center text-gray-500">No events found.</p>
      {:else}
        <ul class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {#each data.events.items as event, eventIndex (event.id + "-" + eventIndex)}
            <li><Event {event} /></li>
          {/each}
        </ul>
      {/if}
    </section>
  </Container>
</main>
