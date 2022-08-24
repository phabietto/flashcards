<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { CardContent } from "../../models/card";
    import { DeckMode } from "../../models/enums";
    import { generateId } from "../../helpers/utilities";
    import Badge from "../badge/Badge.svelte";
    import Button from "../button/Button.svelte";
    import TextEditor from "../editors/TextEditor.svelte";
    import Icon from "../icon/Icon.svelte";
    import Switch from "../switch/Switch.svelte";

    export let contents: CardContent = null;
    export let front = false;
    export let tags = null;
    export let mode:DeckMode = DeckMode.Undefined;
    let pinned = false;

    const dispatch = createEventDispatcher();
    let audioControls = [];

    function soundControl(e: Event, id: string) {
        e.preventDefault();
        e.stopPropagation();
        let el: HTMLAudioElement = document.getElementById(id) as HTMLAudioElement;
         if(audioControls[id] === undefined || audioControls[id] === 0){
            el.play();
            audioControls[id] = 1;
         }else{
            el.pause();
            el.currentTime = 0;
            audioControls[id] = 0;
        }
    }
    function mediaEnded(id:string) {
        audioControls[id] = 0;
    }
    function generateAudioId(item: object) {
        if(item["__id"] === undefined){
            let id = this + (Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36));
            item["__id"] = id;
            console.log('generate!', id);
        }
        return [item, item["__id"]];
    }
    function handleClick() {
        if(!pinned) {
            dispatch('click');
        }
    }
    // function simpleHash(text: string) {
    //     let hash = 0;
    //     if (text.length == 0) {
    //         return hash;
    //     }

    //     for (let i = 0; i < text.length; i++) {
    //         let ch = text.charCodeAt(i);
    //         hash = ((hash <<5) - hash) + ch;
    //         hash = hash & hash;
    //     }
    //     return hash;
    // }
