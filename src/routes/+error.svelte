<script lang="ts">
  import { page } from "$app/stores";

  const retry = () => location.reload();
</script>

<svelte:head>
  <title>Valorant Discover · Connection problem</title>
</svelte:head>

<main class="flex min-h-[60vh] items-center justify-center px-4 py-16 text-center text-gray-800">
  <section class="w-full max-w-lg rounded border border-gray-200 bg-white p-8 shadow-sm">
    <p class="text-sm font-bold uppercase tracking-wide text-vlr">{$page.status === 503 ? "Service unavailable" : "Something went wrong"}</p>
    <h1 class="mt-3 text-2xl font-black">We couldn't load this data</h1>
    <p class="mt-3 text-gray-600">
      The Valorant data service may be temporarily unavailable. Check your connection and try again.
    </p>
    <p class="mt-2 text-sm text-gray-500">{$page.error?.message ?? "Please try again shortly."}</p>
    <div class="mt-6 flex flex-wrap justify-center gap-3">
      <button class="rounded bg-main-800 px-4 py-2 font-semibold text-white hover:bg-main-900" on:click={retry}>
        Try again
      </button>
      <a class="rounded border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-vlr focus:ring-offset-2" href="/">
        Go home
      </a>
    </div>
  </section>
</main>
