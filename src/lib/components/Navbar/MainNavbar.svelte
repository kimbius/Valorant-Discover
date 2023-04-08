<script>
    import { page } from "$app/stores";

    const navbar_items = [
        {
            title: "Upcoming",
            href: "/",
        },
        {
            title: "Matches",
            href: "/matches",
        },
        {
            title: "Events",
            href: "/events",
        },
        {
            title: "News",
            href: "/news",
        },
        {
            title: "Players",
            href: "/players",
        },
    ];

    import Container from "../Container.svelte";
</script>

<nav>
    <Container>
        <div class="nav-content">
            <div class="nav-head">
                <h3 class="leading-none text-lg font-bold text-main-100">
                    VALORANT
                </h3>
                <p class="leading-none text-xs text-main-300">DISCOVER</p>
            </div>
            <ul class="nav-lists">
                {#each navbar_items as { title, href }}
                    <li class="nav-lists-item">
                        <a class:__active={$page.url.pathname === href} {href}>
                            {title}
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    </Container>
</nav>

<style type="postcss">
    nav {
        @apply z-[10] sticky top-0 left-0 w-full h-full bg-main-800;
    }
    .nav-content {
        @apply flex justify-between items-center;
    }
    .nav-head {
        @apply flex flex-col py-4 lg:py-0;
    }
    .nav-lists {
        @apply hidden h-full sm:flex;
    }
    .nav-lists > li.nav-lists-item {
        @apply p-4 text-main-300;
    }
    .nav-lists > li.nav-lists-item a {
        @apply py-4;
    }
    .nav-lists > li.nav-lists-item a.__active {
        @apply text-main-50;
    }
</style>
