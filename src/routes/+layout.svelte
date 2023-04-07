<script>
  import "../app.postcss";

  import { navigating, page } from "$app/stores";
  import LoadingOverlay from "$components/LoadingOverlay.svelte";
  import MainNavbar from "$components/Navbar/MainNavbar.svelte";
  $: loading = !!$navigating;
</script>

<MainNavbar />
<slot />

{#if loading}
  <LoadingOverlay />
{/if}
