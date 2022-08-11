<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let id:string;
    export let checked = false;
    export let disabled = false;
    export let type = 'switch';

    const dispatcher = createEventDispatcher();
    function handleClick(){
        dispatcher('switch::click', checked);
    }
</script>
{#if $$slots.icon}
<div class="f-icon w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-blue-300/25 hover:text-blue-500" class:checked title={$$props.title}>
    <label for={id} class="flex items-center cursor-pointer" class:disabled>
        <div class="relative w-5 h-5 {$$props.class}">
            <input id={id} type="checkbox" class="sr-only" {disabled} bind:checked on:change={handleClick}/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                {#if $$slots.iconChecked && checked}
                <slot name="iconChecked"></slot>
                {:else}
                <slot name="icon"></slot>
                {/if}
            </svg>
        </div>
    </label>  
</div>
{:else}
<div class={type}>  
    <label for={id} class="flex items-center cursor-pointer" class:disabled>
        <div class="relative">
            <input id={id} type="checkbox" class="sr-only" {disabled} bind:checked on:change={handleClick}/>
            {#if type === 'toggle'}
                <div class="track w-7 h-2 bg-gray-400 rounded-full shadow-inner"></div>
                <div class="dot absolute w-4 h-4 bg-white rounded-full shadow -left-1 -top-1 transition-transform ease-in-out duration-300"></div>
            {:else}
                <div class="track block bg-gray-500 w-10 h-6 rounded-full"></div>
                <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ease-in-out duration-300"></div>
            {/if}
        </div>
            <div class="ml-3 text-gray-600 font-medium"><slot></slot></div>
        </label>
    </div>
{/if}

<style>
    input:checked ~ .dot {
        @apply transform translate-x-full;
    }
    input:checked + div {
        @apply bg-blue-400 fill-blue-400;
    }
    .toggle input[type='checkbox']:focus:not(:disabled) ~ div,
    .toggle input[type='checkbox']:active:not(:disabled) ~ div
    {
      @apply outline-none ring ring-blue-300;
    }
    .switch input[type='checkbox']:focus:not(:disabled) + .track,
    .switch input[type='checkbox']:active:not(:disabled) + .track {
      @apply outline-none ring ring-offset-2 ring-blue-300;
    }
    input[type='checkbox']:disabled:not(:checked) + .track {
        @apply bg-gray-300;
    }
    input[type='checkbox']:disabled:checked + .track {
        @apply bg-blue-200;
    }
    .disabled {
        @apply cursor-not-allowed;
    }

    input[type='checkbox']:focus:not(:disabled) ~ svg,
    input[type='checkbox']:active:not(:disabled) ~ svg {
        @apply outline-none ring ring-blue-300;
    }
    input:checked + svg {
        @apply text-blue-500;
    }
    div.f-icon.checked {
        @apply hover:bg-blue-300/25 hover:text-blue-500
    }
</style>
