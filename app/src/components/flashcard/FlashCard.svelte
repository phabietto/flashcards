<script lang="ts">
import { afterUpdate } from "svelte";
import CardContent from "./CardContent.svelte";

export let card = null;
let flipClass = '';

$: {
    if(card != null){
        flipClass = ''
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

<div class="{flipClass} inline-block w-full [perspective:800px] h-[350px] cursor-pointer">
   <div class="bg-white rounded-2xl shadow-sm min-h-full min-w-full card">
        <div class="card--front" on:click={flip}><CardContent front contents={card.front}/></div>
        <div class="card--back" on:click={flip}><CardContent contents={card.back}/></div>
   </div> 
</div>

<style>
    .card {
        transition: transform .32s ease,opacity .12s linear!important;
        transform-style: preserve-3d;
    }
    .card--front,.card--back { position: absolute;backface-visibility: hidden;width: 100%;height: 100%;z-index: 0;}
    .card--back {transform: rotateX(180deg);}
    .card--rotate .card {transform: rotateX(180deg);}
    .card--rotate .card--back {transform: rotateX(180deg);z-index: 1;}
</style>