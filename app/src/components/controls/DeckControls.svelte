<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import FlashCard from "../flashcard/FlashCard.svelte";
    import Icon from "../icon/Icon.svelte";
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

<section class="flex flex-col justify-end h-[400px] text-gray-600 {$$props.class}">
    <FlashCard card={deck.cards[currentCardIndex]}></FlashCard>
    <div class="flex flex-grow justify-evenly items-center">
        <div class="w-2/5 flex">
            <Icon on:click={handleHome} title="Back to deck selection.">
                <path d="M5.25 16.88V10.9146C5.25 10.3375 5.51642 9.79278 5.97193 9.4385L10.8519 5.64294C11.5272 5.11773 12.4728 5.11773 13.1481 5.64294L18.0281 9.4385C18.4836 9.79278 18.75 10.3375 18.75 10.9146V16.88C18.75 17.9128 17.9128 18.75 16.88 18.75H14.75C14.4739 18.75 14.25 18.5261 14.25 18.25V15.6487C14.25 15.3855 14.207 15.1193 14.0677 14.896C13.8854 14.6039 13.6423 14.3523 13.353 14.1595C12.9525 13.8925 12.4817 13.75 12 13.75C11.5183 13.75 11.0475 13.8925 10.647 14.1595C10.3577 14.3523 10.1146 14.6039 9.93234 14.896C9.79305 15.1193 9.75 15.3855 9.75 15.6487V18.25C9.75 18.5261 9.52614 18.75 9.25 18.75H7.12C6.08723 18.75 5.25 17.9128 5.25 16.88Z"/>
                <!-- <path d="M5 11.76c0-1.358 0-2.037.274-2.634.275-.597.79-1.038 1.821-1.922l1-.857C9.96 4.75 10.89 3.95 12 3.95c1.11 0 2.041.799 3.905 2.396l1 .857c1.03.884 1.546 1.325 1.82 1.922.275.597.275 1.276.275 2.634V16c0 1.886 0 2.828-.586 3.414C17.828 20 16.886 20 15 20H9c-1.886 0-2.828 0-3.414-.586C5 18.828 5 17.886 5 16v-4.24Z"/>
                <path d="M14.5 20v-5a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v5" stroke-linecap="round" stroke-linejoin="round"/> -->
            </Icon>
        </div>
        <div class="w-1/5 flex justify-between items-center text-sm font-bold">
            <Icon on:click={() => switchCard(-1)} title="Previous card." disabled={!continuous && currentCardIndex == 0} class="rotate-180">
                <path d="M17 12H7M13 8l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
                <!-- <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /> -->
            </Icon>
            <span>{currentCardIndex + 1}/{maxCards}</span>
            <Icon  on:click={() => switchCard(1)} title="Next card." disabled={!continuous && currentCardIndex == maxCards -1}>
                <path d="M17 12H7M13 8l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
                <!-- <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /> -->
            </Icon>
        </div>
        <div class="w-2/5 flex justify-end items-center">
            <Switch id="test" bind:checked={continuous} class="w-6 h-6" title="Cycle continuosly through deck">
                <g slot="icon" fill="none">
                    <path d="m14 16 .354-.354.353.354-.353.354L14 16Zm-3.646-4.354 4 4-.708.708-4-4 .708-.708Zm4 4.708-4 4-.708-.708 4-4 .708.708Z" stroke-width="1"/>
                    <path d="M20 13.5V10a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h7" stroke-linecap="round"/>
                </g>
            </Switch>
        </div>
    </div>
</section>
