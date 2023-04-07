<script>
    import Container from "$components/Container.svelte";
    import MainHeader from "$components/MainHeader.svelte";

    import { page } from "$app/stores";

    $: ({ segments } = $page.data);
</script>

<MainHeader subtitle="NEWS" />
<div class="text-gray-800">
    <Container>
        <div class="py-8">
            <ul class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                {#each segments as segment}
                    <li>
                        <div class="bg-gray-100 p-3 rounded h-full">
                            <div
                                class="flex flex-col justify-between h-full gap-3"
                            >
                                <div>
                                    <h1 class="text-base font-bold">
                                        {segment.title}
                                    </h1>
                                    <p class="text-sm">
                                        {segment.description}
                                    </p>
                                </div>
                                <div class="flex items-end justify-between">
                                    <p class="font-medium text-sm">
                                        @{segment.author}
                                    </p>
                                    <a
                                        class="text-sm text-main-800"
                                        target="_"
                                        href={`//vlr.gg${segment.url_path}`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                            fill="currentColor"
                                            class="bi bi-box-arrow-up-right"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </Container>
</div>
