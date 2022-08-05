<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import FlashCard from "../flashcard/FlashCard.svelte";
    import Switch from "../switch/Switch.svelte";

    export let deck;

    let continuous = false;
    let currentCardIndex = 0;
    let maxCards = 0;

    $:{
        maxCards = deck.cards.length;
    }

    function switchCard(direction: number) {
        const len = deck.cards.length;
        if(direction > 0) {
            if(currentCardIndex >= len - 1) {
                if(continuous) {
                    currentCardIndex = 0;
                }
            } else {
                currentCardIndex++;
            }
        } else {
            if(currentCardIndex == 0) {
                if(continuous) {
                    currentCardIndex = len-1;
                }
            } else {
                currentCardIndex--;
            }
        }
    }

    const dispatcher = createEventDispatcher();
    function handleHome(){
        dispatcher('deck-controls::home');
    }

</script>

<section class="flex-grow flex flex-col h-[400px]">
    <FlashCard card={deck.cards[currentCardIndex]}></FlashCard>
    <div class="flex flex-grow justify-evenly items-center">
        <div class="w-1/3 flex ml-6">
            <span class="h5 w-5 text-gray-700 cursor-pointer hover:text-blue-300" on:click={handleHome} title="Back to deck selection.">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
            </span>
        </div>
        <div class="w-1/3 flex justify-between text-sm font-bold">
            <div class="h-6 w-6 cursor-pointer hover:text-blue-300 {!continuous && currentCardIndex == 0 ? 'text-gray-400' : 'cursor-pointer hover:text-blue-300'}" on:click={() => switchCard(-1)} title="Previous card">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </div>
            <span>{currentCardIndex + 1}/{maxCards}</span>
            <div class="h-6 w-6 {!continuous && currentCardIndex == maxCards -1 ? 'text-gray-400' : 'cursor-pointer hover:text-blue-300'}" on:click={() => switchCard(1)} title="Next card">
                <svg xmlns="http://www.w3.org/2000/svg" class="rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </div>
        </div>
        <div class="w-1/3 flex items-center justify-center"><Switch id="test" bind:checked={continuous} type="toggle" text="continuous"/></div>
    </div>
</section>
