<script lang="ts">
  import DeckControls from "../controls/DeckControls.svelte";
  import StudyMethods from "../controls/StudyMethods.svelte";
  import {deckStatus as store} from '../../stores/deckStatus';  
</script>

<div class="flex flex-col w-1/2 mx-auto">
  <h1 class="text-gray-800 font-bold text-2xl my-6 text-left">
    {$store.Deck.Name}
  </h1>
  <div class="flex gap-3">
    <StudyMethods class="w-1/3" bind:deckMode={$store.Mode}/>
    <DeckControls class="w-2/3" on:deck-controls::home />
  </div>
</div>
