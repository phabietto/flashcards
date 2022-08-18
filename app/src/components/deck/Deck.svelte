<script lang="ts">
  import { onDestroy } from "svelte";
  import { DeckMode } from "../../models/enums";
  import DeckControls from "../controls/DeckControls.svelte";
  import StudyMethods from "../controls/StudyMethods.svelte";
  import {deckStatus as store} from '../../stores/deckStatus';
  import type { DeckStatus as DeckStatusModel } from "../../models/deckStatus";
  
  let deckStatus: DeckStatusModel;
  let deckMode = DeckMode.Flashcards;
  const unsubscribe = store.subscribe(value => {
    deckStatus = value;
  });

  onDestroy(unsubscribe);
</script>

<div class="flex flex-col w-1/2 mx-auto">
  <h1 class="text-gray-800 font-bold text-2xl my-6 text-left">
    {deckStatus.Deck.Name}
  </h1>
  <div class="flex gap-3">
    <StudyMethods class="w-1/3" bind:deckMode={deckStatus.Mode}/>
    <DeckControls class="w-2/3" on:deck-controls::home />
  </div>
</div>
