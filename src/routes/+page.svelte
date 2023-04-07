<script>
    import Container from "$components/Container.svelte";
    import MainHeader from "$components/MainHeader.svelte";

    import { page } from "$app/stores";
    import Match from "$components/Match.svelte";

    $: ({ segments } = $page.data);
</script>

<MainHeader subtitle="UPCOMING MATCHES" />
<div class="text-gray-800">
    <Container>
        <div class="py-8 grid gap-2">
            <ul class="grid md:grid-cols-2 gap-2">
                {#each segments.filter((segment) => segment.score1 != "–") as segment}
                    <li>
                        <Match {segment} />
                    </li>
                {/each}
            </ul>
            <ul class="grid md:grid-cols-2 gap-2">
                {#each segments.filter((segment) => segment.score1 == "–") as segment}
                    <li>
                        <Match {segment} />
                    </li>
                {/each}
            </ul>
        </div>
    </Container>
</div>
