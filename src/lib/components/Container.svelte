<script>
    export let fluid = false;
    export let full = false;
</script>

<div class="__container" class:__fluid={fluid} class:__full={full}>
    <slot />
</div>
