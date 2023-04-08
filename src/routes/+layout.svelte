<script>
  import "../app.postcss";

  import { navigating, page } from "$app/stores";
  import LoadingOverlay from "$components/LoadingOverlay.svelte";
  import MainNavbar from "$components/Navbar/MainNavbar.svelte";
  $: loading = !!$navigating;
</script>

<svelte:head>
  <title>Valorant Discover</title>
</svelte:head>

<MainNavbar />
<slot />

{#if loading}
  <LoadingOverlay />
{/if}
