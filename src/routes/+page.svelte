<script>
  import Container from "$components/Container.svelte";
  import MainHeader from "$components/MainHeader.svelte";

  import Match from "$components/Match.svelte";
  import { onMount } from "svelte";

  let items = [];

  onMount(async () => {
    items = await fetch("https://vlr-gg-api.bius.work/matches?type=schedule")
      .then((o) => o.json())
      .then((o) => o.items);
  });
</script>

<MainHeader subtitle="UPCOMING MATCHES" />
<div class="text-gray-800">
  <Container>
    <div class="py-8 grid gap-2">
      <ul class="grid md:grid-cols-2 gap-2">
        {#each items.filter((it) => it.status == "live") as item}
          <li>
            <Match segment={item} />
          </li>
        {/each}
      </ul>
      <ul class="grid md:grid-cols-2 gap-2">
        {#each items.filter((it) => it.status == "upcoming") as item}
          <li>
            <Match segment={item} />
          </li>
        {/each}
      </ul>
    </div>
  </Container>
</div>
