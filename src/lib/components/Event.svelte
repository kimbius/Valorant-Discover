<script lang="ts">
  import { proxyImage } from "$lib/image";
  import type { EventSummary } from "$lib/types";
  export let event: EventSummary;
</script>

<a href={`/events/${event.id}`} class="block bg-gray-100 rounded p-3 h-full focus:outline-none focus:ring-2 focus:ring-vlr focus:ring-offset-2">
  <div class="flex gap-4">
    <div><img width={60} height={60} src={proxyImage(event.icon)} alt="" /></div>
    <div class="flex flex-col justify-between h-full w-full gap-2">
      <h1 class="font-bold text-sm leading-none text-gray-600">{event.name}</h1>
      <p class="text-3xl font-bold text-vlr">{event.prizePool ?? "Prize pool unavailable"}</p>
    </div>
  </div>
</a>
