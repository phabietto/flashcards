<script lang="ts">
import CardContent from "./CardContent.svelte";
import type { Card } from "../../models/card";
import { DeckMode } from "../../models/enums";

export let card: Card = null;
export let mode: DeckMode = DeckMode.Undefined;
let flipClass = '';
let heartbeat = true;

$: {
    if(card != null) {
        flipClass = ''
        heartbeat = true;
        window.setTimeout(() => {
            heartbeat = false;
        }, 1500);
    }
}

function flip() {
    var selection = window.getSelection();
    if(selection.toString().length > 0) {
        return;
    }
    flipClass = flipClass.length > 0 ? '' : 'card--rotate';
}
</script>
{#key card}
<div class="{flipClass} inline-block w-full [perspective:800px] h-[350px] cursor-pointer" class:heartbeat>
   <div class="bg-white rounded-2xl shadow-sm min-h-full min-w-full border border-gray-200 card">
        <div class="card--front" on:click={flip}><CardContent front contents={card.Front} {mode}/></div>
        <div class="card--back" on:click={flip}><CardContent contents={card.Back} tags={card.Tags}/></div>
   </div> 
</div>
{/key}
<style>
    .card {
        transition: transform .32s ease,opacity .12s linear!important;
        transform-style: preserve-3d;
    }
    .card--front,.card--back { 
        backface-visibility: hidden;
        @apply absolute w-full h-full z-0
        ;
    }
    .card--back {transform: rotateX(180deg);}
    .card--rotate .card {transform: rotateX(180deg);}
    .card--rotate .card--back {transform: rotateX(180deg);z-index: 1;}
    .heartbeat {
	-webkit-animation: pulsate-bck 0.4s ease-in-out 2 both;
	        animation: pulsate-bck 0.4s ease-in-out 2 both;
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
    @keyframes pulsate-bck {
        0%,to {
            -webkit-transform: scale(1);
            transform: scale(1)
        }

        50% {
            -webkit-transform: scale(.9);
            transform: scale(.9)
        }
    }
    @keyframes wobble-hor-bottom {
        0%,to {
            -webkit-transform: translateX(0%);
            transform: translateX(0%);
            -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%
        }

        15% {
            -webkit-transform: translateX(-30px) rotate(-6deg);
            transform: translateX(-30px) rotate(-6deg)
        }

        30% {
            -webkit-transform: translateX(15px) rotate(6deg);
            transform: translateX(15px) rotate(6deg)
        }

        45% {
            -webkit-transform: translateX(-15px) rotate(-3.6deg);
            transform: translateX(-15px) rotate(-3.6deg)
        }

        60% {
            -webkit-transform: translateX(9px) rotate(2.4deg);
            transform: translateX(9px) rotate(2.4deg)
        }

        75% {
            -webkit-transform: translateX(-6px) rotate(-1.2deg);
            transform: translateX(-6px) rotate(-1.2deg)
        }
    }
</style>