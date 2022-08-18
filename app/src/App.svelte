<script lang="ts">
  import Button from "./components/button/Button.svelte";
  import DeckPreview from "./components/cards/DeckPreview.svelte";
  import ActiveBreakpointIndicator from "./components/debug/ActiveBreakpointIndicator.svelte";
  import Deck from "./components/deck/Deck.svelte";
  import Tailwind from "./Tailwind.svelte";
  import {deckStatus as store} from './stores/deckStatus';
  import { DeckStatus as DeckStatusModel } from "./models/deckStatus";
  import { Deck as DeckModel } from "./models/deck";
  import { DeckMode } from "./models/enums";

  let decks: DeckModel[] = [
    new DeckModel({
      name: "International Phonetic Alphabet (English-based)",
      description:
        "Basic symbols of the Internation Phonetic Alphabet. Several rare IPA symbols are not included.",
      notes:
        "Initial version containing only the phonetics used for learning Korean",
      lang: "en",
      author: "Fabio Bonacina",
      cards: [ {
        front: {
          template: 'aaa',
          content: 'Card #1'
        },
        back: {
          template: 'text',
          content: 'This is the back of Card #1'
        }
      }
      ],
    }),
  ];

  function loadDeck() {
    fetch(deckPath)
      .then(response => response.json())
      .then(data => {
        if(decks.filter((o) => o.Name === data.name).length === 0){
          decks = [new DeckModel(data), ...decks];
        }else{
          console.log(`Deck '${data.name}' has already been loaded`);
        }
      })
      .catch(e => console.log(e));
  }
  let deckPath = '';
</script>

<Tailwind />

<main class="text-center p-4 mx-0 w-screen">
  {#if $store.Deck}
    <Deck on:deck-controls::home={() => store.set(new DeckStatusModel(null))}/>
  {:else}
    <div class="w-7/12 mx-auto">
      <div class="flex min-w-full flex-grow my-4">
        <div class="bg-gray-100 text-gray-600 inline-flex items-center w-1/3 mr-4 p-2 rounded-lg">
          <input type="text" placeholder="path" class="bg-transparent outline-none text-base px-1 min-w-full" bind:value={deckPath}>
        </div>
        <Button text="Load level" iconLeft={false} primary fill="fill-transparent" stroke="stroke-current" on:click={loadDeck}>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </Button>
      </div>
      <ul class="grid grid-cols-3 gap-4 auto-rows-fr">
        {#each decks as deck (deck.Name)}
          <li><DeckPreview {deck} on:click={
            () => store.update(o => {
              o.Deck = deck;
              o.Mode = DeckMode.Flashcards;
              return o;
            }) 
          } /></li>
        {/each}
      </ul>
    </div>
  {/if}
</main>
<ActiveBreakpointIndicator />

<style>
  :root {
    --svelte-rgb: 255, 62, 0;
  }
</style>