</script>
<div class="box-border flex flex-col justify-evenly items-strech min-h-full p-4" on:click={handleClick}>
    <div aria-label="card-top" class="flex h-8 justify-start">
        <div aria-label="media" class="flex space-x-1">
            {#if contents.Media && contents.Media.length > 0}
                {#each contents.Media.map(generateAudioId, 'audio_') as [item, id] (item.__id)}
                    {#if item.Template === 'audio'}
                        <div>
                            <Button on:click={(e) => soundControl(e, id)} title="Previous card." class="{audioControls[id] === 1 ? 'hidden' : ''}">
                                <Icon slot="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                </Icon>
                            </Button>
                            <Button on:click={(e) => soundControl(e, id)} title="Previous card." class="{audioControls[id] !== 1 ? 'hidden' : ''}">
                                <Icon slot="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                </Icon>
                            </Button>
                            <audio id={id} on:ended={() => mediaEnded(id)}>
                                {#each item.Sources as source (source.Link)}                            
                                <source src="{source.Link}" type="{source.Type}">
                                {/each}
                            </audio>
                        </div>
                    {/if}
                {/each}
            {/if}
        </div>
        {#if mode === DeckMode.Edit }
        <div class="flex-grow flex justify-end space-x-1">
            <Switch id={generateId((front ? 'front' : 'back') + 'pin_' )} bind:checked={pinned} class="w-5 h-5 hover:text-yellow-500 hover:fill-yellow-500 hover:bg-yellow-300/25" title={pinned ? "Unblock card" : "Block card"}>
                <Icon slot="icon" type="fill">
                    <path d="M20 12.2H21H20ZM20 17.8H19H20ZM16.8002 21V22V21ZM7.2002 21V20V21ZM19.7822 19.908L20.6732 20.362L19.7822 19.908ZM18.9078 20.782L19.3618 21.673L18.9078 20.782ZM18.9078 9.21799L19.3618 8.32698L18.9078 9.21799ZM19.7822 10.092L20.6732 9.63805L19.7822 10.092ZM4.21799 10.092L3.32698 9.63805L3.32698 9.63805L4.21799 10.092ZM5.0918 9.21799L5.54579 10.109H5.54579L5.0918 9.21799ZM4.21799 19.908L5.10899 19.454H5.10899L4.21799 19.908ZM5.0918 20.782L4.63781 21.673L5.0918 20.782ZM15 6H16V6L15 6ZM15 8.76923H14H15ZM14.7689 9V10V9ZM9.23047 9V8V9ZM5 17.8V12.2H3V17.8H5ZM7.2002 10H16.8002V8H7.2002V10ZM19 12.2V17.8H21V12.2H19ZM16.8002 20H7.2002V22H16.8002V20ZM19 17.8C19 18.3766 18.9993 18.7489 18.9762 19.0323C18.954 19.3041 18.9163 19.4047 18.8912 19.454L20.6732 20.362C20.8661 19.9835 20.9373 19.5902 20.9696 19.1949C21.0008 18.8112 21 18.3434 21 17.8H19ZM16.8002 22C17.3438 22 17.8115 22.0008 18.1951 21.9694C18.5904 21.9371 18.9835 21.8657 19.3618 21.673L18.4538 19.891C18.4043 19.9162 18.3036 19.9539 18.0321 19.9761C17.7489 19.9992 17.3767 20 16.8002 20V22ZM18.8912 19.454C18.7956 19.6417 18.6425 19.7948 18.4538 19.891L19.3618 21.673C19.9257 21.3856 20.3853 20.927 20.6732 20.362L18.8912 19.454ZM16.8002 10C17.3768 10 17.7489 10.0008 18.0321 10.0239C18.3036 10.0461 18.4043 10.0838 18.4538 10.109L19.3618 8.32698C18.9835 8.13421 18.5904 8.06288 18.1951 8.03057C17.8115 7.99922 17.3437 8 16.8002 8V10ZM21 12.2C21 11.6565 21.0008 11.1887 20.9695 10.8051C20.9373 10.4098 20.8661 10.0165 20.6732 9.63805L18.8912 10.546C18.9164 10.5954 18.954 10.696 18.9762 10.9677C18.9993 11.2511 19 11.6233 19 12.2H21ZM18.4538 10.109C18.6424 10.2051 18.7956 10.3583 18.8912 10.546L20.6732 9.63805C20.3854 9.07316 19.9259 8.61439 19.3618 8.32698L18.4538 10.109ZM5 12.2C5 11.6234 5.00078 11.2511 5.02393 10.9678C5.04612 10.6962 5.0838 10.5955 5.10899 10.546L3.32698 9.63805C3.13419 10.0164 3.06287 10.4096 3.03057 10.805C2.99922 11.1886 3 11.6564 3 12.2H5ZM7.2002 8C6.65663 8 6.18874 7.99922 5.80498 8.03057C5.40962 8.06286 5.01624 8.13416 4.63781 8.32698L5.54579 10.109C5.59517 10.0838 5.69595 10.0461 5.9678 10.0239C6.25126 10.0008 6.62365 10 7.2002 10V8ZM5.10899 10.546C5.205 10.3576 5.35788 10.2047 5.54579 10.109L4.63781 8.32698C4.07306 8.61473 3.61447 9.07382 3.32698 9.63805L5.10899 10.546ZM3 17.8C3 18.3435 2.99922 18.8113 3.03057 19.195C3.06287 19.5904 3.13418 19.9836 3.32698 20.362L5.10899 19.454C5.08381 19.4046 5.04613 19.3039 5.02393 19.0322C5.00078 18.7488 5 18.3765 5 17.8H3ZM7.2002 20C6.62367 20 6.25127 19.9992 5.96782 19.9761C5.69598 19.9538 5.59519 19.9161 5.54579 19.891L4.63781 21.673C5.01623 21.8658 5.40959 21.9371 5.80496 21.9694C6.18873 22.0008 6.65662 22 7.2002 22V20ZM3.32698 20.362C3.61452 20.9264 4.07317 21.3853 4.63781 21.673L5.54579 19.891C5.35778 19.7952 5.20494 19.6424 5.10899 19.454L3.32698 20.362ZM10 8.76923V6H8V8.76923H10ZM14 6V8.76923H16V6H14ZM14.7689 8H9.23047V10H14.7689V8ZM14 8.76923C14 8.3427 14.3458 8 14.7689 8V10C15.447 10 16 9.45067 16 8.76923H14ZM12 4C13.1046 4 14 4.89543 14 6L16 6C16 3.79086 14.2091 2 12 2V4ZM10 6C10 4.89543 10.8954 4 12 4V2C9.79086 2 8 3.79086 8 6H10ZM8 8.76923C8 9.44727 8.54904 10 9.23047 10V8C9.657 8 10 8.34609 10 8.76923H8Z"/>
                </Icon>
            </Switch>
        </div>
        {/if}
    </div>
    <div aria-label="{front ? 'front' : 'back'}" class="flex-grow w-full flex items-center justify-center" class:front lang={contents.Lang}>
        {#if contents.Template == 'text'}
        <TextEditor class="m-4 cursor-text" bind:value={contents.Content} readonly={mode !== DeckMode.Edit } rows={6} on:edit={() => pinned = true}/>
        {:else}
        <div class="m-4 cursor-text">
            {@html contents.Content}
        </div>
        {/if}
    </div>
    <div aria-label="tags" class="flex h-8 space-x-1 ">
        <div class="flex justify-start items-center space-x-1">
            {#if tags && tags.constructor === Array && tags.length > 0}
                {#each tags as tag}
                    <Badge class="bg-blue-500/75 text-blue-50 h-6">{tag}</Badge>
                {/each}
            {/if}    
        </div>
        <div class="flex-grow flex justify-end items-center">
        {#if mode === DeckMode.Edit }
            <Badge class="bg-yellow-500/75 text-yellow-50 h-6">{front ? 'front' : 'back'}</Badge>
        {/if}
        </div>
    </div>
</div>

<style>
    .front { @apply text-4xl ;}
    div :global(p) { @apply m-2 text-left text-sm ;}
    div :global(span) { @apply text-left text-xs ;}
    div :global(b) { @apply mr-6 ;}
    div :global(u) { @apply font-bold ;}
</style>