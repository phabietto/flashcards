<script lang="ts">
    import Badge from "../badge/Badge.svelte";

    export let contents = null;
    export let front = false;

    let audioControls = [];

    function soundControl(id: string) {
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
    function simpleHash(text: string) {
        let hash = 0;
        if (text.length == 0) {
            return hash;
        }

        for (let i = 0; i < text.length; i++) {
            let ch = text.charCodeAt(i);
            hash = ((hash <<5) - hash) + ch;
            hash = hash & hash;
        }
        return hash;
    }
</script>
<div class="flex justify-center items-center min-h-full relative">
    <div aria-label="answer" class="p-6 text-left cursor-text" class:front lang={contents.lang}>
        {#if contents.template == 'text'}
            {contents.content}
        {:else}
            {@html contents.content}
        {/if}
    </div>
    {#if contents.media && contents.media.length > 0}
    <div class="absolute top-5 left-5">
        {#each contents.media.map(generateId, 'audio_') as [item, id] (item.__id)}
            {#if item.template === 'audio'}
                <div>
                    <span class="text-gray-500 hover:text-blue-500 h-8 w-8 flex items-center justify-center rounded-full hover:bg-blue-300/25" title="Press to listen to the sound" on:click|preventDefault|stopPropagation={() => soundControl(id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {audioControls[id] === 1 ? 'hidden' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {audioControls[id] !== 1 ? 'hidden' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                    </span>
                    <audio id={id} on:ended={() => mediaEnded(id)}>
                        {#each item.sources as source (source.link)}                            
                        <source src="{source.link}" type="{source.type}">
                        {/each}
                    </audio>
                </div>
            {/if}
        {/each}
    </div>
    {/if}
</div>

<style>
    .front { @apply text-3xl }
    div :global(b) { @apply mr-6 }
    div :global(u) { @apply font-bold }
</style>