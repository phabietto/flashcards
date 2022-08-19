<script lang="ts">
    import type { CardContent } from "../../models/card";
    import { DeckMode } from "../../models/enums";
    import Badge from "../badge/Badge.svelte";
    import Button from "../button/Button.svelte";
    import TextEditor from "../editors/TextEditor.svelte";
    import Icon from "../icon/Icon.svelte";

    export let contents: CardContent = null;
    export let front = false;
    export let tags = null;
    export let mode:DeckMode = DeckMode.Undefined;

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
    function generateId(item: object) {
        if(item["__id"] === undefined){
            let id = this + (Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36));
            item["__id"] = id;
            console.log('generate!', id);
        }
        return [item, item["__id"]];
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
<div class="flex flex-col justify-evenly items-strech min-h-full">
    {#if contents.Media && contents.Media.length > 0}
    <div aria-label="media" class="flex h-8 space-x-1 mx-4 mt-4">
        {#each contents.Media.map(generateId, 'audio_') as [item, id] (item.__id)}
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
    </div>
    {/if}
    <div aria-label="{front ? 'front' : 'back'}" class="flex-grow w-full flex items-center justify-center" class:front lang={contents.Lang}>
        <div class="m-4 cursor-text">
            {#if contents.Template == 'text'}
                {contents.Content}
            {:else}
                {@html contents.Content}
            {/if}
        </div>
    </div>
    {#if tags && tags.constructor === Array && tags.length > 0}
    <div aria-label="tags" class="flex space-x-1 mx-4 mb-4">
        {#each tags as tag}
            <Badge class="bg-blue-500/75 text-blue-50">{tag}</Badge>
        {/each}
    </div>
    {/if}
</div>

<style>
    .front { @apply text-4xl ;}
    div :global(p) { @apply m-2 text-left text-sm ;}
    div :global(span) { @apply text-left text-xs ;}
    div :global(b) { @apply mr-6 ;}
    div :global(u) { @apply font-bold ;}
</style>