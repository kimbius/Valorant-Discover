<script>
    import Container from "$components/Container.svelte";
    import MainHeader from "$components/MainHeader.svelte";

    import { page } from "$app/stores";

    $: ({ players } = $page.data);
</script>

<MainHeader subtitle="PLAYERS" />
<div class="text-gray-800">
    <Container>
        <div class="py-8">
            <ul class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                {#each players.sort((a, b) => a.player_name
                        .toLowerCase()
                        .localeCompare(b.player_name.toLowerCase())) as player}
                    <li>
                        <div class="bg-gray-100 p-3 rounded h-full">
                            <a
                                target="_"
                                href={`//${player.player_link.slice(4)}`}
                                class="mb-2 flex items-center gap-2 font-bold"
                            >
                                <span class="text-lg">
                                    {player.player_name}
                                </span>
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width=".8em"
                                        height=".8em"
                                        fill="currentColor"
                                        class="bi bi-box-arrow-up-right"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                                        />
                                    </svg>
                                </span>
                            </a>
                            <table class="stats">
                                <tbody>
                                    <tr>
                                        <td> Team </td>
                                        <td>
                                            {player.player_team_initials}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> Rating </td>
                                        <td>
                                            {player.rating}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> Headshot </td>
                                        <td>
                                            {player.headshot_percentage}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> Clutch </td>
                                        <td>
                                            {player.clutch_success_percentage}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> KPR </td>
                                        <td>
                                            {player.kills_per_round}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> APR </td>
                                        <td>
                                            {player.assists_per_round}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> K/D </td>
                                        <td>
                                            {player.kills} / {player.deaths}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> Round Played </td>
                                        <td>
                                            {player.rounds_played}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </Container>
</div>

<style type="postcss">
    .stats {
        @apply w-full;
    }
    .stats tbody {
        @apply w-full;
    }
    .stats tbody tr {
        @apply flex justify-between w-full;
    }
    .stats tbody tr td:nth-child(1) {
        @apply font-bold;
    }
</style>
