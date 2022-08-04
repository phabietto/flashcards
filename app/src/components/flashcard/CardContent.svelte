<script lang="ts">
    export let contents = null;
    export let front = false;
</script>
<div class="p-6 text-left" class:front lang={contents.lang}>
    {#if contents.template == 'text'}
        {contents.content}
    {:else}
        {@html contents.content}
    {/if}
</div>
<style>
    .front { @apply text-3xl }
    div :global(b) { @apply mr-6 }
    div :global(u) { @apply font-bold }
</style>