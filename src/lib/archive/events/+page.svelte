<script lang="ts">
    import type { EventSummary } from "$lib/types";
    import Container from "$components/Container.svelte";
    import MainHeader from "$components/MainHeader.svelte";

    import { page } from "$app/stores";
    import Event from "$components/Event.svelte";

    let events: EventSummary[] = [];
    let sorted_pool_prize: EventSummary[] = [];
    $: events = (($page.data as { events?: EventSummary[] }).events ?? []);

    $: sorted_pool_prize = [...events].sort((a: EventSummary, b: EventSummary) => {
        const aPrize = Number(a.prizePool?.match(/\d/g)?.join("") || 0);
        const bPrize = Number(b.prizePool?.match(/\d/g)?.join("") || 0);
        return bPrize - aPrize;
    });
</script>

<MainHeader subtitle="EVENTS" />
<div class="text-gray-800">
    <Container>
        <div class="py-8">
            <ul class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                {#if sorted_pool_prize.length === 0}
                    <p class="rounded bg-gray-100 p-6 text-center text-gray-500">No events found.</p>
                {:else}
                    {#each sorted_pool_prize as event (event.id)}
                    <li>
                        <Event {event} />
                    </li>
                    {/each}
                {/if}
            </ul>
        </div>
    </Container>
</div>
