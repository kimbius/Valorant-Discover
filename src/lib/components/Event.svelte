<script>
    export let event = {};
</script>

<div class="bg-gray-100 rounded p-3 h-full">
    <div class="flex gap-4">
        <div>
            <img width={60} height={60} src={event.event_logo} alt="" />
        </div>
        <div class="flex flex-col justify-between h-full w-full gap-2">
            <h1
                class="font-bold text-sm leading-none text-gray-600"
            >
                {event.event_name}
            </h1>
            <p class="text-3xl font-bold text-vlr">
                {event.prize_pool}
            </p>
        </div>
    </div>
</div>
