<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    import Badge from '../badge/Badge.svelte'
    import Button from '../button/Button.svelte';
    import type {Deck} from '../../models/deck';

    export let deck: Deck;
    let updated = false;

    $: {
    if(deck.HasBeenUpdated) {
        updated = true;
        window.setTimeout(() => {
            updated = false;
        }, 1500);
    }
}

    const dispatch = createEventDispatcher();    
    function handle_reload(){
        dispatch('deckpreview:reload');
    }
</script>

<div class="bg-white flex flex-col justify-around h-full p-3 space-y-3 rounded-lg shadow-md" class:updated>
    <h5 class="text-gray-700 h-11 font-bold text-xl whitespace-nowrap overflow-hidden overflow-ellipsis" title={deck.Name}>{deck.Name}</h5>
    <div class="space-y-6">
        <p class="text-gray-400 text-xs m-2" title={deck.Path}>{deck.Description}</p>
        <div class="flex justify-start gap-x-1">
            <Badge class="bg-blue-500/75 text-blue-50">{deck.Cards.length || 0} Card{(deck.Cards.length || 0) > 0 ? "s" : ""}</Badge>
            <Badge class="bg-yellow-500/75 text-yellow-800">Completed</Badge>
        </div>
    </div>
    <div class="flex flex-row justify-between text-gray-700">
        <div class="flex"><span class="self-end text-sm">{deck.Author}</span></div>
        <div class="flex space-x-2">
            <Button title="Click to open the deck" text="Open" secondary small on:click></Button>
            <Button title="Reload the deck" secondary small on:click={handle_reload}>
                <path d="M10 17C10.5523 17 11 16.5523 11 16C11 15.4477 10.5523 15 10 15V17ZM5 16V15C4.44772 15 4 15.4477 4 16H5ZM4 21C4 21.5523 4.44772 22 5 22C5.55228 22 6 21.5523 6 21H4ZM14 7C13.4477 7 13 7.44772 13 8C13 8.55228 13.4477 9 14 9V7ZM19 8V9C19.5523 9 20 8.55228 20 8H19ZM20 3C20 2.44772 19.5523 2 19 2C18.4477 2 18 2.44772 18 3H20ZM3.65582 8.62855C3.44893 9.14062 3.69633 9.72345 4.2084 9.93034C4.72047 10.1372 5.3033 9.88984 5.51019 9.37777L3.65582 8.62855ZM7.29255 5.53198L7.88104 6.34049L7.29255 5.53198ZM15.738 4.92661L16.2051 4.04244V4.04244L15.738 4.92661ZM18.05 8.47889C18.3278 8.95621 18.9399 9.11795 19.4173 8.84014C19.8946 8.56233 20.0563 7.95017 19.7785 7.47285L18.05 8.47889ZM20.3447 15.3714C20.5516 14.8594 20.3042 14.2765 19.7922 14.0696C19.2801 13.8628 18.6973 14.1101 18.4904 14.6222L20.3447 15.3714ZM8.2627 19.0734L8.72985 18.1892L8.2627 19.0734ZM5.95021 15.5211C5.6724 15.0438 5.06024 14.8821 4.58292 15.1599C4.10559 15.4377 3.94385 16.0499 4.22166 16.5272L5.95021 15.5211ZM10 15H5V17H10V15ZM4 16V21H6V16H4ZM14 9H19V7H14V9ZM20 8V3H18V8H20ZM5.51019 9.37777C6.00079 8.16349 6.82219 7.1112 7.88104 6.34049L6.70406 4.72348C5.34268 5.71439 4.28659 7.06734 3.65582 8.62855L5.51019 9.37777ZM7.88104 6.34049C8.93983 5.56982 10.1941 5.11159 11.5004 5.01795L11.3574 3.02307C9.67799 3.14345 8.0655 3.73252 6.70406 4.72348L7.88104 6.34049ZM11.5004 5.01795C12.8067 4.92431 14.1128 5.19898 15.2708 5.81079L16.2051 4.04244C14.7163 3.25583 13.0369 2.90268 11.3574 3.02307L11.5004 5.01795ZM15.2708 5.81079C16.4286 6.42249 17.3911 7.34681 18.05 8.47889L19.7785 7.47285C18.9316 6.01775 17.6941 4.82915 16.2051 4.04244L15.2708 5.81079ZM18.4904 14.6222C17.9998 15.8365 17.1784 16.8888 16.1195 17.6595L17.2965 19.2765C18.6579 18.2856 19.714 16.9326 20.3447 15.3714L18.4904 14.6222ZM16.1195 17.6595C15.0606 18.4302 13.807 18.8884 12.5008 18.9821L12.6438 20.977C14.3233 20.8566 15.9352 20.2674 17.2965 19.2765L16.1195 17.6595ZM12.5008 18.9821C11.1945 19.0757 9.88778 18.801 8.72985 18.1892L7.79554 19.9575C9.28435 20.7442 10.9643 21.0973 12.6438 20.977L12.5008 18.9821ZM8.72985 18.1892C7.57195 17.5774 6.60901 16.6531 5.95021 15.5211L4.22166 16.5272C5.06864 17.9824 6.30671 19.1709 7.79554 19.9575L8.72985 18.1892Z"/>
            </Button>
        </div>
    </div>
</div>

<style>
    .updated {
	-webkit-animation: hb 0.4s ease-in-out 2 both;
	        animation: hb 0.4s ease-in-out 2 both;
    }

    @keyframes hb {
        0% {
            -webkit-transform: scale3d(1,1,1);
            transform: scale3d(1,1,1);
        }
        50% {
            -webkit-transform: scale3d(0.95,0.95,0.95);
            transform: scale3d(0.95,0.95,0.95);
        }
        75% {
            -webkit-transform: scale3d(1,1,1);
            transform: scale3d(1,1,1);
        }
    }
</style>