<script lang="ts">
    import Badge from '../badge/Badge.svelte'
import Button from '../button/Button.svelte';

    export let deck;
</script>

<div class="bg-white p-3 h-full flex flex-col justify-between rounded-lg shadow-md">
    <h5 class="text-gray-700 font-bold text-base mb-2">{deck.name}</h5>
    <div>
        <p class="text-gray-400 text-xs m-2">{deck.description}</p>
        <Badge>{deck.cards.length || 0} item{(deck.cards.length || 0) > 0 ? "s" : ""}</Badge>
    </div>
    <div class="flex flex-row justify-between text-gray-700">
        <div class="flex"><span class="self-end text-sm">{deck.author}</span></div>
        <Button text="Open" secondary small on:click></Button>
    </div>
</div>