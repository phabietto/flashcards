<script lang="ts">
  import { DeckMode } from "../../models/enums";
  import DeckControls from "../controls/DeckControls.svelte";
  import StudyMethods from "../controls/StudyMethods.svelte";

  export let deck = {
    name: 'No deck selected',
    cards: []
  };

  let deckMode = DeckMode.Flashcards;
</script>

<div class="flex flex-col w-1/2 mx-auto">
  <h1 class="text-gray-800 font-bold text-2xl my-6 text-left">
    {deck.name}
  </h1>
  <div class="flex gap-3">
    <StudyMethods class="w-1/3" bind:deckMode={deckMode}/>
    <DeckControls class="w-2/3" {deck} {deckMode} on:deck-controls::home />
  </div>
</div>
