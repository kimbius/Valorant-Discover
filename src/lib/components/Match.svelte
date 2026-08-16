<script lang="ts">
    import { proxyImage } from "$lib/image";
    import type { Match as MatchData } from "$lib/types";

    export let segment: MatchData;

    const fallbackImage = (event: Event) => {
        const image = event.currentTarget as HTMLImageElement;
        image.src = "/vlr.png";
    };

    let team_one_win = Number(segment.team_one.score ?? 0) > Number(segment.team_two.score ?? 0);
    let team_two_win = Number(segment.team_one.score ?? 0) < Number(segment.team_two.score ?? 0);
</script>

<article class="relative block cursor-pointer overflow-hidden rounded h-full">
    <a
        class="card-hit-area"
        href={`/matches/${segment.id}`}
        aria-label={`Open match: ${segment.team_one.name} versus ${segment.team_two.name}`}
    ></a>
    {#if segment.status == "upcoming"}
        <div
            class="pointer-events-none z-[1] bg-black/40 text-white font-bold absolute inset-0 flex justify-center items-center"
        >
            {segment.timestamp ? new Date(segment.timestamp).toLocaleString() : "Time to be announced"}
        </div>
    {/if}
    <div
        class:__waiting={true}
        class:__completed={segment.status === "completed"}
        class:__l_win={team_one_win}
        class:__r_win={team_two_win}
        class:__upcoming={segment.status === "upcoming"}
        class:__live={segment.status === "live"}
        class="h-full border-x-8 relative bg-gray-100 py-2 px-3 flex items-start gap-4"
    >
        <div
            class="text-gray-200/40 text-8xl lg:text-9xl font-bold absolute inset-0 flex justify-center items-center"
        >
            VS
        </div>
        {#if segment.status === "completed"}
            {#if team_one_win}
                <div
                    class="absolute left-0 h-full w-full bg-gradient-to-r from-green-400/20 top-0 to-transparent"
                ></div>
            {:else if team_two_win}
                <div
                    class="absolute left-0 h-full w-full bg-gradient-to-l from-green-400/20 top-0 to-transparent"
                ></div>
            {/if}
        {/if}
        <div class="pointer-events-none relative z-[2] w-full flex flex-col justify-between h-full">
            <div>
                {#if segment.team_two.score !== null}
                    <div
                        class="mb-1 lg:mb-0 font-bold flex justify-between w-full px-3"
                    >
                        <p class="text-7xl">
                            {segment.team_one.score}
                        </p>
                        <p class="text-7xl">
                            {segment.team_two.score}
                        </p>
                    </div>
                {/if}
                <div class="flex items-center justify-between w-full my-1">
                    <div
                        class="text-left text-sm md:text-xl font-bold flex items-center gap-1.5"
                    >
                        <img
                            src={proxyImage(segment.team_one.icon)}
                            class="aspect-square"
                            alt=""
                            width="35"
                            on:error={fallbackImage}
                        />
                        {#if segment.team_one.id}
                            <a class="hover:text-vlr" href={`/teams/${segment.team_one.id}`}>{segment.team_one.name}</a>
                        {:else}
                            <h4>{segment.team_one.name}</h4>
                        {/if}
                    </div>
                    <div
                        class="text-right text-sm md:text-xl font-bold flex items-center gap-1.5"
                    >
                        {#if segment.team_two.id}
                            <a class="hover:text-vlr" href={`/teams/${segment.team_two.id}`}>{segment.team_two.name}</a>
                        {:else}
                            <h4>{segment.team_two.name}</h4>
                        {/if}
                        <img
                            src={proxyImage(segment.team_two.icon)}
                            class="aspect-square"
                            alt=""
                            width="35"
                            on:error={fallbackImage}
                        />
                    </div>
                </div>
            </div>
            <div
                class="flex flex-wrap text-center items-center justify-center gap-1 divide-x divide-gray-400"
            >
                <div class="flex gap-1 items-center">
                    <img
                        src={proxyImage(segment.event.icon)}
                        class="aspect-square"
                        alt=""
                        width="15"
                        on:error={fallbackImage}
                    />
                    {#if segment.event.id}
                        <a class="line-clamp-1 text-xs hover:text-vlr" href={`/events/${segment.event.id}`}>{segment.event.name}</a>
                    {:else}
                        <p class="line-clamp-1 text-xs">{segment.event.name}</p>
                    {/if}
                </div>
                <p class="line-clamp-1 text-xs pl-1">
                    {segment.event.round}
                </p>
            </div>
        </div>
    </div>
</article>

<style>
    .card-hit-area {
        @apply absolute inset-0 z-[1] rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-vlr;
    }
    .pointer-events-none a {
        @apply pointer-events-auto relative;
    }
    .__waiting {
        @apply border-gray-200;
    }
    .__upcoming {
        @apply border-yellow-400;
    }
    .__live {
        @apply border-vlr;
    }
    .__completed {
        @apply border-green-400;
    }
    .__l_win {
        @apply border-r-vlr;
    }
    .__r_win {
        @apply border-l-vlr;
    }
</style>
