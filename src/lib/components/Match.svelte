<script>
  export let segment = {};

  let team_one_win = +segment.team_one.score > +segment.team_two.score;
  let team_two_win = +segment.team_one.score < +segment.team_two.score;
</script>

<div class="relative overflow-hidden rounded h-full">
  {#if segment.status == "upcoming"}
    <div
      class="z-[1] bg-black/40 text-white font-bold absolute inset-0 flex justify-center items-center"
    >
      {new Date(segment.timestamp).toLocaleString()}
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
      class="text-gray-200/40 text-[14rem] lg:text-[16rem] font-bold absolute inset-0 flex justify-center items-center"
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
    <div class="relative w-full flex flex-col justify-between h-full">
      <div>
        {#if segment.team_two.score !== null}
          <div class="mb-1 lg:mb-0 font-bold flex justify-between w-full px-3">
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
              src={segment.team_one.icon}
              class="aspect-square"
              alt=""
              width="35"
            />
            <h4>
              {segment.team_one.name}
            </h4>
          </div>
          <div
            class="text-right text-sm md:text-xl font-bold flex items-center gap-1.5"
          >
            <h4>
              {segment.team_two.name}
            </h4>
            <img
              src={segment.team_two.icon}
              class="aspect-square"
              alt=""
              width="35"
            />
          </div>
        </div>
      </div>
      <div
        class="flex flex-wrap text-center items-center justify-center gap-1 divide-x divide-gray-400"
      >
        <div class="flex gap-1 items-center">
          <img
            src={segment.event.icon}
            class="aspect-square"
            alt=""
            width="15"
          />
          <p class="line-clamp-1 text-xs">
            {segment.event.name}
          </p>
        </div>
        <p class="line-clamp-1 text-xs pl-1">
          {segment.event.round}
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
