<script lang="ts">
    import type { Player as PlayerData } from "$lib/types";
    import Container from "$components/Container.svelte";
    import MainHeader from "$components/MainHeader.svelte";
    import Player from "$components/Player.svelte";

    import { page } from "$app/stores";

    let players: PlayerData[] = [];
    let sorted_players: PlayerData[] = [];
    $: players = (($page.data as { players?: PlayerData[] }).players ?? []);
    $: sorted_players = [...players].sort((a: PlayerData, b: PlayerData) =>
        a.player_name.toLowerCase().localeCompare(b.player_name.toLowerCase())
    );
</script>

<MainHeader subtitle="PLAYERS" />
<div class="text-gray-800">
    <Container>
        <div class="py-8">
            <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                {#each sorted_players as player}
                    <Player {player} />
                {/each}
            </div>
        </div>
    </Container>
</div>
