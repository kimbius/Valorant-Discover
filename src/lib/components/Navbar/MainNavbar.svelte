<script lang="ts">
    import { page } from "$app/stores";
    import Container from "../Container.svelte";

    const navbar_items: { title: string; href: string }[] = [
        { title: "Upcoming", href: "/" },
        { title: "Matches", href: "/matches" },
        { title: "Events", href: "/events" },
        { title: "Rankings", href: "/rankings" },
    ];

    let mobileOpen = false;

    const isActive = (href: string, pathname: string) =>
        href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
</script>

<nav aria-label="Primary navigation">
    <Container>
        <div class="nav-content">
            <a class="nav-head" href="/" aria-label="Valorant Discover home">
                <span class="leading-none text-lg font-bold text-main-100">VALORANT</span>
                <span class="leading-none text-xs text-main-300">DISCOVER</span>
            </a>

            <ul class="nav-lists">
                {#each navbar_items as item, itemIndex (item.href + "-" + itemIndex)}
                    <li class="nav-lists-item">
                        <a class:__active={isActive(item.href, $page.url.pathname)} href={item.href}>
                            {item.title}
                        </a>
                    </li>
                {/each}
            </ul>

            <button
                class="mobile-toggle"
                type="button"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
                on:click={() => (mobileOpen = !mobileOpen)}
            >
                <span aria-hidden="true">{mobileOpen ? "×" : "☰"}</span>
            </button>
        </div>

        {#if mobileOpen}
            <div id="mobile-navigation" class="mobile-menu">
                <ul>
                    {#each navbar_items as item, itemIndex (item.href + "-mobile-" + itemIndex)}
                        <li>
                            <a
                                class:__active={isActive(item.href, $page.url.pathname)}
                                href={item.href}
                                aria-current={isActive(item.href, $page.url.pathname) ? "page" : undefined}
                                on:click={() => (mobileOpen = false)}
                            >{item.title}</a>
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}
    </Container>
</nav>

<style type="postcss">
    nav {
        @apply z-[10] sticky top-0 left-0 w-full bg-main-800;
    }
    .nav-content {
        @apply flex min-h-[4.5rem] items-center justify-between;
    }
    .nav-head {
        @apply flex flex-col py-3 no-underline;
    }
    .nav-lists {
        @apply hidden h-full items-center sm:flex;
    }
    .nav-lists > li.nav-lists-item {
        @apply h-full text-main-300;
    }
    .nav-lists > li.nav-lists-item a {
        @apply flex h-full min-h-[4.5rem] items-center px-4 font-semibold transition-colors hover:bg-main-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white;
    }
    .nav-lists > li.nav-lists-item a.__active {
        @apply bg-main-700 text-main-50;
    }
    .mobile-toggle {
        @apply flex h-11 w-11 items-center justify-center rounded text-2xl text-main-50 transition-colors hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-white sm:hidden;
    }
    .mobile-menu {
        @apply border-t border-main-700 pb-3 sm:hidden;
    }
    .mobile-menu a {
        @apply flex min-h-11 items-center rounded px-3 font-semibold text-main-100 transition-colors hover:bg-main-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white;
    }
    .mobile-menu a.__active {
        @apply bg-white text-main-900;
    }
</style>
