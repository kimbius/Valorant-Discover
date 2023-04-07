<script>
    export let segment = {};
</script>

<div class="relative overflow-hidden rounded">
    {#if segment.time_until_match && !["Upcoming", "LIVE"].includes(segment.time_until_match)}
        <div
            class="z-[1] bg-black/40 text-white font-bold absolute inset-0 flex justify-center items-center"
        >
            {segment.time_until_match}
        </div>
    {/if}
    <div
        class:__waiting={!["Upcoming", "LIVE"].includes(
            segment.time_until_match
        )}
        class:__completed={!!segment.time_completed}
        class:__l_win={+segment.score1 > +segment.score2}
        class:__r_win={+segment.score1 < +segment.score2}
        class:__upcoming={segment.time_until_match === "Upcoming"}
        class:__live={segment.time_until_match === "LIVE"}
        class="border-x-8 relative bg-gray-100 py-2 px-4 flex items-start gap-4"
    >
        <div
            class="text-gray-200/50 text-[14rem] lg:text-[16rem] font-bold absolute inset-0 flex justify-center items-center"
        >
            VS
        </div>
        <div class="relative w-full">
            {#if segment.score1 != "–"}
                <div class="mb-1 lg:mb-0 font-bold flex justify-between w-full">
                    <p class="text-7xl">
                        {segment.score1}
                    </p>
                    <p class="text-7xl">
                        {segment.score2}
                    </p>
                </div>
            {/if}
            <div class="flex items-center justify-between w-full">
                <div class="text-left text-sm md:text-xl font-bold">
                    <h4>
                        {segment.team1}
                    </h4>
                </div>
                <div class="text-right text-sm md:text-xl font-bold">
                    <h4>
                        {segment.team2}
                    </h4>
                </div>
            </div>
            <div
                class="flex flex-wrap lg:flex-nowrap items-center justify-between"
            >
                <div class="flex gap-1 items-center">
                    <img
                        src={segment.tournament_icon}
                        class="aspect-square"
                        alt=""
                        width="15"
                    />
                    <p class="line-clamp-1 text-xs">
                        {segment.tournament_name}
                    </p>
                </div>
                <p class="line-clamp-1 text-xs">
                    {segment.round_info}
                </p>
            </div>
        </div>
    </div>
</div>

<style>
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
