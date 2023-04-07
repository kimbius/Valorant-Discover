<script>
    import { fly } from "svelte/transition";
    import LoadingIcon from "./LoadingIcon.svelte";
    export let enabled = true;
    export let dark = true;
    export let delay = true;
    export let blur = false;
    export let fixed = true;
</script>

{#if enabled}
    <div
        out:fly={{ delay: delay ? 200 : 0, duration: 200 }}
        class:__dark={dark}
        class:__blur={blur}
        class:fixed
        class:absolute={!fixed}
        class="bg-white top-0 left-0 w-full h-full z-[1500] flex flex-col gap-4 items-center justify-center"
    >
        <LoadingIcon />
    </div>
{/if}

<style type="postcss">
    .__dark {
        @apply bg-gray-50;
    }
    .__blur {
        @apply bg-gray-50/50 backdrop-blur-md;
    }
    .__blur.__dark {
        @apply bg-black/50;
    }
</style>
