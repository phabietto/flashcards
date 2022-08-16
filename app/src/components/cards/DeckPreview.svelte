<script lang="ts">
    import Badge from '../badge/Badge.svelte'
    import Button from '../button/Button.svelte';
    import type {Deck} from '../../models/deck';

    export let deck: Deck;
</script>

<div class="bg-white flex flex-col justify-around h-full p-3 space-y-3 rounded-lg shadow-md">
    <h5 class="text-gray-700 h-11 font-bold text-xl whitespace-nowrap overflow-hidden overflow-ellipsis" title={deck.Name}>{deck.Name}</h5>
    <div class="space-y-6">
        <p class="text-gray-400 text-xs m-2">{deck.Description}</p>
        <div class="flex justify-start gap-x-1">
            <Badge class="bg-blue-500/75 text-blue-50">{deck.Cards.length || 0} Card{(deck.Cards.length || 0) > 0 ? "s" : ""}</Badge>
            <Badge class="bg-yellow-500/75 text-yellow-800">Completed</Badge>
        </div>
    </div>
    <div class="flex flex-row justify-between text-gray-700">
        <div class="flex"><span class="self-end text-sm">{deck.Author}</span></div>
        <Button text="Open" secondary small on:click></Button>
    </div>
</div>