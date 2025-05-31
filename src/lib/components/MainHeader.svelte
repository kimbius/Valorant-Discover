<script>
    export let subtitle = "DISCOVER";
</script>

<header
    style:background-image={"var(--thumbnail)"}
    style:--thumbnail={`url('/thumbnail.jpg')`}
    class="relative flex flex-col justify-center items-center py-48 bg-cover"
>
    <div class="top-0 left-0 absolute w-full h-full bg-black/50" />
    <div class="relative text-center">
        <h1 class="text-6xl lg:text-8xl font-extrabold text-vlr">VALORANT</h1>
        <h3 class="text-3xl lg:text-5xl text-white font-bold">{subtitle}</h3>
    </div>
</header>
