<script>
    import Container from "$components/Container.svelte";
    import MainHeader from "$components/MainHeader.svelte";

    import { page } from "$app/stores";
    import Event from "../../lib/components/Event.svelte";

    $: ({ events } = $page.data);

    $: sorted_pool_prize = events.sort((a, b) => {
        const aPrize = +a.prize_pool.match(/\d/g)?.join("") || 0;
        const bPrize = +b.prize_pool.match(/\d/g)?.join("") || 0;
        return bPrize - aPrize;
    });
</script>

<MainHeader subtitle="EVENTS" />
<div class="text-gray-800">
    <Container>
        <div class="py-8">
            <ul class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                {#each sorted_pool_prize as event}
                    <li>
                        <Event {event} />
                    </li>
                {/each}
            </ul>
        </div>
    </Container>
</div>
