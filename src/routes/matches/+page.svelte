<script>
  import Container from "$components/Container.svelte";
  import MainHeader from "$components/MainHeader.svelte";

  import Match from "$components/Match.svelte";
  import { onMount } from "svelte";

  let items = [];

  onMount(async () => {
    items = await fetch("https://vlr-gg-api.bius.work/matches?type=results")
      .then((o) => o.json())
      .then((o) => o.items);
  });
</script>

<MainHeader subtitle="MATCH RESULTS" />
<div class="text-gray-800">
  <Container>
    <div class="py-8">
      <ul class="grid md:grid-cols-2 gap-2">
        {#each items as item}
          <li>
            <Match segment={item} />
          </li>
        {/each}
      </ul>
    </div>
  </Container>
</div>
